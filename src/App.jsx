import { Route, Routes } from 'react-router-dom'
import './App.css'
import { IndexPage } from './Components/Pages/IndexPage'
import { LoginPage } from './Components/Pages/LoginPage'
import { Layout } from './Components/Layout'
import { RegisterPage } from './Components/Pages/RegisterPage'
 

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}> 
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Route>
    </Routes>
    
  )
}

export default App
