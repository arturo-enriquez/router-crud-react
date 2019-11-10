import React, {useState, useRef} from 'react';
import Error from './Error';

import axios from 'axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';

function EditarProducto({history, producto, setRecargarProductos}) {

  // validar si producto es indefinido, de lo contrario ir a productos
  if (!producto) {
    history.push('/productos');
    producto = {
      nombre: '',
      precio: '',
      categoria: ''
    }
  }

  // generar los refs
  const precioRef = useRef('');
  const nombreRef = useRef('');

  const [categoria, setCategoria] = useState('');
  const [error, setError] = useState(false);

  const leerValorRadio = e => {
    setCategoria(e.target.value);
  }

  const editarProducto = async e => {
    e.preventDefault();

    // Revisar si cambio la categoria de lo contrario asignar el mismo valor
    let categoriaProducto = (categoria === '') ? producto.categoria : categoria;

    // Obtener los valores del formulario
    const editarProducto = {
      precio: precioRef.current.value,
      nombre: nombreRef.current.value,
      categoria: categoriaProducto, 
    }

    // validacion de formulario
    if (editarProducto.precio === '' || editarProducto.nombre === '') {
      setError(true);
      return;
    }
    setError(false);

    // Enviar el request
    const url = `http://localhost:4000/productos/${producto.id}`;

    try {
      const res = await axios.put(url, editarProducto);
      
      if (res.status === 200) {
        Swal.fire(
          'Producto Editado',
          'El producto se edito correctamente',
          'success'
        )

        // Redirigir al usuario a productos, consultar la api
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
      <h1 className="text-center">Editar Producto</h1>

      {(error) ? <Error mensaje="Todos los campos son obligatorios" /> : null}

      <form
        onSubmit={editarProducto}
        className="mt-5"
      >
        <div className="form-group">
          <label>Nombre Platillo</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            placeholder="Nombre Platillo"
            ref={nombreRef}
            defaultValue={producto.nombre}
          />
        </div>

        <div className="form-group">
          <label>Precio Platillo</label>
          <input
            type="number"
            className="form-control"
            name="precio"
            placeholder="Precio Platillo"
            ref={precioRef}
            defaultValue={producto.precio}
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
              defaultChecked={(producto.categoria === "postre")}
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
              defaultChecked={(producto.categoria === "bebida")}
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
              defaultChecked={(producto.categoria === "cortes")}
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
              defaultChecked={(producto.categoria === "ensalada")}
            />
            <label className="form-check-label" htmlFor="ensalada">Ensalada</label>
          </div>
        </div>

        <input
          type="submit"
          className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3"
          value="Editar Producto"
        />
      </form>
    </div>
  );
}

export default withRouter(EditarProducto)
