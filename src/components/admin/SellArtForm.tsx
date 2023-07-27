import { ArtObj } from "./AdminControl";

interface SellArtProps {
  selection: ArtObj;
  sellArt: (artwork: ArtObj, date: Date) => void;
  back: () => void;
}

function SellArtForm(props: SellArtProps) {
  const art: ArtObj = props.selection;
  // const currentDate: string = new Date().toISOString().split('.')[0];

  const sellArtOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      date: { value: Date }
    };
    props.sellArt(art, target.date.value);
  };
  return (
    <div className="sell-art-form">
      <p onClick={props.back} className="exit-sell">x</p>
      <div className="selected-art">
        <h2>Selected Art To Sell:</h2>
        <div className="art-details">
          <h2>{art.title}</h2>
          <p>{art.description}</p>
          <p>${parseInt(art.price).toFixed(2)}</p>
          <p>
            <img src={art.imageUrl} />
          </p>
        </div>
      </div>
      <div className="date-select">
        <h2>Choose A Date To Close the Sale:</h2>
        <form onSubmit={sellArtOnSubmit}>
          <input type="datetime-local" name="date" />
          <button type="submit">Sell It!</button>
        </form>
      </div>
    </div>
  );
}

export default SellArtForm;
