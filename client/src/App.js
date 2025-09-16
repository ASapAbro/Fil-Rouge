import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import Book from './views/Book'; // 👈 import du Dashboard / Book
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Route protégée pour le Book / Dashboard */}
        <Route 
          path="/book" 
          element={
            <ProtectedRoute>
              <Book />
            </ProtectedRoute>
          } 
        />

        {/* Redirection vers la page d'accueil si route non trouvée */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
