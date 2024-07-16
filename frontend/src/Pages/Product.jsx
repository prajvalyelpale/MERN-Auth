import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Product = ({ setIsAuth }) => {
  const [user, setUser] = useState();
  const [msg, setMsg]=useState("You are not authorized by backend");
  useEffect(() => {
    setUser(localStorage.getItem('loggedInUser'));
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const fetchBackendData= async() =>{
    try {
      const url = "http://localhost:5000/product";
      const header={
        headers:{
          'Authorization': localStorage.getItem('token')
        }
      }
      const data = await axios.get(url, header);
      setMsg("You are Authorized by backend! " + data['data']);

    } catch (error) {
      console.log(error)
    }
   
  }

  useEffect(()=>{
    fetchBackendData();
  },[]);

  return (
    <>
      <div>Welcome {user}</div>
      <div>{msg}</div>
      <button
        onClick={handleLogout}
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
        Logout
      </button>
    </>
  );
};

export default Product;
