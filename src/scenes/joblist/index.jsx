import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { host } from '../../utils/route';
import Header from '../../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const JobList = () => {
  const [data, setData] = useState([]);

  const fetchJobs = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('token'))}`);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`${host}jobs`, requestOptions)
      .then(response => response.json())
      .then((result) => {
        setData(result.data);
      })
      .catch((error) =>{
        toast.error(error);
        console.error('Error fetching jobs:', error)}); // Add proper error handling
  }
  const handleDeleteUser=(id)=>{

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('token'))}`);
  
    
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`${host}jobs/${id}`, requestOptions)
      .then(response => response.json())
      .then((result) =>{
        if(result.success == true){
          toast.success('Deleted Successfull!');
    fetchJobs();
      }else{
        toast.error(result.error);
      }
      })
      .catch(error => console.log('error', error));
  }
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <Box mx={'20px'}>
      <Header title="Careers" subtitle="Managing the Job Posts" />
      {data.map((job) => (
        <Card variant="outlined" style={{ marginBottom: '10px' }}>
        <CardContent >
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Box>
          <Typography variant="h5" component="div">
            {job.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {job.location}
          </Typography>
          </Box>
         <Box>
         <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteUser(job._id)}
          >
            Delete
          </Button>
         </Box>
        </Box>
        </CardContent>
      </Card>
      ))}
      <ToastContainer/>
    </Box>
  );
};

export default JobList;
