interface ImageProps {
  image: string;
}

function ArtImage(props: ImageProps) {
  return (
    <div className='art-image'>
      <img src={props.image} alt='artwork' />
    </div>
  )
}

export default ArtImage;