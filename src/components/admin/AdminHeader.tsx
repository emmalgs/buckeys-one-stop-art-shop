function AdminHeader(props) {
  return (
    <div className="header">
      <h1>Buckey's Backend</h1>
      <button onClick={props.loginClick}>Admin Login</button>
      <button>Add Art</button>
      <button>View Queue</button>
    </div>
  )
}

export default AdminHeader;