interface HeaderProps {
  cartView: () => void;
  mainView: () => void;
}
function Header(props: HeaderProps) {
  return(
    <div className="header">
      <button>What?</button>
      <h1 onClick={props.mainView}>Buckey's One Stop Art Shop</h1>
      <button onClick={props.cartView}>Cart</button>
    </div>
  )
}

export default Header;