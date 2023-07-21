
function ArtQueueForm() {
  return (
    <div>
      <form>
        <input type="text" name="title" placeholder="title" />
        <textarea name="description" placeholder="description of art piece" />
        <input type="number" name="price" placeholder="price" />
        <input type="number" name="timer" placeholder="days up for sale" />
      </form>
    </div>
  )
}

export default ArtQueueForm;