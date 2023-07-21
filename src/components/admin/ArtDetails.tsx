interface DetailProps {
  selection: ArtObj;
}

interface ArtObj {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  id: string;
}

function ArtDetails(props: DetailProps) {
  const art: ArtObj = props.selection
  return (
    <div className="art-details">
      <h2>{art.title}</h2>
      <p>{art.description}</p>
      <p>${parseInt(art.price).toFixed(2)}</p>
      <p><img src={art.imageUrl} /></p>
      <button>Delete</button>
      <button>Edit</button>
    </div>
  )
}

export default ArtDetails;