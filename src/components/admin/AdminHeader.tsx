import { auth } from '../../firebase'

interface HeaderProps {
  loginClick: () => void;
  logoutViewClick: () => void;
  viewQueueClick: () => void;
  addArtClick: () => void;
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
      <button onClick={props.addArtClick}>Add Art</button>
      <button onClick={props.viewAllArtClick}>View All Art</button>
      <button onClick={props.viewQueueClick}>Art Queue</button>
    </div>
  )
}

export default AdminHeader;