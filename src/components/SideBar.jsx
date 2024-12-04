import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdAddBusiness, MdOutlineEvent, MdOutlineRequestQuote } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import ProtectedComponent from "./general/ProtectedComponent";
import Loading from "./general/Loading";

const SideBar = () => {
  const { roles, token } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  if (!roles) {
    return
  }




  return (
    <div className='bg-blue-UCA w-32 sm:w-24 md:w-44'>
      <div className=' flex justify-center items-center h-14'>
        <h1 className='font-bold text-white font-poppins text-sm'>Menú</h1>
      </div>
      <div className='flex flex-col gap-2  pt-3 px-1 sm:px-2'>
        <button
          onClick={() => navigate('/home')}
          className={`flex justify-center items-center gap-1 md:pl-3 px-1 py-2 w-full rounded-md group hover:shadow-xl  ${location.pathname === '/home' ? 'bg-white' : 'bg-blue-UCA hover:bg-white  transition duration-500'}`}>
          <MdAddBusiness className={`text-2xl md:text-xl col-span-1  ${location.pathname === '/home' ? 'text-blue-UCA' : 'group-hover:text-black transition duration-500 text-white'}`} />
          <span className={`hidden font-poppins md:block text-xs col-span-3 w-32 text-start font-bold ${location.pathname === '/home' ? 'text-blue-UCA' : 'group-hover:text-black transition duration-500 text-white'}`}>Emprendimientos</span>
        </button>
        <button
          onClick={() => navigate('/spacesandevents')}
          className={`flex justify-center  items-center gap-1 md:pl-3 py-2  w-full rounded-md group hover:shadow-xl ${location.pathname === '/spacesandevents' ? 'bg-white' : 'bg-blue-UCA hover:bg-white  transition duration-500'}`}>
          <MdOutlineEvent className={`text-2xl md:text-xl col-span-1 ${location.pathname === '/spacesandevents' ? 'text-blue-UCA' : 'group-hover:text-black transition duration-500 text-white'}`} />
          <span className={`hidden font-poppins md:block text-xs col-span-3 w-32 text-start font-bold ${location.pathname === '/spacesandevents' ? 'text-blue-UCA' : 'group-hover:text-black transition duration-500 text-white'}`}>Eventos</span>
        </button>
        <ProtectedComponent allowedRoles={["admin"]} userRoles={roles}>
          <button
            onClick={() => navigate('/solicitudes')}
            className={`flex justify-center  items-center gap-1 md:pl-3 py-2 w-full rounded-md group  hover:shadow-xl ${location.pathname === '/solicitudes' ? 'bg-white' : 'bg-blue-UCA hover:bg-white  transition duration-500'} `}>
            <MdOutlineRequestQuote className={`text-2xl md:text-xl col-span-1 ${location.pathname === '/solicitudes' ? 'text-blue-UCA' : 'group-hover:text-black transition duration-500 text-white'}`} />
            <span className={`hidden font-poppins md:block text-xs col-span-3 w-32 text-start font-bold ${location.pathname === '/solicitudes' ? 'text-blue-UCA' : 'group-hover:text-black transition duration-500 text-white'}`}>Solicitudes</span>
          </button>
        </ProtectedComponent>

      </div>
    </div >
  )
}

export default SideBar;
