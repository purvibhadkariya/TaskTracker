
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Dashboard from './layout/Dashboard';
import { AppProvider } from './context/app.provider';


function App() {
  return (
    <div className="App">
      <AppProvider>
          <BrowserRouter>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
          </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
