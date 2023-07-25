import { QueueObj } from "./AdminControl";
import { db } from "../../firebase";
import { ref, onValue, set } from "firebase/database";
import { useState, useEffect } from 'react';

interface QueueProps {
  queue: Array<QueueObj>
}

function EditQueue(props: QueueProps) {
  const [timer, setTimer] = useState<number>(0)
  let timerInterval: number;

  useEffect(() => {
    const timerdb = ref(db, 'timer');
    const unSubscribe = onValue(
      timerdb, (snapshot: import("firebase/database").DataSnapshot) => {
        const data = snapshot.val() as number;
        console.log(data)
        setTimer(data);
      },
      (error) => {
        console.log(error)
      }
    );
    return () => unSubscribe();
  }, []);

  const startTimerClick = () => {
    if (!timerInterval && timer > 0) {
      timerInterval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1)
        const timerRef = ref(db, 'timer');
        set(timerRef, timer)
          .then(() => {
            console.log('timer updated!')
          })
          .catch((error: { message: string } ) => {
            console.log(`error! ${error.message}`)
          })
      }, 1000)
    }
  }

  return (
    <div className="queue">
      <button onClick={startTimerClick}>Start Timer</button>
      <button>Stop Timer</button>
      <button>Edit Queue</button>
      <p>{timer}</p>
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