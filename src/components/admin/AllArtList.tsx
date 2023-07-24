interface QueueProps {
  allArt: Array<ArtObj>;
  onArtClick: (arg0: string) => void;
  onAddToQueueClick: (id: string) => void;
}

interface ArtObj {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  id: string;
}

function AllArtList(props: QueueProps) {
  return (
    <div className="all-art-list">
      {props.allArt.map((art) => {
        return (
          <div key={art.id}>
            <div
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
              {/* Add button conditional if art already exists in queue then it should read Added to Queue */}
            </div>
            <button onClick={() => props.onAddToQueueClick(art.id)}>
              Add To Queue
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default AllArtList;
