import { computeHeadingLevel } from "@testing-library/react";
import React from "react";

const SECURITY_CODE = 'paradigma'

class ClassState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
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

        if(this.state.value === SECURITY_CODE){
            console.log('Contraseña correcta');
            this.setState({error: false})
        } else {
          this.setState({error: true})
        }

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

        {(this.state.error && !this.state.loading) && <p>Error: el código es incorrecto</p>}

        {this.state.loading && <p>Loading...</p>}

        <input 
        placeholder="Código de seguridad"
        value={this.state.value}
        onChange={(event)=>{
          this.setState({value: event.target.value})

        }}
         />
        <button onClick={() => this.setState({ loading: true })}>
          Comprobar
        </button>
      </div>
    );
  }
}

export { ClassState };
