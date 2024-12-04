import React, { useEffect, useState, useContext } from "react";
import Title from "../components/Title";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { FaShopSlash } from 'react-icons/fa6';
import { IoAddCircleSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import useFetch from "../hooks/useFetch";
import Loading from "../components/general/Loading";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import ProtectedComponent from "../components/general/ProtectedComponent";
import { AuthContext } from "../contexts/AuthContext";


const Emprendimiento = () => {
  const [undertakings, setUndertakings] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data, error, loading } = useFetch(`${import.meta.env.VITE_BASE_URL}/undertaking/me`);
  const { roles, token } = useContext(AuthContext);

  useEffect(() => {
    if (data) {

      setUndertakings(data);
    }
  }, [data])

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex < undertakings.length - 1) {
        return prevIndex + 1;
      }
      return prevIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return prevIndex;
    });
  };


  const currentUndertaking = undertakings[currentIndex];

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center p-6">
        <Loading />
      </div>
    );
  }

  return (
    <div className='h-screen grid grid-cols-5 grid-rows-[1fr_10fr] '>
      <Header />
      <div className='flex col-span-5 row-span-2 h-full'>
        <SideBar />
        <div className='flex flex-col justify-center gap-4 items-center w-full px-9 pt-4'>
          {undertakings && undertakings.length > 0 ? (
            <>
              <Title key={currentUndertaking._id} title={currentUndertaking.name} />
              {currentUndertaking.products && currentUndertaking.products.length > 0 ? (
                <div className='flex flex-wrap w-full justify-center h-full gap-6 bg-gray-200 p-4 overflow-y-auto'>
                  {currentUndertaking.products.map((producto) => (
                    <div key={producto._id} className='h-fit bg-white p-4 rounded shadow '>
                      <img
                        src={producto.image}
                        alt={producto.name}
                        className='w-full h-40 object-cover rounded mb-4'
                      />
                      <h2 className='text-xl font-semibold'>{producto.name}</h2>
                      <p>{producto.description}</p>
                      <p>Precio: ${producto.price}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='flex flex-col justify-center items-center w-full h-full gap-6 bg-gray-200 p-4'>
                  <FaShopSlash className='text-6xl mb-4' />
                  <p className='text-lg font-poppins'>No hay productos disponibles</p>
                </div>
              )}

              {/* Controles de Navegación */}
              <div className='flex justify-between w-full mt-1'>
                <button
                  onClick={handlePrev}
                  className='text-3xl text-gray-600 hover:text-gray-800 transition'
                >
                  <IoChevronBack />
                </button>
                <div className='flex  bg-inherit pb-4'>
                  <Link to={`/nuevo-producto/${currentUndertaking._id}`}>
                    <IoAddCircleSharp className='text-6xl text-green-600 cursor-pointer' />
                  </Link>
                </div>
                <button
                  onClick={handleNext}
                  className='text-3xl text-gray-600 hover:text-gray-800 transition'
                >
                  <IoChevronForward />
                </button>
              </div>

            </>

          ) : (
            <div className='flex flex-col items-center justify-center col-span-4 row-span-9 text-gray-500'>
              <FaShopSlash className='text-6xl mb-4' />
              <p className='text-lg font-poppins'>No hay productos disponibles</p>
              <ProtectedComponent allowedRoles={["user"]} userRoles={roles}>
                <Link to='/nuevo-emprendimiento'>
                  <button className="bg-green-500 text-white font-poppins px-6 py-3 rounded-lg mt-4 shadow-lg hover:bg-green-600 transition-all duration-300 ease-in-out transform hover:scale-105">
                    Crear Emprendimiento
                  </button>

                </Link>
              </ProtectedComponent>
            </div>
          )}

        </div>
      </div>
    </div >
  );
}

export default Emprendimiento;
