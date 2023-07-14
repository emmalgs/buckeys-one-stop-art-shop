import Art from "./Art";
import Cart from "./Cart";
import Header from "./Header";
import { useState } from "react";

function ArtController() {
  const [cartVisible, setCartVisible] = useState(false);
  const [homeVisible, setHomeVisible] = useState(true);

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
