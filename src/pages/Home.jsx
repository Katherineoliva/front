import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Tarjetas from "../components/Tarjetas";
import SideBar from "../components/SideBar";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "../components/general/Loading";
import useFetch from "../hooks/useFetch";
import Title from "../components/Title";

const Home = () => {
  const { saveRoles } = useContext(AuthContext);
  const { data: me, error, loading } = useFetch(`${import.meta.env.VITE_BASE_URL}/user/me`);
  const { data: info } = useFetch(`${import.meta.env.VITE_BASE_URL}/undertaking/status/approved`);

  const [tarjetas, setTarjetas] = useState([]);

  if (error)
    console.error(error);

  useEffect(() => {
    if (info) {
      setTarjetas(info);

    }
  }, [info]);

  useEffect(() => {
    if (me) {
      saveRoles(me.Role)
    }
  }, [me, saveRoles])

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-white">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className='h-screen grid grid-cols-5 grid-rows-[1fr_10fr] '>
        <Header />
        <div className='flex col-span-5 row-span-2 h-full'>
          <SideBar />

          <div className='w-full overflow-y-auto pt-4'>
            <Title title={'Emprendimientos'} />
            {
              tarjetas.map((tarjeta) => (
                <Tarjetas key={tarjeta._id} tarjeta={tarjeta} />
              ))
            }
          </div >

        </div>
      </div >
    </>
  );
}

export default Home;
