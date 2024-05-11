import { Route, Routes } from 'react-router-dom'
import './App.css'
import { IndexPage } from './Components/Pages/IndexPage'
import { LoginPage } from './Components/Pages/LoginPage'
import { Layout } from './Components/Layout'
import { RegisterPage } from './Components/Pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './Components/UserContext'
import { ProfilePage } from './Components/Pages/ProfilePage'
import { PlacesPage } from './Components/Pages/PlacesPage'
import { PlacesFormPage } from './Components/Pages/PlacesFormPage'
import { PlacePage } from './Components/Pages/PlacePage'
import { BookingsPage } from './Components/Pages/BookingsPage'
import { BookingPage } from './Components/Pages/BookingPage'

axios.defaults.baseURL = 'https://airbnb-api-sjve.onrender.com/';
// axios.defaults.withCredentials = true;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'



function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}> 
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account' element={<ProfilePage />} />
          <Route path='/account/places' element={<PlacesPage />} />
          <Route path='/account/places/new' element={<PlacesFormPage />} />
          <Route path='/account/places/:id' element={<PlacesFormPage />} />
          <Route path='/place/:id' element={<PlacePage />}/>
          <Route path='/account/bookings' element={<BookingsPage />}/>
          <Route path='/account/bookings/:id' element={<BookingPage />}/>
        </Route>
      </Routes>
    </UserContextProvider>
    
  )
}

export default App
