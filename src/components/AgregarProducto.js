import React, {useState} from "react";
import Error from './Error';
import axios from 'axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';

function AgregarProducto({history, setRecargarProductos}) {

  const [platillo, setPlatillo] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [error, setError] = useState(false);

  const leerValorRadio = e => {
    setCategoria(e.target.value);
  }

  const agregarProducto = async e => {
    e.preventDefault();

    if (platillo==='' || precio==='' || categoria==='') {
      setError(true);
      return;
    }

    setError(false);

    // Crear el nuevo producto
    try {
      const res = await axios.post('http://localhost:4000/productos', {
        nombre: platillo,
        precio,
        categoria
      });

      if (res.status === 201) {
        Swal.fire(
          'Producto Creado',
          'El producto se creo correctamente',
          'success'
        )

        // Redirigir al usuario a productos
        setRecargarProductos(true);
        history.push('/productos');
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error, vuelve a intentarlo'
      })
    }
  }

  return (
    <div className="col-md-8 mx-auto ">
      <h1 className="text-center">Agregar Nuevo Producto</h1>

      {(error) ? <Error mensaje="Todos los campos son obligatorios" /> : null}

      <form
        onSubmit={agregarProducto}
        className="mt-5"
      >
        <div className="form-group">
          <label>Nombre Platillo</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            placeholder="Nombre Platillo"
            onChange={ e => setPlatillo(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Precio Platillo</label>
          <input
            type="number"
            className="form-control"
            name="precio"
            placeholder="Precio Platillo"
            onChange={ e => setPrecio(e.target.value)}
          />
        </div>

        <legend className="text-center">Categoría:</legend>
        <div className="text-center">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="categoria"
              value="postre"
              id="postre"
              onChange={leerValorRadio}
            />
            <label className="form-check-label" htmlFor="postre">Postre</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="categoria"
              value="bebida"
              id="bebida"
              onChange={leerValorRadio}
            />
            <label className="form-check-label" htmlFor="bebida">Bebida</label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="categoria"
              value="cortes"
              id="cortes"
              onChange={leerValorRadio}
            />
            <label className="form-check-label" htmlFor="cortes">Cortes</label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="categoria"
              value="ensalada"
              id="ensalada"
              onChange={leerValorRadio}
            />
            <label className="form-check-label" htmlFor="ensalada">Ensalada</label>
          </div>
        </div>

        <input
          type="submit"
          className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3"
          value="Agregar Producto"
        />
      </form>
    </div>
  );
}

export default withRouter(AgregarProducto);
