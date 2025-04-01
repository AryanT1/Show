import { Routes, Route } from "react-router-dom";
import MovieInfo from "./pages/MovieInfo.jsx";
import Home from "./pages/Home.jsx"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/movie/:id" element={<MovieInfo/>} />
    </Routes>
  );
}

export default App;