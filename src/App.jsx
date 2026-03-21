import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';
import ViewStudents from './pages/ViewStudents';

// Note: Ensure you have run 'npm install react-router-dom' in your terminal
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The MainLayout wraps these routes so Sidebar/Topbar stay visible [cite: 60, 93] */}
        <Route element={<MainLayout />}>
          {/* Dashboard is the default landing page [cite: 18, 65] */}
          <Route path="/" element={<Dashboard />} />
          
          {/* Path for enrolling new students [cite: 63, 69] */}
          <Route path="/add-student" element={<AddStudent />} />
          
          {/* Path for the student directory/table [cite: 30, 72, 141] */}
          <Route path="/view-students" element={<ViewStudents />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;