import { useState } from 'react';
import { addEmployee } from '../api';

function AddEmployeeForm({ jwtToken }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dob: '',
    jobTitle: '',
    department: '',
    dateOfJoining: ''
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    try {
      const res = await addEmployee(form, jwtToken);
      setResponse({ success: true, ...res.data });
      setForm({  // 👈 Reset form after success
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      dob: '',
      jobTitle: '',
      department: '',
      dateOfJoining: ''
    });
    } catch (err) {
      setResponse({ success: false, ...err.response?.data });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
  <input
    name="firstName"
    value={form.firstName}
    onChange={handleChange}
    placeholder="First Name"
    required
  />
  <input
    name="lastName"
    value={form.lastName}
    onChange={handleChange}
    placeholder="Last Name"
    required
  />
  <input
    name="email"
    type="email"
    value={form.email}
    onChange={handleChange}
    placeholder="Email"
    required
  />
  <input
    name="password"
    type="password" 
    value={form.password}
    onChange={handleChange}
    placeholder="Password"
    required
  />
  <input
    name="dob"
    type="date" 
    value={form.dob}
    onChange={handleChange}
    placeholder="Date of Birth"
    required
  />
  <input
    name="jobTitle"
    value={form.jobTitle}
    onChange={handleChange}
    placeholder="Job Title"
    required
  />
  <input
    name="department"
    value={form.department}
    onChange={handleChange}
    placeholder="Department"
    required
  />
  <input
    name="dateOfJoining"
    type="date" 
    value={form.dateOfJoining}
    onChange={handleChange}
    placeholder="Date of Joining"
    required
  />
  <button type="submit" disabled={loading}>
    {loading ? 'Adding...' : 'Add Employee'}
  </button>
  {response && (
    <div style={{ color: response.success ? 'green' : 'red' }}>
      {response.message}
    </div>
  )}
</form>

  );
}

export default AddEmployeeForm;
