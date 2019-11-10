import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';

// Components
import Header from './components/Header'
import Productos from './components/Productos'
import EditarProducto from './components/EditarProducto'
import AgregarProducto from './components/AgregarProducto'
import Producto from './components/Producto'

function App() {

  const [productos, setProductos] = useState([]);
  const [recargarProductos, setRecargarProductos] = useState(true);
  
  useEffect(() => {
    if (recargarProductos) {
      const consultarAPI = async () => {
        // consultar api de json-server
        const url = 'http://localhost:4000/productos';
        const res = await axios.get(url);
        
        setProductos(res.data);
      }
      consultarAPI();

      // cambiar a false la recarga de los productos
      setRecargarProductos(false);
    }
  }, [recargarProductos]);

  return (
    <Router>
      <Header />
      <main className="container mt-5">
        <Switch>
          <Route exact path="/productos" render={() =>
            <Productos
              productos={productos}
              setRecargarProductos={setRecargarProductos}
            />
          }/>
          <Route exact path="/nuevo" render={() =>
            <AgregarProducto
              setRecargarProductos={setRecargarProductos}
            />
          }/>
          <Route exact path="/productos/id" component={Producto}/>
          <Route exact path="/productos/editar/:id" render={props => {
            // tomar el ID del producto
            const idProducto = parseInt(props.match.params.id);
            // el producto que se pasa al state
            const producto = productos.filter(producto => producto.id === idProducto);

            return <EditarProducto
              producto={producto[0]}
              setRecargarProductos={setRecargarProductos}
            />
          }}/>
        </Switch>
      </main>

      <p className="mt-4 p2 text-center">Todos los derechos Reservados</p>
    </Router>
  );
}

export default App;
