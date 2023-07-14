import Art from "./Art";
import Cart from "./Cart";
import Header from "./Header";
import { useState, useEffect } from "react";
import { query, collection, where, limit, getDocs, onSnapshot } from "firebase/firestore";
import db from "./../firebase";

function ArtController() {
  const [cartVisible, setCartVisible] = useState<boolean>(false);
  const [homeVisible, setHomeVisible] = useState<boolean>(true);
  const [allArt, setAllArt] = useState([]);
  const [currentArt, setCurrentArt] = useState({});
  // const [countdown, setCountdown] = useState(4000);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCountdown((prevCountdown: number) => prevCountdown - 1);
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      query(collection(db, "art"), where("available", "==", true)),
      (collectionSnapshot) => {
        const artworks = [];
        collectionSnapshot.forEach((doc) => {
          artworks.push({
            ...doc.data(),
            id: doc.id
          });
        });
        setAllArt(artworks);
      },
      (error) => {
        console.log(error);
      }
    );
  
    return () => unSubscribe();
  }, []);
  
  let currentIndex = 0;
  const intervalDelay = 5000;

  const timedArt = () => {
    if (currentIndex < allArt.length) {
        setCurrentArt(allArt[currentIndex])
        currentIndex++
    } else {
      clearInterval(timer);
    }
  }

  const timer = setInterval(timedArt, intervalDelay);

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
    currentlyVisible = <Art art={currentArt}/>;
  }
  return (
    <div>
      <Header mainView={handleHomeClick} cartView={handleBuyClick} />
      {currentlyVisible}
    </div>
  );
}

export default ArtController;
