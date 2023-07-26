import buckey from "../../assets/img/buckey.png"

interface HeaderProps {
  mainView: () => void;
}
function Header(props: HeaderProps) {
  return(
    <div className="header">
      <h1 onClick={props.mainView}>Buckey's One Stop Art Shop</h1>
      <img src={buckey} />
    </div>
  )
}

export default Header;