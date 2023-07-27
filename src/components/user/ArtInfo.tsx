interface ArtInfo {
  title: string;
  description: string;
  price: string;
}

function ArtInfo(props: ArtInfo) {
  return (
    <div className="art-info">
      <div className="title">
        <h2>{props.title}</h2>
      </div>
      <div className="description">
        <div className="description-header">
          <h2>About The Art</h2>
        </div>
        <p>{props.description}</p>
      </div>
      <div className="price">
        <h3>${parseInt(props.price).toFixed(2)}</h3>
      </div>
    </div>
  );
}

export default ArtInfo;
