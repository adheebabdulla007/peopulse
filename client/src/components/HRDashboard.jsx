// client/src/components/HRDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getAllEmployees } from '../api';

function HRDashboard({ user, onLogout }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getAllEmployees();
        setEmployees(Array.isArray(res?.data) ? res.data : []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load employees');
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // Filter out invalid rows and apply search
  const filteredRows = employees
    .filter(Boolean)
    .filter((employee) => {
      if (!employee) return false;
      const searchTerm = search.toLowerCase();
      return (
        (employee?.first_name?.toLowerCase().includes(searchTerm)) ||
        (employee?.last_name?.toLowerCase().includes(searchTerm)) ||
        (employee?.email?.toLowerCase().includes(searchTerm)) ||
        (employee?.EmployeeProfile?.department?.toLowerCase().includes(searchTerm))
      );
    });

  const columns = [
  { field: 'user_id', headerName: 'ID', width: 70 },
  {
    field: 'name',
    headerName: 'Full Name',
    width: 180,
    renderCell: (params) =>
      `${params.row.first_name || ""} ${params.row.last_name || ""}`.trim() || "—",
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
    renderCell: (params) => params.row.email || "—",
  },
  {
    field: 'department',
    headerName: 'Department',
    width: 150,
    renderCell: (params) =>
      params.row.EmployeeProfile?.department || "—",
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 120,
    renderCell: (params) => params.row.role || "—",
  },
  {
    field: 'date_joined',
    headerName: 'Date Joined',
    width: 130,
    renderCell: (params) =>
      params.row.EmployeeProfile?.date_of_joining || "—",
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: (params) =>
      params.row.EmployeeProfile?.status || "—",
  },
];


  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Employee List</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          label="Search employees"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 300 }}
        />
        <Button onClick={onLogout} variant="contained" color="error">Logout</Button>
      </Box>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            getRowId={(row) => row?.user_id}
          />
        </Box>
      )}
    </Box>
  );
}

export default HRDashboard;







