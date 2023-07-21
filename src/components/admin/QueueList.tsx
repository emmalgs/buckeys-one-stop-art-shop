interface QueueProps {
  allArt: Array<ArtObj>;
}

interface ArtObj {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  id: string;
}

function QueueList(props: QueueProps) {
  return (
    <div className="queue-list">
      {props.allArt.map((art) => {
        return (
          <div className="art" key={art.id} id={art.id}>
            <p>{art.title}</p>
            <p>{art.description}</p>
            <p>{art.price}</p>
            <p><img src={art.imageUrl} /></p>
          </div>
          );
        })
      }
    </div>
  )
}

export default QueueList;