import ArtInfo from "./ArtInfo";
import ArtImage from "./ArtImage";
import Timer from "./Timer";


function Art() {

  return (
    <div className="art">
      <ArtInfo title="hello" description="trying" price="98" />
      <ArtImage />
      <Timer />
    </div>
  )
}

export default Art;