import * as React from 'react';
import { useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Dropdown({slotno,setslotno,bookedslot}) {
 
   
  const handleChange = (event) => {
    setslotno(event.target.value);
  }; 

  console.log(bookedslot.includes('1'));
  console.log(bookedslot.includes('6')); 

  useEffect(()=>{
   
  },[bookedslot])

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Slots</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={slotno}
        label="Slot"
        onChange={handleChange}
      >
        <MenuItem value={1} disabled={bookedslot.includes('1')}>9:00am-9:30am</MenuItem>
        <MenuItem value={2} disabled={bookedslot.includes('2')}>9:30am:10:00am</MenuItem>
        <MenuItem value={3} disabled={bookedslot.includes('3')}>10:00am-10:30am</MenuItem>
        <MenuItem value={4} disabled={bookedslot.includes('4')}>10:30am:11:00am</MenuItem>
        <MenuItem value={5} disabled={bookedslot.includes('5')}>11:00am-10:30am</MenuItem>
        <MenuItem value={6} disabled={bookedslot.includes('6')}>11:30am:12:00pm</MenuItem>
      </Select>
    </FormControl>
  );
}
