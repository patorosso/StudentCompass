USE studentcompass

GO

CREATE OR ALTER FUNCTION app.validate_course_dates
(
    @first_term TINYINT,
	@first_year SMALLINT,
	@second_term TINYINT,
	@second_year SMALLINT
)
RETURNS BIT
AS
BEGIN

IF @first_year > @second_year 
BEGIN
	RETURN 0;
END

IF @first_year = @second_year
BEGIN
	IF @first_term >= @second_term
	BEGIN
		RETURN 0;
	END
END

RETURN 1;

END