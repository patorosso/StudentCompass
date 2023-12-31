import React from "react";
import SubjectsList from "./components/SubjectsList";
import Analytics from "./components/Analytics";

const Dashboard = () => {
  return (
    <div className="flex h-full justify-evenly">
      <SubjectsList />
      <Analytics />
    </div>
  );
};

export default Dashboard;
