import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AuthPage from './components/AuthPage';
import Subscription from './components/Subscription';
import Core from './components/Core';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/core" element={<Core />} />
      </Routes>
    </Router>
  );
}

export default App;
