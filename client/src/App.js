import { Routes, Route } from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute';
import Welcome from './pages/Welcome';
import Home from './pages/Home'
import SaveFood from './pages/SaveFood';
import Donate from "./pages/Donate";
import MyDonations from './pages/MyDonations';
import AllDonations from './pages/AllDonations';

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

        <Route path='/all-donations' element={
          <ProtectedRoute redirectTo='/'>
            <AllDonations />
          </ProtectedRoute>
        }
        />

        <Route path='/my-donations' element={
          <ProtectedRoute redirectTo='/'>   
            <MyDonations /> 
          </ProtectedRoute>
          }
        />
  
      </Routes>
    </div>
  )
}

export default App;
