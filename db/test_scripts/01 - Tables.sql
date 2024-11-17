USE master
GO

-- Conditional database removal
IF EXISTS (SELECT name FROM sys.databases WHERE name = 'test_studentcompass')
BEGIN
	DROP DATABASE test_studentcompass
END

GO

-- Database creation
CREATE DATABASE test_studentcompass

GO

USE test_studentcompass

-- Conditional table removal for the app schema

IF OBJECT_ID('CourseExam', 'U') IS NOT NULL DROP TABLE CourseExam;
IF OBJECT_ID('Course', 'U') IS NOT NULL DROP TABLE Course;
IF OBJECT_ID('CourseStatus', 'U') IS NOT NULL DROP TABLE CourseStatus;
IF OBJECT_ID('Enrolled', 'U') IS NOT NULL DROP TABLE Enrolled;
IF OBJECT_ID('Correlative', 'U') IS NOT NULL DROP TABLE Correlative;
IF OBJECT_ID('Exam', 'U') IS NOT NULL DROP TABLE Exam;
IF OBJECT_ID('Subject', 'U') IS NOT NULL DROP TABLE Subject;
IF OBJECT_ID('Term', 'U') IS NOT NULL DROP TABLE Term;
IF OBJECT_ID('CareerPlan', 'U') IS NOT NULL DROP TABLE CareerPlan;
IF OBJECT_ID('Career', 'U') IS NOT NULL DROP TABLE Career;
IF OBJECT_ID('Department', 'U') IS NOT NULL DROP TABLE Department;
IF OBJECT_ID('StudentPreferences', 'U') IS NOT NULL DROP TABLE StudentPreferences;
IF OBJECT_ID('Student', 'U') IS NOT NULL DROP TABLE Student;

-- Table creation for the app schema

BEGIN TRY
BEGIN TRAN

CREATE TABLE Student (
	Id SMALLINT IDENTITY(1,1),
	Username NVARCHAR(30) NOT NULL,
	Pass NVARCHAR(50) NOT NULL,
	IsActive BIT NOT NULL, 
	CONSTRAINT PK_Student PRIMARY KEY (Id),
	--CONSTRAINT CK_Pass CHECK (LEN(Pass) >= 8)
);

CREATE TABLE StudentPreferences (
	StudentId SMALLINT,
	DarkTheme BIT,
	EditStyle BIT,
	CONSTRAINT PK_StudentPreferences PRIMARY KEY (StudentId),
	CONSTRAINT FK_StudentPreferences_Student FOREIGN KEY (StudentId) REFERENCES Student(Id)
);

CREATE TABLE Department (
	Id TINYINT,
	Description NVARCHAR(35) NOT NULL,
	CONSTRAINT PK_Department PRIMARY KEY (Id)
);

CREATE TABLE Career (
	Id TINYINT,
	Description NVARCHAR(60) NOT NULL,
	DepartmentId TINYINT NOT NULL,
	CONSTRAINT PK_Career PRIMARY KEY (Id),
	CONSTRAINT FK_Career_Department FOREIGN KEY (DepartmentId) REFERENCES Department(Id)
);

CREATE TABLE CareerPlan (
	Id TINYINT,
	Description NVARCHAR(60) NOT NULL,
	CareerId TINYINT NOT NULL,
	CONSTRAINT PK_CareerPlan PRIMARY KEY (Id),
	CONSTRAINT FK_CareerPlan_Career FOREIGN KEY (CareerId) REFERENCES Career(Id)
);

CREATE TABLE Enrolled (
	StudentId SMALLINT,
	CareerPlanId TINYINT,
	EnrollmentYear SMALLINT NOT NULL,
	CONSTRAINT PK_Enrolled PRIMARY KEY (StudentId, CareerPlanId),
	CONSTRAINT FK_Enrolled_Student FOREIGN KEY (StudentId) REFERENCES Student(Id),
	CONSTRAINT FK_Enrolled_CareerPlan FOREIGN KEY (CareerPlanId) REFERENCES CareerPlan(Id)
);

CREATE TABLE Term (
	Id TINYINT,
	Description NVARCHAR(40) NOT NULL,
	CONSTRAINT PK_Term PRIMARY KEY (Id)
);

CREATE TABLE Subject (
	Code SMALLINT,
	CareerPlanId TINYINT,
	Description NVARCHAR(60) NOT NULL,
	WeeklyHours TINYINT NOT NULL,
	YearLevel TINYINT NOT NULL,
	IsOptional BIT NOT NULL,
	IsElective BIT NOT NULL,
	IsAnnual BIT NOT NULL,
	CONSTRAINT PK_Subject PRIMARY KEY (Code, CareerPlanId),
	CONSTRAINT FK_Subject_CareerPlan FOREIGN KEY (CareerPlanId) REFERENCES CareerPlan(Id)
);

CREATE TABLE Correlative (
	SubjectCode SMALLINT,
	CorrelativeCode SMALLINT,
	SubjectCareerPlanId TINYINT,
	CorrelativeCareerPlanId TINYINT,
	CONSTRAINT PK_Correlative PRIMARY KEY (SubjectCode, CorrelativeCode, SubjectCareerPlanId, CorrelativeCareerPlanId),
	CONSTRAINT FK_Correlative_Subject1 FOREIGN KEY (SubjectCode, SubjectCareerPlanId) REFERENCES Subject(Code, CareerPlanId),
	CONSTRAINT FK_Correlative_Subject2 FOREIGN KEY (CorrelativeCode, CorrelativeCareerPlanId) REFERENCES Subject(Code, CareerPlanId)
);

CREATE TABLE CourseStatus (
	Id TINYINT,
	Description NVARCHAR(25) NOT NULL,
	CONSTRAINT PK_CourseStatus PRIMARY KEY (Id)
);

CREATE TABLE Course (
	Id INT IDENTITY(1,1),
	StudentId SMALLINT NOT NULL,
	SubjectCode SMALLINT NOT NULL,
	CareerPlanId TINYINT NOT NULL,
	TermId TINYINT,
	StatusId TINYINT NOT NULL,
	Year SMALLINT,
	FinalGrade TINYINT,
	CONSTRAINT PK_Course PRIMARY KEY (Id),
	CONSTRAINT FK_Course_Student FOREIGN KEY (StudentId) REFERENCES Student(Id),
	CONSTRAINT FK_Course_Subject FOREIGN KEY (SubjectCode, CareerPlanId) REFERENCES Subject(Code, CareerPlanId),
	CONSTRAINT FK_Course_Term FOREIGN KEY (TermId) REFERENCES Term(Id),
	CONSTRAINT FK_Course_CourseStatus FOREIGN KEY (StatusId) REFERENCES CourseStatus(Id),
	CONSTRAINT CK_FinalGrade CHECK (FinalGrade > 0 AND FinalGrade <= 10),
	UNIQUE (StudentId, SubjectCode, CareerPlanId, TermId, Year)
);

CREATE TABLE Exam (
	Id TINYINT,
	Description NVARCHAR(40) NOT NULL,
	CONSTRAINT PK_Exam PRIMARY KEY (Id)
);

CREATE TABLE CourseExam (
	CourseId INT,
	ExamId TINYINT,
	TakenOn DATE,
	Grade TINYINT NOT NULL,
	CONSTRAINT PK_CourseExam PRIMARY KEY (CourseId, ExamId),
	CONSTRAINT FK_CourseExam_Exam FOREIGN KEY (ExamId) REFERENCES Exam(Id),
	CONSTRAINT FK_CourseExam_Course FOREIGN KEY (CourseId) REFERENCES Course(Id),
	CONSTRAINT CK_Grade CHECK (Grade >= 0 AND Grade <= 10)
);


COMMIT TRAN
END TRY

BEGIN CATCH
ROLLBACK TRAN
END CATCH