import './filters.scoped.css'
import { useEffect, useState } from "react";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import InputLabel from '@mui/material/InputLabel';

function App({filterFunc}) {
  const [chars,setChars] = useState([])

 
  return (<>

    <div className="flex-filters">
    <InputLabel id="gender">gender</InputLabel>

    <Select key={1}
        labelId="gender"
        label="gender"
        onChange={(e)=>filterFunc('gender',e.target.value)}
        >
            
        <MenuItem value={'Male'}>male</MenuItem>
        <MenuItem value={'Female'}>female</MenuItem>
        <MenuItem value={'unknown'}>unknown</MenuItem>
</Select>
<InputLabel id="species">species</InputLabel>

<Select  key={2}
    labelId="species"
    label="species"
    onChange={(e)=>filterFunc('species',e.target.value)}
    >
        
    <MenuItem value={'Human'}>Human</MenuItem>
    <MenuItem value={'Alien'}>Alien</MenuItem>
    <MenuItem value={'unknown'}>unknown</MenuItem>
</Select>
<InputLabel id="status">status</InputLabel>

<Select key={3}
          value={''}
          labelId="status"

        label="status"
        onChange={(e)=>filterFunc('status',e.target.value)}
        >
        <MenuItem value={'Alive'}>Alive</MenuItem>
        <MenuItem value={'Dead'}>Dead</MenuItem>
        <MenuItem value={'unknown'}>unknown</MenuItem>
</Select>

     <button  onClick={()=>filterFunc('all') }>return all </button>

    </div>
    </>
  );

 
}

export default App;
