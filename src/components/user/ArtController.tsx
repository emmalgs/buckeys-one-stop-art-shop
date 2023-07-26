import Art from "./Art";
import Cart from "./Cart";
import Header from "./Header";
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import {db} from "../../firebase";
import { SaleObj } from "../admin/AdminControl";

function ArtController() {
  const [cartVisible, setCartVisible] = useState<boolean>(false);
  const [homeVisible, setHomeVisible] = useState<boolean>(true);
  const [currentArt, setCurrentArt] = useState({});
  const [countDownDate, setCountDownDate] = useState<number | null>(null);
  const [cart, setCart] = useState<SaleObj[]>([])
  const [cartTotal, setCartTotal] = useState<number>(0);

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

  const handleAddToCart = (art: SaleObj) => {
    const updateCart = cart.concat(art);
    setCart(updateCart);
    const price = art.price;
    setCartTotal(prevState => prevState + parseInt(price))
  }

  const handleCartClick = () => {
    setCartVisible(true);
    setHomeVisible(false);
  }

  const handleHomeClick = () => {
    setHomeVisible(true);
    setCartVisible(false);
  }
  let currentlyVisible = null;
  if (cartVisible) {
    currentlyVisible = <Cart 
      cartItems={cart}
      total={cartTotal} />;
  } else if (homeVisible) {
    currentlyVisible = 
      <Art 
        art={currentArt} 
        countdown={countDownDate}
        buyClick={handleAddToCart} />;
  }
  return (
    <div>
      <Header mainView={handleHomeClick} cartView={handleCartClick} />
      {currentlyVisible}
    </div>
  );
}

export default ArtController;
