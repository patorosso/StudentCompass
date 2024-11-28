-- info de carrera informatica en la pagina web:

Plan de estudios 2023 - Ingeniería Informática
Primer Año
Primer Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
3621	Matemática Discreta	---	4
3622	Análisis Matemático I	---	4
3623	Programación Inicial	---	4
3624	Introducción a los Sistemas de Información	---	4
3625	Sistemas de Numeración	---	4
3626	Principios de Calidad de Software	---	4
Segundo Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
3627	Álgebra y Geometría Analítica I	---	4
3628	Física I	3622	4
3629	Programación Estructurada Básica	3623	4
3630	Introducción a la Gestión de Requisitos	3624	4
3631	Fundamentos de Sistemas Embebidos	3625	4
3632	Introducción a Proyectos Informáticos	---	4
Segundo Año
Primer Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
3633	Análisis Matemático II	3622	4
3634	Física II	3628	4
3635	Tópicos de Programación	3629 / 3621	4
3636	Bases de Datos	3629 / 3621	4
3637	Análisis de Sistemas	3630	4
3638	Arquitectura de Computadoras	3631	4
3676	Responsabilidad Social Universitaria	3626	4
Segundo Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
3639	Análisis Matemático III	3633	4
3640	Algoritmos y Estructuras de Datos	3635	4
3641	Bases de Datos Aplicada	3636	4
3642	Principios de Diseño de Sistemas	3637 / 3626	4
3643	Redes de Computadoras	3638 / 3634	4
3644	Gestión de las Organizaciones	3632	4
3680	Taller de Integración*	3638 / 3636 / 3635 / 3632 / 3630 / 3626 / 3625 / 3624 / 3623 / 3621	4
Tercer Año
Primer Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
3645	Álgebra y Geometría Analítica II	3627	4
3646	Paradigmas de Programación	3640 / 3633	4
3647	Requisitos Avanzados	3642	4
3648	Diseño de Software	3642 / 3636	4
3649	Sistemas Operativos	3638	4
3650	Seguridad de la Información	3643 / 3638 / 3635	4
3675	Práctica Profesional Supervisada	3642	4
Segundo Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
3651	Probabilidad y Estadística	3645 / 3639 / 3621	4
3652	Programación Avanzada	3641 / 3646	4
3653	Arquitecturas de Sistemas Software	3648	4
3654	Virtualización de Hardware	3649 / 3645 / 3640	4
3655	Auditoría y Legislación	3650	4
Cuarto Año
Primer Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
3656	Estadística Aplicada	3651 / 3641	4
3657	Autómatas y Gramática	3646	4
3658	Programación Concurrente	3654 / 3646	4
3659	Gestión Aplicada al Desarrollo de Software I	3653 / 3647 / 3644	4
3660	Sistemas Operativos Avanzados	3654	4
3661	Gestión de Proyectos	3651 / 3650 / 3644	4
Segundo Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
3662	Matemática Aplicada	3651	6
3663	Lenguajes y Compiladores	3657	4
3664	Inteligencia Artificial	3651 / 3646	4
3665	Gestión Aplicada al Desarrollo de Software II	3659 / 3652	4
3666	Seguridad Aplicada y Forensia	3655 / 3652 / 3649	4
3667	Gestión de la Calidad en Procesos de Sistemas	3647	4
Quinto Año
Primer Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
3668	Inteligencia Artificial Aplicada	3664 / 3656	4
3669	Innovación y Emprendedorismo	3661	4
3670	Ciencia de Datos	3664 / 3656	4
3671	Proyecto Final de Carrera**	3667 / 3661 / 3660 / 3659 / 3656	4
3672	Electiva I	3658 / 3661 / 3663	4
Segundo Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
3673	Electiva II	3662 / 3666	4
3674	Electiva III	3664 / 3665	4
Electivas I 2023
Código	Asignatura	Correlatividad	Horas semanales
3677	Lenguaje Orientado a Negocios		4
Electivas II 2023
Código	Asignatura	Correlatividad	Horas semanales
3678	Tecnologías en Seguridad		4
Electivas III 2023
Código	Asignatura	Correlatividad	Horas semanales
3679	Visión Artificial		4

-- Carrera: Ingeniería Informática

-- Plan 2023:

INSERT INTO app.subject
(code, description, weekly_hours,
 year_level, career_plan_id, is_optional,
 is_annual, is_elective)
VALUES
(3621, 'Matemática Discreta', 4, 1, 1, 0, 0, 0),
(3622, 'Análisis Matemático I', 4, 1, 1, 0, 0, 0),
(3623, 'Programación Inicial', 4, 1, 1, 0, 0, 0),
(3624, 'Introducción a los Sistemas de Información', 4, 1, 1, 0, 0, 0),
(3625, 'Sistemas de Numeración', 4, 1, 1, 0, 0, 0),
(3626, 'Principios de Calidad de Software', 4, 1, 1, 0, 0, 0),
(3627, 'Álgebra y Geometría Analítica I', 4, 1, 1, 0, 0, 0),
(3628, 'Física I', 4, 1, 1, 0, 0, 0),
(3629, 'Programación Estructurada Básica', 4, 1, 1, 0, 0, 0),
(3630, 'Introducción a la Gestión de Requisitos', 4, 1 , 1, 0, 0, 0),
(3631, 'Fundamentos de Sistemas Embebidos', 4, 1, 1, 0, 0, 0),
(3632, 'Introducción a los Proyectos Informáticos', 4, 1, 1, 0, 0, 0),
(3633, 'Análisis Matemático II', 4, 2, 1, 0, 0, 0),
(3634, 'Física II', 4, 2, 1, 0, 0, 0),
(3635, 'Tópicos de Programación', 4, 2, 1, 0, 0, 0),
(3636, 'Base de Datos', 4, 2, 1, 0, 0, 0),
(3637, 'Análisis de Sistemas', 4, 2, 1, 0, 0, 0),
(3638, 'Arquitectura de Computadoras', 4, 2, 1, 0, 0, 0),
(3676, 'Responsabilidad Social Universitaria', 4, 2, 1, 0, 0, 0),
(3639, 'Análisis Matemático III', 4, 2, 1, 0, 0, 0),
(3640, 'Algoritmos y Estructuras de Datos', 4, 2, 1, 0, 0, 0),
(3641, 'Base de Datos Aplicada', 4, 2, 1, 0, 0, 0),
(3642, 'Principios de Diseño de Sistemas', 4, 2, 1, 0, 0, 0),
(3643, 'Redes de Computadoras', 4, 2, 1, 0, 0, 0),
(3644, 'Gestión de las Organizaciones', 4, 2, 1, 0, 0, 0),
(3680, 'Taller de Integración', 4, 2, 1, 1, 0, 0),
(3645, 'Algebra y Geometría Analítica II', 4, 2, 1, 0, 0, 0),
(3646, 'Paradigmas de Programación', 4, 3, 1, 0, 0, 0),
(3647, 'Requisitos Avanzados', 4, 3, 1, 0, 0, 0),
(3648, 'Diseño de Software', 4, 3, 1, 0, 0, 0),
(3649, 'Sistemas Operativos', 4, 3, 1, 0, 0, 0),
(3650, 'Seguridad de la Información', 4, 3, 1, 0, 0, 0),
(3675, 'Práctica Profesional Supervisada', 4, 3, 1, 0, 0, 0),
(3651, 'Probabilidad y Estadística', 4, 3, 1, 0, 0, 0),
(3652, 'Programación Avanzada', 4, 3, 1, 0, 0, 0),
(3653, 'Arquitecturas de Sistemas Software', 4, 3, 1, 0, 0, 0),
(3654, 'Virtualización de Hardware', 4, 3, 1, 0, 0, 0),
(3655, 'Auditoría y Legislación', 4, 3, 1, 0, 0, 0),
(3656, 'Estadística Aplicada', 4, 4, 1, 0, 0, 0),
(3657, 'Autómatas y Gramática', 4, 4, 1, 0, 0, 0),
(3658, 'Programación Concurrente', 4, 4, 1, 0, 0, 0),
(3659, 'Gestión Aplicada al Desarrollo de Software I', 4, 4, 1, 0, 0, 0),
(3660, 'Sistemas Operativos Avanzados', 4, 4, 1, 0, 0, 0),
(3661, 'Gestión de Proyectos', 4, 4, 1, 0, 0, 0),
(3662, 'Matemática Aplicada', 4, 4, 1, 0, 0, 0),
(3663, 'Lenguajes y Compiladores', 4, 4, 1, 0, 0, 0),
(3664, 'Inteligencia Artificial', 4, 4, 1, 0, 0, 0),
(3665, 'Gestión Aplicada al Desarrollo de Software II', 4, 4, 1, 0, 0, 0),
(3666, 'Seguridad Aplicada y Forensía', 4, 4, 1, 0, 0, 0),
(3667, 'Gestión de la Calidad en Procesos de Sistemas', 4, 4, 1, 0, 0, 0),
(3668, 'Inteligencia Artificial Aplicada', 4, 5, 1, 0, 0, 0),
(3669, 'Innovación y Emprendedorismo', 4, 5, 1, 0, 0, 0),
(3670, 'Ciencia de Datos', 4, 5, 1, 0, 0, 0),
(3671, 'Proyecto Final de Carrera', 4, 5, 1, 0, 1, 0),
(3672, 'Electiva I', 4, 5, 1, 0, 0, 0),
(3673, 'Electiva II', 4, 5, 1, 0, 0, 0),
(3674, 'Electiva III', 4, 5, 1, 0, 0, 0),
(3677, 'Lenguaje Orientado a Negocios', 4, 0, 1, 0, 0, 1),
(3678, 'Tecnologías en Seguridad', 4, 0, 1, 0, 0, 1),
(3679, 'Visión Artificial', 4, 0, 1, 0, 0, 1);

-- Carrera: Ingeniería Informática

-- Plan 2023:

INSERT INTO app.correlative 
(subject_code, correlative_code, 
subject_career_plan_id, correlative_career_plan_id) VALUES
(3628, 3622, 1, 1),
(3629, 3623, 1, 1),
(3630, 3624, 1, 1),
(3631, 3625, 1, 1),
(3633, 3622, 1, 1),
(3634, 3628, 1, 1),
(3635, 3629, 1, 1), (3635, 3621, 1, 1),
(3636, 3629, 1, 1), (3636, 3621, 1, 1),
(3637, 3630, 1, 1),
(3638, 3631, 1, 1),
(3676, 3626, 1, 1),
(3639, 3633, 1, 1),
(3640, 3635, 1, 1),
(3641, 3636, 1, 1),
(3642, 3637, 1, 1), (3642, 3626, 1, 1),
(3643, 3638, 1, 1), (3643, 3634, 1, 1),
(3644, 3632, 1, 1),
(3680, 3638, 1, 1), (3680, 3636, 1, 1), (3680, 3635, 1, 1), (3680, 3632, 1, 1), (3680, 3630, 1, 1), (3680, 3626, 1, 1), (3680, 3625, 1, 1), (3680, 3624, 1, 1), (3680, 3623, 1, 1), (3680, 3621, 1, 1),
(3645, 3627, 1, 1),
(3646, 3640, 1, 1), (3646, 3633, 1, 1),
(3647, 3642, 1, 1),
(3648, 3642, 1, 1), (3648, 3636, 1, 1),
(3649, 3638, 1, 1),
(3650, 3643, 1, 1), (3650, 3638, 1, 1), (3650, 3635, 1, 1),
(3675, 3642, 1, 1),
(3651, 3645, 1, 1), (3651, 3639, 1, 1), (3651, 3621, 1, 1),
(3652, 3641, 1, 1), (3652, 3646, 1, 1),
(3653, 3648, 1, 1),
(3654, 3649, 1, 1), (3654, 3645, 1, 1), (3654, 3640, 1, 1),
(3655, 3650, 1, 1),
(3656, 3651, 1, 1), (3656, 3641, 1, 1),
(3657, 3646, 1, 1),
(3658, 3654, 1, 1), (3658, 3646, 1, 1),
(3659, 3653, 1, 1), (3659, 3647, 1, 1), (3659, 3644, 1, 1),
(3660, 3654, 1, 1),
(3661, 3651, 1, 1), (3661, 3650, 1, 1), (3661, 3644, 1, 1),
(3662, 3651, 1, 1), (3662, 3650, 1, 1), (3662, 3644, 1, 1),
(3663, 3657, 1, 1),
(3664, 3651, 1, 1), (3664, 3646, 1, 1),
(3665, 3659, 1, 1), (3665, 3652, 1, 1),
(3666, 3655, 1, 1), (3666, 3652, 1, 1), (3666, 3649, 1, 1),
(3667, 3647, 1, 1),
(3668, 3664, 1, 1), (3668, 3656, 1, 1),
(3669, 3661, 1, 1),
(3670, 3664, 1, 1), (3670, 3656, 1, 1),
(3671, 3667, 1, 1), (3671, 3661, 1, 1), (3671, 3660, 1, 1), (3671, 3659, 1, 1), (3671, 3656, 1, 1),
(3672, 3658, 1, 1), (3672, 3661, 1, 1), (3672, 3663, 1, 1),
(3673, 3662, 1, 1), (3673, 3666, 1, 1),
(3674, 3664, 1, 1), (3674, 3665, 1, 1);

-- info de la carrera ingenieria electronica en la pagina web

Plan de estudios 2023 - Ingeniería Electrónica
Primer Año
Primer Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
3681	Análisis Matemático I	---	4
3682	Álgebra y Geometría Analítica I	---	4
3683	Fundamentos de Química	---	4
3684	Física I	---	4
3685	Integración Tecnológica I	---	4
3686	Tecnología, Ingeniería y Sociedad	---	4
Segundo Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
3687	Análisis Matemático II	3681	4
3688	Álgebra y Geometría Analítica II	3682	4
3689	Elementos de Programación	---	4
3690	Física II	3684	4
3691	Sistemas de Representación	---	4
3692	Técnicas Digitales I	---	4
Segundo Año
Primer Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
3693	Análisis Matemático III	3687	4
3694	Física III	3690	4
3695	Técnicas Digitales II	3692 / 3689	4
3696	Electrónica I	3688 / 3687	4
3697	Teoría de los circuitos I	3688 / 3687	4
3698	Integración Tecnológica II	3685	4
Segundo Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
3699	Análisis Matemático IV	3693	4
3700	Probabilidad Estadística	3693 / 3688	4
3701	Análisis de Señales I	3693	4
3702	Electrónica II	3696	4
3703	Teoría de Circuitos II	3697	4
3704	Medidas Electrónicas	3697 / 3696	4
Tercer Año
Primer Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
3705	Técnicas Digitales III	3695	4
3706	Electromagnetismo	3699 / 3694	4
3707	Análisis de Señales II	3701	4
3708	Electrónica Aplicada I	3702	4
3709	Teoría de los circuitos III	3703	4
3710	Integración Tecnológica III	3698 / 3704	4
Segundo Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
3711	Cálculo Numérico	3699	4
3712	Técnicas Digitales IV	3705	4
3713	Medios de Enlace	3706	4
3714	Electrónica Aplicada II	3708	4
3715	Teoría de Circuitos IV	3709	4
3716	Tecnología	3706 / 3710	4
Cuarto Año
Primer Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
3717	Física IV	3699 / 3694	4
3718	Lenguajes Descriptivos de Hardware	3712	4
3719	Comunicaciones I	3713	4
3720	Control I	3707 / 3711	4
3721	Electrónica Aplicada III	3714	4
3722	Economía	3686	4
3723	Práctica Profesional Supervisada	---	
3724	Responsabilidad Social Universitaria	---	4
Segundo Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
3725	Sistemas Operativos en Tiempo Real	3718	4
3726	Comunicaciones II	3719	4
3727	Control II	3720	4
3728	Electrónica Industrial	3721 / 3720	4
3729	Gestión de Proyectos	3710 / 3722	4
3730	Ejercicios de la Profesión	3722	4
Quinto Año
Primer Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
3731	Procesamiento Digital de Señales	3725	4
3732	Comunicaciones III	3726	4
3733	Automatización Industrial	3727	4
3734	Electrónica de Potencia	3728	4
3735	Integración Tecnológica IV	3729	4
3736	Electiva I	---	4
Segundo Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
3737	Comunicaciones Avanzadas	3732	4
3738	Control Avanzado	3733	4
3739	Proyecto Integrador	3734 / 3733 / 3732 / 3731	4
3740	Electiva II	---	4
3741	Electiva III	---	4
3742	Seguridad e Higiene y Organización Industrial	3730	4

-- Carrera: Ingeniería Electrónica

-- Plan 2023:
-- with career plan id = 3
INSERT INTO app.subject
(code, description, weekly_hours,
 year_level, career_plan_id, is_optional,
 is_annual, is_elective)
 VALUES
(3681, 'Análisis Matemático I', 4, 1, 3, 0, 0, 0),
(3682, 'Álgebra y Geometría Analítica I', 4, 1, 3, 0, 0, 0),
(3683, 'Fundamentos de Química', 4, 1, 3, 0, 0, 0),
(3684, 'Física I', 4, 1, 3, 0, 0, 0),
(3685, 'Integración Tecnológica I', 4, 1, 3, 0, 0, 0),
(3686, 'Tecnología, Ingeniería y Sociedad', 4, 1, 3, 0, 0, 0),
(3687, 'Análisis Matemático II', 4, 1, 3, 0, 0, 0),
(3688, 'Álgebra y Geometría Analítica II', 4, 1, 3, 0, 0, 0),
(3689, 'Elementos de Programación', 4, 1, 3, 0, 0, 0),
(3690, 'Física II', 4, 1, 3, 0, 0, 0),
(3691, 'Sistemas de Representación', 4, 1, 3, 0, 0, 0),
(3692, 'Técnicas Digitales I', 4, 1, 3, 0, 0, 0),
(3693, 'Análisis Matemático III', 4, 2, 3, 0, 0, 0),
(3694, 'Física III', 4, 2, 3, 0, 0, 0),
(3695, 'Técnicas Digitales II', 4, 2, 3, 0, 0, 0),
(3696, 'Electrónica I', 4, 2, 3, 0, 0, 0),
(3697, 'Teoría de los circuitos I', 4, 2, 3, 0, 0, 0),
(3698, 'Integración Tecnológica II', 4, 2, 3, 0, 0, 0),
(3699, 'Análisis Matemático IV', 4, 2, 3, 0, 0, 0),
(3700, 'Probabilidad Estadística', 4, 2, 3, 0, 0, 0),
(3701, 'Análisis de Señales I', 4, 2, 3, 0, 0, 0),
(3702, 'Electrónica II', 4, 2, 3, 0, 0, 0),
(3703, 'Teoría de Circuitos II', 4, 2, 3, 0, 0, 0),
(3704, 'Medidas Electrónicas', 4, 2, 3, 0, 0, 0),
(3705, 'Técnicas Digitales III', 4, 3, 3, 0, 0, 0),
(3706, 'Electromagnetismo', 4, 3, 3, 0, 0, 0),
(3707, 'Análisis de Señales II', 4, 3, 3, 0, 0, 0),
(3708, 'Electrónica Aplicada I', 4, 3, 3, 0, 0, 0),
(3709, 'Teoría de los circuitos III', 4, 3, 3, 0, 0, 0),
(3710, 'Integración Tecnológica III', 4, 3, 3, 0, 0, 0),
(3711, 'Cálculo Numérico', 4, 3, 3, 0, 0, 0),
(3712, 'Técnicas Digitales IV', 4, 3, 3, 0, 0, 0),
(3713, 'Medios de Enlace', 4, 3, 3, 0, 0, 0),
(3714, 'Electrónica Aplicada II', 4, 3, 3, 0, 0, 0),
(3715, 'Teoría de Circuitos IV', 4, 3, 3, 0, 0, 0),
(3716, 'Tecnología', 4, 3, 3, 0, 0, 0),
(3717, 'Física IV', 4, 4, 3, 0, 0, 0),
(3718, 'Lenguajes Descriptivos de Hardware', 4, 4, 3, 0, 0, 0),
(3719, 'Comunicaciones I', 4, 4, 3, 0, 0, 0),
(3720, 'Control I', 4, 4, 3, 0, 0, 0),
(3721, 'Electrónica Aplicada III', 4, 4, 3, 0, 0, 0),
(3722, 'Economía', 4, 4, 3, 0, 0, 0),
(3723, 'Práctica Profesional Supervisada', 4, 4, 3, 0, 0, 0),
(3724, 'Responsabilidad Social Universitaria', 4, 4, 3, 0, 0, 0),
(3725, 'Sistemas Operativos en Tiempo Real', 4, 4, 3, 0, 0, 0),
(3726, 'Comunicaciones II', 4, 4, 3, 0, 0, 0),
(3727, 'Control II', 4, 4, 3, 0, 0, 0),
(3728, 'Electrónica Industrial', 4, 4, 3, 0, 0, 0),
(3729, 'Gestión de Proyectos', 4, 4, 3, 0, 0, 0),
(3730, 'Ejercicios de la Profesión', 4, 4, 3, 0, 0, 0),
(3731, 'Procesamiento Digital de Señales', 4, 5, 3, 0, 0, 0),
(3732, 'Comunicaciones III', 4, 5, 3, 0, 0, 0),
(3733, 'Automatización Industrial', 4, 5, 3, 0, 0, 0),
(3734, 'Electrónica de Potencia', 4, 5, 3, 0, 0, 0),
(3735, 'Integración Tecnológica IV', 4, 5, 3, 0, 0, 0),
(3736, 'Electiva I', 4, 5, 3, 0, 0, 1),
(3737, 'Comunicaciones Avanzadas', 4, 5, 3, 0, 0, 0),
(3738, 'Control Avanzado', 4, 5, 3, 0, 0, 0),
(3739, 'Proyecto Integrador', 4, 5, 3, 0, 1, 0),
(3740, 'Electiva II', 4, 5, 3, 0, 0, 1),
(3741, 'Electiva III', 4, 5, 3, 0, 0, 1),
(3742, 'Seguridad e Higiene y Organización Industrial', 4, 5, 3, 0, 0, 0);


-- Carrera: Ingeniería Electrónica

-- Plan 2023:

INSERT INTO app.correlative
(subject_code, correlative_code,
subject_career_plan_id, correlative_career_plan_id) VALUES
(3682, 3681, 2, 2),
(3687, 3681, 2, 2),
(3688, 3682, 2, 2),
(3689, 3688, 2, 2),
(3690, 3684, 2, 2),
(3691, 3687, 2, 2),
(3692, 3689, 2, 2), (3692, 3689, 2, 2),
(3693, 3687, 2, 2),
(3694, 3690, 2, 2),
(3695, 3692, 2, 2), (3695, 3689, 2, 2),
(3696, 3688, 2, 2), (3696, 3687, 2, 2),
(3697, 3688, 2, 2), (3697, 3687, 2, 2),
(3698, 3685, 2, 2),
(3699, 3693, 2, 2),
(3700, 3693, 2, 2), (3700, 3688, 2, 2),
(3701, 3693, 2, 2),
(3702, 3696, 2, 2),
(3703, 3697, 2, 2),
(3704, 3697, 2, 2), (3704, 3696, 2, 2),
(3705, 3695, 2, 2),
(3706, 3699, 2, 2), (3706, 3694, 2, 2),
(3707, 3701, 2, 2),
(3708, 3702, 2, 2),
(3709, 3703, 2, 2),
(3710, 3698, 2, 2), (3710, 3704, 2, 2),
(3711, 3699, 2, 2),
(3712, 3705, 2, 2),
(3713, 3706, 2, 2),
(3714, 3708, 2, 2),
(3715, 3709, 2, 2),
(3716, 3706, 2, 2), (3716, 3710, 2, 2),
(3717, 3699, 2, 2), (3717, 3694, 2, 2),
(3718, 3712, 2, 2),
(3719, 3713, 2, 2),
(3720, 3707, 2, 2), (3720, 3711, 2, 2),
(3721, 3714, 2, 2),
(3722, 3686, 2, 2),
(3723, 3686, 2, 2),
(3724, 3686, 2, 2),
(3725, 3718, 2, 2),
(3726, 3719, 2, 2),
(3727, 3720, 2, 2),
(3728, 3721, 2, 2),
(3729, 3722, 2, 2), (3729, 3723, 2, 2),
(3730, 3722, 2, 2),
(3731, 3725, 2, 2),
(3732, 3726, 2, 2),
(3733, 3727, 2, 2),
(3734, 3728, 2, 2),
(3735, 3729, 2, 2),
(3736, 3729, 2, 2),
(3737, 3732, 2, 2),
(3738, 3733, 2, 2),
(3739, 3734, 2, 2), (3739, 3733, 2, 2), (3739, 3732, 2, 2), (3739, 3731, 2, 2),
(3740, 3735, 2, 2),
(3741, 3735, 2, 2),
(3742, 3730, 2, 2);

-- info de la carrera ingenieria en electrónica de informacion en la pagina web

Plan de estudio 2009 - Ingeniería Electrónica
Primer Año
Primer Cuatrimestre
Código	Asignatura	Correlatividad	Horas Semanales
1023	Análisis Matemático I	---	8
1024	Elementos de Programación	---	8
1025	Sistemas de Representación y Dibujo técnico	---	4
1026	Tecnología, Ingeniería y Sociedad	---	4
Segundo Cuatrimestre
Código	Asignatura	Correlatividad	Horas Semanales
1027	Álgebra y Geometría analítica I	---	8
1028	Matemática Discreta	---	4
1029	Química General	---	4
1030	Fundamentos de TICs	---	8
Segundo Año
Primer Cuatrimestre
Código	Asignatura	Correlatividad	Horas Semanales
1031	Física I	1023	8
1032	Álgebra y Geometría Analítica II	1027	4
1033	Análisis Matemático II	1023	8
1034	Introducción a los Sistemas Digitales	1028	4
Segundo Cuatrimestre
Código	Asignatura	Correlatividad	Horas Semanales
1035	Física II	1031	8
1036	Técnicas Digitales I	1034	4
1037	Física III	1023/1027/1031	6
1038	Análisis de Señales	1033	8
Tercer Año
Primer Cuatrimestre
Código	Asignatura	Correlatividad	Horas Semanales
1039	Electrónica I	1035/1037	6
1040	Teoría de los Circuitos I	1035/1038	6
1041	Medios de Enlace y Electromagnetismo	1033/1035	8
1042	Economía	1026	4
Segundo Cuatrimestre
Código	Asignatura	Correlatividad	Horas Semanales
1043	Electrónica II	1039/1040	8
1044	Técnicas Digitales II	1039/1040	8
1045	Medidas Eléctricas y Electrónicas	1036/1039/1040	8
Cuarto Año
Primer Cuatrimestre
Código	Asignatura	Correlatividad	Horas Semanales
1047	Sistemas de Control I	1039/1040	8
1048	Teoría de Circuitos II	1040	8
1049	Técnicas Digitales III	1024/1043/1044	Anual: 4 hs. (1º cuatrimestre) - 2 hs. (2º cuatrimestre).
1050	Probabilidad y Estadística	1033	4
Segundo Cuatrimestre
Código	Asignatura	Correlatividad	Horas Semanales
1049	Técnicas Digitales III	1024/1043/1044	Anual: 4 hs. (1º cuatrimestre) - 2 hs. (2º cuatrimestre).
1051	Introducción a los Sistemas de Comunicaciones	1038/1041/1048	8
1053	Organización Industrial, Seguridad e Higiene	1042/1050	4
1054	Cálculo Numérico	1024/1032/1033	4
1058	Tecnología Electrónica	1043/1045	6
Quinto Año
Primer Cuatrimestre
Código	Asignatura	Correlatividad	Horas Semanales
1055	Electrónica III	1043/1051	4
1057	Componentes e Instrumentos de Control	1045/1047	4
1059	Redes de Computadoras	1049/1051	8 (Anual)
1061	Proyecto	1047/1049/1050/1051	4 (Anual)
1062	Práctica profesional supervisada		200 (Anual)
Segundo Cuatrimestre
Código	Asignatura	Correlatividad	Horas Semanales
1052	Electrónica de Potencia	1040/1043/1045	6
1056	Informática Avanzada	1024/1048	4
1059	Redes de Computadoras	1049/1051	8 (Anual)
1060	Ejercicio Profesional	1053	4
1061	Proyecto	1047/1049/1050/1051	4 (Anual)
1062	Práctica profesional supervisada		200 (Anual)
1046	Taller de Electrónica	----	4

-- Carrera: Ingeniería Electrónica

-- Plan 2009:
-- with career plan id = 4
INSERT INTO app.subject
(code, description, weekly_hours,
 year_level, career_plan_id, is_optional,
 is_annual, is_elective)
 VALUES
(1023, 'Análisis Matemático I', 8, 1, 4, 0, 0, 0),
(1024, 'Elementos de Programación', 8, 1, 4, 0, 0, 0),
(1025, 'Sistemas de Representación y Dibujo técnico', 4, 1, 4, 0, 0, 0),
(1026, 'Tecnología, Ingeniería y Sociedad', 4, 1, 4, 0, 0, 0),
(1027, 'Álgebra y Geometría analítica I', 8, 1, 4, 0, 0, 0),
(1028, 'Matemática Discreta', 4, 1, 4, 0, 0, 0),
(1029, 'Química General', 4, 1, 4, 0, 0, 0),
(1030, 'Fundamentos de TICs', 8, 1, 4, 0, 0, 0),
(1031, 'Física I', 8, 2, 4, 0, 0, 0),
(1032, 'Álgebra y Geometría Analítica II', 4, 2, 4, 0, 0, 0),
(1033, 'Análisis Matemático II', 8, 2, 4, 0, 0, 0),
(1034, 'Introducción a los Sistemas Digitales', 4, 2, 4, 0, 0, 0),
(1035, 'Física II', 8, 2, 4, 0, 0, 0),
(1036, 'Técnicas Digitales I', 4, 2, 4, 0, 0, 0),
(1037, 'Física III', 6, 2, 4, 0, 0, 0),
(1038, 'Análisis de Señales', 8, 2, 4, 0, 0, 0),
(1039, 'Electrónica I', 6, 3, 4, 0, 0, 0),
(1040, 'Teoría de los Circuitos I', 6, 3, 4, 0, 0, 0),
(1041, 'Medios de Enlace y Electromagnetismo', 8, 3, 4, 0, 0, 0),
(1042, 'Economía', 4, 3, 4, 0, 0, 0),
(1043, 'Electrónica II', 8, 3, 4, 0, 0, 0),
(1044, 'Técnicas Digitales II', 8, 3, 4, 0, 0, 0),
(1045, 'Medidas Eléctricas y Electrónicas', 8, 3, 4, 0, 0, 0),
(1047, 'Sistemas de Control I', 8, 4, 4, 0, 0, 0),
(1048, 'Teoría de Circuitos II', 8, 4, 4, 0, 0, 0),
(1049, 'Técnicas Digitales III', 6, 4, 4, 0, 1, 0),
(1050, 'Probabilidad y Estadística', 4, 4, 4, 0, 0, 0),
(1051, 'Introducción a los Sistemas de Comunicaciones', 8, 4, 4, 0, 0, 0),
(1052, 'Electrónica de Potencia', 6, 5, 4, 0, 0, 0),
(1053, 'Organización Industrial, Seguridad e Higiene', 4, 4, 4, 0, 0, 0),
(1054, 'Cálculo Numérico', 4, 4, 4, 0, 0, 0),
(1055, 'Electrónica III', 4, 5, 4, 0, 0, 0),
(1056, 'Informática Avanzada', 4, 5, 4, 0, 0, 0),
(1057, 'Componentes e Instrumentos de Control', 4, 5, 4, 0, 0, 0),
(1058, 'Tecnología Electrónica', 6, 5, 4, 0, 0, 0),
(1059, 'Redes de Computadoras', 8, 5, 4, 0, 1, 0),
(1060, 'Ejercicio Profesional', 4, 5, 4, 0, 0, 0),
(1061, 'Proyecto', 4, 5, 4, 0, 1, 0),
(1062, 'Práctica profesional supervisada', 200, 5, 4, 0, 0, 0),
(1046, 'Taller de Electrónica', 4, 5, 4, 0, 0, 0),
(1063, 'Comunicaciones sobre IP', 4, 5, 4, 1, 0, 0),
(1064, 'Redes y Servicios Avanzados de Comunicaciones', 4, 5, 4, 1, 0, 0),
(1065, 'Sistemas de Transmisión', 4, 5, 4, 1, 0, 0),
(1066, 'Sistemas de Control II', 4, 5, 4, 1, 0, 0),
(1067, 'Control Digital', 4, 5, 4, 1, 0, 0),
(1068, 'Robótica', 4, 5, 4, 1, 0, 0),
(1069, 'Procesamiento Digital de Señales', 4, 5, 4, 1, 0, 0),
(1070, 'Programación de Hardware', 4, 5, 4, 1, 0, 0),
(1071, 'Diseño de Interfaces', 4, 5, 4, 1, 0, 0),
(1072, 'Desarrollo de Mercados Tecnológicos', 4, 5, 4, 1, 0, 0);

-- Carrera: Ingeniería Electrónica

-- Plan 2009:

INSERT INTO app.correlative
(subject_code, correlative_code,
subject_career_plan_id, correlative_career_plan_id) VALUES
(1027, 1023, 4, 4),
(1028, 1027, 4, 4),
(1029, 1028, 4, 4),
(1030, 1024, 4, 4),
(1031, 1023, 4, 4),
(1032, 1027, 4, 4),
(1033, 1023, 4, 4),
(1034, 1028, 4, 4),
(1035, 1031, 4, 4),
(1036, 1034, 4, 4),
(1037, 1035, 4, 4),
(1038, 1033, 4, 4),
(1039, 1035, 4, 4),
(1040, 1035, 4, 4),
(1041, 1033, 4, 4),
(1042, 1026, 4, 4),
(1043, 1039, 4, 4),
(1044, 1039, 4, 4),
(1045, 1036, 4, 4),
(1047, 1039, 4, 4),
(1048, 1040, 4, 4),
(1049, 1024, 4, 4), (1049, 1043, 4, 4), (1049, 1044, 4, 4),
(1050, 1033, 4, 4),
(1051, 1038, 4, 4), (1051, 1041, 4, 4), (1051, 1048, 4, 4),
(1052, 1040, 4, 4), (1052, 1043, 4, 4), (1052, 1045, 4, 4),
(1053, 1042, 4, 4), (1053, 1050, 4, 4),
(1054, 1024, 4, 4), (1054, 1032, 4, 4), (1054, 1033, 4, 4),
(1055, 1043, 4, 4), (1055, 1051, 4, 4),
(1056, 1024, 4, 4), (1056, 1048, 4, 4),
(1057, 1045, 4, 4), (1057, 1047, 4, 4),
(1058, 1043, 4, 4), (1058, 1045, 4, 4),
(1059, 1049, 4, 4), (1059, 1051, 4, 4),
(1060, 1053, 4, 4),
(1061, 1047, 4, 4), (1061, 1049, 4, 4), (1061, 1050, 4, 4), (1061, 1051, 4, 4),
(1062, 1053, 4, 4),
(1063, 1051, 4, 4),
(1064, 1051, 4, 4),
(1065, 1051, 4, 4),
(1066, 1047, 4, 4),
(1067, 1066, 4, 4),
(1068, 1049, 4, 4), (1068, 1057, 4, 4),
(1069, 1038, 4, 4),
(1070, 1044, 4, 4),
(1071, 1056, 4, 4),
(1072, 1053, 4, 4);

-- info de la carrera ingenieria en industrial en la pagina web

Plan de estudio 2009 - Ingeniería Industrial

Primer año
Primer Cuatrimestre
Código	Asignatura	Horas Semanales	Total de Horas	Correlatividad
1023	Análisis Matemático I	8	128	
1024	Elementos de Programación	8	128	
1025	Sistemas de Representación	4	64	
1026	Tecnología, Ingeniería y Sociedad	4	64	
Segundo Cuatrimestre
Código	Asignatura	Horas Semanales	Total de Horas	Correlatividad
1027	Álgebra y Geometría Analítica I	8	128	
1028	Matemática Discreta	4	64	
1029	Química General	4	64	
1030	Fundamentos de TICs	8	128	
Segundo año
Primer Cuatrimestre
Código	Asignatura	Horas Semanales	Total de Horas	Correlatividad
1031	Física I	8	128	1023 / 1027
1032	Álgebra y Geometría Analítica II	4	64	1027
1033	Análisis Matemático II	8	128	1023
1073	Empresa y sus Estructuras	4	64	1026
Segundo Cuatrimestre
Código	Asignatura	Horas Semanales	Total de Horas	Correlatividad
1035	Física II	8	128	1031
1074	Elementos de Economía	4	64	1023
1075	Probabilidad y Estadística	4	64	1033
1076	Química Industrial	8	128	1029
Tercer año
Primer Cuatrimestre
Código	Asignatura	Horas Semanales	Total de Horas	Correlatividad
1077	Costos Industriales	4	64	1073 / 1074
1078	Física Superior	4	64	1035
1079	Termodinámica y Máquinas Térmicas	8	128	1035 / 1076
1080	Organización Industrial	8	128	1073 / 1075
Segundo Cuatrimestre
Código	Asignatura	Horas Semanales	Total de Horas	Correlatividad
1081	Mecánica de Materiales	8	128	1035
1082	Cálculo Numérico	4	64	1028 / 1032 / 1033
1083	Mecánica y Mecanismos	8	128	1025 / 1035
1084	Estadística Aplicada	4	64	1075
Cuarto año
Primer Cuatrimestre
Código	Asignatura	Horas Semanales	Total de Horas	Correlatividad
1085	Investigación Operativa	8	128	1075
1086	Industrias I	4	64	1076 / 1079
1087	Finanzas de la Empresa	4	64	1077
1088	Materiales Industriales	4	64	1076 / 1081
1089	Mecánica de Fluidos e Instalaciones Hidráulicas	4	64	1025 / 1035 / 1081
Segundo Cuatrimestre
Código	Asignatura	Horas Semanales	Total de Horas	Correlatividad
1090	Máquinas e Instalaciones Eléctricas	8	128	1025 / 1035
1091	Higiene y Seguridad	4	64	1076
1092	Organización de Empresas	4	64	1080
1093	Emprendedorismo e Innovación	4	64	1087
1094	Industrias II	4	64	1078 / 1086 / 1088
Quinto año
Primer Cuatrimestre
Código	Asignatura	Horas Semanales	Total de Horas	Correlatividad
1095	Transporte y Logística	4	64	1080 / 1085
1096	Ecología y Desarrollo Sustentable	4	64	1079 / 1091
1097	Gestión Comercial	4	64	1092
1098	Proyectos de Ingeniería	4	64	1085 / 1093
1099	Práctica Profesional Supervisada (x)	2	32	1079 / 1085 / 1086 / 1087 / 1088 / 1089 / 1090 / 1092
1100	Sistemas de Información	4	64	1024 / 1030 / 1080
Segundo Cuatrimestre
Código	Asignatura	Horas Semanales	Total de Horas	Correlatividad
1101	Legislación General	4	64	1092
1102	Gestión de la Calidad	4	64	1084 / 1092
1103	Automatización Industrial	4	64	1083
1104	Industrias III	4	64	1085 / 1092
1099	Práctica profesional supervisada (x)	2	32	1079 / 1085 / 1086 / 1087 / 1088 / 1089 / 1090 / 1092
1105	Gestión Industrial	4	64	1087 / 1092
1106	Construcciones Industriales	4	64	1025 / 1079 / 1089 / 1090

-- Carrera: Ingeniería Industrial

-- Plan 2009:
-- with career plan id = 5
INSERT INTO app.subject
(code, description, weekly_hours,
 year_level, career_plan_id, is_optional,
 is_annual, is_elective)
 VALUES
(1023, 'Análisis Matemático I', 8, 1, 5, 0, 0, 0),
(1024, 'Elementos de Programación', 8, 1, 5, 0, 0, 0),
(1025, 'Sistemas de Representación', 4, 1, 5, 0, 0, 0),
(1026, 'Tecnología, Ingeniería y Sociedad', 4, 1, 5, 0, 0, 0),
(1027, 'Álgebra y Geometría Analítica I', 8, 1, 5, 0, 0, 0),
(1028, 'Matemática Discreta', 4, 1, 5, 0, 0, 0),
(1029, 'Química General', 4, 1, 5, 0, 0, 0),
(1030, 'Fundamentos de TICs', 8, 1, 5, 0, 0, 0),
(1031, 'Física I', 8, 2, 5, 0, 0, 0),
(1032, 'Álgebra y Geometría Analítica II', 4, 2, 5, 0, 0, 0),
(1033, 'Análisis Matemático II', 8, 2, 5, 0, 0, 0),
(1035, 'Física II', 8, 2, 5, 0, 0, 0),
(1037, 'Física III', 8, 2, 5, 0, 0, 0),
(1038, 'Análisis de Señales', 8, 2, 5, 0, 0, 0),
(1073, 'Empresa y sus Estructuras', 4, 2, 5, 0, 0, 0),
(1074, 'Elementos de Economía', 4, 2, 5, 0, 0, 0),
(1075, 'Probabilidad y Estadística', 4, 2, 5, 0, 0, 0),
(1076, 'Química Industrial', 8, 2, 5, 0, 0, 0),
(1077, 'Costos Industriales', 4, 3, 5, 0, 0, 0),
(1078, 'Física Superior', 4, 3, 5, 0, 0, 0),
(1079, 'Termodinámica y Máquinas Térmicas', 8, 3, 5, 0, 0, 0),
(1080, 'Organización Industrial', 8, 3, 5, 0, 0, 0),
(1081, 'Mecánica de Materiales', 8, 3, 5, 0, 0, 0),
(1082, 'Cálculo Numérico', 4, 3, 5, 0, 0, 0),
(1083, 'Mecánica y Mecanismos', 8, 3, 5, 0, 0, 0),
(1084, 'Estadística Aplicada', 4, 3, 5, 0, 0, 0),
(1085, 'Investigación Operativa', 8, 4, 5, 0, 0, 0),
(1086, 'Industrias I', 4, 4, 5, 0, 0, 0),
(1087, 'Finanzas de la Empresa', 4, 4, 5, 0, 0, 0),
(1088, 'Materiales Industriales', 4, 4, 5, 0, 0, 0),
(1089, 'Mecánica de Fluidos e Instalaciones Hidráulicas', 4, 4, 5, 0, 0, 0),
(1090, 'Máquinas e Instalaciones Eléctricas', 8, 4, 5, 0, 0, 0),
(1091, 'Higiene y Seguridad', 4, 4, 5, 0, 0, 0),
(1092, 'Organización de Empresas', 4, 4, 5, 0, 0, 0),
(1093, 'Emprendedorismo e Innovación', 4, 4, 5, 0, 0, 0),
(1094, 'Industrias II', 4, 4, 5, 0, 0, 0),
(1095, 'Transporte y Logística', 4, 5, 5, 0, 0, 0),
(1096, 'Ecología y Desarrollo Sustentable', 4, 5, 5, 0, 0, 0),
(1097, 'Gestión Comercial', 4, 5, 5, 0, 0, 0),
(1098, 'Proyectos de Ingeniería', 4, 5, 5, 0, 0, 0),
(1099, 'Práctica Profesional Supervisada', 2, 5, 5, 0, 1, 0),
(1100, 'Sistemas de Información', 4, 5, 5, 0, 0, 0),
(1101, 'Legislación General', 4, 5, 5, 0, 0, 0),
(1102, 'Gestión de la Calidad', 4, 5, 5, 0, 0, 0),
(1103, 'Automatización Industrial', 4, 5, 5, 0, 0, 0),
(1104, 'Industrias III', 4, 5, 5, 0, 0, 0),
(1105, 'Gestión Industrial', 4, 5, 5, 0, 0, 0),
(1106, 'Construcciones Industriales', 4, 5, 5, 0, 0, 0);

-- Carrera: Ingeniería Industrial

-- Plan 2009:

INSERT INTO app.correlative
(subject_code, correlative_code,
subject_career_plan_id, correlative_career_plan_id) VALUES
(1031, 1023, 5, 5), (1031, 1027, 5, 5),
(1032, 1027, 5, 5),
(1033, 1023, 5, 5),
(1035, 1031, 5, 5),
(1037, 1035, 5, 5),
(1038, 1033, 5, 5),
(1073, 1026, 5, 5),
(1074, 1023, 5, 5),
(1075, 1033, 5, 5),
(1076, 1029, 5, 5),
(1077, 1073, 5, 5), (1077, 1074, 5, 5),
(1078, 1035, 5, 5),
(1079, 1035, 5, 5), (1079, 1076, 5, 5),
(1080, 1073, 5, 5), (1080, 1075, 5, 5),
(1081, 1035, 5, 5),
(1082, 1028, 5, 5), (1082, 1032, 5, 5), (1082, 1033, 5, 5),
(1083, 1025, 5, 5), (1083, 1035, 5, 5),
(1084, 1075, 5, 5),
(1085, 1075, 5, 5),
(1086, 1076, 5, 5), (1086, 1079, 5, 5),
(1087, 1073, 5, 5),
(1088, 1076, 5, 5),
(1089, 1025, 5, 5), (1089, 1035, 5, 5),
(1090, 1025, 5, 5), (1090, 1035, 5, 5),
(1091, 1076, 5, 5),
(1092, 1080, 5, 5),
(1093, 1087, 5, 5),
(1094, 1078, 5, 5), (1094, 1086, 5, 5), (1094, 1088, 5, 5),
(1095, 1080, 5, 5), (1095, 1085, 5, 5),
(1096, 1079, 5, 5), (1096, 1091, 5, 5),
(1097, 1092, 5, 5),
(1098, 1085, 5, 5), (1098, 1093, 5, 5),
(1099, 1079, 5, 5), (1099, 1085, 5, 5), (1099, 1086, 5, 5), (1099, 1087, 5, 5), (1099, 1088, 5, 5), (1099, 1089, 5, 5), (1099, 1090, 5, 5), (1099, 1092, 5, 5),
(1100, 1024, 5, 5), (1100, 1030, 5, 5), (1100, 1080, 5, 5),
(1101, 1092, 5, 5),
(1102, 1084, 5, 5), (1102, 1092, 5, 5),
(1103, 1083, 5, 5),
(1104, 1085, 5, 5), (1104, 1092, 5, 5),
(1105, 1087, 5, 5), (1105, 1092, 5, 5),
(1106, 1025, 5, 5), (1106, 1079, 5, 5), (1106, 1089, 5, 5), (1106, 1090, 5, 5);

-- info de la carrera ingenieria civil en la pagina web

Plan de estudio - Ingeniería Civil
Primer Año
Código	Asignatura	Correlatividad	Horas semanales
1023	Análisis Matemático I	---	8
1024	Elementos de Programación	---	8
1025	Sistemas de Representación	---	4
1026	Tecnología, Ingeniería y Sociedad	---	4
1027	Álgebra y Geometría Analítica I	---	8
1028	Matemática Discreta	---	4
1029	Química General	---	4
1030	Fundamentos de TICs	---	8
Segundo Año
Código	Asignatura	Correlatividad	Horas semanales
1031	Física I	1023	8
1032	Álgebra y Geometría Analítica II	1027	4
1033	Análisis Matemático II	1023	8
1035	Física II	1031	8
1255	Probabilidad y Estadística	1023 - 1027	4
1256	Economía	1023 - 1026	4
1257	Estabilidad	1027 - 1031	8
1259	Materiales de Construcción	1025 - 1029 - 1031	8
1260	Cálculo Numérico	1024 - 1032 - 1033	4
Tercer Año
Código	Asignatura	Correlatividad	Horas semanales
1261	Resistencia de Materiales	1032 - 1033 - 1257	8
1262	Geotopografía	1025 - 1033 - 1035	6
1263	Tecnología de la Construcción	1030 - 1257 - 1259	8
1264	Instalaciones Eléctricas y Acústicas 	1035 - 1259	6
1265	Tecnología del Hormigón 	1255 - 1259 - 1261	4
1266	Instalaciones Termomecánicas	1035 - 1259	6
1267	Hidráulica General y Aplicada	1033 - 1257	10
1268	Análisis Estructural I	1260 - 1261 - 1263	8
Cuarto Año
Código	Asignatura	Correlatividad	Horas
1269	Geotecnia	1261 - 1263 - 1267	8
1270	Estructuras de Hormigón	1263 - 1265 - 1268	8
1271	Instalaciones Sanitarias y de Gas	1259 - 1267	8
1244	Gestión Ambiental 	1029 - 1256 - 1267	4
1273	Diseño Arquitectónico, Planeamiento y Urbanismo I	1263 - 1264 - 1266 - 1271	6
1274	Hidrología y Obras Hidráulicas I	1262 - 1263 - 1267	8
1275	Cimentaciones	1269 - 1270	6
1394	Electiva I	---	4
Quinto Año
Código	Asignatura	Correlatividad	Horas
1277	Construcciones Metálicas y de Madera	1268	8
1278	Práctica Profesional Supervisada	1028 - 1273 -1274 - 1275	200
1279	Ingeniería Sanitaria	1274	6
1280	Vías de Comunicación I	1262 - 1269	8
1281	Análisis Estructural II	1275	4
1397	Anteproyecto	1028 - 1273 - 1274 - 1275	4
1282	Organización y Conducción de Obras	1256 - 1273 - 1277 - 1281	8
1283	Vías de Comunicación II	1280	6
1395	Electiva II	---	4
1396	Electiva III	---	4
1286	Ingeniería Legal	1026 - 1273	4
1398	Proyecto Final	1282 - 1283 - 1286 - 1395 - 1396 - 1397	4

-- Carrera: Ingeniería Civil

-- Plan 2017:
-- with career plan id = 6
INSERT INTO app.subject
(code, description, weekly_hours,
 year_level, career_plan_id, is_optional,
 is_annual, is_elective)
 VALUES
(1023, 'Análisis Matemático I', 8, 1, 6, 0, 0, 0),
(1024, 'Elementos de Programación', 8, 1, 6, 0, 0, 0),
(1025, 'Sistemas de Representación', 4, 1, 6, 0, 0, 0),
(1026, 'Tecnología, Ingeniería y Sociedad', 4, 1, 6, 0, 0, 0),
(1027, 'Álgebra y Geometría Analítica I', 8, 1, 6, 0, 0, 0),
(1028, 'Matemática Discreta', 4, 1, 6, 0, 0, 0),
(1029, 'Química General', 4, 1, 6, 0, 0, 0),
(1030, 'Fundamentos de TICs', 8, 1, 6, 0, 0, 0),
(1031, 'Física I', 8, 2, 6, 0, 0, 0),
(1032, 'Álgebra y Geometría Analítica II', 4, 2, 6, 0, 0, 0),
(1033, 'Análisis Matemático II', 8, 2, 6, 0, 0, 0),
(1035, 'Física II', 8, 2, 6, 0, 0, 0),
(1255, 'Probabilidad y Estadística', 4, 2, 6, 0, 0, 0),
(1256, 'Economía', 4, 2, 6, 0, 0, 0),
(1257, 'Estabilidad', 8, 2, 6, 0, 0, 0),
(1259, 'Materiales de Construcción', 8, 2, 6, 0, 0, 0),
(1260, 'Cálculo Numérico', 4, 2, 6, 0, 0, 0),
(1261, 'Resistencia de Materiales', 8, 3, 6, 0, 0, 0),
(1262, 'Geotopografía', 6, 3, 6, 0, 0, 0),
(1263, 'Tecnología de la Construcción', 8, 3, 6, 0, 0, 0),
(1264, 'Instalaciones Eléctricas y Acústicas', 6, 3, 6, 0, 0, 0),
(1265, 'Tecnología del Hormigón', 4, 3, 6, 0, 0, 0),
(1266, 'Instalaciones Termomecánicas', 6, 3, 6, 0, 0, 0),
(1267, 'Hidráulica General y Aplicada', 10, 3, 6, 0, 0, 0),
(1268, 'Análisis Estructural I', 8, 3, 6, 0, 0, 0),
(1269, 'Geotecnia', 8, 4, 6, 0, 0, 0),
(1270, 'Estructuras de Hormigón', 8, 4, 6, 0, 0, 0),
(1271, 'Instalaciones Sanitarias y de Gas', 8, 4, 6, 0, 0, 0),
(1244, 'Gestión Ambiental', 4, 4, 6, 0, 0, 0),
(1273, 'Diseño Arquitectónico, Planeamiento y Urbanismo I', 6, 4, 6, 0, 0, 0),
(1274, 'Hidrología y Obras Hidráulicas I', 8, 4, 6, 0, 0, 0),
(1275, 'Cimentaciones', 6, 4, 6, 0, 0, 0),
(1394, 'Electiva I', 4, 4, 6, 0, 0, 0),
(1277, 'Construcciones Metálicas y de Madera', 8, 5, 6, 0, 0, 0),
(1278, 'Práctica Profesional Supervisada', 200, 5, 6, 0, 1, 0),
(1279, 'Ingeniería Sanitaria', 6, 5, 6, 0, 0, 0),
(1280, 'Vías de Comunicación I', 8, 5, 6, 0, 0, 0),
(1281, 'Análisis Estructural II', 4, 5, 6, 0, 0, 0),
(1397, 'Anteproyecto', 4, 5, 6, 0, 0, 0),
(1282, 'Organización y Conducción de Obras', 8, 5, 6, 0, 0, 0),
(1283, 'Vías de Comunicación II', 6, 5, 6, 0, 0, 0),
(1395, 'Electiva II', 4, 5, 6, 0, 0, 0),
(1396, 'Electiva III', 4, 5, 6, 0, 0, 0),
(1286, 'Ingeniería Legal', 4, 5, 6, 0, 0, 0),
(1398, 'Proyecto Final', 4, 5, 6, 0, 0, 0),
(1243, 'Elasticidad y Plasticidad', 4, 4, 6, 0, 0, 1),
(1245, 'Geología Aplicada', 4, 4, 6, 0, 0, 1),
(1246, 'Prefabricaciones', 4, 4, 6, 0, 0, 1),
(1247, 'Diseño Arquitectónico, Planeamiento y Urbanismo II', 4, 5, 6, 0, 0, 1),
(1248, 'Hidrología y Obras Hidráulicas II', 4, 5, 6, 0, 0, 1),
(1249, 'Tránsito y Vialidad Urbana', 4, 5, 6, 0, 0, 1),
(1250, 'Puentes', 4, 5, 6, 0, 0, 1),
(1251, 'Análisis Estructural III', 4, 5, 6, 0, 0, 1);

-- Carrera: Ingeniería Civil

-- Plan 2017:

INSERT INTO app.correlative
(subject_code, correlative_code,
subject_career_plan_id, correlative_career_plan_id) VALUES
(1031, 1023, 6, 6),
(1032, 1027, 6, 6),
(1033, 1023, 6, 6),
(1035, 1031, 6, 6),
(1255, 1023, 6, 6), (1255, 1027, 6, 6),
(1256, 1023, 6, 6), (1256, 1026, 6, 6),
(1257, 1027, 6, 6), (1257, 1031, 6, 6),
(1259, 1025, 6, 6), (1259, 1029, 6, 6), (1259, 1031, 6, 6),
(1260, 1024, 6, 6), (1260, 1032, 6, 6), (1260, 1033, 6, 6),
(1261, 1032, 6, 6), (1261, 1033, 6, 6), (1261, 1257, 6, 6),
(1262, 1025, 6, 6), (1262, 1033, 6, 6), (1262, 1035, 6, 6),
(1263, 1030, 6, 6), (1263, 1257, 6, 6), (1263, 1259, 6, 6),
(1264, 1035, 6, 6), (1264, 1259, 6, 6),
(1265, 1255, 6, 6), (1265, 1259, 6, 6), (1265, 1261, 6, 6),
(1266, 1035, 6, 6), (1266, 1259, 6, 6),
(1267, 1033, 6, 6), (1267, 1257, 6, 6),
(1268, 1260, 6, 6), (1268, 1261, 6, 6), (1268, 1263, 6, 6),
(1269, 1261, 6, 6), (1269, 1263, 6, 6), (1269, 1267, 6, 6),
(1270, 1263, 6, 6), (1270, 1265, 6, 6), (1270, 1268, 6, 6),
(1271, 1259, 6, 6), (1271, 1267, 6, 6),
(1244, 1029, 6, 6), (1244, 1256, 6, 6), (1244, 1267, 6, 6),
(1273, 1263, 6, 6), (1273, 1264, 6, 6), (1273, 1266, 6, 6), (1273, 1271, 6, 6),
(1274, 1262, 6, 6), (1274, 1263, 6, 6), (1274, 1267, 6, 6),
(1275, 1269, 6, 6), (1275, 1270, 6, 6),
(1394, 1023, 6, 6), (1394, 1024, 6, 6), (1394, 1025, 6, 6), (1394, 1026, 6, 6), (1394, 1027, 6, 6), (1394, 1028, 6, 6), (1394, 1029, 6, 6), (1394, 1030, 6, 6), (1394, 1031, 6, 6), (1394, 1032, 6, 6), (1394, 1033, 6, 6), (1394, 1035, 6, 6), (1394, 1255, 6, 6), (1394, 1256, 6, 6), (1394, 1257, 6, 6), (1394, 1259, 6, 6), (1394, 1260, 6, 6), (1394, 1261, 6, 6), (1394, 1262, 6, 6), (1394, 1263, 6, 6), (1394, 1264, 6, 6), (1394, 1265, 6, 6), (1394, 1266, 6, 6), (1394, 1267, 6, 6), (1394, 1268, 6, 6), (1394, 1269, 6, 6), (1394, 1270, 6, 6), (1394, 1271, 6, 6), (1394, 1273, 6, 6), (1394, 1274, 6, 6), (1394, 1275, 6, 6),
(1277, 1268, 6, 6),
(1278, 1028, 6, 6), (1278, 1273, 6, 6), (1278, 1274, 6, 6), (1278, 1275, 6, 6),
(1279, 1274, 6, 6),
(1280, 1262, 6, 6), (1280, 1269, 6, 6),
(1281, 1275, 6, 6),
(1397, 1028, 6, 6), (1397, 1273, 6, 6), (1397, 1274, 6, 6), (1397, 1275, 6, 6),
(1282, 1256, 6, 6), (1282, 1273, 6, 6), (1282, 1277, 6, 6), (1282, 1281, 6, 6),
(1283, 1280, 6, 6),
(1395, 1023, 6, 6), (1395, 1024, 6, 6), (1395, 1025, 6, 6), (1395, 1026, 6, 6), (1395, 1027, 6, 6), (1395, 1028, 6, 6), (1395, 1029, 6, 6), (1395, 1030, 6, 6), (1395, 1031, 6, 6), (1395, 1032, 6, 6), (1395, 1033, 6, 6), (1395, 1035, 6, 6), (1395, 1255, 6, 6), (1395, 1256, 6, 6), (1395, 1257, 6, 6), (1395, 1259, 6, 6), (1395, 1260, 6, 6), (1395, 1261, 6, 6), (1395, 1262, 6, 6), (1395, 1263, 6, 6), (1395, 1264, 6, 6), (1395, 1265, 6, 6), (1395, 1266, 6, 6), (1395, 1267, 6, 6), (1395, 1268, 6, 6), (1395, 1269, 6, 6), (1395, 1270, 6, 6), (1395, 1271, 6, 6), (1395, 1273, 6, 6), (1395, 1274, 6, 6), (1395, 1275, 6, 6),
(1396, 1023, 6, 6), (1396, 1024, 6, 6), (1396, 1025, 6, 6), (1396, 1026, 6, 6), (1396, 1027, 6, 6), (1396, 1028, 6, 6), (1396, 1029, 6, 6), (1396, 1030, 6, 6), (1396, 1031, 6, 6), (1396, 1032, 6, 6), (1396, 1033, 6, 6), (1396, 1035, 6, 6), (1396, 1255, 6, 6), (1396, 1256, 6, 6), (1396, 1257, 6, 6), (1396, 1259, 6, 6), (1396, 1260, 6, 6), (1396, 1261, 6, 6), (1396, 1262, 6, 6), (1396, 1263, 6, 6), (1396, 1264, 6, 6), (1396, 1265, 6, 6), (1396, 1266, 6, 6), (1396, 1267, 6, 6), (1396, 1268, 6, 6), (1396, 1269, 6, 6), (1396, 1270, 6, 6), (1396, 1271, 6, 6), (1396, 1273, 6, 6), (1396, 1274, 6, 6), (1396, 1275, 6, 6),
(1286, 1026, 6, 6), (1286, 1273, 6, 6),
(1398, 1282, 6, 6), (1398, 1283, 6, 6), (1398, 1286, 6, 6), (1398, 1395, 6, 6), (1398, 1396, 6, 6), (1398, 1397, 6, 6),
(1243, 1261, 6, 6),
(1245, 1269, 6, 6),
(1246, 1263, 6, 6),
(1247, 1263, 6, 6), (1247, 1264, 6, 6), (1247, 1266, 6, 6), (1247, 1271, 6, 6),
(1248, 1262, 6, 6), (1248, 1263, 6, 6), (1248, 1267, 6, 6),
(1249, 1262, 6, 6), (1249, 1269, 6, 6),
(1250, 1268, 6, 6), (1250, 1270, 6, 6),
(1251, 1275, 6, 6);

-- info de la carrera ingenieria mecánica en la pagina web

Plan de Estudio - Ingeniería Mecánica
Primer Año
Primer Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
1023	Análisis Matemático I	---	8
1024	Elementos de Programación	---	8
1027	Álgebra y Geometría Analítica I	---	8
Segundo Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
1026	Tecnología, Ingeniería y Sociedad	---	4
1025	Sistemas de Representación	---	4
1028	Matemática Discreta	---	4
1029	Química General	---	4
1030	Fundamentos de TICs	---	8
Segundo Año
Primer Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
1033	Análisis Matemático II	1023	8
1031	Física I	1023	8
1032	Álgebra y Geometría Analítica II	1027	4
3016	Probabilidad Estadística	1023	4
Segundo Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
3017	Química Industrial	1029	4
3018	Estabilidad I	1031	8
3019	Cálculo Numérico	1033	4
1035	Física II	1031	8
Tercer Año
Primer Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
3020	Termodinámica	1035 / 3017	8
3021	Física III	1035	6
3022	Matemática Avanzada	1032 / 3019	4
3023	Costos Industriales	1023	4
Segundo Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
3024	Mecánica General	1031 / 3022	4
3025	Máquinas Térmicas	3020	8
3026	Estabilidad II	3018	8
3027	Organización Industrial	3023	4
Cuarto Año
Primer Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
3028	Mecánica de los Fluidos	3020 / 3022 / 3024	8
3029	Estabilidad III	3022 / 3026	8
3030	Metalurgia Física I	3017 / 3021	4
3031	Electrotecnia y Electrónica	3021	8
Segundo Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
3032	Elementos de Máquinas	3024 / 3026	8
3033	Automación I	3031	8
3034	Trabajado Mecánico I	3026 / 3030	8
3035	Metalurgia Física II	3030	4
Quinto Año
Primer Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
3036	Trabajado Mecánico II	3034 / 3035	8
3037	Elementos de Economía	3023	4
3038	Automación II	3033 / 3034	4
3039	Máquinas Eléctricas	3031	8
3044	Práctica Profesional Supervisada    4
3045	Proyecto Final  8
Segundo Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
3040	Metrología y Gestión de la Calidad	3016 / 3032 / 3034	8
3041	Higiene y Seguridad en el Trabajo	3025 / 3039	4
3042	Instalaciones Industriales	3025 / 3028	4
3043	Legislación General	1026	4
3044	Práctica Profesional Supervisada 4
3045	Proyecto Final  8

-- Carrera: Ingeniería Mecánica

-- Plan 2015:
-- with career plan id = 7
INSERT INTO app.subject
(code, description, weekly_hours,
 year_level, career_plan_id, is_optional,
 is_annual, is_elective)
 VALUES
(1023, 'Análisis Matemático I', 8, 1, 7, 0, 0, 0),
(1024, 'Elementos de Programación', 8, 1, 7, 0, 0, 0),
(1025, 'Sistemas de Representación', 4, 1, 7, 0, 0, 0),
(1026, 'Tecnología, Ingeniería y Sociedad', 4, 1, 7, 0, 0, 0),
(1027, 'Álgebra y Geometría Analítica I', 8, 1, 7, 0, 0, 0),
(1028, 'Matemática Discreta', 4, 1, 7, 0, 0, 0),
(1029, 'Química General', 4, 1, 7, 0, 0, 0),
(1030, 'Fundamentos de TICs', 8, 1, 7, 0, 0, 0),
(1031, 'Física I', 8, 2, 7, 0, 0, 0),
(1032, 'Álgebra y Geometría Analítica II', 4, 2, 7, 0, 0, 0),
(1033, 'Análisis Matemático II', 8, 2, 7, 0, 0, 0),
(1035, 'Física II', 8, 2, 7, 0, 0, 0),
(3016, 'Probabilidad Estadística', 4, 2, 7, 0, 0, 0),
(3017, 'Química Industrial', 4, 2, 7, 0, 0, 0),
(3018, 'Estabilidad I', 8, 2, 7, 0, 0, 0),
(3019, 'Cálculo Numérico', 4, 2, 7, 0, 0, 0),
(3020, 'Termodinámica', 8, 3, 7, 0, 0, 0),
(3021, 'Física III', 6, 3, 7, 0, 0, 0),
(3022, 'Matemática Avanzada', 4, 3, 7, 0, 0, 0),
(3023, 'Costos Industriales', 4, 3, 7, 0, 0, 0),
(3024, 'Mecánica General', 4, 3, 7, 0, 0, 0),
(3025, 'Máquinas Térmicas', 8, 3, 7, 0, 0, 0),
(3026, 'Estabilidad II', 8, 3, 7, 0, 0, 0),
(3027, 'Organización Industrial', 4, 3, 7, 0, 0, 0),
(3028, 'Mecánica de los Fluidos', 8, 4, 7, 0, 0, 0),
(3029, 'Estabilidad III', 8, 4, 7, 0, 0, 0),
(3030, 'Metalurgia Física I', 4, 4, 7, 0, 0, 0),
(3031, 'Electrotecnia y Electrónica', 8, 4, 7, 0, 0, 0),
(3032, 'Elementos de Máquinas', 8, 4, 7, 0, 0, 0),
(3033, 'Automación I', 8, 4, 7, 0, 0, 0),
(3034, 'Trabajado Mecánico I', 8, 4, 7, 0, 0, 0),
(3035, 'Metalurgia Física II', 4, 4, 7, 0, 0, 0),
(3036, 'Trabajado Mecánico II', 8, 5, 7, 0, 0, 0),
(3037, 'Elementos de Economía', 4, 5, 7, 0, 0, 0),
(3038, 'Automación II', 4, 5, 7, 0, 0, 0),
(3039, 'Máquinas Eléctricas', 8, 5, 7, 0, 0, 0),
(3040, 'Metrología y Gestión de la Calidad', 8, 5, 7, 0, 0, 0),
(3041, 'Higiene y Seguridad en el Trabajo', 4, 5, 7, 0, 0, 0),
(3042, 'Instalaciones Industriales', 4, 5, 7, 0, 0, 0),
(3043, 'Legislación General', 4, 5, 7, 0, 0, 0),
(3044, 'Práctica Profesional Supervisada', 4, 5, 7, 0, 1, 0),
(3045, 'Proyecto Final', 8, 5, 7, 0, 0, 0);

-- Carrera: Ingeniería Mecánica

-- Plan 2015:

INSERT INTO app.correlative
(subject_code, correlative_code,
subject_career_plan_id, correlative_career_plan_id) VALUES
(1031, 1023, 7, 7),
(1032, 1027, 7, 7),
(1033, 1023, 7, 7),
(1035, 1031, 7, 7),
(3016, 1023, 7, 7),
(3017, 1029, 7, 7),
(3018, 1031, 7, 7),
(3019, 1033, 7, 7),
(3020, 1035, 7, 7), (3020, 3017, 7, 7),
(3021, 1035, 7, 7),
(3022, 1032, 7, 7), (3022, 3019, 7, 7),
(3023, 1023, 7, 7),
(3024, 1031, 7, 7), (3024, 3022, 7, 7),
(3025, 3020, 7, 7),
(3026, 3018, 7, 7),
(3027, 3023, 7, 7),
(3028, 3020, 7, 7), (3028, 3022, 7, 7), (3028, 3024, 7, 7),
(3029, 3022, 7, 7), (3029, 3026, 7, 7),
(3030, 3017, 7, 7), (3030, 3021, 7, 7),
(3031, 3021, 7, 7),
(3032, 3024, 7, 7), (3032, 3026, 7, 7),
(3033, 3031, 7, 7),
(3034, 3026, 7, 7), (3034, 3030, 7, 7),
(3035, 3030, 7, 7),
(3036, 3034, 7, 7), (3036, 3035, 7, 7),
(3037, 3023, 7, 7),
(3038, 3033, 7, 7), (3038, 3034, 7, 7),
(3039, 3031, 7, 7),
(3040, 3016, 7, 7), (3040, 3032, 7, 7), (3040, 3034, 7, 7),
(3041, 3025, 7, 7), (3041, 3039, 7, 7),
(3042, 3025, 7, 7), (3042, 3028, 7, 7),
(3043, 1026, 7, 7),
(3044, 3025, 7, 7), (3044, 3039, 7, 7),
(3045, 3036, 7, 7), (3045, 3040, 7, 7), (3045, 3044, 7, 7);

-- info de la carrera arquitectura en la pagina web

Plan de Estudio - Arquitectura
Primer Año
Primer Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
2952	Proyecto I	´-	8
2953	Tecnología I	-	4
2954	Forma I	-	4
2955	Historia y Crítica I	-	4
2956	Matemática Aplicada I	-	4
Segundo Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
2957	Proyecto II	2952	8
2958	Tecnología II	2953	4
2959	Forma II	2954	4
2960	Historia y Crítica II	2955	4
2961	Matemática Aplicada II	2956	4
Segundo Año
Primer Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
2962	Proyecto III	2957/2959/2953	8
2963	Tecnología III	2958/2956	8
2964	Forma III	2959	4
Segundo Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
2966	Proyecto IV	2962/2955/2956	8
2967	Tecnología IV	2963/2961/2952/2954/2955	8
2965	Sistemas Informáticos Proyectuales I	2961/2952/2953/2954/2955	4
2968	Historia y Crítica III	2960/2952/2953/2954/2956/	4
Tercer Año
Primer Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
2970	Proyecto V	2966/2964/2958/2960/2961	8
2971	Tecnología V	2967/2957/2960/2961/	8
2969	Sistemas Informáticos Proyectuales II	2965/2957/2958/2959/2960	4
2972	Historia y Crítica IV	2968/2957/2958/2959/2961	4
Segundo Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
2973	Proyecto VI	2970/2963	8
2974	Tecnología VI	2971/2962/2964	8
2975	Forma IV	2964/2962/2963	4
Cuarto Año
Primer Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
2977	Proyecto VII	2971/2972/2973	8
2978	Tecnología VII	2970/2972/2974	8
2979	Forma V	2970/2971/2972/2975	4
2980	Historia y Crítica V	2970/2971/2972	4
Segundo Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
2981	Proyecto VIII	2974/2975/2977	8
2982	Tecnología VIII	2973/2975/2978	8
2983	Forma VI	2973/2974/2979	4
2984	Historia y Crítica VI	2973/2974/2975/2980	4
Quinto Año
Primer Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
2985	Proyecto IX	2978/2979/2980/2981	8
2986	Urbanismo I	2977/2978/2979/2980	4
2987	Gestión I	2977/2978/2979/2980	4
2988	Práctica Profesional I	2977/2978/2979/2980	4
Segundo Cuatrimestre
Código	Asignatura	Correlatividad	Horas semanales
2989	Proyecto X	2981/2982/2983/2984/2985	8
2990	Urbanismo II	2981/2982/2983/2984/2986	4
2991	Gestión II	2981/2982/2983/2984/2987	4
2992	Práctica Profesional II	2977/2978/2979/2980	4
Código	Asignatura	Correlatividad	Horas semanales
2993	Espacio Curricular Optativo I	2977/2978/2979/2980	4
2994	Espacio Curricular Optativo II	2977/2978/2979/2980	4
*Aclaración Materias Espacio Curricular Optativo I y II
Deberá elegir entre las materias Electivas
Electivas
Código	Asignatura	Correlatividad	Horas semanales
3941	Desarrollo Urbano Sustentable	2977/2978/2979/2980	4
3942	Paisaje, Arquitectura y Tecnologías I	2977/2978/2979/2980	4
3943	Paisaje, Arquitectura y Tecnologías II	2977/2978/2979/2980	4
3944	Programas Urbanos Especiales	2977/2978/2979/2980	4
3945	Teoría y Crítica	2977/2978/2979/2980	4
Sexto Año
Código	Asignatura	Correlatividad	Horas semanales
2995	Proyecto Final de Carrera	2989/2990/2992/2993	12

-- Carrera: Arquitectura

-- Plan 2015:
-- with career plan id = 8
INSERT INTO app.subject
(code, description, weekly_hours,
 year_level, career_plan_id, is_optional,
 is_annual, is_elective)
 VALUES
(2952, 'Proyecto I', 8, 1, 8, 0, 0, 0),
(2953, 'Tecnología I', 4, 1, 8, 0, 0, 0),
(2954, 'Forma I', 4, 1, 8, 0, 0, 0),
(2955, 'Historia y Crítica I', 4, 1, 8, 0, 0, 0),
(2956, 'Matemática Aplicada I', 4, 1, 8, 0, 0, 0),
(2957, 'Proyecto II', 8, 1, 8, 0, 0, 0),
(2958, 'Tecnología II', 4, 1, 8, 0, 0, 0),
(2959, 'Forma II', 4, 1, 8, 0, 0, 0),
(2960, 'Historia y Crítica II', 4, 1, 8, 0, 0, 0),
(2961, 'Matemática Aplicada II', 4, 1, 8, 0, 0, 0),
(2962, 'Proyecto III', 8, 2, 8, 0, 0, 0),
(2963, 'Tecnología III', 8, 2, 8, 0, 0, 0),
(2964, 'Forma III', 4, 2, 8, 0, 0, 0),
(2965, 'Sistemas Informáticos Proyectuales I', 4, 2, 8, 0, 0, 0),
(2966, 'Proyecto IV', 8, 2, 8, 0, 0, 0),
(2967, 'Tecnología IV', 8, 2, 8, 0, 0, 0),
(2968, 'Historia y Crítica III', 4, 2, 8, 0, 0, 0),
(2969, 'Sistemas Informáticos Proyectuales II', 4, 3, 8, 0, 0, 0),
(2970, 'Proyecto V', 8, 3, 8, 0, 0, 0),
(2971, 'Tecnología V', 8, 3, 8, 0, 0, 0),
(2972, 'Historia y Crítica IV', 4, 3, 8, 0, 0, 0),
(2973, 'Proyecto VI', 8, 3, 8, 0, 0, 0),
(2974, 'Tecnología VI', 8, 3, 8, 0, 0, 0),
(2975, 'Forma IV', 4, 3, 8, 0, 0, 0),
(2977, 'Proyecto VII', 8, 4, 8, 0, 0, 0),
(2978, 'Tecnología VII', 8, 4, 8, 0, 0, 0),
(2979, 'Forma V', 4, 4, 8, 0, 0, 0),
(2980, 'Historia y Crítica V', 4, 4, 8, 0, 0, 0),
(2981, 'Proyecto VIII', 8, 4, 8, 0, 0, 0),
(2982, 'Tecnología VIII', 8, 4, 8, 0, 0, 0),
(2983, 'Forma VI', 4, 4, 8, 0, 0, 0),
(2984, 'Historia y Crítica VI', 4, 4, 8, 0, 0, 0),
(2985, 'Proyecto IX', 8, 5, 8, 0, 0, 0),
(2986, 'Urbanismo I', 4, 5, 8, 0, 0, 0),
(2987, 'Gestión I', 4, 5, 8, 0, 0, 0),
(2988, 'Práctica Profesional I', 4, 5, 8, 0, 0, 0),
(2989, 'Proyecto X', 8, 5, 8, 0, 0, 0),
(2990, 'Urbanismo II', 4, 5, 8, 0, 0, 0),
(2991, 'Gestión II', 4, 5, 8, 0, 0, 0),
(2992, 'Práctica Profesional II', 4, 5, 8, 0, 0, 0),
(2993, 'Espacio Curricular Optativo I', 4, 5, 8, 0, 0, 0),
(2994, 'Espacio Curricular Optativo II', 4, 5, 8, 0, 0, 0),
(2995, 'Proyecto Final de Carrera', 12, 6, 8, 0, 0, 0),
(3941, 'Desarrollo Urbano Sustentable', 4, 0, 8, 0, 0, 1),
(3942, 'Paisaje, Arquitectura y Tecnologías I', 4, 0, 8, 0, 0, 1),
(3943, 'Paisaje, Arquitectura y Tecnologías II', 4, 0, 8, 0, 0, 1),
(3944, 'Programas Urbanos Especiales', 4, 0, 8, 0, 0, 1),
(3945, 'Teoría y Crítica', 4, 0, 8, 0, 0, 1),
(3940, 'Introducción al BIM', 4, 0, 8, 1, 0, 0);

-- Carrera: Arquitectura

-- Plan 2015:

INSERT INTO app.correlative
(subject_code, correlative_code,
subject_career_plan_id, correlative_career_plan_id) VALUES
(2957, 2952, 8, 8),
(2958, 2953, 8, 8),
(2959, 2954, 8, 8),
(2960, 2955, 8, 8),
(2961, 2956, 8, 8),
(2962, 2953, 8, 8), (2962, 2959, 8, 8), (2962, 2957, 8, 8),
(2963, 2958, 8, 8), (2963, 2961, 8, 8),
(2964, 2959, 8, 8),
(2965, 2961, 8, 8), (2965, 2952, 8, 8), (2965, 2953, 8, 8), (2965, 2954, 8, 8), (2965, 2955, 8, 8),
(2966, 2962, 8, 8), (2966, 2955, 8, 8), (2966, 2956, 8, 8),
(2967, 2963, 8, 8), (2967, 2961, 8, 8), (2967, 2952, 8, 8), (2967, 2954, 8, 8), (2967, 2955, 8, 8),
(2968, 2960, 8, 8), (2968, 2952, 8, 8), (2968, 2953, 8, 8), (2968, 2954, 8, 8), (2968, 2956, 8, 8),
(2969, 2965, 8, 8), (2969, 2957, 8, 8), (2969, 2958, 8, 8), (2969, 2959, 8, 8), (2969, 2960, 8, 8),
(2970, 2966, 8, 8), (2970, 2964, 8, 8), (2970, 2958, 8, 8), (2970, 2960, 8, 8), (2970, 2961, 8, 8),
(2971, 2967, 8, 8), (2971, 2957, 8, 8), (2971, 2960, 8, 8), (2971, 2961, 8, 8),
(2972, 2968, 8, 8), (2972, 2957, 8, 8), (2972, 2958, 8, 8), (2972, 2959, 8, 8), (2972, 2961, 8, 8),
(2973, 2970, 8, 8), (2973, 2963, 8, 8),
(2974, 2971, 8, 8), (2974, 2962, 8, 8), (2974, 2964, 8, 8),
(2975, 2964, 8, 8), (2975, 2962, 8, 8), (2975, 2963, 8, 8),
(2977, 2971, 8, 8), (2977, 2972, 8, 8), (2977, 2973, 8, 8),
(2978, 2970, 8, 8), (2978, 2972, 8, 8), (2978, 2974, 8, 8),
(2979, 2970, 8, 8), (2979, 2971, 8, 8), (2979, 2972, 8, 8), (2979, 2975, 8, 8),
(2980, 2970, 8, 8), (2980, 2971, 8, 8), (2980, 2972, 8, 8),
(2981, 2974, 8, 8), (2981, 2975, 8, 8), (2981, 2977, 8, 8),
(2982, 2973, 8, 8), (2982, 2975, 8, 8), (2982, 2978, 8, 8),
(2983, 2973, 8, 8), (2983, 2974, 8, 8), (2983, 2979, 8, 8),
(2984, 2973, 8, 8), (2984, 2974, 8, 8), (2984, 2975, 8, 8), (2984, 2980, 8, 8),
(2985, 2978, 8, 8), (2985, 2979, 8, 8), (2985, 2980, 8, 8), (2985, 2981, 8, 8),
(2986, 2977, 8, 8), (2986, 2978, 8, 8), (2986, 2979, 8, 8), (2986, 2980, 8, 8),
(2987, 2977, 8, 8), (2987, 2978, 8, 8), (2987, 2979, 8, 8), (2987, 2980, 8, 8),
(2988, 2977, 8, 8), (2988, 2978, 8, 8), (2988, 2979, 8, 8), (2988, 2980, 8, 8),
(2989, 2981, 8, 8), (2989, 2982, 8, 8), (2989, 2983, 8, 8), (2989, 2984, 8, 8), (2989, 2985, 8, 8),
(2990, 2981, 8, 8), (2990, 2982, 8, 8), (2990, 2983, 8, 8), (2990, 2984, 8, 8), (2990, 2986, 8, 8),
(2991, 2981, 8, 8), (2991, 2982, 8, 8), (2991, 2983, 8, 8), (2991, 2984, 8, 8), (2991, 2987, 8, 8),
(2992, 2977, 8, 8), (2992, 2978, 8, 8), (2992, 2979, 8, 8), (2992, 2980, 8, 8),
(2993, 2977, 8, 8), (2993, 2978, 8, 8), (2993, 2979, 8, 8), (2993, 2980, 8, 8),
(2994, 2977, 8, 8), (2994, 2978, 8, 8), (2994, 2979, 8, 8), (2994, 2980, 8, 8),
(2995, 2989, 8, 8), (2995, 2990, 8, 8), (2995, 2992, 8, 8), (2995, 2993, 8, 8);
