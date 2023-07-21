import React, { userState, useEffect, useState } from 'react';
import { ref, onValue } from "firebase/database";
import { db, auth } from "../../firebase";
import AdminLogin from './AdminLogin';

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
  const [selectedArt, setSelectedArt] = useState(null);
  const [error, setError] = useState(null);

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

  return (
    <div>
      <AdminLogin />
    </div>
  )
}

export default AdminControl;
