import React from 'react';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Title from '../components/Title';
import bgEventos from '../assets/Eventos.png';
import bgEspacios from '../assets/Espacios.png';
import { Link } from 'react-router-dom';

const EspaciosEventos = () => {

  // return (
  //     <div className='max-h-screen grid grid-cols-5 grid-rows-10 '>
  //         <Header />
  //         <SideBar />
  //         <Title title='Eventos & Espacios' />
  //         <div className='col-span-4 row-span-8 grid grid-cols-2 gap-4 p-6'>
  //             <Link to='/eventos'
  //                 className="relative border-solid border-2 border-black row-span-8 col-span-2 flex items-center justify-center rounded-xl hover:bg-cover hover:bg-center cursor-pointer"
  //                 style={{ backgroundImage: `url(${bgEventos})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'background-image 0.5s ease' }}
  //                 onMouseEnter={(e) => e.currentTarget.style.backgroundImage = `url(${bgEventos})`}
  //                 onMouseLeave={(e) => e.currentTarget.style.backgroundImage = 'none'}
  //                 >
  //                 {/* Superposición de color */}
  //                 <div className="absolute inset-0 bg-blue-500 bg-opacity-75 transition-opacity duration-200 rounded-xl opacity-0 hover:opacity-100"></div>
  //                 <p className="text-2xl font-poppins text-black z-10 font-bold e">EVENTOS</p>
  //             </Link>
  //             <Link to='/espacios'
  //                 className="relative border-solid border-2 border-black row-span-8 col-span-2 flex items-center justify-center rounded-xl hover:bg-cover hover:bg-center cursor-pointer"
  //                 style={{ backgroundImage: `url(${bgEspacios})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'background-image 0.5s ease' }}
  //                 onMouseEnter={(e) => e.currentTarget.style.backgroundImage = `url(${bgEspacios})`}
  //                 onMouseLeave={(e) => e.currentTarget.style.backgroundImage = 'none'}>
  //                 {/* Superposición de color */}
  //                 <div className="absolute inset-0 bg-green-500 bg-opacity-75 transition-opacity duration-200 rounded-xl opacity-0 hover:opacity-100"></div>
  //                 <p className="text-2xl font-poppins text-black z-10 font-bold ">ESPACIOS</p>
  //             </Link>
  //         </div>
  //     </div>
  // );
  //
  //
  return (
    <>
      <div className='h-screen grid grid-cols-5 grid-rows-[1fr_10fr] '>
        <Header />
        <div className='flex col-span-5 row-span-2 h-full'>
          <SideBar />
          <div className='flex flex-col justify-center gap-4 items-center w-full px-12'>
            <Title title={'Eventos'} />
            <Link to='/eventos'
              className="relative border-solid w-52 h-36 sm:w-8/12 sm:h-52  border-2 border-black row-span-8 col-span-2 flex items-center justify-center rounded-xl hover:bg-cover hover:bg-center cursor-pointer"
              style={{ backgroundImage: `url(${bgEventos})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'background-image 0.5s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundImage = `url(${bgEventos})`}
              onMouseLeave={(e) => e.currentTarget.style.backgroundImage = 'none'}
            >
              {/* Superposición de color */}
              <div className="absolute inset-0 bg-blue-500 bg-opacity-75 transition-opacity duration-200 rounded-xl opacity-0 hover:opacity-100"></div>
              <p className="text-2xl font-poppins text-black z-10 font-bold e">EVENTOS</p>
            </Link>
            <Link to='/espacios'
              className="relative border-solid  w-52 h-36 sm:w-8/12 sm:h-52 border-2 border-black row-span-8 col-span-2 flex items-center justify-center rounded-xl hover:bg-cover hover:bg-center cursor-pointer"
              style={{ backgroundImage: `url(${bgEspacios})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'background-image 0.5s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundImage = `url(${bgEspacios})`}
              onMouseLeave={(e) => e.currentTarget.style.backgroundImage = 'none'}>
              {/* Superposición de color */}
              <div className="absolute inset-0 bg-green-500 bg-opacity-75 transition-opacity duration-200 rounded-xl opacity-0 hover:opacity-100"></div>
              <p className="text-2xl font-poppins text-black z-10 font-bold ">ESPACIOS</p>
            </Link>
          </div>
        </div>
      </div >
    </>
  )
}

export default EspaciosEventos;
