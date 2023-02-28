import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
//import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import Slots from '../slots/Slots';
function AdminHome() {
      const navigate=useNavigate()
    const [info, setinfo] = useState([])

    // async function approve(id) {

    //     const response = await fetch('http://localhost:1337/api/admin/adminupdatedata', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             id
    //         })
    //     })

    //     const data = await response.json()
    //     console.log(data);
    //     if (data.status === 'ok') {
    //         document.getElementById(id).innerHTML = 'Approved'
    //     }

    // }

     const handledelete=async(_id)=>{
        const response=await fetch(`http://localhost:3002/admin/${_id}/deleteexpert`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
      }
    })
    const msg=await response.json();
    console.log(msg);
    alert(msg);
    getdata();
     }



    async function getdata() {

        const  req = await fetch('http://localhost:3002/admin/getallexperts',{});
          
        let data = await req.json();

        console.log(data)
        if (data) {

            await setinfo(data)
            console.log(info)
            //setdata(info)
        }
        else {
            //console.log(data.error);
            console.log('data nhi aya');

        }
    }

    useEffect(() => {
      getdata();
       
    }, [])
    console.log(info)
    if(info.length===0) return;
    return (
        <>
        <div className='container pt-5 mt-5'>


            <h1 style={{ textAlign: 'center' }}>Admin Panel </h1>
            <br />
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Expert's Name</th>
                            <th>Domain</th>
                            <th>Fees/slot </th>
                            <th>Contact</th>
                            <th>Timing</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            info.map((e) => {
                                return <tr key={e._id}>
                                    <td>{e.userName}</td>
                                    <td>{e.domain}</td>
                                    <td>{e.fees}</td>
                                    <td>{e.contact}</td>
                                    <td>{`${e.timing.slice(0,5)} to ${e.timing.slice(6)}`}</td>
                                    <td><Link to={`/editexpert/${e._id}`}>{<EditIcon/>}</Link></td>
                                    <td onClick={()=>handledelete(e._id)}>{<DeleteIcon/>}</td>
                                </tr>
                            })

                        }
                    </tbody>
                </Table>
            </div>

        </div>
        </>
    )
}

export default AdminHome;


