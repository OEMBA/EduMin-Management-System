import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/topbar';
import './MainLayout.css';

const MainLayout = () => {
  // This state controls the sidebar globally for all pages
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="app-container">
      {/* 1. Permanent Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className={`main-wrapper ${isSidebarOpen ? 'shifted' : 'full'}`}>
        {/* 2. Permanent Topbar with the toggle button */}
        <Topbar onMenuClick={toggleSidebar} />
        
        {/* 3. Dynamic Content Area */}
        <main className="content-area">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default MainLayout;