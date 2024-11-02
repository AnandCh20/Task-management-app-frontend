import { Routes, Route } from 'react-router-dom'
// import Home from './pages/home'
import Register from './pages/register'
import Login from './pages/login'
import { Toaster } from 'react-hot-toast'
import { Dashboard } from './pages/Dashboard'
import { AppProvider } from './contexts/AppContext'
import {Analytics} from './pages/Analytics'
import {Settings} from './pages/Settings'

function App() {
  return (
    <>
      <AppProvider>
        <Toaster />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/task" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />

          {/* <Route path='/edit/:id' element={<Create />} /> */}
        </Routes>
      </AppProvider>
    </>
  )
}
export default App
