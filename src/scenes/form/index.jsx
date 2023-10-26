import { Box, Button, TextField, TextareaAutosize } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { host } from "../../utils/route";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../hooks/userHook";
const Form = () => {
  const navigate = useNavigate()
  const isNonMobile = useMediaQuery("(min-width:600px)");

  useEffect(()=>{
    let token = JSON.parse(localStorage.getItem('token'))
    if(!token){
      navigate('/',{ replace: true })
    }else{

    }
  },[])
  const handleFormSubmit = (values, { resetForm }) => {
    const {title,
      location,
      jobtype,
      desc,
      benefits,
      responsibilities,
      requirements,
      qualifications,
      department,
      organization,} = values;
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('token'))}`);
var raw = JSON.stringify({
  "title": title,
  "location": location,
  "jobType": jobtype,
  "description": desc,
  "responsibilities": responsibilities,
  "requirements": requirements,
  "qualifications": qualifications,
  "organization": organization,
  "department": department,
  "benefits": benefits,
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${host}jobs`, requestOptions)
  .then(response => response.json())
  .then((result) =>{
    if(result.success == true){
      toast.success('Form Submtied Successfull!');
      resetForm();
  }else{
    toast.error(result.error);
    navigate('/')
  }
    })
  .catch(error => console.log('error', error));
  };
 
  return (
    <Box m="10px" mx={'20px'}>
      <Header title="JOBPOST" subtitle="Create a jobpost." />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="10px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Department"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.department}
                name="department"
                error={!!touched.department && !!errors.department}
                helperText={touched.department && errors.department}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                error={!!touched.location && !!errors.location}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Job Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.jobtype}
                name="jobtype"
                error={!!touched.jobtype && !!errors.jobtype}
                helperText={touched.jobtype && errors.jobtype}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Job Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.desc}
                name="desc"
                error={!!touched.desc && !!errors.desc}
                helperText={touched.desc && errors.desc}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Responsibilities"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.responsibilities}
                name="responsibilities"
                error={!!touched.responsibilities && !!errors.responsibilities}
                helperText={touched.responsibilities && errors.responsibilities}
                sx={{ gridColumn: "span 2" }}
              />
              
             
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Job Requirments"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.requirements}
                name="requirements"
                error={!!touched.requirements && !!errors.requirements}
                helperText={touched.requirements && errors.requirements}
                sx={{ gridColumn: "span 2" }}
              />
              
             
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Qualifications"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.qualifications}
                name="qualifications"
                error={!!touched.qualifications && !!errors.qualifications}
                helperText={touched.qualifications && errors.qualifications}
                sx={{ gridColumn: "span 2" }}
              />
            
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Organization"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.organization}
                name="organization"
                error={!!touched.organization && !!errors.organization}
                helperText={touched.organization && errors.organization}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Benefits"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.benefits}
                name="benefits"
                error={!!touched.benefits && !!errors.benefits}
                helperText={touched.benefits && errors.benefits}
                sx={{ gridColumn: "span 2" }}
              />
              {/* <Box   sx={{ gridColumn: "span 2" }}>

             <TextareaAutosize
  fullWidth
  minRows={3} // You can adjust this to set the minimum number of rows
  maxRows={10} // You can adjust this to set the maximum number of rows
  placeholder="Benefits"
  variant="filled"
  style={{
    width: '100%',
    height: '55px',
    resize: 'none', // This makes the textarea non-resizable
  }}
  type="text"
  label="Benefits"
  onBlur={handleBlur}
  onChange={handleChange}
  value={values.qualifications}
  name="qualifications"
  error={!!touched.qualifications && !!errors.qualifications}
  helperText={touched.qualifications && errors.qualifications}
  sx={{ gridColumn: "span 2" }}
/>
  </Box> */}

            </Box>
              <Button type="submit" fullWidth  style={{width:'200px',fontWeight:'bold',margin:'1rem 0',background:'#f8801f',color:'white'}}  color="secondary"  variant="contained">
             Submit
              </Button>
          </form>
        )}
      </Formik>
      <ToastContainer/>
    </Box>
  );
};
  const checkoutSchema = yup.object().shape({
title:yup.string().required("required"),
location:yup.string().required("required"),
jobtype:yup.string().required("required"),
desc:yup.string().required("required"),
responsibilities:yup.string().required("required"),
requirements:yup.string().required("required"),
department:yup.string().required("required"),
qualifications:yup.string().required("required"),
organization:yup.string().required("required"),
benefits:yup.string().required("required")
  });
  const initialValues = {
benefits:"",
title:"",
location:"",
jobtype:"",
desc:"",
responsibilities:"",
department:"",
requirements:"",
qualifications:"",
organization:""
  };
  

export default Form;
