import React from "react";
import Header from "../components/Header";
import Title from "../components/Title";
import SideBar from "../components/SideBar";
import usePost from "../hooks/usePost";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const NuevoEvento = () => {
  const { post } = usePost(`${import.meta.env.VITE_BASE_URL}/event/`);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const formValues = {};
      formData.forEach((value, key) => {
        formValues[key] = value;
      });
      const token = JSON.parse(localStorage.getItem("token"));

      const res = await post(formValues, token);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Solicitud enviada",
        showConfirmButton: true,
        timer: 1500,
      }).then(() => {
        navigate("/home");
      });
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al enviar la solicitud",
        showConfirmButton: true,
        timer: 1500,
      });
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Perderás los cambios realizados en el formulario y regresarás a la página de eventos",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, salir",
      cancelButtonText: "No, permanecer aquí",
      customClass: {
        title: "font-poppins",
        htmlContainer: "font-poppins",
        confirmButton: "font-poppins",
        cancelButton: "font-poppins",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/eventos");
      }
    });
  };
  

  return (
    <div className="h-screen grid grid-cols-5 grid-rows-[1fr_10fr]">
      <Header />
      <div className="flex col-span-5 row-span-2 h-full">
        <SideBar />
        <div className="w-full overflow-y-auto pt-4">
          <Title title="Nuevo evento" />
          <div className="col-span-4 row-span-7 p- overflow-y-auto">
            <form
              className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden font-poppins"
              onSubmit={handleSubmit}
            >
              <div className="p-8 space-y-6">
                {/* Título */}
                <h2 className="text-xl font-semibold text-gray-800">Crear Evento</h2>

                {/* Nombre del evento */}
                <div className="space-y-2">
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-600">
                    Nombre del evento
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="name"
                    placeholder="Ingrese el nombre del evento"
                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm placeholder-gray-400 shadow-sm
                   focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                {/* Fecha y Hora */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="fecha" className="block text-sm font-medium text-gray-600">
                      Fecha
                    </label>
                    <input
                      type="date"
                      id="fecha"
                      name="date"
                      className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm shadow-sm placeholder-gray-400
                     focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="hora" className="block text-sm font-medium text-gray-600">
                      Hora
                    </label>
                    <input
                      type="time"
                      id="hora"
                      name="time"
                      className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm shadow-sm placeholder-gray-400
                     focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                </div>

                {/* Lugar y Espacios */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="lugar" className="block text-sm font-medium text-gray-600">
                      Lugar
                    </label>
                    <input
                      type="text"
                      id="lugar"
                      name="location"
                      placeholder="Ingrese el lugar del evento"
                      className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm shadow-sm placeholder-gray-400
                     focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="espacio" className="block text-sm font-medium text-gray-600">
                      Espacios
                    </label>
                    <input
                      type="number"
                      id="espacio"
                      name="quotas"
                      placeholder="Cantidad de espacios disponibles"
                      className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm shadow-sm placeholder-gray-400
                     focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                </div>

                {/* Descripción */}
                <div className="space-y-2">
                  <label htmlFor="descripcion" className="block text-sm font-medium text-gray-600">
                    Descripción
                  </label>
                  <textarea
                    id="descripcion"
                    name="description"
                    rows="4"
                    placeholder="Ingrese una breve descripción del evento"
                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm shadow-sm placeholder-gray-400
                   focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  ></textarea>
                </div>
              </div>

              {/* Botones de Cancelar y Guardar */}
              <div className="flex items-center justify-between px-8 py-4 bg-gray-50">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold text-sm rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-sky-500 text-white font-semibold text-sm rounded-lg shadow-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoEvento;
