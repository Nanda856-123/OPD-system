import React, { useState } from 'react';
import { Typography, TextField, Box } from '@mui/material';
import axios from 'axios';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'


const Login = () => {
    const navigate = useNavigate();
   let[loginData, setLoginData]=useState({
      email:'',
      password:''
    })
    const inputHandler=(e)=>{
        setLoginData({...loginData,[e.target.name]:e.target.value})
    }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/auth/login',loginData).then((res) => {
      console.log("LOGIN RESPONSE =", res.data);
        toast.success(res.data.message)
        let token=res.data.token
        let user=res.data.user
        if(token){
            localStorage.setItem('token',token)
            localStorage.setItem('user',JSON.stringify(user))
                // role based navigation
                if(res.data.user.role === "admin"){
                    navigate('/admin-dashboard')
                } 
                else if(res.data.user.role === "Doctor"){
                    navigate('/doctor-dashboard')
                }
                else if(res.data.user.role === "Receptionist"){
                    navigate('/reception-dashboard')
                }
        }
      })
      .catch((error) => {
        if(error.response && error.response.data){
            toast.error(error.response.data.message)
        }else{
            toast.error(error.message)
        }
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: '500px',
        margin: '0 auto',
        background: '#fff',
        marginTop: '10%',
        padding: 5,
        borderRadius: '10px',
        textAlign: 'center',
      }}
    >
      <Typography sx={{ textAlign: 'center', fontWeight: '600' }} className="prim-color" variant="h5">
        Login
      </Typography>
      <br />

      <TextField
  fullWidth
  label="Email"
  value={loginData.email}
  onChange={inputHandler}
  name="email"
  autoComplete="off"
/>

<br /><br />

<TextField
  fullWidth
  type="password"
  label="Password"
  value={loginData.password}
  onChange={inputHandler}
  name="password"
  autoComplete="new-password"
/>

<br /><br />
      <Button btnHandler={handleSubmit}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
