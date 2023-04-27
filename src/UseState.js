import React from "react";

function UseState({ name }) {
  const [inputValue, setInputValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  console.log("Empezando efecto");
  React.useEffect(() => {
    const requestToBack = ()=>{
        setLoading(false);
        console.log("Finalizando consulta al BackEnd");
      }
    if (loading) {
      console.log("Iniciando consulta al BackEnd");

      setTimeout(requestToBack, 1000);
    }
  }, [loading]);

  console.log("Terminando efecto");

  const catchValue = (event)=>{
    setInputValue(event.target.value)
  }

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor escribe el código de seguridad</p>
      {error && <p>Error: el código es incorrecto</p>}
      {loading && <p>Loading...</p>}
      <input placeholder="Código de seguridad" value={inputValue} onChange={catchValue}/>
      <button onClick={() => setLoading(true)}>Comprobar</button>
    </div>
  );
}

export { UseState };
