import Art from "./Art";
import Cart from "./Cart";
import Header from "./Header";
import { useState, useEffect } from "react";
import { query, collection, where, limit, getDocs, onSnapshot } from "firebase/firestore"
import db from "./../firebase";


function ArtController() {
  const [cartVisible, setCartVisible] = useState<boolean>(false);
  const [homeVisible, setHomeVisible] = useState<boolean>(true);
  // const [countdown, setCountdown] = userState<number>(0);
  const [currentArt, setCurrentArt] = useState({});
  // const [artList, setArtList] = useState([]);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      query(collection(db, "art"), limit(1)),
      (collectionSnapshot) => {
        const artwork = collectionSnapshot.docs[0].data();
        setCurrentArt(artwork);
      },
      (error) => {
        console.log(error);
      }
    );
  
    return () => unSubscribe();
  }, []);

  const handleBuyClick = () => {
    setCartVisible(true);
    setHomeVisible(false);
  }

  const handleHomeClick = () => {
    setHomeVisible(true);
    setCartVisible(false);
  }
  let currentlyVisible = null;
  if (cartVisible) {
    currentlyVisible = <Cart />;
  } else if (homeVisible) {
    currentlyVisible = <Art />;
  }
  return (
    <div>
      <Header mainView={handleHomeClick} cartView={handleBuyClick} />
      {currentlyVisible}
    </div>
  );
}

export default ArtController;
