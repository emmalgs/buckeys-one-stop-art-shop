import { ArtObj } from "./AdminControl";

interface ArtProps {
  allArt: Array<ArtObj>;
  onArtClick: (id: string) => void;
  onAddArtClick: () => void;
}

function AllArtList(props: ArtProps) {
  return (
    <div className="all-art-list">
      {props.allArt.map((art) => {
        return (
            <div
              key={art.id}
              className="art-list-item"
              id={art.id}
              onClick={() => props.onArtClick(art.id)}
            >
              <p>
                Title: <em>{art.title}</em>
              </p>
              <p>
                Description: <em>{art.description}</em>
              </p>
              <p>Price : ${parseInt(art.price).toFixed(2)}</p>
              <p>
                <img src={art.imageUrl} />
              </p>
            </div>
        );
      })}
      <button onClick={props.onAddArtClick}>+</button>
    </div>
  );
}

export default AllArtList;
