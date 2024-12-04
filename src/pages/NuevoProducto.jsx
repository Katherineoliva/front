import Header from '../components/Header';
import Title from "../components/Title";
import FormNuevoProd from "../components/FormNuevoProd";
import { useParams } from 'react-router-dom';

const NuevoProducto = () => {

  const { id } = useParams();

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Title title="Información de nuevo producto" />
        <FormNuevoProd id={id} />
      </main>
    </div>
  );
};

export default NuevoProducto;
