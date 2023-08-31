
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import swal from 'sweetalert2'




function Todo() {
  const [chars,setChars] = useState([])
  const [loading,setLoading]  =useState(false)
  const [error,setError]  =useState(false)

  const inputRef= useRef()
  const add = async ()=>{
    let add; 
    try{
    if(!inputRef.current.value.trim()){
        return
    }
    setLoading(true)

     add =await axios.post(`http://localhost:3001/items/`,{
        name:inputRef.current.value,
        
     })
     console.log(add)
    }catch(err){
        setError(true)
    }
    if(add){
        setLoading(false)
        setChars(prev=>{
            return [...prev,{...add.data}]
        })
    }
  }
  const  remove =async (id) =>{
   let remove;
    try{

    setLoading(true)
    console.log(id)
    remove =await axios.delete(`http://localhost:3001/items/${id}/`)
    }catch(err){
        console.log(err)
    }
    if(remove){
        setLoading(false)
        setChars(prev=>{
            return prev.filter((item)=>item['_id'] !==id)
        })
    }
  }
  const update = async (id,value)=>{
    const val  =await swal.fire({
        title: `input${id}`,
        html: `
          <input
          id ="inputUpdate"
            type="text"
            value="${value}"
           />
      `,
      confirmButtonText:"update"
    })
    console.log(val)
        let userResponse;
            setLoading(true)
            value =document.getElementById("inputUpdate").value
            
            try{
                userResponse = await axios.put(`http://localhost:3001/items/${id}`,{
                    name:value
                })
                console.log(userResponse.data)
                setChars((prev)=>{
                    return  prev.map((item)=>{
                        return item['_id'] === id ? userResponse.data : item
                    })
                })
            }catch(err){
                setError(true)
            }
        
        setLoading(false)
    

  }
  useEffect(()=>{

    const asyncFunc =async ()=>{
        let userResponse
        try{
            setLoading(true)

             userResponse = await axios.get('http://localhost:3001/items')
            setChars(userResponse.data)
        }catch(err){
            setError(true)

        }
        setLoading(false)
        localStorage.setItem('chars',JSON.stringify(userResponse.data.results))
    }
    asyncFunc()
  },[])
  if(error){
    return (<h1>error </h1>)

  }
  if(loading){
    return (<h1>loading </h1>)
  }
  return (<>
<h4> todo-list  </h4>
<input ref={inputRef} type="text" /> 
<button onClick={add}> add item</button>
  <ul>
        {chars && chars.map((item)=>{
            return (
                <li key={uuidv4()}> {item.name}  <button onClick={()=>remove(item['_id'])}>delete </button>  <button onClick={()=>update(item['_id'],item.name)}>update </button></li>
            )
        })}

  </ul>

    </>
  );
 
}

export default Todo;
