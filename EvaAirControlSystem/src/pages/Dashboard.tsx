"use client";
import React from "react";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";

const Dashboard: React.FC = () => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
      />
      <main className="flex min-h-screen bg-slate-950 max-sm:flex-col">
        <Sidebar />
        <MainContent />
      </main>
    </>
  );
};

export default Dashboard;
