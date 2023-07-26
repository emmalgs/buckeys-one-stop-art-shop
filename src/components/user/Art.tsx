import ArtInfo from "./ArtInfo";
import ArtImage from "./ArtImage";
import Timer from "./Timer";
import { SaleObj } from "../admin/AdminControl";

interface ArtProps {
  art: SaleObj
  countdown: number
}

function Art(props: ArtProps) {
  return (
    <div className="art">
      <ArtInfo title={props.art.title} description={props.art.description} price={props.art.price} />
      <ArtImage image={props.art.imageUrl}/>
      <Timer timer={props.countdown}/>
    </div>
  )
}

export default Art;