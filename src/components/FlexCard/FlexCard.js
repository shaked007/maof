
import "./FlexCard.scoped.css"
import { useEffect, useState } from "react";
import axios from "axios";
function App({gender,species,status,image}) {
  const [chars,setChars] = useState([])

  return (
    <div className="char-card">
    <img src={image} />
    <div className="flex-details">
        <span> status :{status} </span>
        <span> gender :{gender} </span>

        <span> species :{species} </span>


         </div>

    
    </div>
  );
}

export default App;
