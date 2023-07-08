import React from 'react';
import Cart from './Cart';
import Header from './Header'

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
    this.setState(prevState => (
      { cartVisible: !prevState.cartVisible })
    )
  }

  render() {
    let currentlyVisible = null;
    if (this.state.cartVisible) {
      currentlyVisible = <Cart />
    }
    return (
      <div>
        <Header cartView={this.handleBuyClick} />
        {currentlyVisible}
      </div>
    )
  }
}

export default ArtController;