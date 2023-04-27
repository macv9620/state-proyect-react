import React, { useState } from "react";

const SECURITY_CODE = 'paradigma'

function UseState({ name }) {
console.log('INICIO APP');
  const[state, setState] = useState({
    inputValue: '',
    error: false,
    loading: false,
  })

  // const [inputValue, setInputValue] = React.useState('');
  // const [error, setError] = React.useState(false);
  // const [loading, setLoading] = React.useState(false);

  console.log("Empezando efecto");
  React.useEffect(() => {
    const requestToBack = ()=>{

      if(state.inputValue===SECURITY_CODE){
        console.log('Contraseña correcta');
        setState({
          ...state,
          error: false,
          loading: false,
        })
      } else {
        console.log('ERROR');
        setState({
          ...state,
          error: true,
          loading: false,
        })
        console.log(state);
        //setError(true)
      }

        console.log(state);
        //setLoading(false);
        console.log("Finalizando consulta al BackEnd");
      }
    if (state.loading) {
      console.log("Iniciando consulta al BackEnd");

      setTimeout(requestToBack, 1000);
    }
  }, [state.loading]);

  console.log("Terminando efecto");

  const catchValue = (event)=>{
    setState({
      ...state,
      inputValue: event.target.value,
    })
    //setInputValue(event.target.value)
  }

  const executeCompareBackPass = ()=>{
    setState({
      ...state,
      error: false,
      loading: true,
    })
  }

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor escribe el código de seguridad</p>
      {state.error && <p>Error: el código es incorrecto</p>}
      {state.loading && <p>Loading...</p>}
      <input placeholder="Código de seguridad" value={state.inputValue} onChange={catchValue}/>
      <button onClick={executeCompareBackPass}>Comprobar</button>
    </div>
  );
}

export { UseState };
