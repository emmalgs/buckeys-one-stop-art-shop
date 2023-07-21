import ArtController from './user/ArtController'
import AdminControl from './admin/AdminControl';
import './../App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  const cartVisible = false;
  return (
    <>
      <ArtController cartVisible={cartVisible}/>
    </>
  )
}

export default App
