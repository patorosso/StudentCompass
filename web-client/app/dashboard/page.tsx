import React from "react";
import SubjectsList from "./components/SubjectsList";
import Analytics from "./components/Analytics";

const Dashboard = () => {
  return (
    <div className="flex justify-evenly pt-24">
      <SubjectsList />
      <Analytics />
    </div>
  );
};

export default Dashboard;