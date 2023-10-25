import { Box, Typography, useTheme } from "@mui/material";
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
    { field: "_id", headerName: "ID" },
    {
      field: "firstname",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastname",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phonenumber",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "experienced",
      headerName: "Experienced",
      flex: 1,
    },
    {
      field: "resume",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row }) => {
        console.log(row.resume)
        const resumePath = row.resume;

        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={'#f8801f'}
            borderRadius="4px"
          >
            <a href={resumePath} style={{color:'white',textDecoration:'none'}} target={"blank"}>Download</a>
            {/* <Typography  variant="a" href={resumePath} color={colors.grey[100]}  sx={{ ml: "5px" }}>
              Download
            </Typography> */}
          </Box>
        );
      },
    },
  ];
  
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
        <DataGrid checkboxSelection   getRowId={(row) => row._id} rows={data} columns={columns} />
      </Box>
      <ToastContainer/>
    </Box>
  );
};

export default Team;
