import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import TarjetaDetalle from './components/TarjetaDetalle'
import EspaciosEventos from './pages/EspaciosEventos'
import Emprendimiento from './pages/Emprendimiento'
import NuevoProducto from './pages/NuevoProducto'
import Solicitudes from './pages/Solicitudes'
import Eventos from './pages/Eventos'
import Espacios from './pages/Espacios'
import NuevoEmprendimiento from './pages/NuevoEmprendiento'
import NuevoEvento from './pages/NuevoEvento'
import ProtectedRoute from './routes/ProtectedRoute'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './contexts/AuthContext'
import Loading from './components/general/Loading'

function App() {
  const { token, isLoading } = useContext(AuthContext)

  if (isLoading)
    return <Loading />

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              token ? <Navigate to="/home" replace /> : <Login />
            }
          />


          <Route element={<ProtectedRoute canActive={token} redirectPath="/" />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path='/tarjeta/:id' element={<TarjetaDetalle />} />
          <Route path='/spacesandevents' element={<EspaciosEventos />} />
          <Route path='/emprendimiento' element={<Emprendimiento />} />
          <Route path='/nuevo-producto/:id' element={<NuevoProducto />} />
          <Route path='/solicitudes' element={<Solicitudes />} />
          <Route path='/eventos' element={<Eventos />} />
          <Route path='/espacios' element={<Espacios />} />
          <Route path='/nuevo-emprendimiento' element={<NuevoEmprendimiento />} />
          <Route path='/nuevo-evento' element={<NuevoEvento />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
