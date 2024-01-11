import React from "react";
import SubjectsList from "./components/SubjectsList";
import Analytics from "./components/Analytics";

const Dashboard = () => {
  return (
    <div className="flex flex-col justify-center items-center s2ml:justify-evenly s2ml:flex-row pt-20 space-y-8">
      <SubjectsList />
      <Analytics />
    </div>
  );
};

export default Dashboard;
