import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Loading from "../components/general/Loading";
import Title from "../components/Title";
import { FiCalendar } from "react-icons/fi";
import SelectedSpace from "../components/SelectedSpace";
import useFetch from "../hooks/useFetch";
import ProtectedComponent from "../components/general/ProtectedComponent";
import { AuthContext } from "../contexts/AuthContext";
import FormattedDate from "../components/general/FormattedDate";
import usePatch from "../hooks/usePatch";
import usePost from "../hooks/usePost";
import Swal from "sweetalert2";

const Eventos = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvento, setSelectedEvento] = useState(null);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [selectedUndertaking, setSelectedUndertaking] = useState(null); // Estado para el undertaking seleccionado
  const [reservedSpaces, setReservedSpaces] = useState([]); // Track reserved spaces
  const { roles } = useContext(AuthContext);
  const { data, error, loading } = useFetch(
    `${import.meta.env.VITE_BASE_URL}/event/`
  );
  const { data: me, loading: userLoading } = useFetch(
    `${import.meta.env.VITE_BASE_URL}/user/me`
  );

  const { patchData } = usePatch(`${import.meta.env.VITE_BASE_URL}/event/reservation/`)

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (me) setUser(me);
  }, [me]);

  const openModal = (evento) => {
    setSelectedEvento(evento);
    setSelectedSpace(null);
    setSelectedUndertaking(null); // Reiniciar el undertaking al abrir el modal
    setReservedSpaces(evento.reservedSpaces || []); // Assuming `reservedSpaces` is an array from the event data
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedEvento(null);
    setSelectedSpace(null);
    setSelectedUndertaking(null); // Reiniciar el undertaking al cerrar el modal
    setShowModal(false);
  };

  const handleReserve = async () => {
    if (selectedSpace !== null && selectedEvento && selectedUndertaking) {
      const updatedData = {
        undertakingId: selectedUndertaking._id,
        space: selectedSpace,
      };

      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await patchData(selectedEvento._id, updatedData, token);
        setReservedSpaces([...reservedSpaces, selectedSpace]);
        Swal.fire({
          icon: "success",
          title: "Reserva exitosa",
          text: `Reserva exitosa para el espacio ${selectedSpace + 1}`,
        })
        closeModal();

      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error al reservar el espacio",
          text: error.message || "Ocurrió un error al reservar el espacio",
        })
      }
    } else {
      alert("Por favor, selecciona un espacio y un undertaking.");
    }
  };


  if (userLoading || loading) {
    return (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-white">
        <Loading />
      </div>
    );
  }

  // Mostrar todos los espacios, pero hacer que los con state true no sean seleccionables
  const availableSpaces = selectedEvento ? selectedEvento.spaces : [];

  return (
    <div className="h-screen grid grid-cols-5 grid-rows-[1fr_10fr] ">
      <Header />
      <div className="flex col-span-5 row-span-2 h-full">
        <SideBar />
        <div className="w-full overflow-y-auto pt-4">
          <Title title="Eventos" />
          {data.length === 0 ? (
            <div className="flex flex-col items-center justify-center col-span-4 row-span-9 text-gray-500">
              <FiCalendar className="text-6xl mb-4" />
              <p className="text-lg font-poppins">No hay eventos programados</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center col-span-4 row-span-9 overflow-y-auto">
              <div className="grid grid-cols-4 gap-6 p-4">
                {data.map((evento) => (
                  <div
                    key={evento._id}
                    className="bg-white p-4 rounded hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => openModal(evento)}
                  >
                    <img
                      src={evento.image || "https://picsum.photos/id/260/200/300"}
                      alt={evento.name}
                      className="w-full h-40 object-cover rounded mb-4"
                    />
                    <h2 className="text-xl font-poppins font-semibold">
                      {evento.name}
                    </h2>
                    <FormattedDate date={evento.date} />
                    <p className="font-poppins text-gray-500">{evento.location}</p>
                    <p className="font-poppins">{evento.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <ProtectedComponent allowedRoles={["admin", "owner"]} userRoles={roles}>
            {showModal && selectedEvento && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div
                  className="bg-white p-8 rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="font-semibold font-poppins text-2xl mb-4">
                    {selectedEvento.name}
                  </p>
                  <p className="font-poppins">{selectedEvento.description}</p>
                  <p className="mt-4 font-poppins mb-4">
                    Selecciona un espacio:
                  </p>
                  <SelectedSpace
                    count={selectedEvento.quotas}
                    selectedSpace={selectedSpace}
                    onSelectSpace={setSelectedSpace}
                    reservedSpaces={reservedSpaces} // Pasa los espacios reservados
                    availableSpaces={availableSpaces} // Pasa los espacios disponibles
                  />
                  <p className="mt-4 font-poppins mb-4">
                    Selecciona un undertaking:
                  </p>
                  <div className="space-y-2">
                    {user?.undertaking?.map((undertaking) => (
                      <button
                        key={undertaking._id}
                        onClick={() => setSelectedUndertaking(undertaking)}
                        className={`block w-full text-left px-4 py-2 border rounded ${selectedUndertaking?._id === undertaking._id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                          }`}
                      >
                        {undertaking.name}
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-end space-x-2">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 font-poppins border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleReserve}
                      disabled={selectedSpace === null || !selectedUndertaking}
                      className={`px-4 py-2 rounded-md font-poppins text-white transition-colors ${selectedSpace === null || !selectedUndertaking
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                        }`}
                    >
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </ProtectedComponent>
        </div>
      </div>
    </div>
  );
};



export default Eventos;
