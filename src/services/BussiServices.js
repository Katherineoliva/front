import axios from "axios";

export const getTarjetasAcep = async () => {
  try {
    const response = await axios.get("src/data/emprendimientos.json");
    // Filtrar solo los emprendimientos con estado "aceptado"
    const aceptados = response.data.filter(emprendimiento => emprendimiento.estado === "aceptado");
    return aceptados;
  } catch (error) {
    console.error("Error al cargar datos:", error);
  }
};

export const getTarjetasPend = async () => {
  try {
    const response = await axios.get("src/data/emprendimientos.json");
    // Filtrar solo los emprendimientos con estado "pendiente"
    const pendientes = response.data.filter(emprendimiento => emprendimiento.estado === "pendiente");
    return pendientes;
  } catch (error) {
    console.error("Error al cargar datos:", error);
  }
}

export const getTarjeta = async (id) => {
  try {
    const response = await axios.get("src/data/emprendimientos.json");
    return response.data.find((tarjeta) => tarjeta.id === id);
  } catch (error) {
    console.error("Error al cargar datos:", error);
  }
}

