import { useEffect, useState } from 'react';
import { ref, onValue, push, set } from "firebase/database";
import { db, auth } from "../../firebase";
import AdminLogin from './AdminLogin';
import ArtQueueForm from './ArtQueueForm';
import AdminHeader from './AdminHeader';
import AdminLogout from './AdminLogout';
import QueueList from './QueueList';

interface ArtObj {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  id: string;
}

function AdminControl() {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [artQueue, setArtQueue] = useState<ArtObj[]>([]);
  // const [selectedArt, setSelectedArt] = useState(null);
  const [loginView, setLoginView] = useState(false);
  const [logoutView, setLogoutView] = useState(false);
  const [viewQueue, setViewQueue] = useState(false);

  useEffect(() => {
    const artdb = ref(db, 'art/');
    const unSubscribe = onValue(
      artdb, (snapshot: import("firebase/database").DataSnapshot) => {
      const artworks: ArtObj[] = [];
      const data = snapshot.val() as Record<string, ArtObj>;
      const keys = Object.keys(data)
      keys.forEach((art, index) => {
        const artwork = {
          ...data[art],
          id: keys[index]
        }
        artworks.push(artwork);
      });
      setArtQueue(artworks)
      console.log(artworks)
    },
    (error) => {
      console.log(error);
    });
    return () => unSubscribe();
  }, []);

  const handleAddArtSubmit = (artwork: ArtObj) => {
    const newDataRef = push(ref(db, 'art'));
    set(newDataRef, artwork)
    .then(() => {
      console.log('added it!');
    })
    .catch((error: { message: string} ) => {
      console.log(`error! ${error.message}`)
    })
  }

  const handleLoginViewClick = () => {
    setLoginView(true);
    setFormVisibleOnPage(false);
    setLogoutView(false);
    setViewQueue(false);
    setFormVisibleOnPage(false);
  }

  const handleLogoutViewClick = () => {
    setLoginView(false);
    setFormVisibleOnPage(false);
    setLogoutView(true);
    setViewQueue(false);
    setFormVisibleOnPage(false);
  }

  const handleViewQueueClick = () => {
    setLoginView(false);
    setFormVisibleOnPage(false);
    setLogoutView(false);
    setViewQueue(true);
    setFormVisibleOnPage(false);
  }

  const handleAddArtClick = () => {
    setLoginView(false);
    setFormVisibleOnPage(false);
    setLogoutView(false);
    setViewQueue(false);
    setFormVisibleOnPage(true);
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
        <AdminHeader 
          loginClick={handleLoginViewClick} 
          logoutViewClick={handleLogoutViewClick} 
          viewQueueClick={handleViewQueueClick}
          addArtClick={handleAddArtClick} />
        {currentView}
      </div>
    )
  } else if (auth.currentUser != null) {
    let currentView = null;
    if (logoutView) {
      currentView = <AdminLogout />
    } else if (formVisibleOnPage) {
      currentView = <ArtQueueForm addSomeArt={handleAddArtSubmit} />
    } else if (viewQueue) {
      currentView = <QueueList allArt={artQueue} />
    } else {
      currentView = <QueueList allArt={artQueue} />
    }
    return (
      <div className='admin-body'>
        <AdminHeader 
          loginClick={handleLoginViewClick}
          logoutViewClick={handleLogoutViewClick}
          viewQueueClick={handleViewQueueClick}
          addArtClick={handleAddArtClick} />
        {currentView}
      </div>
    )
  }
}

export default AdminControl;
