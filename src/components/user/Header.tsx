interface HeaderProps {
  mainView: () => void;
}
function Header(props: HeaderProps) {
  return(
    <div className="header">
      {/* <button>What?</button> */}
      <h1 onClick={props.mainView}>Buckey's One Stop Art Shop</h1>
    </div>
  )
}

export default Header;