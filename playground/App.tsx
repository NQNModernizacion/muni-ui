import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";

import "./App.css";

import { RHFInput } from "../src/components/Input/RHFInput";
import { RHFSelect } from "../src/components/Select";
import { RHFTextarea } from "../src/components/Textarea";
import { RHFCheckbox } from "../src/components/Checkbox";
import { RHFSwitch } from "../src/components/Switch";

import { Card, CardHeader, CardContent, CardFooter } from "../src/components/Card";
import { Badge } from "../src/components/Badge";
import { ButtonBase } from "../src/components/Button";

import { Modal, ModalContent, ModalFooter, ModalHeader } from "../src/components/Modal";
import { Alert } from "../src/components/Alert";
import { ToastProvider } from "../src/components/Toast/ToastProvider";
import { RHFFileInput } from "../src/components/FileInput";
import { FullscreenLoader, SpinnerBase } from "../src/components/Spinner";
import MuniSpinner from "../src/components/Spinner/MuniSpinner";
import { TableModal, type TableColumn } from "../src/components/Table";


type FormValues = {
  nombre: string;
  tipo: "a" | "b";
  descripcion: string;
  permisoA: boolean;
  permisoB: boolean;
  puedeVer: boolean;
};

function App() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      nombre: "",
      tipo: "a",
      descripcion: "",
      permisoA: true,
      permisoB: false,
      puedeVer: false,
      adjunto: null,
    },
  });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openTable, setOpenTable] = useState(false);
const [qTable, setQTable] = useState("");
const [pageTable, setPageTable] = useState(0);
const [rppTable, setRppTable] = useState(100);

type Row = { type: string; name: string; label: string };

const data: Row[] = [
  { type: "H2", name: "prioridad_ticket", label: "Ninguna" },
  { type: "H2", name: "prioridad_ticket", label: "Baja" },
  { type: "H2", name: "prioridad_ticket", label: "Media" },
  { type: "H2", name: "prioridad_ticket", label: "Alta" },
  { type: "H2", name: "prioridad_ticket", label: "Muy Alta" },
];

const filteredRows = (() => {
  const s = qTable.trim().toLowerCase();
  if (!s) return data;
  return data.filter((r) =>
    `${r.type} ${r.name} ${r.label}`.toLowerCase().includes(s)
  );
})();

const columns: Array<TableColumn<Row>> = [
  
    {
      id: "type",
      header: "H2",
      cellClassName: "text-table-header-text font-semibold",
      render: (r) => r.type,
    },
    { id: "name", header: "Name", render: (r) => r.name },
    { id: "label", header: "label", render: (r) => r.label },
];

  type FormValues = {
    // ...
    adjunto: File | null;
  };

  const onSubmit = (values: FormValues) => {
    console.log(values);
    toast.success("Guardado correctamente.");
  };


  return (
    <div className="min-h-screen bg-bg p-6 flex items-center justify-center">
      <ToastProvider />

      <div className="w-full max-w-2xl space-y-4">
        <Alert
          color="warning"
          title="Atención"
          description="Falta completar un campo obligatorio."
          endContent={<Badge>!</Badge>}
        />

        <div className="flex gap-3">
          <ButtonBase type="button" onClick={() => setOpen(true)}>
            Abrir modal
          </ButtonBase>

          <ButtonBase
            type="button"
            variant="outline"
            onClick={() => {
              toast.success("Guardado correctamente.");
              toast.warning("Falta completar un campo obligatorio.");
              toast.error("No se pudo guardar. Reintentá.");
            }}
          >
            Probar toast
          </ButtonBase>

        </div>
        <div>
          <RHFFileInput
            name="adjunto"
            control={control}
            label="Adjuntar archivo"
            description="PDF / JPG / PNG / TXT"
            accept={[".pdf", ".jpg", ".jpeg", ".png", ".txt", ".csv"]}
            preview
            previewHeight={240}
          />
        </div>
        <Modal open={open} onOpenChange={setOpen} size="md">
          <ModalHeader
            title="Confirmación"
            subtitle="Ejemplo de modal base (tokens + tailwind)"
            right={<Badge>UI</Badge>}
          />

          <ModalContent className="space-y-3">
            <div className="text-sm text-text">
              Este modal usa <span className="font-semibold">bg-surface</span>,{" "}
              <span className="font-semibold">border-border</span>,{" "}
              <span className="font-semibold">text-primary-700</span> y ring coral.
            </div>

            <div className="rounded-xl border border-border bg-bg p-4 text-sm text-muted">
              Tip: luego podemos sumar focus-trap y animaciones.
            </div>
          </ModalContent>

          <ModalFooter>
            <ButtonBase
              type="button"
              variant="outline"
              color="gray"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </ButtonBase>

            <ButtonBase type="button" color="primary" onClick={() => setOpen(false)}>
              Aceptar
            </ButtonBase>
          </ModalFooter>
        </Modal>
        <div className="min-h-screen bg-bg p-6 space-y-4">
      <MuniSpinner text="Procesando..." />

      <ButtonBase onClick={() => setLoading(true)}>
        Mostrar loader
      </ButtonBase>

      <FullscreenLoader open={loading} />
    </div>
<div>
<ButtonBase type="button" variant="outline" onClick={() => setOpenTable(true)}>
  Abrir tabla
</ButtonBase>
</div>
        <Card>
          <CardHeader
            title="Formulario"
            subtitle="Componentes base (MuniExpress)"
            right={<Badge>v0.1</Badge>}
          />

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <RHFInput
                name="nombre"
                control={control}
                label="Nombre"
                placeholder="Escribí tu nombre"
              />

              <RHFSelect
                name="tipo"
                control={control}
                label="Tipo"
                placeholder="Seleccione una opción"
                options={[
                  { value: "a", label: "Opción A" },
                  { value: "b", label: "Opción B" },
                ]}
              />

              <RHFTextarea
                name="descripcion"
                control={control}
                label="Descripción"
                placeholder="Escribí una descripción..."
                rows={5}
                helperText="Máximo 500 caracteres."
              />

              <div className="space-y-3 rounded-xl border border-border bg-bg p-4">
                <div className="text-sm font-semibold text-primary-500 text-center">
                  Permisos
                </div>

                <div className="space-y-3">
                  <RHFCheckbox
                    name="permisoA"
                    control={control}
                    label="Puede ver registros"
                    description="Permite acceder a listados y reportes."
                  />

                  <RHFCheckbox
                    name="permisoB"
                    control={control}
                    label="Puede editar permisos"
                    description="Habilita asignación de roles/permisos."
                  />
                </div>
              </div>

              <RHFSwitch
                name="puedeVer"
                control={control}
                label="Puede ver registros"
                description="Permite acceder a listados y reportes."
              />
            </CardContent>
            <TableModal<Row>
  open={openTable}
  onOpenChange={setOpenTable}
  title="Tabla ejemplo"
  rows={filteredRows}
  columns={columns}
  searchValue={qTable}
  onSearchChange={(v) => {
    setQTable(v);
    setPageTable(0);
  }}
  page={pageTable}
  rowsPerPage={rppTable}
  onPageChange={setPageTable}
  onRowsPerPageChange={setRppTable}
  getRowId={(r, i) => `${r.name}-${r.label}-${i}`}
/>

            <CardFooter>
              <ButtonBase type="submit" className="w-full">
                Guardar
              </ButtonBase>
            </CardFooter>

          </form>
        </Card>
      </div>
    </div>
  );
}

export default App;
