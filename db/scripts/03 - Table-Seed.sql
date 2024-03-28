USE studentcompass

INSERT INTO app.course_status VALUES
	('Aprobada'), -- 1
	('Desaprobada'), -- 2
	('Cursando'), -- 3
	('Cursada'),-- 4
	('Diponible'), -- 5
	('No disponible'); -- 6

INSERT INTO app.exam VALUES
	('Primer parcial'),
	('Segundo parcial'),
	('Parcial integrador'),
	('Trabajo pr�ctico'),
	('Recuperatorio primer parcial'),
	('Recuperatorio segundo parcial'),
	('Recuperatorio integrador'),
	('Final');

INSERT INTO app.term VALUES
	('Primer cuatrimestre'),
	('Segundo cuatrimestre'),
	('Curso de verano');


INSERT INTO app.department VALUES
	('Transversal'),
	('Ingenier�a'),
	('Humanidades y Ciencias Sociales'),
	('Econ�micas'),
	('Derecho'),
	('Salud');

INSERT INTO app.career VALUES
	('Transversal', 0),
	('Ingenier�a Inform�tica', 1),
	('Ingenier�a Electr�nica', 1),
	('Ingenier�a Industrial', 1),
	('Ingenier�a Civil', 1),
	('Ingenier�a Mec�nica', 1),
	('Ingenier�a en Energ�as', 1), -- materias sin c�digo...
	('Arquitectura', 1),
	('Tecnicatura en Desarrollo Web', 1),
	('Tecnicatura en Desarrollo de Aplicaciones M�viles', 1);


INSERT INTO app.career_plan (description, career_id) VALUES
	('Plan Transversal', 0),
	('Plan 2023', 1),
	('Plan 2009', 1),
	('Plan 2023', 2),
	('Plan 2009', 2),
	('Plan 2009', 3),
	('Plan 2017', 4),
	('Plan 2015', 5),
	('Plan 2015', 7);


