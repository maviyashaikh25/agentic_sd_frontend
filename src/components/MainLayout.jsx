import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* Top Navigation */}
      <TopNav />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#0B0E14]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
