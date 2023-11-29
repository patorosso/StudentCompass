USE studentcompass
--
select joins.materia, s2.description as correlativa, s2.code as codigo_correlativa
from(
select s.description as materia, c.correlative_code as materia_correlativa
from app.subject s
join app.correlative c on c.subject_code = s.code
--join app.correlative c2 on c2.correlative_code = s.code
where code = 3680) joins
join app.subject s2 on s2.code = joins.materia_correlativa
