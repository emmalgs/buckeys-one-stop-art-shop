import { auth } from '../../firebase'

interface HeaderProps {
  loginClick: () => void;
  logoutViewClick: () => void;
}

function AdminHeader(props: HeaderProps) {
  let currentLoginOrOutBtn = null;

  if (auth.currentUser == null) {
    currentLoginOrOutBtn = <button onClick={props.loginClick}>Admin Login</button>
  } else if (auth.currentUser != null) {
    currentLoginOrOutBtn = <button onClick={props.logoutViewClick}>Logout</button>
  }
  return (
    <div className="header admin-nav">
      <h1>Buckey's Backend</h1>
      {currentLoginOrOutBtn}
    </div>
  )
}

export default AdminHeader;