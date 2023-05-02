import React, { useState } from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
  console.log("INICIO APP");
  const [state, setState] = useState({
    inputValue: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  // const [inputValue, setInputValue] = React.useState('');
  // const [error, setError] = React.useState(false);
  // const [loading, setLoading] = React.useState(false);

  console.log("Empezando efecto");

  //Funciones declarativas

  const onConfirm = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    });
  };

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false,
    });
  };

  const onWrite = (event) => {
    setState({
      ...state,
      inputValue: event.target.value,
    });
  };

  const onCheck = () => {
    setState({
      ...state,
      error: false,
      loading: true,
    });
  };

  const onDelete = ()=>{
    setState({
      ...state,
      deleted: true,
    });
  }

  const onReset = ()=>{
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      inputValue: "",
    });
  }

  React.useEffect(() => {
    const requestToBack = () => {
      if (state.inputValue === SECURITY_CODE) {
        console.log("Contraseña correcta");
        onConfirm();
      } else {
        console.log("ERROR");
        onError();
        console.log(state);
        //setError(true)
      }

      console.log(state);
      //setLoading(false);
      console.log("Finalizando consulta al BackEnd");
    };
    if (state.loading) {
      console.log("Iniciando consulta al BackEnd");

      setTimeout(requestToBack, 1000);
    }
  }, [state.loading]);

  console.log("Terminando efecto");

  const catchValue = (event) => {
    onWrite(event);
    //setInputValue(event.target.value)
  };

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor escribe el código de seguridad</p>
        {state.error && <p>Error: el código es incorrecto</p>}
        {state.loading && <p>Loading...</p>}
        <input
          placeholder="Código de seguridad"
          value={state.inputValue}
          onChange={catchValue}
        />
        <button onClick={onCheck}>Comprobar</button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <>
        <h2>Confirmar eliminación</h2>
        <p>¿Seguro que deseas eliminar la información?</p>
        <div>
          <button
            onClick={() => {
              onDelete()
            }}
          >
            Sí, eliminar
          </button>
          <button
            onClick={() => {
              onReset()
            }}
          >
            No, volver
          </button>
        </div>
      </>
    );
  } else {
    //si ambos son true
    return (
      <>
        <h2>Ítem eliminado</h2>
        <button
          onClick={() => {
            onReset()
          }}
        >
          Volver a inicio
        </button>
      </>
    );
  }
}

export { UseState };
