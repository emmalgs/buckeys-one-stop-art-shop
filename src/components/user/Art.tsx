import ArtInfo from "./ArtInfo";
import ArtImage from "./ArtImage";
import Timer from "./Timer";

interface ArtProps {
  art: object
}

function Art(props: ArtProps) {
  const art = props.art
  return (
    <div className="art">
      <ArtInfo title={art.title} description={art.description} price={art.price} />
      <ArtImage image={art.imageUrl}/>
      <Timer />
    </div>
  )
}

export default Art;