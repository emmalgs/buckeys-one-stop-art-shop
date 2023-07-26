import Art from "./Art";
import Cart from "./Cart";
import Header from "./Header";
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import {db} from "../../firebase";
import { ArtObj } from "../admin/AdminControl";

function ArtController() {
  const [cartVisible, setCartVisible] = useState<boolean>(false);
  const [homeVisible, setHomeVisible] = useState<boolean>(true);
  const [currentArt, setCurrentArt] = useState<ArtObj | null>(null);
  const [countDownDate, setCountDownDate] = useState<number | null>(null);
  const [cart, setCart] = useState<ArtObj[]>([])
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const artdb = ref(db, "art/");
    const unSubscribe = onValue(
      artdb,
      (snapshot: import("firebase/database").DataSnapshot) => {
        const artworks: ArtObj[] = [];
        const data = snapshot.val() as Record<string, ArtObj>;
        const keys = Object.keys(data);
        keys.forEach((art, index) => {
          const artwork = {
            ...data[art],
            id: keys[index],
          };
          artworks.push(artwork);
        });
        const artOnSale = artworks.filter((art) => art.forSale === true);
        setCurrentArt(artOnSale[0]);
        const dateData = artOnSale[0].closeDate;
        const jsDate = new Date(dateData);
        setCountDownDate(jsDate.getTime());
      },
      (error) => {
        setMessage(error.message);
      }
    );
    return () => unSubscribe();
  }, []);

  const handleAddToCart = (art: ArtObj) => {
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

  const handleDeleteFromCart = (art: ArtObj) => {
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
