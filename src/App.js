import React, { useState, useEffect } from "react";

const App = () => {
  const [mascota, setMascota] = useState("");
  const [duenio, setDuenio] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const citasGuardadas = JSON.parse(localStorage.getItem("citas"));
    if (citasGuardadas) {
      setCitas(citasGuardadas);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("citas", JSON.stringify(citas));
  }, [citas]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mascota && duenio && fecha && hora && sintomas) {
      const nuevaCita = {
        mascota,
        duenio,
        fecha,
        hora,
        sintomas,
      };

      setCitas([...citas, nuevaCita]);
      setMascota("");
      setDuenio("");
      setFecha("");
      setHora("");
      setSintomas("");
    } else {
      alert("Por favor, completa todos los campos");
    }
  };

  const handleDelete = (index) => {
    const nuevasCitas = [...citas];
    nuevasCitas.splice(index, 1);
    setCitas(nuevasCitas);
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4">
        Administrador Pacientes de Veterinaria
      </h1>

      <div className="card mt-4">
        <div className="card-body">
          <h2 className="card-title">Llenar el formulario para la cita</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="mascota" className="form-label">
                Nombre de Mascota
              </label>
              <input
                type="text"
                className="form-control"
                id="mascota"
                value={mascota}
                onChange={(e) => setMascota(e.target.value)}
                minLength={3}
                maxLength={80}
                placeholder="Nombre de Mascota"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="duenio" className="form-label">
                Nombre de Dueño
              </label>
              <input
                type="text"
                className="form-control"
                id="duenio"
                value={duenio}
                onChange={(e) => setDuenio(e.target.value)}
                minLength={3}
                maxLength={80}
                placeholder="Nombre de Dueño"
                required
              />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="fecha" className="form-label">
                  Fecha
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="fecha"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  placeholder="dd/mm/aaaa"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="hora" className="form-label">
                  Hora
                </label>
                <input
                  type="time"
                  className="form-control"
                  id="hora"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  placeholder="hh:mm"
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="sintomas" className="form-label">
                Síntomas
              </label>
              <textarea
                className="form-control"
                id="sintomas"
                value={sintomas}
                onChange={(e) => setSintomas(e.target.value)}
                minLength={3}
                maxLength={350}
                placeholder="Síntomas"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Agregar Nueva Cita
            </button>
          </form>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          {citas.length === 0 ? (
            <p className="text-center">No hay citas</p>
          ) : (
            citas.map((cita, index) => (
              <div className="card mb-3" key={index}>
                <div className="card-body">
                  <h5 className="card-title">Mascota: {cita.mascota}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Dueño: {cita.duenio}
                  </h6>
                  <p className="card-text">Fecha: {cita.fecha}</p>
                  <p className="card-text">Hora: {cita.hora}</p>
                  <p className="card-text">Síntomas: {cita.sintomas}</p>
                  <button
                    className="btn btn-danger float-end"
                    onClick={() => handleDelete(index)}
                  >
                    Borrar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
