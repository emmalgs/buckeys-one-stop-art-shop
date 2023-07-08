import ArtController from './ArtController'
import './../App.css'

function App() {
  const cartVisible = false;
  return (
    <>
      <ArtController cartVisible={cartVisible}/>
    </>
  )
}

export default App
