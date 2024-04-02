export function joinClassNames(...classNames: string[]) {
  return classNames.filter(Boolean).join(" ");
}

export function getStatusStyle(status: string) {
  switch (status) {
    case "Aprobada":
      return "bg-success";
    case "Disponible":
      return "bg-yellow-500";
    case "No disponible":
      return "bg-red-500";
    case "Cursando":
      return "bg-primary";
    default:
      return "bg-gray-400";
  }
}

// quiza es mucha memoria pasar subjects tantas veces
// mejora: recortar el diccionario y buscar con valores "mayores" al codigo
export const correlativeCheck = (
  correlatives: CorrelativesDict,
  subjects: Subject[],
  previousSubjectCode: number
) => {
  // conseguir materias que necesitan tener a previousSubject aprobada
  const correlativesKeys = Object.entries(correlatives)
    .filter(([key, values]) => {
      return values.includes(previousSubjectCode);
    })
    .map(([key]) => key);

  let subjectsToWorry = correlativesKeys.filter((key) =>
    subjects.find(
      (subject) =>
        subject.code === parseInt(key) &&
        (subject.status === "Aprobada" ||
          subject.status === "Disponible" ||
          subject.status === "Cursando")
    )
  );

  let correlativesToCheck = subjectsToWorry.filter((key) =>
    subjects.find(
      (subject) =>
        subject.code === parseInt(key) && subject.status === "Aprobada"
    )
  );

  correlativesToCheck.forEach((key) => {
    subjectsToWorry = subjectsToWorry.concat(
      correlativeCheck(correlatives, subjects, parseInt(key))
    );
  });

  // si llegase a haber problemas de duplicados, usar set.
  return subjectsToWorry;
};

export const getNewAvailableSubjects = (
  subjectCode: number,
  correlatives: CorrelativesDict,
  subjects: Subject[]
) => {
  const correlativesSubjects = Object.entries(correlatives)
    .filter(([key, values]) => {
      return values.includes(subjectCode);
    })
    .map(
      ([key]) =>
        subjects.find((subject) => subject.code === parseInt(key)) as Subject
    );

  let result: Subject[] = [];

  correlativesSubjects.forEach((subject) => {
    const correlativesToCheckApproved = correlatives[subject.code];
    const approved = correlativesToCheckApproved.every((correlative) => {
      return subjects.find(
        (subjectList) =>
          subjectCode === subjectList.code || // si es la materia en cuestion no me fijo
          (subjectList.code === correlative && // si es otra, que este aprobada
            subjectList.status === "Aprobada")
      );
    });
    if (approved) result.push(subject);
  });

  return result;
};
