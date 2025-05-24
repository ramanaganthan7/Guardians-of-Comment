import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AuthPage from './components/AuthPage';
import Subscription from './components/Subscription';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/subscription" element={<Subscription />} />
      </Routes>
    </Router>
  );
}

export default App;
