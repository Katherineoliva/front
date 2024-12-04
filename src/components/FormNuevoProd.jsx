import React from "react";
import { Link } from 'react-router-dom';
import { useState } from "react";
import usePost from "../hooks/usePost";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const FormNuevoProd = ({ id }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState();
  const { post } = usePost(`${import.meta.env.VITE_BASE_URL}/product`);

  const navegate = useNavigate();


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
      setImage(null);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData(e.target);

      if (image) {
        formData.append("image", image);
      }

      const formValues = {
        undertaking: id
      };
      formData.forEach((value, key) => {
        formValues[key] = value;
      });

      const token = JSON.parse(localStorage.getItem("token"))

      const res = await post(
        formValues,
        token
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Producto publicado",
        showConfirmButton: true,
        // timer: 1500,
      }).then(() => {
        navegate("/home");
      })
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: err.message || "Error al enviar la solicitud",
        showConfirmButton: true,
        timer: 1500,
      })
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-poppins text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="given-name"
            className="py-2 px-2 bg-gray-200 focus:ring-blue-500 focus:border-blue-500 block w-full font-poppins shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-poppins text-gray-700">
            Precio
          </label>
          <div className="flex items-center bg-gray-200 rounded-md shadow-sm">
            <span className="px-2 text-gray-500 font-poppins">$</span>
            <input
              type="number"
              name="price"
              id="price"
              autoComplete="family-name"
              className="py-2 px-1 bg-gray-200 focus:ring-blue-500 focus:border-blue-500 block font-poppins w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-poppins text-gray-700">
          Descripción
        </label>
        <div className="mt-1">
          <textarea
            id="description"
            name="description"
            rows={3}
            className="py-2 px-1 shadow-sm bg-gray-200 font-poppins focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
            defaultValue={""}
          />
        </div>
      </div>
      <div>
        <label htmlFor="image" className="block text-sm font-poppins text-gray-700">
          Imagen
        </label>
        <input
          type="file"
          name="image"
          id="image"
          autoComplete="image"
          onChange={handleImageChange}
          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full font-poppins shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
        {imagePreview && (
          <div className="mt-4">
            <p className="text-sm font-poppins text-gray-700">Vista previa de la imagen:</p>
            <img src={imagePreview} alt="Vista previa" className="mt-2 w-48 h-48 object-cover rounded-md shadow-sm" />
          </div>
        )}
      </div>
      <div className="flex gap-3">
        <Link to="/emprendimiento" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-poppins text-white bg-blue-UCA hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Regresar
        </Link>
        <button
          type="reset"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-poppins text-white bg-blue-UCA hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Limpiar
        </button>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-poppins text-white bg-blue-UCA hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Publicar
        </button>
      </div>
    </form>
  );
};

export default FormNuevoProd;
