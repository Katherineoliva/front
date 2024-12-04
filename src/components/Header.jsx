import React, { useEffect, useState } from "react";
import logo from '../assets/logoUCA.png';
import { useLocation, useNavigate, useMatch, Link } from "react-router-dom";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { FaShop } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import useFetch from "../hooks/useFetch";
import ProtectedComponent from "./general/ProtectedComponent";
import Loading from "./general/Loading";


const Header = () => {
  const navigate = useNavigate();
  const { removeData } = useContext(AuthContext);
  const [user, setUser] = useState();
  const location = useLocation();
  const match = useMatch('/tarjeta/:id');
  const { data, error, loading } = useFetch(`${import.meta.env.VITE_BASE_URL}/user/me`);


  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data])

  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de cerrar sesión',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        removeData();
        Swal.fire(
          'Sesión cerrada',
          'Tu sesión ha sido cerrada con éxito.',
          'success'
        );
        navigate('/');
      }
    });
  };

  if (loading || !user)
    return <Loading />;

  return (
    <header className='bg-blue-UCA row-span-1 pb-2 col-span-5 flex justify-between'>
      <div className='h-full flex items-center'>
        <img src={logo} alt='logo' className='h-14 pl-4 md:px-2 md:pl-7 ' />
        <h1 className='text-white pt-4 hidden md:block text-xl font-bold self-center font-poppins'>
          InnovUCA
        </h1>
      </div>
      <div className='h-full flex items-center pt-4 pr-4 md:pr-7 gap-4'>
        {match && (
          <Link to="/home" className="flex flex-col items-center cursor-pointer">
            <button className="flex flex-col items-center justify-center bg-white text-blue-UCA border-2 p-1 border-solid rounded-xl font-poppins font-semibold md:w-20 md:min-h-12">
              <FaHome className="text-3xl text-black" />
              <span className="text-[0.5rem] pt-1 hidden md:block text-blue-UCA">
                Regresar
              </span>
            </button>
          </Link>
        )}

        {location.pathname === '/eventos' && (
          <ProtectedComponent allowedRoles={["admin"]} userRoles={user.Role}>
            <Link to="/nuevo-evento" className="flex flex-col items-center cursor-pointer">
              <button className="flex flex-col items-center justify-center bg-white text-blue-UCA border-2 p-1 border-solid rounded-xl  font-poppins font-semibold md:w-20 md:min-h-12">
                <FaShop className='text-3xl text-black' />
                <span className="text-[0.5rem] pt-1 hidden md:block text-blue-UCA">Nuevo Evento</span>
              </button>
            </Link>
          </ProtectedComponent>
        )}

        <ProtectedComponent allowedRoles={["owner", "user"]} userRoles={user.Role}>
          <Link to="/emprendimiento" className="flex flex-col items-center cursor-pointer">
            <button className="flex flex-col items-center justify-center bg-white text-blue-UCA border-2 p-1 border-solid rounded-xl  font-poppins font-semibold md:w-20 md:min-h-12">
              <FaShop className='text-3xl text-black' />
              <span className="text-[0.5rem] pt-1 hidden md:block text-blue-UCA">Emprendimiento</span>
            </button>
          </Link>
        </ProtectedComponent>

        <button className="flex flex-col items-center cursor-pointer">
          <div onClick={handleLogout}
            className="flex flex-col items-center justify-center bg-white p-1 text-blue-UCA border-2 border-solid rounded-xl  font-poppins font-semibold md:w-20 md:min-h-12">
            <RiLogoutBoxRFill className='text-3xl text-black' />
            <span className="text-[0.5rem] pt-1 hidden md:block text-blue-UCA">Cerrar Sesión</span>
          </div>
        </button>
        <div className="flex flex-col items-center cursor-pointer">
          <button className="flex flex-col items-center justify-center bg-white text-blue-UCA border-2 p-1 border-solid rounded-xl  font-poppins font-semibold md:w-20 md:min-h-12">
            {/* <FaUserCircle className='text-3xl text-black' /> */}
            <img src={user.photo} alt="avatar" className="w-8 h-8 rounded-full" />
            <span className="text-[0.5rem] pt-1 hidden md:block text-blue-UCA">{user.name}</span>
          </button>
        </div>
      </div>
    </header >
  )
};

export default Header;
