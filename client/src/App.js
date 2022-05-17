import './App.css';
import { Routes, Route } from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute';
import Welcome from './pages/Welcome';
import Home from './pages/Home'
import SaveFood from './pages/SaveFood';
import Donate from "./pages/Donate";

function App() {
  return (
    <div className="App">
 
      <Routes>

        <Route path='/' element={<Welcome />} />
        <Route path='/home' element={
          <ProtectedRoute redirectTo='/'>   
            <Home /> 
          </ProtectedRoute>
          }
        />
        <Route path='/donate' element={
          <ProtectedRoute redirectTo='/'>   
            <Donate /> 
          </ProtectedRoute>
          }
        />
        <Route path='/save-food' element={
          <ProtectedRoute redirectTo='/'>   
            <SaveFood /> 
          </ProtectedRoute>
          }
        />
  
      </Routes>
    </div>
  )
}

export default App;
