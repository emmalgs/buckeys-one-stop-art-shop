import { ArtObj } from "./AdminControl";
import { SaleObj } from "./AdminControl";
import { useState } from "react";

interface ArtProps {
  allArt: Array<ArtObj>;
  forSale: SaleObj;
  countdown: number;
  onArtClick: (id: string) => void;
  onAddArtClick: () => void;
}

function AllArtList(props: ArtProps) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  setInterval(() => {
    const now = new Date().getTime();
    const distance = props.countdown - now;
    setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
  }, 1000);

  return (
    <div className="admin-main">
      <div className="for-sale">
        <h2>Currently On Sale:</h2>
        {props.forSale == null ? (
          <p>Nothings up for sale. Please add an item to your sale!</p>
        ) : (
          <div>
            <div className="timer">
              <div className="days">
                <p>{days}</p>
                <span>DAYS</span>
              </div>
              <div className="hours">
                <p>{hours}</p>
                <span>HRS</span>
              </div>
              <div className="minutes">
                <p>{minutes}</p>
                <span>MIN</span>
              </div>
              <div className="seconds">
                <p>{seconds}</p>
                <span>SEC</span>
              </div>
            </div>
            <div className="timer-art">
              <h3>{props.forSale.title}</h3>
              <p>${parseInt(props.forSale.price).toFixed(2)}</p>
              <img src={props.forSale.imageUrl} />
            </div>
          </div>
        )}
      </div>

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
    </div>
  );
}

export default AllArtList;
