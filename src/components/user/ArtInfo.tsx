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
      <p>{props.description}</p>
    </div>
    <div className="price">
      <h3>${parseInt(props.price).toFixed(2)}</h3>
    </div>
  </div>
  )
}

export default ArtInfo;