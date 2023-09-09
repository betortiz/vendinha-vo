import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<PrivateRoute/>}>
          <Route path='' element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
