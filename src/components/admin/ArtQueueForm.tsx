interface FormProps {
  addSomeArt: (arg0: ArtObj) => void;
}

interface ArtObj {
  title: string;
  description: string;
  price: string;
}

function ArtQueueForm(props: FormProps) {
  function submitArt(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string};
      description: {value: string};
      price: { value: string };
    }
    const art = {
      title: target.title.value,
      description: target.description.value,
      price: target.price.value,
    }
    props.addSomeArt(art);
  }
  return (
    <div>
      <form onSubmit={submitArt}>
        <input type="text" name="title" placeholder="title" />
        <textarea name="description" placeholder="description of art piece" />
        <input type="number" name="price" placeholder="price" />
        <button>Add Art</button>
      </form>
    </div>
  )
}

export default ArtQueueForm;