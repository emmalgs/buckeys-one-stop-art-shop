import buckey from "../../assets/img/buckey.png"

interface HeaderProps {
  mainView: () => void;
}
function Header(props: HeaderProps) {
  return(
    <div className="header">
      <h1 onClick={props.mainView}>Buckey's One Stop Art Shop</h1>
      <div className="header-img"><img src={buckey} /></div>
    </div>
  )
}

export default Header;