
import "./App.scoped.css"
import { useEffect, useState } from "react";
import axios from "axios";
import FlexCard from "./components/FlexCard/FlexCard.js"
import { v4 as uuidv4 } from 'uuid';
import Filter from "./components/filters/filters.js"

function App() {
  const [chars,setChars] = useState([])

  const filterFunc =(filter,value)=>{
    if(filter !== "all"){
      console.log(filter)
      console.log(chars)
      setChars(prev=>{

        return prev.filter((char)=> char[filter] ===  value)
      })
    }else{
      setChars(JSON.parse(localStorage.getItem('chars')))
      }
    
    
    

  }
  useEffect(()=>{
    
    const asyncFunc =async ()=>{
        const userResponse = await axios.get('https://rickandmortyapi.com/api/character')
        setChars(userResponse.data.results)
        localStorage.setItem('chars',JSON.stringify(userResponse.data.results))
    }
    asyncFunc()
  },[])
  return (<>
  <h2 style={{'textAlign':'center','marginBottom':'20px'}}> rick and morty</h2>
  <Filter  filterFunc={filterFunc} />

    <div className="flex-chars">
      {chars && chars.map((char)=>{
        return <FlexCard key={uuidv4()} status={char.status} species={char.species} gender={char.gender}  image={char.image}/> 
      })}
    </div>
    </>
  );
 
}

export default App;
