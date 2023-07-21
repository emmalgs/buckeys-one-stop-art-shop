interface QueueProps {
  allArt: Array<ArtObj>;
  onArtClick: (arg0: string) => void;
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
          <div className="art-queue-item" key={art.id} id={art.id} onClick={() => props.onArtClick(art.id)}>
            <p>Title: <em>{art.title}</em></p>
            <p>Description: <em>{art.description}</em></p>
            <p>Price : ${parseInt(art.price).toFixed(2)}</p>
            <p><img src={art.imageUrl} /></p>
          </div>
          );
        })
      }
    </div>
  )
}

export default AllArtList;