import React from "react";

class ClassState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: false,
    };
  }

  //Para replicar el comportamiento del useEffect se deben usar métodos del ciclo del vida de los componentes construidos a partir de class

  //Se ejecuta antes de montar o renderizar el componente
  UNSAFE_componentWillMount() {
    console.log("componentWillMount");
  }

  //Se ejecuta cuando se ha montado el componente
  componentDidMount() {
    console.log("componentDidMount");
  }

  //Se ejecuta antes de desmontar el componente
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  componentDidUpdate(){
    console.log('Actualizado');
    const requestToBack = ()=>{
        this.setState({loading: false});
        console.log("Finalizando consulta al BackEnd");
    }
    if (this.state.loading) {
        console.log("Iniciando consulta al BackEnd");

      setTimeout(requestToBack, 1000);
    }
  }

  render() {
    //En este caso hay que acceder a this.props
    const { name } = this.props;
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor escribe el código de seguridad</p>

        {this.state.error && <p>Error: el código es incorrecto</p>}

        {this.state.loading && <p>Loading...</p>}

        <input placeholder="Código de seguridad" />
        <button onClick={() => this.setState({ loading: true })}>
          Comprobar
        </button>
      </div>
    );
  }
}

export { ClassState };
