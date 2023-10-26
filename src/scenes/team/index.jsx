import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useContext, useEffect, useState } from "react";
import { host } from "../../utils/route";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'
import { UserContext } from "../../hooks/userHook";

const Team = () => {
  const theme = useTheme();
  const navigate = useNavigate()
  const colors = tokens(theme.palette.mode);
  const [data,setData]=useState([])

  // useEffect(()=>{
  //   let token = JSON.parse(localStorage.getItem('token'))
  //   if(!token){
  //     navigate('/')
  //   }else{

  //   }
  // },[])
  useEffect(()=>{
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('token'))}`);
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`${host}careers`, requestOptions)
  .then(response => response.json())
  .then((result) =>{
    if(result.success == true){
      setData(result.data)
  }else{
    toast.error(result.error);
    navigate('/',{ replace: true })
  }
     console.log(result)})
  .catch(error => console.log('error', error));
  },[])
  const columns = [
  
    {
      field: "jobtitle",
      headerName: "Job Title",
      flex: 1,
      // cellClassName: "name-column--cell",
    },
    {
      field: "firstname",
      headerName: "First Name",
      flex: 1,
      // cellClassName: "name-column--cell",
    },
    {
      field: "lastname",
      headerName: "Last Name",
      flex: 1,
      // cellClassName: "name-column--cell",
    },
   
   
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "experienced",
      headerName: "Experience",
      flex: 1,
    },
    {
      field: "phonenumber",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
    },
    {
      field: "organization",
      headerName: "Organization",
      flex: 1,
    },
    {
      field: "resume",
      headerName: "Resume",
      flex: 1,
      renderCell: ({ row }) => {
        console.log(row.resume)
        const resumePath = row.resume;

        return (
      
          <Button
          variant="contained"
          style={{backgroundColor:'#f8801f',color:'white'}}
          onClick={() => handleDeleteUser(row._id)}
        >
           <a href={resumePath} style={{color:'white',textDecoration:'none'}} target={"blank"}>
           Download
            </a>
        </Button>
        );
      },
    },
    {
      field: 'deleteUser',
      headerName: 'Delete User',
      flex: 1,
      renderCell: ({ row }) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDeleteUser(row._id)}
        >
          Delete
        </Button>
      ),
    },
  ];
  
  const handleDeleteUser = (userId) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`${host}careers/${userId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          // User deleted successfully, you may want to update the UI or show a message
          console.log('User deleted successfully');
        } else {
          toast.error(result.error);
        }
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };
  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: '#f8801f',
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: '#525252',
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: 'colors.primary[400]',
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor:'#525252',
          },
          "& .MuiCheckbox-root": {
            color: `#ffff !important`,
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            color: `#ffff !important`,
          },
          "& .MuiTablePagination-selectLabel": {
            color: `#ffff !important`,
          },
          "& .MuiSelect-select": {
            color: `#ffff !important`,
          },
          "& .MuiSvgIcon-root ": {
            fill: `#ffff !important`,
          },
          "& .MuiTablePagination-displayedRows  ": {
            color: `#ffff !important`,
          },
        }}
      >
        <DataGrid    getRowId={(row) => row._id} rows={data} columns={columns} />
      </Box>
      <ToastContainer/>
    </Box>
  );
};

export default Team;
