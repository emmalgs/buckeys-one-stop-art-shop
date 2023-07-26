import { SaleObj } from "../admin/AdminControl";

interface CartProps {
  cartItems: Array<SaleObj>;
  total: number;
}

function Cart(props: CartProps) {
  return (
    <div>
      <h1>Cart</h1>
      {props.cartItems.length === 0 ? (
        <p>Nothing in here!</p>
      ) : (
        props.cartItems.map((art) => {
          return (
            <div className="cart-item">
                <img src={art.imageUrl} />
                <span>{art.title} --</span>
                <span>{art.description} --</span>
                <span>${parseInt(art.price).toFixed(2)}</span>
            </div>
          );
        })
      )}
      <h2>Cart Total: ${props.total.toFixed()}</h2>
    </div>
  );
}

export default Cart;
