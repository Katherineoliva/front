import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Title from "../components/Title";
import { FaHouseLock } from "react-icons/fa6";
import useFetch from "../hooks/useFetch";
import Loading from "../components/general/Loading";
import usePatch from "../hooks/usePatch";
import ProtectedComponent from "../components/general/ProtectedComponent";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const Espacios = () => {
  const { data: espaciosData, loading: espaciosLoading } = useFetch(`${import.meta.env.VITE_BASE_URL}/space/`);
  const { data: datame, loading: dataLoading } = useFetch(`${import.meta.env.VITE_BASE_URL}/user/me`);
  const { patchData } = usePatch(`${import.meta.env.VITE_BASE_URL}/space/reservation/`);
  const { roles, isLoading } = useContext(AuthContext);

  const [espacios, setEspacios] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [selectedUndertaking, setSelectedUndertaking] = useState(null); // Nuevo estado
  const token = JSON.parse(localStorage.getItem("token"));
  const [user, setUser] = useState();

  const handleReserve = async () => {
    if (!selectedSpace || !selectedUndertaking) {
      alert("Selecciona un espacio y un undertaking válido.");
      return;
    }

    try {
      const payload = { undertakingId: selectedUndertaking };

      const res = await patchData(selectedSpace._id, payload, token);

      // Actualizar estado después de reservar
      setEspacios((prev) =>
        prev.map((espacio) =>
          espacio._id === selectedSpace._id
            ? { ...espacio, undertaking: payload.undertakingId }
            : espacio
        )
      );

      setSelectedSpace(null);
      setSelectedUndertaking(null); // Resetear selección
      alert("Espacio reservado exitosamente");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err.message || "Error al reservar",
      })

    }
  };

  const handleCancel = () => {
    setSelectedSpace(null);
    setSelectedUndertaking(null); // Resetear selección
  };

  useEffect(() => {
    if (espaciosData) setEspacios(espaciosData);
  }, [espaciosData]);

  useEffect(() => {
    if (datame) setUser(datame);
  }, [datame]);

  if (dataLoading || isLoading || espaciosLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center p-6">
        <Loading />
      </div>
    );
  }


  return (
    <div className="h-screen grid grid-cols-5 grid-rows-[1fr_10fr] ">
      <Header />
      <div className="flex col-span-5 row-span-2 h-full">
        <SideBar />
        <div className="flex flex-col justify-center gap-4 items-center w-full px-12">
          <Title title={"Espacios"} />

          {espacios.length === 0 ? (
            <div className="flex flex-col items-center justify-center col-span-4 row-span-9 text-gray-500">
              <FaHouseLock className="text-6xl mb-4" />
              <p className="text-lg font-poppins text-center">No hay espacios disponibles</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center col-span-4 row-span-9 overflow-y-auto">
              <div className="grid grid-cols-4 gap-6 p-4">
                {espacios.map((espacio) => (
                  <div
                    key={espacio._id}
                    className="bg-white p-4 rounded shadow-xl transition-shadow cursor-pointer"
                    onClick={() => setSelectedSpace(espacio)}
                  >
                    <img
                      src={espacio.image}
                      alt={espacio.name}
                      className="w-full h-40 object-cover rounded mb-4"
                    />
                    <h2 className="text-xl font-semibold">{espacio.name}</h2>
                    <p className="font-poppins">{espacio.ubication}</p>
                    {espacio.undertaking ? (
                      <p className="font-poppins">Reservado por: {espacio.undertaking.name}</p>
                    ) : (
                      <p className="font-poppins">Reservado por: Sin reserva</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <ProtectedComponent allowedRoles={["owner"]} userRoles={roles}>
        {selectedSpace && user?.undertaking?.length > 0 && selectedSpace.undertaking == null ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-xl w-1/3">
              <h2 className="text-xl font-poppins font-semibold mb-4">
                {`Acciones para: ${selectedSpace.ubication}`}
              </h2>
              <h3 className="text-lg font-poppins font-medium mb-2">Tus Undertakings:</h3>
              <ul className="mb-4">
                {user.undertaking.map((undertaking) => (
                  <li key={undertaking._id} className="border-b border-gray-200 py-2">
                    <label>
                      <input
                        type="radio"
                        name="undertaking"
                        value={undertaking._id}
                        checked={selectedUndertaking === undertaking._id}
                        onChange={() => setSelectedUndertaking(undertaking._id)}
                        className="mr-2"
                      />
                      {undertaking.name}
                    </label>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end gap-4">
                <button
                  className="bg-gray-400 font-poppins text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
                <button
                  className="bg-blue-500 text-white font-poppins px-4 py-2 rounded hover:bg-blue-700"
                  onClick={handleReserve}
                  disabled={!selectedUndertaking}
                >
                  Reservar
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </ProtectedComponent>
    </div>
  );
};

export default Espacios;
