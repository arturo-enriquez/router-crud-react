import React from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';
import Swal from 'sweetalert2';

function ProductoLista({producto, setRecargarProductos}) {

  const {id, nombre, precio, categoria} = producto;

  const eliminarProducto = id => {
    // TODO: Eliminar los registros
    Swal.fire({
      title: '¿Estas Seguro?',
      text: "Un producto eliminado no se puede recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result)  => {
      if (result.value) {
        try {
          const url = `http://localhost:4000/productos/${id}`;
          const res = await axios.delete(url);

          if (res.status === 200) {
            Swal.fire(
              'Eliminado!',
              'El Producto se ha eliminado',
              'success'
            )
            // Consultar la api nuevamente
            setRecargarProductos(true);
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
    })
  }

  return (
    <li 
      data-categoria={categoria}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      <p>
        {nombre} {' '}
        <span className="font-weight-bold">${precio}</span>
      </p>
      <div>
        <Link
          to={`/productos/editar/${id}`}
          className="btn btn-success mx-2"
        >Editar</Link>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => eliminarProducto(id)}
        >Eliminar &times;</button>
      </div>
    </li>
  )
}

export default ProductoLista
