function EmployeePortal({ user, onLogout }) {
  return (
    <div>
      <h1>Employee Portal</h1>
      <p>Welcome, {user.firstName} (Employee)</p>
      <button onClick={onLogout}>Logout</button>
      {/* Add profile view/edit here */}
    </div>
  );
}
export default EmployeePortal;
