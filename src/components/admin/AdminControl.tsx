import React, { userState, useEffect, useState } from 'react';
import { ref, onValue } from "firebase/database";
import { db, auth } from "../../firebase";
import AdminLogin from './AdminLogin';
import ArtQueueForm from './ArtQueueForm';
import AdminHeader from './AdminHeader';

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
        <AdminHeader loginClick={handleLoginViewClick} />
        {currentView}
      </div>
    )
  } else if (auth.currentUser != null) {
    return (
      <div className='admin-body'>
        <AdminHeader loginClick={handleLoginViewClick} />
        <ArtQueueForm />
      </div>
    )
  }
}

export default AdminControl;
