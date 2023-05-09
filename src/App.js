import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoadingPage from './pages/LoadingPage';
import Pomodoro from './pages/Pomodoro';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/loading' element={<LoadingPage />} />
      <Route path='/pomodoro' element={<Pomodoro />} />
    </Routes>
  );
}

export default App;
