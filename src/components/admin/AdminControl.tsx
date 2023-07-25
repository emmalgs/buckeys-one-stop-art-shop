import { useEffect, useState } from 'react';
import { ref, onValue, push, set } from "firebase/database";
import { db, auth } from "../../firebase";
import AdminLogin from './AdminLogin';
import ArtQueueForm from './AddArtForm';
import AdminHeader from './AdminHeader';
import AdminLogout from './AdminLogout';
import ArtDetails from './ArtDetails';
import AllArtList from './AllArtList';
import EditArtForm from './EditArtForm';

export interface ArtObj {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  id: string;
}

function AdminControl() {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [artList, setArtList] = useState<ArtObj[]>([]);
  const [selectedArt, setSelectedArt] = useState<ArtObj | null>(null);
  const [loginView, setLoginView] = useState(false);
  const [logoutView, setLogoutView] = useState(false);
  const [allArtView, setAllArtView] = useState(false);
  const [editing, setEditing] = useState(false);

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
      setArtList(artworks)
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

  const handleSelectArtClick = (id: string) => {
    const selection = artList.filter((artwork) => artwork.id === id)[0]
    setSelectedArt(selection);
  }

  const handleDeleteArtClick = (id: string) => {
    const dataRef = ref(db, `art/${id}`);
    set(dataRef, null)
      .then(() => {
        console.log('deleted!');
      })
      .catch((error: { message: string}) => {
        console.log(`error! ${error.message}`)
      });
    setTimeout(() => {
      handleViewQueueClick()
    }, 1000);
  }

  const handleLoginViewClick = () => {
    setLoginView(true);
    setFormVisibleOnPage(false);
    setLogoutView(false);
    setFormVisibleOnPage(false);
    setSelectedArt(null);
    setAllArtView(false);
    setEditing(false);
  }

  const handleLogoutViewClick = () => {
    setLoginView(false);
    setFormVisibleOnPage(false);
    setLogoutView(true);
    setFormVisibleOnPage(false);
    setSelectedArt(null);
    setAllArtView(false);
    setEditing(false);
  }

  const handleViewQueueClick = () => {
    setLoginView(false);
    setFormVisibleOnPage(false);
    setLogoutView(false);
    setFormVisibleOnPage(false);
    setSelectedArt(null);
    setAllArtView(false);
    setEditing(false);
  }

  const handleAddArtClick = () => {
    setLoginView(false);
    setFormVisibleOnPage(false);
    setLogoutView(false);
    setFormVisibleOnPage(true);
    setSelectedArt(null);
    setAllArtView(false);
    setEditing(false);
  }

  const handleViewAllArtClick = () => {
    setLoginView(false);
    setFormVisibleOnPage(false);
    setLogoutView(false);
    setFormVisibleOnPage(false);
    setSelectedArt(null);
    setAllArtView(true);
    setEditing(false);
  }

  const handleViewEditingClick = () => {
    setLoginView(false);
    setFormVisibleOnPage(false);
    setLogoutView(false);
    setFormVisibleOnPage(false);
    setAllArtView(false);
    setEditing(true);
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
          viewAllArtClick={handleViewAllArtClick} />
        {currentView}
      </div>
    )
  } else if (auth.currentUser != null) {
    let currentView = null;
    if (logoutView) {
      currentView = <AdminLogout />
    } else if (formVisibleOnPage) {
      currentView = <ArtQueueForm addSomeArt={handleAddArtSubmit} />
    } else if (selectedArt) {
      currentView = 
        <ArtDetails 
          selection={selectedArt} 
          deleteArt={handleDeleteArtClick}/>
    } else if (allArtView) {
      currentView = 
        <AllArtList 
          allArt={artList} 
          onArtClick={handleSelectArtClick} 
          onAddArtClick={handleAddArtClick} />
    } else if (editing) {
      currentView = 
        <EditArtForm
          artwork={selectedArt}
          updateArt={}
    }
    return (
      <div className='admin-body'>
        <AdminHeader 
          loginClick={handleLoginViewClick}
          logoutViewClick={handleLogoutViewClick}
          viewAllArtClick={handleViewAllArtClick} />
        {currentView}
      </div>
    )
  }
}

export default AdminControl;
