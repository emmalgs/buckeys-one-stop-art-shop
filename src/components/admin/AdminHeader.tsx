import { auth } from '../../firebase'

interface HeaderProps {
  loginClick: () => void;
  logoutViewClick: () => void;
  viewAllArtClick: () => void;
}

function AdminHeader(props: HeaderProps) {
  let currentLoginOrOutBtn = null;

  if (auth.currentUser == null) {
    currentLoginOrOutBtn = <button onClick={props.loginClick}>Admin Login</button>
  } else if (auth.currentUser != null) {
    currentLoginOrOutBtn = <button onClick={props.logoutViewClick}>Logout</button>
  }
  return (
    <div className="header">
      <h1>Buckey's Backend</h1>
      {currentLoginOrOutBtn}
      <button onClick={props.viewAllArtClick}>View All Art</button>
    </div>
  )
}

export default AdminHeader;