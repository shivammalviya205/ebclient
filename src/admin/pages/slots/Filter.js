import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function FilterComponent({filterterm,setfilterterm,expertlist}) {
  

  const handleChange = (event) => {
    setfilterterm(event.target.value);
  };

  return (
    <Box sx={{ maxWidth: 150,marginLeft:'60px',borderRadius:3,marginTop:'60px'}}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filterterm}
          sx={{maxHeight:'40px'}}
          onChange={handleChange}
          
        >
          <MenuItem value={'All'} sx={{color:'red'}}>All</MenuItem>
            {expertlist.map((e)=><MenuItem value={e}>{e}</MenuItem>) }
        </Select>
      </FormControl>
    </Box>
  );
}
