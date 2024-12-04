import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import Header from '../components/Header';
import Title from "../components/Title";
import { AiTwotoneExclamationCircle } from 'react-icons/ai';
import 'sweetalert2/dist/sweetalert2.min.css';
import SideBar from "../components/SideBar";
import useFetch from "../hooks/useFetch";
import Loading from "../components/general/Loading";
import usePatch from "../hooks/usePatch";

const Solicitudes = () => {
  const { data, error, loading } = useFetch(`${import.meta.env.VITE_BASE_URL}/undertaking/status/pending`);
  const { patchData } = usePatch(`${import.meta.env.VITE_BASE_URL}/undertaking/status/`);
  const [solicitudes, setSolicitudes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);


  useEffect(() => {
    if (data) {
      setSolicitudes(data);
    }
  }, [data]);

  const openModal = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setShowModal(true);
  }

  const closeModal = () => {
    setSelectedSolicitud(null);
    setShowModal(false);
  }

  const token = JSON.parse(localStorage.getItem("token"));

  const handleAccept = () => {
    Swal.fire({
      title: '<span class="font-poppins">¿Estás seguro?</span>',
      html: `<p class="font-poppins">¿Quieres aceptar la solicitud de <strong>${selectedSolicitud.name}</strong>?</p>`,
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: '<span class="font-poppins">Sí, aceptar</span>',
      cancelButtonText: '<span class="font-poppins">Cancelar</span>',
    }).then((result) => {
      if (result.isConfirmed) {
        patchData(selectedSolicitud._id, { status: "approved" }, token)
          .then(() => {
            setSolicitudes((prevSolicitudes) =>
              prevSolicitudes.filter((solicitud) => solicitud._id !== selectedSolicitud._id)
            );
            Swal.fire({
              title: '<span class="font-poppins">¡Aceptada!</span>',
              html: `<p class="font-poppins">La solicitud de <strong>${selectedSolicitud.name}</strong> ha sido aceptada.</p>`,
              icon: 'success',
            });
            closeModal();
          })
          .catch((err) => {
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al aceptar la solicitud.',
              icon: 'error',
            });
          });
      }
    });
  };

  const handleReject = () => {
    Swal.fire({
      title: '<span class="font-poppins">¿Estás seguro?</span>',
      html: `<p class="font-poppins">¿Quieres rechazar la solicitud de <strong>${selectedSolicitud.name}</strong>?</p>`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#28a745',
      confirmButtonText: '<span class="font-poppins">Sí, rechazar</span>',
      cancelButtonText: '<span class="font-poppins">Cancelar</span>',
    }).then((result) => {
      if (result.isConfirmed) {
        patchData(selectedSolicitud._id, { status: "rejected" }, token)
          .then(() => {
            setSolicitudes((prevSolicitudes) =>
              prevSolicitudes.filter((solicitud) => solicitud._id !== selectedSolicitud._id)
            );
            Swal.fire({
              title: '<span class="font-poppins">Rechazada</span>',
              html: `<p class="font-poppins">La solicitud de <strong>${selectedSolicitud.name}</strong> ha sido rechazada.</p>`,
              icon: 'error',
            });
            closeModal();
          })
          .catch((err) => {
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al rechazar la solicitud.',
              icon: 'error',
            });
          });
      }
    });
  }

  if (loading)
    return Loading;

  return (
    <>
      <div className='h-screen grid grid-cols-5 grid-rows-[1fr_10fr] '>
        <Header />
        <div className='flex col-span-5 row-span-2 h-full'>
          <SideBar />
          <main className="container mx-auto px-4 py-8 overflow-y-auto qq">
            <Title title="Solicitudes" />

            {Array.isArray(solicitudes) && solicitudes.map((solicitud) => (
              <div key={solicitud._id} className='group/item hover:bg-slate-100  bg-white shadow-lg flex justify-between m-10 rounded-lg'>
                <div className="flex">
                  <img src={solicitud.photo} alt={solicitud.name} className='w-fit h-32 object-cover object-center rounded-t-lg' />
                  <div className='p-4'>
                    <h2 className='text-xl font-poppins font-semibold'>{solicitud.name}</h2>
                    <p className='mt-2 text-gray-600 font-poppins'>{solicitud.description}</p>
                  </div>
                </div>
                {/* Icono que al hacer hover aparece */}
                <div className='group/edit invisible group-hover/item:visible  flex items-center justify-center p-4'>
                  <AiTwotoneExclamationCircle
                    className='text-red-600 cursor-pointer text-5xl'
                    onClick={() => openModal(solicitud)} />
                </div>
              </div>
            ))}

            {/* MODAL ON CLICK ICON */}
            {showModal && (
              <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'
                onClick={closeModal}>
                <div className='bg-white p-8 rounded-lg'>
                  <img src={selectedSolicitud.photo} alt={selectedSolicitud.name} className='w-full h-64 object-cover object-center rounded-lg' />
                  <h2 className='text-xl font-semibold font-poppins'>{selectedSolicitud.name}</h2>
                  <p className='mt-2 text-gray-600 font-poppins'>{selectedSolicitud.description}</p>
                  <div className="flex flex-col">
                    <p className='mt-2 text-gray-600 font-poppins'>{selectedSolicitud.dueno}</p>
                    <p className='mt-2 text-gray-600 underline underline-offset-4 font-poppins'>{selectedSolicitud.correo}</p>
                  </div>

                  <div className="flex justify-around">
                    <button className='bg-red-600 text-white px-4 py-2 mt-4 rounded-lg font-poppins' onClick={handleReject}>Rechazar</button>
                    <button className='bg-green-600 text-white px-4 py-2 mt-4 rounded-lg font-poppins' onClick={handleAccept}>Aceptar</button>
                  </div>
                </div>
              </div>
            )}


          </main>
        </div>
      </div >
    </>
  )
}

export default Solicitudes;
