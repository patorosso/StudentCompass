USE studentcompass

-- Conditional table removal for the app schema

IF OBJECT_ID('app.course_exam', 'U') IS NOT NULL DROP TABLE app.course_exam;
IF OBJECT_ID('app.course', 'U') IS NOT NULL DROP TABLE app.course;
IF OBJECT_ID('app.course_status', 'U') IS NOT NULL DROP TABLE app.course_status;
IF OBJECT_ID('app.enrolled', 'U') IS NOT NULL DROP TABLE app.enrolled;
IF OBJECT_ID('app.correlative', 'U') IS NOT NULL DROP TABLE app.correlative;
IF OBJECT_ID('app.exam', 'U') IS NOT NULL DROP TABLE app.exam;
IF OBJECT_ID('app.subject', 'U') IS NOT NULL DROP TABLE app.subject;
IF OBJECT_ID('app.term', 'U') IS NOT NULL DROP TABLE app.term;
IF OBJECT_ID('app.career_plan', 'U') IS NOT NULL DROP TABLE app.career_plan;
IF OBJECT_ID('app.career', 'U') IS NOT NULL DROP TABLE app.career;
IF OBJECT_ID('app.department', 'U') IS NOT NULL DROP TABLE app.department;
IF OBJECT_ID('app.student', 'U') IS NOT NULL DROP TABLE app.student;

-- Table creation for the app schema

BEGIN TRAN

CREATE TABLE app.student(
	id SMALLINT IDENTITY(1,1),
	username NVARCHAR(30),
	pass NVARCHAR(50),
	is_active BIT, 
	CONSTRAINT pk_student PRIMARY KEY (id),
	--CONSTRAINT ck_pass CHECK (LEN(pass) >= 8)
);

CREATE TABLE app.department(
	id TINYINT IDENTITY(0,1),
	description NVARCHAR(35),
	CONSTRAINT pk_department PRIMARY KEY (id)
);

CREATE TABLE app.career(
	id TINYINT IDENTITY(0,1),
	description NVARCHAR(60),
	department_id TINYINT,
	CONSTRAINT pk_career PRIMARY KEY (id),
	CONSTRAINT fk_career_department FOREIGN KEY (department_id) REFERENCES app.department(id)
);

CREATE TABLE app.career_plan(
	id TINYINT IDENTITY(0,1),
	description NVARCHAR(60),
	career_id TINYINT,
	CONSTRAINT pk_career_plan PRIMARY KEY (id),
	CONSTRAINT fk_career_plan_career FOREIGN KEY (career_id) REFERENCES app.career(id)
);

CREATE TABLE app.enrolled(
	student_id SMALLINT,
	career_plan_id TINYINT,
	enrollment_date DATE,
	CONSTRAINT pk_enrolled PRIMARY KEY (student_id, career_plan_id),
	CONSTRAINT fk_enrolled_student FOREIGN KEY (student_id) REFERENCES app.student(id),
	CONSTRAINT fk_enrolled_career_plan FOREIGN KEY (career_plan_id) 
	REFERENCES app.career_plan(id)
);

CREATE TABLE app.term(
	id TINYINT IDENTITY(1,1),
	description NVARCHAR(40),
	CONSTRAINT pk_term PRIMARY KEY (id)
);

CREATE TABLE app.subject(
	code SMALLINT,
	career_plan_id TINYINT,
	description NVARCHAR(60),
	weekly_hours TINYINT,
	year_level TINYINT,
	is_optional BIT,
	is_elective BIT,
	is_annual BIT,
	CONSTRAINT pk_subject PRIMARY KEY (code, career_plan_id),
	CONSTRAINT fk_subject_career_plan FOREIGN KEY (career_plan_id) 
	REFERENCES app.career_plan(id)
);

CREATE TABLE app.correlative(
	subject_code SMALLINT,
	correlative_code SMALLINT,
	subject_career_plan_id TINYINT,
	correlative_career_plan_id TINYINT,
	CONSTRAINT pk_correlative 
	PRIMARY KEY (subject_code, correlative_code, subject_career_plan_id, correlative_career_plan_id),
	CONSTRAINT fk_correlative_code_1 FOREIGN KEY (subject_code, subject_career_plan_id)
	REFERENCES app.subject(code, career_plan_id),
	CONSTRAINT fk_correlative_code_2 FOREIGN KEY (correlative_code, correlative_career_plan_id)
	REFERENCES app.subject(code, career_plan_id)
);

CREATE TABLE app.course_status(
	id TINYINT IDENTITY(0,1),
	description NVARCHAR(25),
	CONSTRAINT pk_course_status PRIMARY KEY (id)
);

CREATE TABLE app.course(
	id INT IDENTITY(1,1),
	student_id SMALLINT,
	subject_code SMALLINT,
	career_plan_id TINYINT,
	term_id TINYINT,
	status_id TINYINT,
	year SMALLINT,
	final_grade TINYINT,
	CONSTRAINT pk_course PRIMARY KEY (id),
	CONSTRAINT fk_course_student FOREIGN KEY (student_id) REFERENCES app.student(id),
	CONSTRAINT fk_course_subject FOREIGN KEY (subject_code, career_plan_id)
	REFERENCES app.subject(code, career_plan_id),
	CONSTRAINT fk_course_term FOREIGN KEY (term_id) REFERENCES app.term(id),
	CONSTRAINT fk_course_course_status FOREIGN KEY (status_id) 
	REFERENCES app.course_status(id),
	CONSTRAINT ck_final_grade CHECK (final_grade > 0 AND final_grade <= 10),
	UNIQUE (student_id, subject_code, career_plan_id, term_id, year)
);

CREATE TABLE app.exam(
	id TINYINT IDENTITY(1,1),
	description NVARCHAR(40),
	CONSTRAINT pk_exam PRIMARY KEY (id)
);

CREATE TABLE app.course_exam(
	course_id INT,
	exam_id TINYINT,
	grade TINYINT,
	CONSTRAINT pk_course_exam PRIMARY KEY (course_id, exam_id),
	CONSTRAINT fk_course_exam FOREIGN KEY (exam_id) REFERENCES app.exam(id),
	CONSTRAINT fk_course_exam_course FOREIGN KEY (course_id) REFERENCES app.course(id),
	CONSTRAINT ck_grade CHECK (grade > 0 AND grade <= 10)
);

COMMIT TRAN
