export function joinClassNames(...classNames: string[]) {
  return classNames.filter(Boolean).join(" ");
}

export function getStatusStyle(status: string) {
  switch (status) {
    case "Aprobada":
      return "bg-green-600";
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
