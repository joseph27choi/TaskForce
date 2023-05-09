import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoadingPage from './pages/LoadingPage';
import RandomPage from './pages/RandomPage';
import DestinationPage from './pages/DestinationPage';
import Pomodoro from './pages/Pomodoro';
import Registration from './components/RegistrationFolder/Registration';

function App() {
  return (
    <Routes>
      <Route path='/home' element={<HomePage />} />
      <Route path='/loading' element={<LoadingPage />} />
      <Route path='/' element={<RandomPage />} />
      <Route path='/destination' element={<DestinationPage />} />
      <Route path='/pomodoro' element={<Pomodoro />} />
      <Route path='/r' element={<Registration />} />
    </Routes>
  );
}

export default App;
