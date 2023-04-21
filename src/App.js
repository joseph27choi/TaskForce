import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoadingSpinner from './components/LoadingSpinner';
import Test from './components/Test';
import Todo from './components/Todo';
import HomePage from './pages/HomePage';
import LoadingPage from './pages/LoadingPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/loadingSpinner' element={<LoadingPage />} />
    </Routes>
  );
}

export default App;
