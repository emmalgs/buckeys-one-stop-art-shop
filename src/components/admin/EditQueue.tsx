import { QueueObj } from "./AdminControl";
// Function will take all art in queue, show a list, and allow admin to reorder queue order.
// Each item in the queue will have a queue number that is updated with this action
interface QueueProps {
  queue: Array<QueueObj>
}

function EditQueue(props: QueueProps) {
  return (
    <div className="queue">
      <button>Edit Queue</button>
      {props.queue.map((art) => {
        return (
          <div key={art.id} id={art.id} className="queue-item">
            <h2>{art.queueNumber}</h2>
            <p>Title: {art.title}</p>
            <p>{art.description}</p>
            <p>${parseInt(art.price).toFixed(2)}</p>
            <p>Availabe: {art.available ? " yes" : " no"}</p>
            <p>Timer: {art.timer}</p>
            <p><img src={art.imageUrl} /></p>
          </div>
        )
      })}
    </div>

  )
}

export default EditQueue;