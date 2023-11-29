USE studentcompass

GO

-- Departamento: Todos

-- Materias transversales HCS:

INSERT INTO app.subject
(code, description, weekly_hours,
 year_level, career_plan_id, is_optional,
 is_annual, is_elective)
VALUES
(0911, 'Computaci�n I', 4, 0, 0, 0, 0, 0),
(0912, 'Computaci�n II', 4, 0, 0, 0, 0, 0),
(0901, 'Ingl�s I', 4, 0, 0, 0, 0, 0),
(0902, 'Ingl�s II', 4, 0, 0, 0, 0, 0),
(0903, 'Ingl�s III', 4, 0, 0, 0, 0, 0),
(0904, 'Ingl�s IV', 4, 0, 0, 0, 0, 0);

-- Departamento: Ingenier�a

-- Carrera: Ingenier�a Inform�tica

-- Plan 2023:

INSERT INTO app.subject
(code, description, weekly_hours,
 year_level, career_plan_id, is_optional,
 is_annual, is_elective)
VALUES
(3621, 'Matem�tica Discreta', 4, 1, 1, 0, 0, 0),
(3622, 'An�lisis Matem�tico I', 4, 1, 1, 0, 0, 0),
(3623, 'Programaci�n Inicial', 4, 1, 1, 0, 0, 0),
(3624, 'Introducci�n a los Sistemas de Informaci�n', 4, 1, 1, 0, 0, 0),
(3625, 'Sistemas de Numeraci�n', 4, 1, 1, 0, 0, 0),
(3626, 'Principios de Calidad de Software', 4, 1, 1, 0, 0, 0),
(3627, '�lgebra y Geometr�a Anal�tica I', 4, 1, 1, 0, 0, 0),
(3628, 'F�sica I', 4, 1, 1, 0, 0, 0),
(3629, 'Programaci�n Estructurada B�sica', 4, 1, 1, 0, 0, 0),
(3630, 'Introducci�n a la Gesti�n de Requisitos', 4, 1 , 1, 0, 0, 0),
(3631, 'Fundamentos de Sistemas Embebidos', 4, 1, 1, 0, 0, 0),
(3632, 'Introducci�n a los Proyectos Inform�ticos', 4, 1, 1, 0, 0, 0),
(3633, 'An�lisis Matem�tico II', 4, 2, 1, 0, 0, 0),
(3634, 'F�sica II', 4, 2, 1, 0, 0, 0),
(3635, 'T�picos de Programaci�n', 4, 2, 1, 0, 0, 0),
(3636, 'Base de Datos', 4, 2, 1, 0, 0, 0),
(3637, 'An�lisis de Sistemas', 4, 2, 1, 0, 0, 0),
(3638, 'Arquitectura de Computadoras', 4, 2, 1, 0, 0, 0),
(3676, 'Responsabilidad Social Universitaria', 4, 2, 1, 0, 0, 0),
(3639, 'An�lisis Matem�tico III', 4, 2, 1, 0, 0, 0),
(3640, 'Algoritmos y Estructuras de Datos', 4, 2, 1, 0, 0, 0),
(3641, 'Base de Datos Aplicada', 4, 2, 1, 0, 0, 0),
(3642, 'Principios de Dise�o de Sistemas', 4, 2, 1, 0, 0, 0),
(3643, 'Redes de Computadoras', 4, 2, 1, 0, 0, 0),
(3644, 'Gesti�n de las Organizaciones', 4, 2, 1, 0, 0, 0),
(3680, 'Taller de Integraci�n', 4, 2, 1, 1, 0, 0),
(3645, 'Algebra y Geometr�a Anal�tica II', 4, 2, 1, 0, 0, 0),
(3646, 'Paradigmas de Programaci�n', 4, 3, 1, 0, 0, 0),
(3647, 'Requisitos Avanzados', 4, 3, 1, 0, 0, 0),
(3648, 'Dise�o de Software', 4, 3, 1, 0, 0, 0),
(3649, 'Sistemas Operativos', 4, 3, 1, 0, 0, 0),
(3650, 'Seguridad de la Informaci�n', 4, 3, 1, 0, 0, 0),
(3675, 'Pr�ctica Profesional Supervisada', 4, 3, 1, 0, 0, 0),
(3651, 'Probabilidad y Estad�stica', 4, 3, 1, 0, 0, 0),
(3652, 'Programaci�n Avanzada', 4, 3, 1, 0, 0, 0),
(3653, 'Arquitecturas de Sistemas Software', 4, 3, 1, 0, 0, 0),
(3654, 'Virtualizaci�n de Hardware', 4, 3, 1, 0, 0, 0),
(3655, 'Auditor�a y Legislaci�n', 4, 3, 1, 0, 0, 0),
(3656, 'Estad�stica Aplicada', 4, 4, 1, 0, 0, 0),
(3657, 'Aut�matas y Gram�tica', 4, 4, 1, 0, 0, 0),
(3658, 'Programaci�n Concurrente', 4, 4, 1, 0, 0, 0),
(3659, 'Gesti�n Aplicada al Desarrollo de Software I', 4, 4, 1, 0, 0, 0),
(3660, 'Sistemas Operativos Avanzados', 4, 4, 1, 0, 0, 0),
(3661, 'Gesti�n de Proyectos', 4, 4, 1, 0, 0, 0),
(3662, 'Matem�tica Aplicada', 4, 4, 1, 0, 0, 0),
(3663, 'Lenguajes y Compiladores', 4, 4, 1, 0, 0, 0),
(3664, 'Inteligencia Artificial', 4, 4, 1, 0, 0, 0),
(3665, 'Gesti�n Aplicada al Desarrollo de Software II', 4, 4, 1, 0, 0, 0),
(3666, 'Seguridad Aplicada y Forens�a', 4, 4, 1, 0, 0, 0),
(3667, 'Gesti�n de la Calidad en Procesos de Sistemas', 4, 4, 1, 0, 0, 0),
(3668, 'Inteligencia Artificial Aplicada', 4, 5, 1, 0, 0, 0),
(3669, 'Innovaci�n y Emprendedorismo', 4, 5, 1, 0, 0, 0),
(3670, 'Ciencia de Datos', 4, 5, 1, 0, 0, 0),
(3671, 'Proyecto Final de Carrera', 4, 5, 1, 0, 1, 0),
(3672, 'Electiva I', 4, 5, 1, 0, 0, 0),
(3673, 'Electiva II', 4, 5, 1, 0, 0, 0),
(3674, 'Electiva III', 4, 5, 1, 0, 0, 0),
(3677, 'Lenguaje Orientado a Negocios', 4, 0, 1, 0, 0, 1),
(3678, 'Tecnolog�as en Seguridad', 4, 0, 1, 0, 0, 1),
(3679, 'Visi�n Artificial', 4, 0, 1, 0, 0, 1);

-- Plan 2009:

INSERT INTO app.subject
(code, description, weekly_hours,
 year_level, career_plan_id, is_optional,
 is_annual, is_elective)
VALUES
(1023, 'An�lisis Matem�tico I', 8, 1, 2, 0, 0, 0),
(1024, 'Elementos de Programaci�n', 8, 1, 2, 0, 0, 0),
(1025, 'Sistemas de Representaci�n', 4, 1, 2, 0, 0, 0),
(1026, 'Tecnolog�a, Ingenier�a y Sociedad', 4, 1, 2, 0, 0, 0),
(1027, '�lgebra y Geometr�a Anal�tica I', 8, 1, 2, 0, 0, 0),
(1028, 'Matem�tica Discreta', 4, 1, 2, 0, 0, 0),
(1029, 'Qu�mica General', 4, 1, 2, 0, 0, 0),
(1030, 'Fundamentos de TICs', 8, 1, 2, 0, 0, 0),
(1031, 'F�sica I', 8, 2, 2, 0, 0, 0),
(1032, '�lgebra y Geometr�a anal�tica II', 4, 2, 2, 0, 0, 0),
(1033, 'An�lisis Matem�tico II', 8, 2, 2, 0, 0, 0),
(1035, 'F�sica II', 8, 2, 2, 0, 0, 0),
(1108, 'Requerimientos para la Ingenier�a', 4, 3, 2, 0, 0, 0),
(1109, 'Arquitectura de Computadoras', 6, 3, 2, 0, 0, 0),
(1110, 'Programaci�n', 10, 3, 2, 0, 0, 0),
(1111, 'Probabilidad y Estad�stica', 4, 3, 2, 0, 0, 0),
(1112, 'Auditor�a y Seguridad Inform�tica', 4, 3, 2, 0, 0, 0),
(1113, 'Programaci�n Avanzada', 10, 3, 2, 0, 0, 0),
(1114, 'Base de Datos', 6, 3, 2, 0, 0, 0),
(1115, 'Sistemas Operativos', 8, 4, 2, 0, 0, 0),
(1116, 'An�lisis de Sistemas', 10, 4, 2, 0, 0, 0),
(1117, 'C�lculo Num�rico', 4, 4, 2, 0, 0, 0),
(1118, 'Ingenier�a de Requerimientos', 4, 4, 2, 0, 0, 0),
(1119, 'Comunicaci�n de Datos', 4, 4, 2, 0, 0, 0),
(1120, 'Dise�o de Sistemas', 10, 4, 2, 0, 0, 0),
(1121, 'An�lisis de Software', 4, 4, 2, 0, 0, 0),
(1122, 'Redes de Computadoras', 8, 5, 2, 0, 0, 0),
(1123, 'Sistemas Operativos Avanzados', 4, 5, 2, 0, 0, 0),
(1124, 'Lenguajes y Compiladores', 4, 5, 2, 0, 0, 0),
(1125, 'Gesti�n Organizacional', 8, 5, 2, 0, 0, 0),
(1126, 'Ingenier�a de Software', 10, 5, 2, 0, 0, 0),
(1127, 'Elementos de Inteligencia Artificial', 4, 5, 2, 0, 0, 0),
(1128, 'Electiva I', 4, 5, 2, 0, 0, 0),
(1129, 'Aut�matas y Lenguajes Formales', 6, 5, 2, 0, 0, 0),
(1130, 'Electiva II', 4, 5, 2, 0, 0, 0),
(1131, 'Electiva III', 4, 5, 2, 0, 0, 0),
(1132, 'Proyecto de fin de carrera', 4, 5, 2, 0, 0, 0),
(1134, 'Sistemas de Transmisi�n y Conmutaci�n', 8, 0, 2, 0, 0, 1),
(1135, 'Laboratorio de Teleinform�tica', 8, 0, 2, 0, 0, 1),
(1136, 'Seguridad en Redes', 4, 0, 2, 0, 0, 1),
(1137, 'Lenguajes Descriptivos de Hardware', 4, 0, 2, 0, 0, 1),
(1138, 'Proceso de Software', 8, 0, 2, 0, 0, 1),
(1139, 'Data Mining y Data Warehouse', 4, 0, 2, 0, 0, 1),
(1140, 'Programaci�n de P�ginas Web', 4, 0, 2, 0, 0, 1),
(1133, 'Pr�ctica Profesional Supervisada', 12, 5, 2, 0, 0, 0); -- 12.5

