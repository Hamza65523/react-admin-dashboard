import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import Header from "../../components/Header";
import { useTheme } from '@mui/material/styles';
import { tokens } from "../../theme";
import { UserContext } from "../../hooks/userHook";
import {host} from '../../utils/route'
import './style.css';
import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react';
const Login = () => {
    const navigate = useNavigate()
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { user, setUser } = useContext(UserContext);
  console.log(user,setUser)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here using formData.email and formData.password

    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify(formData);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${host}login`, requestOptions)
  .then(response => response.json())
  .then((result) =>{
    if(result.status == true){
        toast.success('Admin Login Successfull!');
        localStorage.setItem('token',JSON.stringify(result.token))
        setUser({token:result.token,user:result.user})
        navigate('/team',{ replace: true });
    }else{
        toast.error(result.error);
    }
    console.log(result)})
  .catch(error => console.log('error', error));
  };
 useEffect(()=>{
    let token = JSON.parse(localStorage.getItem('token'))
    if(token){
      navigate('/team')
    }else{

    }
  },[])
  return (
    <Box m="20px" height={"100%"}>
    <Box height={"100%"} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} width={"600px"} mx={'auto'} my={'0'}>
        <Box mb={"50px"} width={"70%"}>
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
       Login
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
      Enter your credentials
      </Typography>
    </Box>

      <form onSubmit={handleSubmit} style={{width:'70%'}}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(1, minmax(0, 1fr))"
          >
          <TextField
            fullWidth
            variant="filled"
            type="email"
            label="Email"
            onBlur={handleChange}
            onChange={handleChange}
            value={formData.email}
            name="email"
            required
            />
          <TextField
            fullWidth
            variant="filled"
            type="password"
            label="Password"
            onBlur={handleChange}
            onChange={handleChange}
            value={formData.password}
            name="password"
            required
            />
        </Box>
        <Box display="flex" justifyContent="center" mt="20px">
  <Button
    type="submit"
    sx={{ width: '250px' }}  // Add this line to set the width
    color="secondary"
    variant="contained"
    >
    Login
  </Button>
</Box>

      </form>
    </Box>
    <ToastContainer />
      </Box>
  );
};

export default Login;
