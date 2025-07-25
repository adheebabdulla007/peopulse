import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import HRDashboard from './components/HRDashboard';
import EmployeePortal from './components/EmployeePortal';
import AdminConsole from './components/AdminConsole';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // On app start, load user from localStorage (if logged in)
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // When user logs in, save to state and localStorage
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Clear user data on logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('jwtToken');
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />

        {/* HR-only routes */}
        <Route
          path="/hr"
          element={
            user?.role === 'HR' ? (
              <HRDashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Employee-only routes */}
        <Route
          path="/employee"
          element={
            user?.role === 'EMPLOYEE' ? (
              <EmployeePortal user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Admin-only routes */}
        <Route
          path="/admin"
          element={
            user?.role === 'ADMIN' ? (
              <AdminConsole user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


