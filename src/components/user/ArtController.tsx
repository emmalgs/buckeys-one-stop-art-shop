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
  const [currentArt, setCurrentArt] = useState<SaleObj | null>(null);
  const [countDownDate, setCountDownDate] = useState<number | null>(null);
  const [cart, setCart] = useState<SaleObj[]>([])
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

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
    if (!cart.includes(art)) {
    const updateCart = cart.concat(art);
    setCart(updateCart);
    const price = art.price;
    setCartTotal(prevState => prevState + parseInt(price))
    setMessage(`${art.title} added to your cart!`)
    handleCartClick();
    } else {
      setMessage('You already have this item in your cart!')
      handleCartClick();
    }
  }

  const handleDeleteFromCart = (art: SaleObj) => {
    const updateCart = cart.filter((item) => item.id !== art.id)
    setCart(updateCart);
    const price = art.price;
    setCartTotal(prevState => prevState - parseInt(price))
  }

  const handleCartClick = () => {
    setCartVisible(true);
    setHomeVisible(false);
  }

  const handleHomeClick = () => {
    setHomeVisible(true);
    setCartVisible(false);
    setMessage('');
  }
  let currentlyVisible = null;
  if (cartVisible) {
    currentlyVisible = 
    <Cart 
      exit={handleHomeClick}
      cartItems={cart}
      total={cartTotal} 
      delete={handleDeleteFromCart} />;
  } else if (homeVisible) {
    currentlyVisible = 
      <Art 
        art={currentArt} 
        countdown={countDownDate}
        buyClick={handleAddToCart} />;
  }
  return (
    <div>
      <Header mainView={handleHomeClick}/>
      <p>{message}</p>
      {currentlyVisible}
    </div>
  );
}

export default ArtController;
