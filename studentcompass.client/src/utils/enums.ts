export const enum CourseStatusEnum {
  Approved = 1,
  Disapproved = 2,
  Attending = 3,
  Attended = 4,
  Available = 5,
  NotAvailable = 6,
  Absent = 7,
}

export const statusStyles: Record<CourseStatusEnum, { label: string; color: string }> = {
  [CourseStatusEnum.Approved]: { label: 'Approved', color: '#4CAF50' },
  [CourseStatusEnum.Disapproved]: { label: 'Disapproved', color: '#F44336' },
  [CourseStatusEnum.Attending]: { label: 'Attending', color: '#FFC107' },
  [CourseStatusEnum.Attended]: { label: 'Attended', color: '#2196F3' },
  [CourseStatusEnum.Available]: { label: 'Available', color: '#8BC34A' },
  [CourseStatusEnum.NotAvailable]: { label: 'Not Available', color: '#9E9E9E' },
  [CourseStatusEnum.Absent]: { label: 'Absent', color: '#FF5722' },
};

export const enum YearLevelEnum {
  Transversal = 0,
  First = 1,
  Second = 2,
  Third = 3,
  Fourth = 4,
  Fifth = 5,
  Sixth = 6,
}

export const yearLevelStyles: Record<YearLevelEnum, { label: string; color: string }> = {
  [YearLevelEnum.Transversal]: { label: 'Transversal', color: '#afd095' },
  [YearLevelEnum.First]: { label: 'First Year', color: '#f5e604' },
  [YearLevelEnum.Second]: { label: 'Second Year', color: '#ffb66c' },
  [YearLevelEnum.Third]: { label: 'Third Year', color: '#ffa6a6' },
  [YearLevelEnum.Fourth]: { label: 'Fourth Year', color: '#bf819e' },
  [YearLevelEnum.Fifth]: { label: 'Fifth Year', color: '#b4c7dc' },
  [YearLevelEnum.Sixth]: { label: 'Sixth Year', color: 'black' },
};
