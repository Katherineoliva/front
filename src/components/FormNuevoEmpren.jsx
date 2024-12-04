import React, { useState } from "react";
import { Link } from "react-router-dom";
import usePost from "../hooks/usePost";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FormNuevoEmpren = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState();
  const { post } = usePost(`${import.meta.env.VITE_BASE_URL}/undertaking`);

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
        navegate("/home");
      });
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: err.message || "Error al enviar la solicitud",
        showConfirmButton: true,
        timer: 1500,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-poppins text-gray-700"
          >
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
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-poppins text-gray-700"
        >
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="py-2 px-1 shadow-sm bg-gray-200 font-poppins focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label
          htmlFor="categoria"
          className="block text-sm font-poppins text-gray-700"
        >
          Categoría
        </label>
        <select
          id="categoria"
          name="categoria"
          autoComplete="categoria"
          className="py-2 px-1 bg-gray-200 focus:ring-blue-500 focus:border-blue-500 block w-full font-poppins shadow-sm sm:text-sm border-gray-300 rounded-md"
        >
          <option value="">Seleccione una categoría</option>
          <option value="1">Alimentos</option>
          <option value="2">Artesanías</option>
          <option value="3">Servicios</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="image"
          className="block text-sm font-poppins text-gray-700"
        >
          Logo
        </label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={handleImageChange}
          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full font-poppins shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="image"
            className="mt-2 rounded-md"
            style={{ width: "200px" }}
          />
        )}
      </div>
      <div className="flex gap-3">
        <Link
          to="/emprendimiento"
          className="w-full flex justify-center bg-blue-UCA text-white font-poppins py-2 px-4 mt-4 rounded-md text-center"
        >
          Regresar
        </Link>
        <button
          type="reset"
          className="w-full bg-blue-UCA hover:bg-red-600 text-white font-poppins py-2 px-4 mt-4 rounded-md"
        >
          Limpiar
        </button>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-poppins py-2 px-4 mt-4 rounded-md"
        >
          Enviar solicitud
        </button>
      </div>
    </form>
  );
};

export default FormNuevoEmpren;
