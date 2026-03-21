import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import ViewStudents from './pages/ViewStudents.jsx';
// import Dashboard from './pages/Dashboard.jsx';     // Uncomment when you have these
// import AddStudents from './pages/AddStudents.jsx'; // Uncomment when you have these
import './App.css';

export default function App() {
  const [activePage,   setActivePage]   = useState('view-students');
  const [searchQuery,  setSearchQuery]  = useState('');

  // Remove this - not needed anymore
  // useEffect(() => { seedStudentsIfEmpty(); }, []);

  const handleNavigate = (page) => {
    setActivePage(page);
    if (page !== 'view-students') setSearchQuery('');
  };

  const handleSearch = (q) => {
    setSearchQuery(q);
    if (q.trim() && activePage !== 'view-students') setActivePage('view-students');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':     
        return <div>Dashboard (Coming Soon)</div>; // Replace with <Dashboard /> when ready
      case 'add-students':  
        return <div>Add Students (Coming Soon)</div>; // Replace with <AddStudents /> when ready
      case 'view-students': 
        return <ViewStudents searchQuery={searchQuery} />;
      default:              
        return <ViewStudents searchQuery={searchQuery} />;
    }
  };

  return (
    <div className="app">
      <Sidebar activePage={activePage} onNavigate={handleNavigate} />
      <div className="app__main">
        <Header searchQuery={searchQuery} onSearchChange={handleSearch} />
        <main className="app__content">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}