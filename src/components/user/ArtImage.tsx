interface ImageProps {
  image: string;
}

function ArtImage(props: ImageProps) {
  return (
    <div className="image-container">
      <div className="art-image">
        <img src={props.image} alt="artwork" />
      </div>
    </div>
  );
}

export default ArtImage;
