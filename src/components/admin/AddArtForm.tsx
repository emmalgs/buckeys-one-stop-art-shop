import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ArtObj } from "./AdminControl";
import { v4 } from "uuid";

interface FormProps {
  addSomeArt: (artwork: ArtObj) => void;
  back: () => void;
}

let uploadedImg: File | null = null;

function ArtQueueForm(props: FormProps) {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      uploadedImg = event.target.files[0];
    }
  };

  async function submitArt(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!uploadedImg) {
      console.error("No image selected");
    } else {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${uploadedImg.name}`);
      await uploadBytes(storageRef, uploadedImg);

      const imageURL = await getDownloadURL(storageRef);

      const target = e.target as typeof e.target & {
        title: { value: string };
        description: { value: string };
        price: { value: string };
        quantity: {value: string};
        available: {value: string};
      };

      const art = {
        title: target.title.value,
        description: target.description.value,
        price: target.price.value,
        quantity: target.quantity.value,
        available: target.available.value,
        imageUrl: imageURL,
        id: v4(),
      };
      props.addSomeArt(art);
    }
  }

  return (
    <div className="add-art-form">
      <div className="exit" onClick={props.back}>
        x
      </div>
      <form onSubmit={submitArt}>
        <label htmlFor="name">Title </label>
        <input type="text" name="title" placeholder="title" id="name" />
        <label htmlFor="description">Description </label>
        <input
          type="text"
          name="description"
          placeholder="description of art piece"
          id="description"
        />
        <label htmlFor="price">Price</label>
        <input type="number" name="price" placeholder="price" id="price" />
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          placeholder="quantity"
        />
        <div className="drop-down">
          <label htmlFor="available">Available</label>
          <select name="available" id="available">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <label htmlFor="file">Upload Image: </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          id="file"
        />

        <button type="submit">Add Art</button>
      </form>
    </div>
  );
}

export default ArtQueueForm;
