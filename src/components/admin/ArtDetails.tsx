import { ArtObj } from "./AdminControl";

interface DetailProps {
  selection: ArtObj;
  deleteArt: (id: string) => void;
  editArt: () => void;
  sellArt: () => void;
}

function ArtDetails(props: DetailProps) {
  const art: ArtObj = props.selection;
  return (
    <div className="art-details">
      <h2>{art.title}</h2>
      <p>{art.description}</p>
      <p>${parseInt(art.price).toFixed(2)}</p>
      <p>
        <img src={art.imageUrl} />
      </p>
      <div className="art-btns">
        <button onClick={() => props.deleteArt(art.id)}>Delete</button>
        <button onClick={props.editArt}>Edit</button>
        <button onClick={props.sellArt}>Sell</button>
      </div>
    </div>
  );
}

export default ArtDetails;
