import Services from "./pages/services/Services"
import HearingCall from "./pages/hearingCall/HearingCall"
import DeafCall from "./pages/deafCall/DeafCall"
import Authentication from "./pages/authentication/Authentication"
import Home from "./pages/home/Home"
import MeetPage from "./pages/meetPage/MeetPage"

import { useState, useEffect } from "react";
import axios from "axios";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


export default function App() {

  const [currentUser, currentUserTrigger] = useState(null);

  useEffect(() => {

    const getCurrentUser = async () => {
      try {
        const response = await axios.get('http://localhost:8800/getCurrentUser', {});
        console.log(response.data.message , " is logged in!! ");
        currentUserTrigger(response.data.message);

      } catch (error) {
        console.error('Error fetching data:', error.message);
        currentUserTrigger(null);
      }
    };

    getCurrentUser();

    return () => {
      // Clean-up tasks or subscriptions can be performed here
    };
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: currentUser ? <MeetPage/> : <Authentication/>,
    },
    {
      path: "/authenticate",
      element: !currentUser ? <Authentication/> : <Home/>,
    },
    {
      path: "/services",
      element: !currentUser ? <Authentication/> : <Services/>,
    },
    {
      path: "/hC",
      element: <HearingCall/>,
    },
    {
      path: "/dC",
      element: <DeafCall/>,
    },
    {
      path: "/meet",
      element: <MeetPage/>,
    }
    
  ]);

  return (
      <RouterProvider router={router}/>
  )
}