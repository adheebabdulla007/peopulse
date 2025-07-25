function AdminConsole({ user, onLogout }) {
  return (
    <div>
      <h1>Admin Console</h1>
      <p>Welcome, {user.firstName} (Admin)</p>
      <button onClick={onLogout}>Logout</button>
      {/* Add admin features here */}
    </div>
  );
}
export default AdminConsole;
