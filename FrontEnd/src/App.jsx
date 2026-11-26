
import AuthMiddleware from "./Middlewares/AuthMiddleware.jsx";
import HomeScreen from "./screens/HomeScreen/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen.jsx";
import { Route, Routes } from "react-router";

const App = () => {
  return (
    <Routes>
      <Route element={<AuthMiddleware />}>
        <Route path='/' element={<HomeScreen />} />

        <Route path='/home' element={<HomeScreen />} />
      </Route>
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
    </Routes>
  )
}

export default App