import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import useFetch from "../hooks/useFetch";
import usePatch from "../hooks/usePatch";
import usePost from "../hooks/usePost";
import Loading from "./general/Loading";
import { TfiMarker } from "react-icons/tfi";
import { FaShopSlash } from "react-icons/fa6";
import Title from "./Title";

const TarjetaDetalle = () => {
  const { id } = useParams();
  const { data, error, loading } = useFetch(
    `${import.meta.env.VITE_BASE_URL}/undertaking/${id}`
  );
  const {
    data: comments,
    error: commentError,
    loading: loadingError,
  } = useFetch(`${import.meta.env.VITE_BASE_URL}/comment/${id}`);

  const token = JSON.parse(localStorage.getItem("token"));
  const [tarjeta, setTarjeta] = useState();
  const [comentarios, setComentarios] = useState([]); // Nuevo estado para manejar comentarios
  const [nuevoComentario, setNuevoComentario] = useState(""); // Para manejar el texto del comentario

  useEffect(() => {
    if (data) {
      setTarjeta(data);
      setComentarios(comments || []); // Suponiendo que los comentarios están en `data.comments`
    }
  }, [data, comments]);

  const { patchData: likePost } = usePatch(
    `${import.meta.env.VITE_BASE_URL}/undertaking/like/`
  );

  const { patchData: dislike } = usePatch(
    `${import.meta.env.VITE_BASE_URL}/undertaking/disLike/`
  );
  const { post: comment } = usePost(
    `${import.meta.env.VITE_BASE_URL}/comment/`
  );

  const likeHandler = async () => {
    try {
      const response = await likePost(id, {}, token);

      if (response && response.likes) {
        setTarjeta((prev) => ({
          ...prev,
          likes: response.likes,
        }));
      } else {
        console.error("Respuesta del servidor no contiene likes:", response);
      }
    } catch (e) {
      console.error("Error al procesar el like:", e);
    }
  };

  const dislikeHandler = async () => {
    try {
      const response = await dislike(id, {}, token);

      if (response && response.dislikes) {
        setTarjeta((prev) => ({
          ...prev,
          dislikes: response.dislikes,
        }));
      } else {
        console.error("Respuesta del servidor no contiene dislikes:", response);
      }
    } catch (e) {
      console.error("Error al procesar el dislike:", e);
    }
  };

  const handleComentarioChange = (e) => {
    setNuevoComentario(e.target.value); // Actualiza el estado del nuevo comentario
  };

  const handleComentarioSubmit = async () => {
    if (nuevoComentario.trim() !== "") {
      const nuevoComentarioObj = {
        userId: { name: "" },
        undertakingId: id,
        description: nuevoComentario,
      };

      setComentarios((prevComentarios) => [
        ...prevComentarios,
        nuevoComentarioObj,
      ]);

      const newComment = { description: nuevoComentario, undertakingId: id };
      const response = await comment(newComment, token);

      setNuevoComentario(""); // Limpia el campo de texto después de enviar el comentario
    }
  };

  if (loading || !tarjeta) {
    return (
      <div className="w-full h-screen flex justify-center items-center p-6">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-h-screen grid grid-cols-5 grid-rows-[1fr_10fr] ">
      <Header />
      <div className="flex flex-col items-center md:items-start md:flex-row gap-2 col-span-5 md:pl-16 ">
        <div className="w-44 md:w-2/6 h-fit mt-2 md:mt-16 p-1 flex flex-col items-center justify-center rounded-lg shadow-lg">
          <img
            src={tarjeta.photo}
            alt={tarjeta.name}
            className="object-cover object-center rounded-lg shadow-lg"
          />
          <div className="flex flex-row justify-around items-center w-full">
            <div>
              <h2 className="text-3xl font-semibold">{tarjeta.name}</h2>
              <p className="mb-1 text-gray-600">{tarjeta.description}</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1 text-gray-600">
                <button
                  className="hover:text-green-500 flex items-center focus:outline-none"
                  onClick={likeHandler}
                >
                  👍
                </button>
                <span className="text-sm">{tarjeta.likes.length}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-600">
                <button
                  className="hover:text-red-500 flex items-center focus:outline-none"
                  onClick={dislikeHandler}
                >
                  👎
                </button>
                <span className="text-sm">
                  {tarjeta && tarjeta.dislikes ? tarjeta.dislikes.length : 0}
                </span>
              </div>
            </div>
          </div>

          {/* Formulario de comentarios */}
          <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-6 pt-2 space-y-4 font-poppins ">
            <label
              htmlFor="comment"
              className="block text-lg font-medium text-gray-700"
            >
              💬 Escribe un comentario
            </label>
            <div className="flex flex-row items-center gap-1">
              <textarea
                id="comment"
                rows="2"
                className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 placeholder-gray-400 text-sm resize-none"
                placeholder="Comparte tu opinión aquí..."
                value={nuevoComentario}
                onChange={handleComentarioChange}
              ></textarea>
              <div className="flex items-center justify-between">
                <button
                  className="px-5 py-2 bg-blue-UCA text-white text-sm font-medium rounded-lg shadow hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-UCA"
                  onClick={handleComentarioSubmit}
                >
                  Publicar
                </button>
              </div>
            </div>
          </div>

          {/* Mostrar los comentarios */}
          <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-6 pt-2 space-y-4 font-poppins overflow-auto max-h-24">
            <h3 className="text-xl font-medium text-gray-700">Comentarios</h3>
            {comentarios.length > 0 ? (
              comentarios.map((comentario, index) => (
                <div key={index} className="border-t border-gray-200 pt-2 mt-2">

                  <p className="text-gray-700 font-semibold text-xs">
                    {comentario.userId.name}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {comentario.description}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No hay comentarios todavía.</p>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col md:pt-2">
          <Title title="Productos" />
          <div className="flex flex-wrap w-full justify-center h-[85.5vh] gap-3 md:gap-6 pt-2 md:p-4 overflow-y-auto">
            {tarjeta.products && tarjeta.products.length > 0 ? (
              tarjeta.products.map((product) => (
                <div
                  key={product._id}
                  className="h-fit bg-white p-4 rounded shadow"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <p>{product.description}</p>
                  <p>Precio: ${product.price}</p>
                </div>
              ))
            ) : (
              <div className="flex flex-col justify-center items-center w-full h-full gap-6 bg-gray-200 p-4">
                <FaShopSlash className="text-6xl mb-4" />
                <p className="text-lg font-poppins">
                  No hay productos disponibles
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TarjetaDetalle;
