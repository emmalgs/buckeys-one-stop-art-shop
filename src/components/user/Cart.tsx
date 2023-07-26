import { SaleObj } from "../admin/AdminControl";

interface CartProps {
  cartItems: Array<SaleObj>;
  total: number;
  delete: (art: SaleObj) => void;
  exit: () => void;
}

function Cart(props: CartProps) {
  return (
    <div className="cart-main">
      <h1>Cart </h1>
      <span className="cart-exit" onClick={props.exit}>&#215;</span>
      <div className="line1"></div>
      {props.cartItems.length === 0 ? (
        <p className="cart-item">Nothing in here!</p>
      ) : (
        props.cartItems.map((art) => {
          return (
            <div className="cart-item">
              <div className="cart-item-info">
                <img src={art.imageUrl} />
                <span>{art.title} --</span>
                <span>${parseInt(art.price).toFixed(2)}</span>
              </div>
              <button onClick={() => props.delete(art)}>
                Delete From Cart
              </button>
            </div>
          );
        })
      )}
      <h2 className="total">Cart Total: <span>${props.total.toFixed(2)}</span></h2>
      <button className="checkout">Checkout</button>
    </div>
  );
}

export default Cart;
