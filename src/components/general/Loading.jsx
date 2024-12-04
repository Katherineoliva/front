import React from "react";
import 'ldrs/bouncy'


const Loading = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen w-full'>
      <l-bouncy
        size="150"
        speed="1.75"
        color="black"
      ></l-bouncy>
      <h2 className='text-3xl font-sans font-bold animate-bounce'>Cargando...</h2>
    </div>
  )
}

export default Loading;
