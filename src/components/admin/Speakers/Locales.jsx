import { useState, useEffect } from "react";
import { MiniHeader } from "../../ui/MiniHeader";
import { DynamicTable } from "../../ui/DinamycTable";
import { ctrSpeakers } from "../../../api";
import Swal from "sweetalert2"; // Importamos SweetAlert2

const controllerSpeaker = new ctrSpeakers();

export function Locales() {
  const [data, setData] = useState([]);

  const getSpeakers = async () => {
    try {
      const { results } = await controllerSpeaker.getSpeakerByOrigen(1);
      setData(results);
    } catch (error) {
      console.error("Error al obtener los oradores:", error);
    }
  };

  useEffect(() => {
    getSpeakers();
  }, []);

  const columnsTable = [
    { header: "Nombre", accessor: "name_speaker" },
    { header: "Telefono", accessor: "phone_speaker" },
    {
      header: "Nombramiento",
      accessor: "type_speaker",
      render: (value) => {
        if (value === "A") return "Anciano";
        if (value === "SM") return "Siervo ministerial";
        return value;
      },
    },
    { header: "Correo", accessor: "email_speaker" },
    {
      header: "Origen",
      accessor: "local_speaker",
      render: (value) => {
        if (value === 1) return "Local";
        if (value === 0) return "Visitante";
        return value;
      },
    },
  ];

  const actionsBtn = {
    editUrl: (item) => `/admin/speakers/edit/${item.id_speaker}`,
    delete: (item) => {
      Swal.fire({
        title: "¿Estás seguro?",
        text: `¿Deseas eliminar a ${item.name_speaker}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          controllerSpeaker
            .deleteSpeaker(item.id_speaker)
            .then(() => {
              getSpeakers(); // Refrescamos los datos después de eliminar
              Swal.fire(
                "Eliminado!",
                "El orador ha sido eliminado correctamente.",
                "success"
              );
            })
            .catch((error) => {
              console.error("Error al eliminar el orador:", error);
              Swal.fire(
                "Error!",
                "Hubo un problema al eliminar el orador.",
                "error"
              );
            });
        }
      });
    },
  };

  return (
    <div className="max-w-screen-lg mx-auto p-10 dark:bg-gray-800">
      <MiniHeader
        linkText="Nuevo Orador"
        total={data.length}
        text="Oradores"
        linkTo="/admin/speakers/nuevo"
      />
      <DynamicTable columns={columnsTable} data={data} actions={actionsBtn} />
    </div>
  );
}
