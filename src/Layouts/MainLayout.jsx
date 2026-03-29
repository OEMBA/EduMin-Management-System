import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './MainLayout.css';

const MainLayout = () => {
  return (
    <div className="app-container" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar isOpen={true} />
      <main style={{ flex: 1, backgroundColor: '#f4f7fe', padding: '20px' }}>
        {/* Topbar will go here later */}
        <div className="page-content">
          <Outlet /> 
        </div>
      </main>
    </div>
  );
};

export default MainLayout;