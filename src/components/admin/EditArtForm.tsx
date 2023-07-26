import { ArtObj } from "./AdminControl";

interface FormProps {
  updateArt: (artwork: ArtObj) => void;
  backToArt: (id: string) => void;
  artwork: ArtObj;
}

function EditArtForm(props: FormProps) {
  const updateArtOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string };
      description: { value: string };
      price: { value: string };
    };

    const art = {
      title: target.title.value,
      description: target.description.value,
      price: target.price.value,
      imageUrl: props.artwork.imageUrl,
      id: props.artwork.id,
    };
    props.updateArt(art);
  };

  return (
    <div className="edit-art">
      <p className="exit" onClick={() => props.backToArt(props.artwork.id)}>x</p>
      <h3>Editing {props.artwork.title}</h3>
      <form onSubmit={updateArtOnSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          placeholder="title"
          defaultValue={props.artwork.title}
        />
        <label>Description</label>
        <input type="text"
          name="description"
          placeholder="description of art piece"
          defaultValue={props.artwork.description}
        />
        <label>Price</label>
        <input
          type="number"
          name="price"
          placeholder="price"
          defaultValue={props.artwork.price}
        />
        <button type="submit">Update Art</button>
      </form>
    </div>
  );
}

export default EditArtForm;
