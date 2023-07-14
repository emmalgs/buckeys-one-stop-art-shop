interface ArtInfo {
  title: string;
  description: string;
  price: string;
}

function ArtInfo(props: ArtInfo) {
  return (
  <div className="art-info">
      <h2 className="Title">{props.title}</h2>
    <div className="description">
      <h2>Description</h2>
      <p>{props.description}</p>
    </div>
    <div className="price">
      <h2>Price</h2>
      <h3>${props.price}</h3>
    </div>
  </div>
  )
}

export default ArtInfo;