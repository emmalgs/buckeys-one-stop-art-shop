import React from 'react';
import Cart from './Cart';

interface artControllerProps {
  cartVisible: boolean;
}

interface artControllerState {
  cartVisible: boolean
}

class ArtController extends React.Component<artControllerProps, artControllerState> {
  constructor(props: artControllerProps){
    super(props);
    this.state = {
      cartVisible: false,
    }
  }

  handleBuyClick = () => {
    this.setState({ cartVisible: true })
  }

  render() {
    let currentlyVisible = null;
    if (this.state.cartVisible) {
      currentlyVisible = <Cart />
    }
    return (
      <div>
        {currentlyVisible}
      </div>
    )
  }
}

export default ArtController;