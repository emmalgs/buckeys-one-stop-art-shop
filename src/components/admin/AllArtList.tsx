import { ArtObj } from "./AdminControl";
import { SaleObj } from "./AdminControl";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";

interface ArtProps {
  allArt: Array<ArtObj>;
  onArtClick: (id: string) => void;
  onAddArtClick: () => void;
}

function AllArtList(props: ArtProps) {
  const [forSale, setForSale] = useState<SaleObj | null>(null);
  const [countDownDate, setCountDownDate] = useState<number | null>(null);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const artdb = ref(db, "sell/");
    const unSubscribe = onValue(
      artdb,
      (snapshot: import("firebase/database").DataSnapshot) => {
        const data = snapshot.val() as Record<string, SaleObj>;
        const index = Object.keys(data);
        const saleItem = data[index[0]];
        setForSale(saleItem);
        const dateData = saleItem.closeDate;
        const jsDate = new Date(dateData);
        setCountDownDate(jsDate.getTime());
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unSubscribe();
  }, []);
  

  setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
  }, 1000);
  
  return (
    <div className="admin-main">
      <div className="for-sale">
        <h2>Currently On Sale:</h2>
        {forSale == null ? (
          <p>Nothings up for sale. Please add an item to your sale!</p>
        ) : (
          <div>
            <p>{forSale.title}</p>
            <p>{days} Days</p>
            <p>{hours} Hours</p>
            <p>{minutes} Minutes</p>
            <p>{seconds} Seconds</p>
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
