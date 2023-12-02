# Backend Tienda
Desarrollo de una Aplicación Web para Gestión de Productos y Ventas

Se desarrollo una aplicación web (lado del servidor) conformada por un sistema de gestión de productos y ventas. La aplicación consta de la creación de una API REST (utilizando Node.js y MySQL) que permita a los usuarios crear, consultar, actualizar y eliminar productos y ventas. Para lograrlo, se tuvo en cuenta los siguientes pasos:

1. Se construyo un servidor HTTP utilizando Express.js.
2. Utiliza el gestor de base de datos MySQL y configura la conexión con Node.js importando el módulo mysql2.
3. La base de datos estará constituida por dos tablas:
   
  Tabla de Productos:
   - Código (clave primaria)
   - Nombre
   - Descripción
   - Precio
   - Cantidad en stock

  Tabla de Ventas:
   - Código (clave primaria)
   - Código_producto (clave foránea)
   - Nombre_cliente
   - Teléfono_cliente
   - Fecha_venta
   - Cantidad_vendida
   - Total_venta

4. La aplicación tiene las siguientes rutas de API REST:

Rutas para Productos:
   - GET /products: Consulta todos los productos.
   - GET /products/:codigo: Consulta el producto correspondiente al código.
   - POST /products: Crea un nuevo producto.
   - PATCH /products/:codigo: Actualiza el producto correspondiente al código.
   - DELETE /products/:codigo: Elimina el producto correspondiente al código.

Rutas para Ventas:
   - GET /sales: Consulta todas las ventas.
   - GET /sales/:codigo: Consulta la venta correspondiente al código.
   - POST /sales: Crea una nueva venta.
   - PATCH /sales/:codigo: Actualiza la venta correspondiente al código.
   - DELETE /sales/:codigo: Elimina la venta correspondiente al código.

5. Se asegúro incluir manejo de errores de conexión y gestión de base de datos para garantizar la robustez de la aplicación.

6. Se puede realizar peticiones de prueba utilizando herramientas como Postman o cualquier otra de tu preferencia para verificar el funcionamiento de la API.
