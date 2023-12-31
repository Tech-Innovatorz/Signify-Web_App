import React from 'react'
import { TiVideo } from "react-icons/ti";
import { Images } from '../../constants';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MeetPage = () => {
  
  const [meetingLink, meetingLinkTrigger] = useState('');
  const navigate = useNavigate();

  // EDGE CASE :- if user types in meeting link and click on 'instant meeting' without bothering to clear the typed content...

  const onInputChange = (e)=> {
    meetingLinkTrigger(e.target.value);
    console.log(meetingLink);
  }

  const instantMeetHandler = async () => {
    console.log("Entered_1")
    
    const getMeetToken = async () => {
      console.log("ENTERED");
        try{
            const response = await axios.get("http://localhost:8800/generateToken", {});
            
            const response2 = await axios.post('http://localhost:8800/storeToken', {
              meetToken: String(response.data.message)
            });
            console.log(response2.data.message);

        } catch(error) {
            console.error("Error generating token!!", error.message);
            // navigate("/meet");
            // navigate(0);
        }
    }
    // getCurrentUser();
    getMeetToken();

    try {
      const response = await axios.get('http://localhost:8800/getUserType', {});

      if(response.data.message == "normal") {
        navigate("/hC");
      }
      else if(response.data.message == "special") {
        navigate("/dC");
      }
      navigate(0);

    } catch(error) {
      console.log("Error connecting server!!", error.message);
    }

  }

  const onJoinHandler = async ()=> {

    try {

      const response3 = await axios.post('http://localhost:8800/storeToken', {
        meetToken: meetingLink
      });
      console.log(response3.data.message);

      const response = await axios.get('http://localhost:8800/getUserType', {});
      
        if(response.data.message == "normal") {
          navigate("/hC");
        }
        else if(response.data.message == "special") {
          navigate("/dC");
        }
        navigate(0);

    } catch(error) {
      console.log("Error connecting server!!", error.message);
    }

  }

  return (
    <div className='bg-blue-300 min-h-screen w-screen py-4 flex justify-between items-center px-28'>
        <div className='inline-block w-[40rem]'>
            <p className='text-4xl'>Premium video meetings.</p>
            <p className='text-4xl'> now free for everyone</p><br />
            <p className='text-2xl font-thin'>We reengineer the way of commumnication for everyone, now inclusive of deaf people. In our meet, we make it inclusive to all</p>
            <div className='flex space-x-2 items-center my-12'>
                <button className='w-52 h-12 bg-blue-600 text-lg font-semibold text-white rounded-lg' onClick={instantMeetHandler}><TiVideo className='inline-block mr-2 h-7 w-7 fill-white'/>create instant meet</button>
                <div >
                <input type="text" name='meetingLink' className='h-12 mr-2 rounded-lg' placeholder='enter a code' onChange={onInputChange} />
                <button className='disabled:text-gray-500 font-semibold text-lg' onClick={onJoinHandler}>Join</button>
                </div>
            </div>
        </div>
        <img src={Images.gMeetPageImage} className='inline-block' alt="..." />
    </div>
  )
}

export default MeetPage