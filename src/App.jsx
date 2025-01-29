import Chat from './Components/Chat'
import './App.css'
import Home from './Components/Home'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { MainContext } from './context/Provider'
import axios from 'axios'

function App() {

  const { darkMode, setUserProfile } = useContext(MainContext);
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("access_token")

    if (!token) {
      console.log("Access token not found")
    }

    if (token) {

      axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      )
        .then((res) => {
          setUserProfile(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      navigate("/")
    }

  }, [])

  return (
    <div className={`${darkMode && 'dark'}`}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </div>
  )
}

export default App
