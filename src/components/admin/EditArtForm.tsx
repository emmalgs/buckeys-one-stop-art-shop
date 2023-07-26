import { ArtObj } from "./AdminControl";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";

interface FormProps {
  updateArt: (artwork: ArtObj) => void;
  backToArt: (id: string) => void;
  artwork: ArtObj;
}

let uploadedImg: File | null = null;

function EditArtForm(props: FormProps) {
  const [imageURL, setImageURL] = useState<string | null>(
    props.artwork.imageUrl
  );
  const [updateSuccess, setUpdateSuccess] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      uploadedImg = event.target.files[0];
    }
  };

  const addImageToStorage = async () => {
    if (!uploadedImg) {
      setUpdateSuccess("No image selected");
    } else {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${uploadedImg.name}`);
      await uploadBytes(storageRef, uploadedImg);

      const url = await getDownloadURL(storageRef);
      setImageURL(url);
    }
  };

  const updateArtOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      title: { value: string };
      description: { value: string };
      price: { value: string };
      quantity: { value: string };
      available: { value: string };
    };

    const art = {
      title: target.title.value,
      description: target.description.value,
      price: target.price.value,
      quantity: target.quantity.value,
      available: target.available.value,
      imageUrl: imageURL,
      id: props.artwork.id,
    };

    props.updateArt(art);
  };

  const removeImage = () => {
    setImageURL(null);
  };

  return (
    <div className="edit-art">
      <p>{updateSuccess}</p>
      <p className="exit" onClick={() => props.backToArt(props.artwork.id)}>
        &#215;
      </p>
      <form onSubmit={updateArtOnSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          placeholder="title"
          defaultValue={props.artwork.title}
        />
        <label>Description</label>
        <input
          type="text"
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
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          placeholder="quantity"
          defaultValue={props.artwork.quantity}
        />
        <div className="drop-down">
          <label htmlFor="available">Available</label>
          <select name="available" id="available">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        {imageURL != null ? (
          <>
            <label>Image</label>
            <img src={imageURL} />
            <p onClick={removeImage}>Remove Image</p>
          </>
        ) : (
          <>
            <label htmlFor="file">Upload New Image: </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="file"
            />
            <img src={imageURL} />
            <p onClick={addImageToStorage}>Add Image</p>
          </>
        )}
        <button className="submit-edit" type="submit">
          Update Art
        </button>
      </form>
    </div>
  );
}

export default EditArtForm;
