interface HeaderProps {
  cartView: () => void;
}
function Header(props: HeaderProps) {
  return(
    <div>
      <p>What?</p>
      <h1>Buckey's One Stop Art Shop</h1>
      <p onClick={props.cartView}>Cart</p>
    </div>
  )
}

export default Header;