import { Routes, Route,} from "react-router-dom";
import Home from "./Pages/Home.jsx";
import MoiveInfo from "./pages/MovieInfo.jsx";

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
      < Route path="/movie/:id" element={<MoiveInfo/>}/>
      </Routes>
 
  )
  
}

export default App;
