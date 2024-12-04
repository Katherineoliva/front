import React from "react";
import { useState, useEffect } from "react";
import { getTarjetasAcep } from "../services/BussiServices";
import { Link } from "react-router-dom";
import Title from "./Title";
import useFetch from "../hooks/useFetch";
import Loading from "./general/Loading";

const image = 'https://img.freepik.com/vector-gratis/apoye-diseno-ilustracion-negocio-local_23-2148587057.jpg'

const Tarjetas = ({ tarjeta }) => {


  return (

    <Link key={tarjeta._id} to={`/tarjeta/${tarjeta._id}`} className='m-10'>
      <div className='bg-white shadow-lg flex m-10 rounded-lg hover:cursor-pointer'>
        <img src={tarjeta.photo || image} alt={tarjeta.name} className='w-fit h-32 object-cover object-center rounded-t-lg' />
        <div className='p-4'>
          <h2 className='text-xl font-semibold'>{tarjeta.name}</h2>
          <p className='mt-2 text-gray-600'>{tarjeta.description}</p>
        </div>
      </div>
    </Link>

  );
};

export default Tarjetas;
