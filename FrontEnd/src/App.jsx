
import HomeScreen from "./screens/HomeScreen/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen.jsx";
import { Route, Routes } from "react-router";

const App = () => {
  return (
    <Routes>

      <Route path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
    </Routes>
  )
}

export default App