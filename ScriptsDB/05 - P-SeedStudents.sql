USE studentcompass

GO

CREATE PROCEDURE app.seed_students
	@amount INT
AS
BEGIN

CREATE TABLE #usernames (
	username NVARCHAR(30)
);

INSERT INTO #usernames VALUES
	('jose'),('maria'),
	('juan'),('julio'),
	('lucas'),('marcos'),
	('matias'),('luis'),
	('pedro'),('pablo');


END

