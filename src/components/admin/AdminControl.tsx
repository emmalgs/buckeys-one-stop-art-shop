import { useEffect, useState } from 'react';
import { ref, onValue } from "firebase/database";
import { db, auth } from "../../firebase";
import AdminLogin from './AdminLogin';
import ArtQueueForm from './ArtQueueForm';
import AdminHeader from './AdminHeader';
import AdminLogout from './AdminLogout';

interface ArtObj {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  available: boolean;
}

function AdminControl() {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [artQueue, setArtQueue] = useState<ArtObj[]>([]);
  // const [selectedArt, setSelectedArt] = useState(null);
  const [loginView, setLoginView] = useState(false);
  const [logoutView, setLogoutView] = useState(false);

  useEffect(() => {
    const artdb = ref(db, 'art/');
    const unSubscribe = onValue(
      artdb, (snapshot: import("firebase/database").DataSnapshot) => {
      const artworks: ArtObj[] = [];
      const data = snapshot.val() as Record<string, ArtObj>;
      Object.keys(data).forEach((art) => {
        artworks.push(data[art]);
      });
      setArtQueue(artworks)
    },
    (error) => {
      console.log(error);
    });
    return () => unSubscribe();
  }, []);

  const handleLoginViewClick = () => {
    setLoginView(true);
    setFormVisibleOnPage(false);
    setLogoutView(false);
  }

  const handleLogoutViewClick = () => {
    setLoginView(false);
    setFormVisibleOnPage(false);
    setLogoutView(true);
  }


  if (auth.currentUser == null) {
    let currentView = null;
    if (loginView) {
      currentView = <AdminLogin />
    } else {
      currentView = <p>Please login to your admin account</p>
    }
    return (
      <div className='admin-body'>
        <AdminHeader loginClick={handleLoginViewClick} logoutViewClick={handleLogoutViewClick}/>
        {currentView}
      </div>
    )
  } else if (auth.currentUser != null) {
    let currentView = null;
    if (logoutView) {
      currentView = <AdminLogout />
    } else {
      currentView = <ArtQueueForm />
    }
    return (
      <div className='admin-body'>
        <AdminHeader loginClick={handleLoginViewClick}logoutViewClick={handleLogoutViewClick} />
        {currentView}
      </div>
    )
  }
}

export default AdminControl;
