import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Team from "./scenes/team";
import Form1 from "./scenes/form/index2";
import Form from "./scenes/form";
import Login from "./scenes/login/index";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { useContext } from "react";
import { UserContext } from "./hooks/userHook";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate()
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [token1, setToken1] = useState('');
  const { user, setUser } = useContext(UserContext);
  
  useEffect(()=>{
    let token = JSON.parse(localStorage.getItem('token'))
    if(!token){
      navigate('/')
      setToken1('')
    }else{
      setUser({
        ...user,token
      })
      setToken1(token)
    }
  },[user])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        {user.token && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {user.token&&<Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/team" element={<Team />} />
              {/* <Route path="/form1" element={<Form1 />} /> */}
              <Route path="/form" element={<Form />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
