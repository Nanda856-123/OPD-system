import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Typography, TextField, Box } from '@mui/material';
import axios from 'axios';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Validation Schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();

  // React Hook Form 
  const { 
    register, 
    handleSubmit, 
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (loginData) => {
    axios.post('http://localhost:3000/auth/login', loginData)
      .then((res) => {
        toast.success(res.data.message);
        let token = res.data.token;
        let user = res.data.user;

        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));

          if (user.role === "Admin") navigate('/admin-dashboard');
          if (user.role === "Doctor") navigate('/doctor-dashboard');
          if (user.role === "Receptionist") navigate('/reception-dashboard');
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
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
      <Typography sx={{ textAlign: 'center', fontWeight: 600 }} variant="h5">
        Login
      </Typography>
      <br />

      <TextField
        fullWidth
        label="Email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <br /><br />

     
      <TextField
        fullWidth
        type="password"
        label="Password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <br /><br />
      <Button type="submit">
        Login
      </Button>
    </Box>
  );
};

export default Login;
