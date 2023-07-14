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
  const [artList, setArtList] = useState([]);


  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "art"),
      (collectionSnapshot) => {
        const artworks = [];
        collectionSnapshot.forEach((doc) => {
          artworks.push({
            ...doc.data()
          });
        });
        setArtList(artworks);
      },
      (error) => {
        console.log(error)
      }
    );

    return () => unSubscribe();
  }, []);

  console.log(artList)
  // const q = query(
  //   collection(db, "art"),
  //   where("available", "==", "true"),
  //   limit(1)
  // );

  // const querySnapshot = await getDocs(q);
  // querySnapshot.forEach((doc) => {
  //   setCurrentArt(doc.data())
  // });


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
