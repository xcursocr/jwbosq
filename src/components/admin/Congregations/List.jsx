import { useEffect, useState } from "react";
import { ctrlCongregation } from "../../../api/congregation";
import { DynamicTable } from "../../ui/DinamycTable";
import { MiniHeader } from "../../ui/MiniHeader";
import { LoadingDots } from "../../ui/IsLoading";
import Swal from "sweetalert2";

const controllerCongregation = new ctrlCongregation();

export default function ListCongregation() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getCongres = async () => {
    try {
      setIsLoading(true);
      const { status, results, total } =
        await controllerCongregation.getCongregations();
      setData({ results, total });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCongres();
  }, []);

  const columnasTable = [
    {
      header: "Nombre congregación",
      accessor: "name_congregation",
    },
    {
      header: "Dirección ",
      accessor: "direction_congregation",
    },
  ];

  const botones = {
    editUrl: (item) => `/admin/congregaciones/edit/${item.id_congregation}`,
    delete: (item) => {
      Swal.fire({
        title: "¿Estás seguro?",
        text: `¿Deseas eliminar a ${item.name_congregation}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          controllerCongregation
            .deleteCongregation(item.id_congregation)
            .then(() => {
              getCongres(); // Refrescamos los datos después de eliminar
              Swal.fire("Eliminado!", "Eliminado correctamente.", "success");
            })
            .catch((error) => {
              console.error("Error al eliminar:", error);
              Swal.fire("Error!", "Hubo un problema al eliminar.", "error");
            });
        }
      });
    },
  };

  if (isLoading) return <LoadingDots />;
  // console.log(data);

  return (
    <>

      <div className="mx-auto max-w-6xl py-6">
        <h2 className="text-center font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Congregaciones
        </h2>
        <p className="text-center text-xs font-semibold leading-7 text-primary-500">
          Lista de congregaciones
        </p>
      </div>

      <MiniHeader
        total={data?.total}
        text="Congregaciones registradas"
        linkTo="/admin/congregaciones/nuevo"
        linkText="Nuevo"
      />
      <DynamicTable
        columns={columnasTable}
        data={data.results}
        actions={botones}
      />
    </>
  );
}
