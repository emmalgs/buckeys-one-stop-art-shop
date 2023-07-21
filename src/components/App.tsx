import ArtController from "./user/ArtController";
import AdminControl from "./admin/AdminControl";
import "./../App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminControl />} />
        <Route path="/" element={<ArtController />} />
      </Routes>
    </Router>
  );
}

export default App;
