import { SaleObj } from "../admin/AdminControl";

interface CartProps {
  cartItems: Array<SaleObj>;
  total: number;
  delete: (art: SaleObj) => void;
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
                <button onClick={() => props.delete(art)}>Delete From Cart</button>
            </div>
          );
        })
      )}
      <h2>Cart Total: ${props.total.toFixed()}</h2>
    </div>
  );
}

export default Cart;
