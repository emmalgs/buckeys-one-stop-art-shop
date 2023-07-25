import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ArtObj } from './AdminControl';
import { v4 } from 'uuid';

interface FormProps {
  addSomeArt: (artwork: ArtObj) => void;
}

let uploadedImg: File | null = null

function ArtQueueForm(props: FormProps) {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      uploadedImg = event.target.files[0];
    }
  }

  async function submitArt(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!uploadedImg) {
      console.error('No image selected');
    } else {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${uploadedImg.name}`);
      await uploadBytes(storageRef, uploadedImg);
  
      const imageURL = await getDownloadURL(storageRef);
  
      const target = e.target as typeof e.target & {
        title: { value: string};
        description: {value: string};
        price: { value: string };
      }
      
      const art = {
        title: target.title.value,
        description: target.description.value,
        price: target.price.value,
        imageUrl: imageURL,
        id: v4()
      }
      props.addSomeArt(art);
    }
  }

  return (
    <div>
      <form onSubmit={submitArt}>
        <input type="text" name="title" placeholder="title" />
        <textarea name="description" placeholder="description of art piece" />
        <input type="number" name="price" placeholder="price" />
        <label>Upload Image: 
          <input type="file" accept="image/*" onChange={handleImageChange}/>
        </label>
        <button type="submit">Add Art</button>
      </form>
    </div>
  )
}

export default ArtQueueForm;