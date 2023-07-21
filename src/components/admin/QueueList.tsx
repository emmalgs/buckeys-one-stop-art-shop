interface QueueProps {
  allArt: Array<ArtObj>;
}

interface ArtObj {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  available: boolean;
}

function QueueList(props: QueueProps) {
  return (
    <div className="queue-list">
      <ol>
        {props.allArt.map((art) => {
          return (
            <li>
              <ul>
                <li>{art.title}</li>
                <li>{art.description}</li>
                <li>{art.price}</li>
                <li><img src={art.imageUrl} /></li>
              </ul>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default QueueList;