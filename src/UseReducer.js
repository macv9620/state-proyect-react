import { useReducer } from "react";
import React from "react";

const SECURITY_CODE = "paradigma";

function UseReduce({ name }) {
  console.log("INICIO APP");

  const [state, dispatch] = useReducer(reducer, initialState);

  console.log("Empezando efecto");

  React.useEffect(() => {
    const requestToBack = () => {
      if (state.inputValue === SECURITY_CODE) {
        console.log("Contraseña correcta");
        dispatch({
          type: "CONFIRM",
        });
        // onConfirm();
      } else {
        console.log("ERROR");
        dispatch({
          type: "ERROR",
        });
        // onError();
        console.log(state);
      }

      console.log(state);
      console.log("Finalizando consulta al BackEnd");
    };
    if (state.loading) {
      console.log("Iniciando consulta al BackEnd");

      setTimeout(requestToBack, 1000);
    }
  }, [state.loading]);

  console.log("Terminando efecto");


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
          onChange={(event)=>{
            dispatch({
                type: 'WRITE',
                payload: event.target.value
            })
          }}
        />
        <button
          onClick={() =>
            dispatch({
              type: "CHECK",
            })
          }
        >
          Comprobar
        </button>
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
              dispatch({
                type: "DELETE",
              });
              //   onDelete();
            }}
          >
            Sí, eliminar
          </button>
          <button
            onClick={() => {
              dispatch({
                type: "RESET",
              });
              //   onReset();
            }}
          >
            No, volver
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h2>Ítem eliminado</h2>
        <button
          onClick={() => {
            dispatch({
              type: "RESET",
            });
            // onReset();
          }}
        >
          Volver a inicio
        </button>
      </>
    );
  }
}

const initialState = {
  inputValue: "paradigma",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

const reducerObject = (state, payload) => {
  return {
    CONFIRM: {
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    },
    ERROR: {
      ...state,
      error: true,
      loading: false,
    },
    CHECK: {
      ...state,
      error: false,
      loading: true,
    },
    DELETE: {
      ...state,
      deleted: true,
    },
    WRITE: {
      ...state,
      inputValue: payload,
    },
    RESET: {
      ...state,
      confirmed: false,
      deleted: false,
      inputValue: "",
    },
  };
};

const reducer = (state, action) => {
  if (reducerObject(state, action.payload)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};

export { UseReduce };
