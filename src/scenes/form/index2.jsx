import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'
import { host } from "../../utils/route";
import { useEffect } from "react";
const Form = () => {
  const navigate= useNavigate()
  const isNonMobile = useMediaQuery("(min-width:600px)");
  // useEffect(()=>{
  //   if(!user.token){
  //     navigate('/')
  //   }
  // },[])
  const handleFormSubmit = (values) => {
    const {
firstname,
lastname,
email,
phonenumber,
photo,
address,
    }=values
    console.log(values);
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "firstname":firstname,
  "lastname":lastname,
  "email": email,
  "phonenumber":phonenumber,
  "photo": photo,
  "address": address,
  "resume":'resume'
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${host}careers`, requestOptions)
  .then(response => response.json())
  .then((result) =>{
     console.log(result)})
  .catch(error => console.log('error', error));
  };

  return (
    <Box m="20px">
      <Header title="Careers" subtitle="latest jobs in careers page." />

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
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Apply For"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.applyfor}
                name="applyfor"
                error={!!touched.applyfor && !!errors.applyfor}
                helperText={touched.applyfor && errors.applyfor}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 2" }}
              />
              
              <TextField
              fullWidth
              variant="filled"
              type="file"
              label="Upload Resume"
              onBlur={handleBlur}
              onChange={handleChange}
              name="resume"
              inputProps={{ accept: ".pdf,.doc,.docx" }} // Specify accepted file types if needed
              sx={{ gridColumn: "span 2" }}
            />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 2"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
             Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    phone: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("required"),
    coverletter: yup.string().required("required"),
    applyfor: yup.string().required("required"),
    address2: yup.string().required("required"),
  });
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    applyfor: "",
    coverletter: "",
    address2: "",
    resume: null, // Initialize with null, or any default value you prefer
  };
  

export default Form;
