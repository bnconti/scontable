# Sistema contable :bank:

## Como hacer que funcione

1. Instalar [nodeJS](https://nodejs.org/es/).
2. Desde una consola, pararse en la carpeta del proyecto y ejecutar `npm update` para descargar todos los módulos y dependencias.
3. Instalar [PostgreSQL](https://www.postgresql.org/) e importar la base de datos que está en la carpeta raiz. (nombre: scontable, usuario: postgres, password: root).
4. Terminado eso, abrir dos consolas y parados en la carpeta raiz del proyecto ejecutar `ng serve` y `node server.js` para levantar la aplicación en Angular y el backend. Acceder mediante localhost:4200.