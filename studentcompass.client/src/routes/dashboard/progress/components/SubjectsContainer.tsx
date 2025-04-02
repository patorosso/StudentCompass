import React from 'react';
import SubjectsTable from './SubjectsGrid';
import SubjectsHeader from './SubjectsHeader';

const Subjects = () => {
  return (
    <React.Fragment>
      <SubjectsHeader />
      <SubjectsTable />
    </React.Fragment>
  );
};

export default Subjects;
