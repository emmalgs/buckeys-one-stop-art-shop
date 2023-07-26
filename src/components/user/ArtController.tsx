import Art from "./Art";
import Cart from "./Cart";
import Header from "./Header";
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import {db} from "../../firebase";
import { SaleObj } from "../admin/AdminControl";

interface ArtObj {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  available: boolean;
}

function ArtController() {
  const [cartVisible, setCartVisible] = useState<boolean>(false);
  const [homeVisible, setHomeVisible] = useState<boolean>(true);
  const [currentArt, setCurrentArt] = useState({});
  const [countDownDate, setCountDownDate] = useState<number | null>(null);

  useEffect(() => {
    const artdb = ref(db, 'sell/');
    const unSubscribe = onValue(
      artdb, (snapshot: import("firebase/database").DataSnapshot) => {
      const data = snapshot.val() as Record<string, SaleObj>;
      const index = Object.keys(data)
      const saleItem = data[index[0]]
      setCurrentArt(saleItem)
      const dateData = saleItem.closeDate;
      const jsDate = new Date(dateData);
      setCountDownDate(jsDate.getTime())
    },
    (error) => {
      console.log(error);
    });
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
    currentlyVisible = <Art art={currentArt} countdown={countDownDate}/>;
  }
  return (
    <div>
      <Header mainView={handleHomeClick} cartView={handleBuyClick} />
      {currentlyVisible}
    </div>
  );
}

export default ArtController;
