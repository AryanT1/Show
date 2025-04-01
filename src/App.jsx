import { Routes, Route,} from "react-router-dom";
import Home from "./Pages/Home.jsx";
import MovieInfo from "./pages/MovieInfo.jsx";

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
      < Route path="/movie/:id" element={<MovieInfo/>}/>
      </Routes>
 
  )
  
}

export default App;
