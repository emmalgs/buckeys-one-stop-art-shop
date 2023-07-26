import ArtInfo from "./ArtInfo";
import ArtImage from "./ArtImage";
import Timer from "./Timer";
import { SaleObj } from "../admin/AdminControl";

interface ArtProps {
  art: SaleObj | null;
  countdown: number | null;
  buyClick: (art: SaleObj) => void;
}

function Art(props: ArtProps) {
  return (
    <div className="art">
      {(props.art != null && props.countdown != null) ? 
      <><ArtInfo
          title={props.art.title}
          description={props.art.description}
          price={props.art.price} /><ArtImage image={props.art.imageUrl} /><Timer
            timer={props.countdown}
            buyArt={props.buyClick}
            selection={props.art} /></> :
        <p>THERES A PROBLEM.</p>
      }
    </div>
  )
}

export default Art;