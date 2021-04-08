# ProyectoPAE2021

## Descripción

Proyecto para la materia de Programación de Aplicaciones de Escritorio Primavera 2021. Es un proyecto para [Casa Amet](https://www.instagram.com/amet.gdl/?hl=en), la cual es un servicio de comida que _"veganiza"_ los platillos que usualmente llevan carne. Esta aplicación le daría una interfaz a los usuarios y a los administradores para poder facilitar sus pedidos y entregas.

### Interfaz para Usuarios

Esta interfaz tendría como objetivo que los usuarios pudieran conocer más acerca del equipo de Casa Amet y de cómo hacen sus productos. Si les interesa pedir algun platillo, se tendrían que registrar para poder pedirlo. Verían el menú semanal además de otros productos como los insumos o platillos por orden.

### Interfaz para Administradores

Esta otra interfaz sería una vista a qué usuarios hay, a qué dirección se les entregaría y qué producto compraron, además de poder cambiar los platillos del menú semanal.

### Bases de Datos

Se usará MongoDB como base de datos, las diferentes colecciones de datos serían:

1. Usuarios
  - Nombre
  - Email
  - Contraseña
  - Teléfono
  - Último Platillo Pedido
  - Direccion
2. Administradores
  - Nombre
  - Email
  - Contraseña
  - Teléfono
3. Platillos
  - Nombre
  - Descripción
  - Insumos Necesarios
  - Costo
4. Insumos
  - Nombre
  - Descripción
  - Costo por Medida
  - Platillos que se pueden hacer

Los Administradores tendrán los permisos necesarios para modificar los platillos y/o eliminarlos de la plataforma, mientras que los usuarios sólo tendrán permiso para ver los que sí estén en la base de datos (ya sea para comprar un sólo platillo o una orden). Este comportamiento sería igual para los Insumos. Sin embargo, los Usuarios no podrán ver a otros usuarios (esto incluye sus nombres, direcciones o compras).

## Autores

Santiago Jacobus y Miguel Aguilar
