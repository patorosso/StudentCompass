USE studentcompass

GO

CREATE OR ALTER PROCEDURE app.seed_students @students_amount INT
AS
BEGIN

	WHILE @students_amount > 0
	BEGIN

	INSERT INTO app.student VALUES ('a','a',1)
	SET @students_amount = @students_amount - 1

	END

END

GO

-- EXEC app.seed_students 31000

