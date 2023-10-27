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
   })
  .catch(error => console.log('error', error));
  };
 useEffect(()=>{
    let token = JSON.parse(localStorage.getItem('token'))
    if(token){
      navigate('/team')
    }else{

    }
  },[])
  
const styles = {
  paperContainer: {
      backgroundImage: `url(${"../../assets/bg.png"})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
  }
};
  return (
    <Box height={"100%"} display={'flex'} overflow={'hidden'} justifyContent={'center'} alignItems={'center'} style={styles.paperContainer}>
      <img src="" alt="" />
    <Box 
      sx={{borderRadius:'20px',backgroundColor:'#00000042'}}
    height={"80%"} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} width={"600px"} mx={'auto'} my={'0'}>
      <img src="../../assets/logo.png" style={{width:'300px',paddingBottom:'3rem'}} alt="" />
        <Box mb={"50px"} 
        width={"70%"}>
      <Typography style={{color:'white',}}
        variant="h2"
        
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
       Login
      </Typography>
      <Typography style={{color:'#f58320',}} variant="h5" >
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
            id="outlined-basic"  
            onBlur={handleChange}
            onChange={handleChange}
            
            value={formData.email}
            name="email"
            sx={{
              backgroundColor: '#ffffff36',
              color: 'white',
                textField: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',            
        paddingBottom: 0,
        marginTop: 0,
        fontWeight: 500
    },
    input: {
        color: 'white'
    }
            }}

            InputLabelProps={{
              style: { color: 'white' } // Set the color here
            }}
            required
            />
          <TextField
            fullWidth
            variant="filled"
            InputProps={{
              style: { color: 'white' } // Set the input text color to white
            }}
            sx={{
              backgroundColor: '#ffffff36',
              color: 'white',
                textField: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',            
        paddingBottom: 0,
        marginTop: 0,
        fontWeight: 500
    },
    input: {
        color: 'white'
    }
            }}
            type="password"
            InputLabelProps={{
              style: { color: 'white' } // Set the color here
            }}
            
            label="Password"
            onBlur={handleChange}
            onChange={handleChange}
            value={formData.password}
            name="password"
            required
            />
        </Box>
        <Box display="flex" justifyContent="center" mt="20px">
  <Button style={{backgroundColor:'#f58320',}}
    type="submit"
    sx={{ width: '250px',fontWeight:'bold',fontSize:'16px' }}  // Add this line to set the width
    // color="secondary"
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
