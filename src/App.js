import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoadingSpinner from './components/LoadingSpinner';
import Test from './components/Test';
import Todo from './components/Todo';
import HomePage from './pages/HomePage';
import LoadingPage from './pages/LoadingPage';
import RandomPage from './pages/RandomPage';
import DestinationPage from './pages/DestinationPage';

function App() {
  return (
    <Routes>
      <Route path='/home' element={<HomePage />} />
      <Route path='/loading' element={<LoadingPage />} />
      <Route path='/' element={<RandomPage />} />
      <Route path='/destination' element={<DestinationPage />} />
    </Routes>
  );
}

export default App;
