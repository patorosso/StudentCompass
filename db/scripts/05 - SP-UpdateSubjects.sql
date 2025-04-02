USE StudentCompass

GO

-- Conditional removal of the SP and TVP type

IF OBJECT_ID('UpdateSubjects', 'P') IS NOT NULL DROP PROCEDURE UpdateSubjects;

IF EXISTS(SELECT * FROM sys.types 
WHERE is_table_type = 1 AND name = 'SubjectsToUpdateDto')
BEGIN
    DROP TYPE SubjectsToUpdateDto;
END;

-- Table-valued parameter creation

CREATE TYPE SubjectsToUpdateDto AS TABLE
(
    SubjectCode SMALLINT NOT NULL,
	CareerPlanId TINYINT NOT NULL,
	StatusId TINYINT NOT NULL,
	FinalGrade TINYINT,
	CourseId INT
);

GO

CREATE OR ALTER PROCEDURE UpdateSubjects
@UserId SMALLINT,
@UserCareerPlanId TINYINT,
@SubjectsToUpdate SubjectsToUpdateDto READONLY
AS
BEGIN

DECLARE @SubjectCode SMALLINT;
DECLARE @CareerPlanId TINYINT;
DECLARE @StatusId TINYINT;
DECLARE @FinalGrade TINYINT;
DECLARE @CourseId INT;
DECLARE @StatusExists BIT;
DECLARE @Subject_Exists BIT;
DECLARE @User_Exists BIT;
DECLARE @ValidGrade BIT;
DECLARE @CourseExists BIT;
DECLARE @IsStatusDuplicated BIT;
DECLARE @IsApprovable BIT;
DECLARE @ExistingCourseStatus TINYINT = 0;
DECLARE @TransversalCareerPlanId TINYINT = 0;
DECLARE @ApprovedStatusId TINYINT = 1;
DECLARE @AttendingStatusId TINYINT = 2;
DECLARE @AvailableStatusId TINYINT = 5;
DECLARE @ErrorMessage VARCHAR(150);

SELECT *
INTO   #subjects_to_update
FROM   @SubjectsToUpdate

BEGIN TRY
BEGIN TRAN

	WHILE (SELECT COUNT(*) FROM #subjects_to_update) > 0
	BEGIN
	
	SELECT TOP 1 
	@SubjectCode = SubjectCode, @CourseId = CourseId, @StatusId = StatusId,
	@FinalGrade = FinalGrade, @CareerPlanId = CareerPlanId
	FROM #subjects_to_update ORDER BY SubjectCode -- it's important subjects are ordered

	-- Check subject
	SELECT @Subject_Exists = CASE WHEN EXISTS(
		SELECT 1 FROM subject WHERE code = @SubjectCode AND CareerPlanId = @CareerPlanId
		) THEN 1 ELSE 0 END;
	IF @Subject_Exists = 0
	BEGIN 
		SET @ErrorMessage = CONCAT('Subject with code ', CAST(@SubjectCode AS NVARCHAR), ' does not exist or does not belong to the provided career plan.');
		;THROW 50001, @ErrorMessage, 1;
    END

	-- Check user
	SELECT @User_Exists = CASE WHEN EXISTS(
		SELECT 1 FROM enrolled WHERE UserId = @UserId 
		AND (CareerPlanId = @CareerPlanId OR @CareerPlanId = @TransversalCareerPlanId)
		) THEN 1 ELSE 0 END;
	IF @User_Exists = 0
	BEGIN 
		SET @ErrorMessage = CONCAT('User with Id = ', CAST(@UserId AS NVARCHAR), 
		' does not exist or is not enrolled in the provided career plan with Id = ', CAST(@CareerPlanId AS NVARCHAR));
		;THROW 50002, @ErrorMessage, 1;
    END;

	-- Check status
	SELECT @StatusExists = CASE WHEN EXISTS(
		SELECT 1 FROM CourseStatus WHERE @StatusId = Id
		) THEN 1 ELSE 0 END;
	IF @StatusExists = 0
	BEGIN 
		SET @ErrorMessage = CONCAT('Status with Id = ', CAST(@StatusId AS NVARCHAR), ' does not exist.');
		;THROW 50003, @ErrorMessage, 1;
    END;

	-- Check grade
	SELECT @ValidGrade = CASE WHEN ((@StatusId = @ApprovedStatusId AND @FinalGrade IN (4,5,6,7,8,9,10)) 
	OR (@StatusId <> @ApprovedStatusId AND @FinalGrade IS NULL)
		) THEN 1 ELSE 0 END;
	IF @ValidGrade = 0
	BEGIN 
		SET @ErrorMessage = 'Final grade must be between 4-10 if the status is approved. Otherwise, null.';
		;THROW 50004, @ErrorMessage, 1;
    END;
	
		IF (@CourseId IS NOT NULL)
		BEGIN

		-- Check course
		SELECT TOP 1 @ExistingCourseStatus = StatusId FROM course WHERE Id = @CourseId
		AND UserId = @UserId AND CareerPlanId = @CareerPlanId AND SubjectCode = @SubjectCode
		IF @ExistingCourseStatus = 0
		BEGIN 
			SET @ErrorMessage = CONCAT('Invalid course with Id = ', CAST(@CourseId AS NVARCHAR),
			'. It does not exist or has incorrect information.');
			;THROW 50005, @ErrorMessage, 1;
		END;
	
			IF(@ExistingCourseStatus = @ApprovedStatusId AND @StatusId <> @ApprovedStatusId)
			BEGIN
				-- Use function to remove dependant subjects courses
				DELETE FROM course 
				WHERE UserId = @UserId AND CareerPlanId IN (@CareerPlanId, @TransversalCareerPlanId)
				AND SubjectCode IN (
									  SELECT * FROM 
									  GetDependantSubjects(@UserId,@CareerPlanId,@SubjectCode))

				IF(@StatusId = @AvailableStatusId)
				BEGIN
					DELETE FROM course WHERE @CourseId = Id; --available status is calculable, no need for rows.
				END
				ELSE IF(@StatusId = @AttendingStatusId)
				BEGIN
					UPDATE course 
					SET StatusId = @AttendingStatusId, FinalGrade = @FinalGrade
					WHERE Id = @CourseId;	
				END
			END
			ELSE
			BEGIN
				UPDATE course 
				SET StatusId = @StatusId, FinalGrade = @FinalGrade
				WHERE Id = @CourseId;
			END
		END
		ELSE
		BEGIN
		-- Search availability
		SET @IsApprovable = (SELECT 1
							  FROM correlative 
							  WHERE SubjectCode = @SubjectCode
							  AND SubjectCareerPlanId = @CareerPlanId
							  HAVING COUNT(*) = (SELECT qty FROM (SELECT COUNT(*) as qty FROM course 
												WHERE UserId = @UserId
												AND CareerPlanId = @CareerPlanId
												AND StatusId = @ApprovedStatusId
												AND SubjectCode IN (	SELECT CorrelativeCode
																		FROM correlative 
																		WHERE SubjectCode = @SubjectCode
																		AND SubjectCareerPlanId = @CareerPlanId))alias) )

			IF(@StatusId IN (@ApprovedStatusId, @AttendingStatusId))
			BEGIN

				-- Check no two approved or in-progress courses happen simultaneously
				SELECT @IsStatusDuplicated = CASE WHEN EXISTS(
					SELECT 1 FROM course 
					WHERE @UserId = UserId AND @CareerPlanId = CareerPlanId 
					AND @SubjectCode = SubjectCode AND StatusId = @StatusId
					) THEN 1 ELSE 0 END;
				IF @IsStatusDuplicated = 1
				BEGIN 
					;THROW 50006, 'There can be only one approved or in-progress subject simultaneously.', 1;
				END;
				
				-- verificar si la materia ESTA DISPONIBLE
				-- si lo está, creo CourseId.
				IF (@IsApprovable = 1)
				BEGIN
					INSERT INTO course(UserId,SubjectCode,CareerPlanId,StatusId,FinalGrade)
					VALUES (@UserId, @SubjectCode, @CareerPlanId, @StatusId, @FinalGrade)
				END
				ELSE
				BEGIN
					SET @ErrorMessage = CONCAT('Subject with code ', CAST(@SubjectCode AS NVARCHAR), ' is not available.');
					;THROW 50007, @ErrorMessage, 1;
				END
			END
			ELSE IF(@StatusId = @AvailableStatusId)
			BEGIN
				-- si vino DISPONIBLE y en realidad no lo está, tiro error. si ya estaba disponible no hago nada.
				IF (@IsApprovable = 0)
				BEGIN
					SET @ErrorMessage = CONCAT('Subject with code ', CAST(@SubjectCode AS NVARCHAR), ' is not available.');
					;THROW 50007, @ErrorMessage, 1;
				END
			END
		END

	DELETE FROM #subjects_to_update 
	WHERE SubjectCode = @SubjectCode AND
	CareerPlanId = @CareerPlanId
 
	END

	COMMIT TRAN;
	DROP TABLE #subjects_to_update
	EXEC GetProgressOverview @UserId, @UserCareerPlanId

    END TRY
    BEGIN CATCH
        ROLLBACK TRAN;
        DECLARE @ErrorMessage2 NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();
        RAISERROR (@ErrorMessage2, @ErrorSeverity, @ErrorState);
    END CATCH

END

GO