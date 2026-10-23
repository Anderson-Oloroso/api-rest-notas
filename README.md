# API REST de notas

API construida con Node.js, Express y MongoDB para crear y administrar notas.

## Requisitos

- Node.js y npm.
- MongoDB Community Server instalado y en ejecución en el equipo.
- Bruno (opcional, para enviar las solicitudes de ejemplo).

No es necesario instalar Docker. La aplicación se conecta a MongoDB en:

```text
mongodb://127.0.0.1:27017/api_notas_clase
```

La base de datos `api_notas_clase` se crea automáticamente en MongoDB cuando se guarda el primer documento.

## Instalar y ejecutar en Windows

1. Instala **MongoDB Community Server** desde la página oficial: <https://www.mongodb.com/try/download/community>. Durante la instalación, deja habilitada la opción para instalar MongoDB como servicio de Windows.
2. Comprueba que el servicio **MongoDB Server** esté iniciado. Puedes buscar “Servicios” en el menú Inicio y revisar el servicio `MongoDB`, o ejecutar PowerShell como administrador:

   ```powershell
   Get-Service MongoDB
   Start-Service MongoDB
   ```

   Si el servicio no aparece, revisa la instalación de MongoDB y asegúrate de que el servidor esté iniciado y escuchando en el puerto `27017`.
3. Abre PowerShell en la carpeta del proyecto e instala las dependencias:

   ```powershell
   npm ci
   ```

4. Inicia la API:

   ```powershell
   npm run dev
   ```

   Cuando la conexión a MongoDB tenga éxito, la API estará disponible en `http://localhost:3000`.

Si aparece `connect ECONNREFUSED 127.0.0.1:27017`, MongoDB no está iniciado o no está escuchando en ese puerto. Inicia el servicio y vuelve a ejecutar la API.

## Endpoints

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/health` | Comprueba el estado de la API. |
| `GET` | `/api/v1/preferencia` | Consulta la última categoría guardada en la cookie. |
| `GET` | `/api/v1/notas` | Lista las notas. |
| `POST` | `/api/v1/notas` | Crea una nota. |
| `GET` | `/api/v1/notas/:id` | Obtiene una nota por su ID de MongoDB. |
| `PATCH` | `/api/v1/notas/:id` | Actualiza los campos enviados de una nota. |
| `DELETE` | `/api/v1/notas/:id` | Elimina una nota. |

El cuerpo para crear una nota es JSON y requiere `titulo`, `contenido` y `categoria`:

```json
{
  "titulo": "Repasar Express",
  "contenido": "Revisar rutas y middleware.",
  "categoria": "calse"
}
```

Las categorías definidas actualmente en el modelo son `calse`, `tarea` e `idea`. Para actualizar, envía solo los campos que quieras cambiar.

## Probar con Bruno

Abre la carpeta `bruno` como colección en Bruno, selecciona el entorno `local` y ejecuta las solicitudes. El entorno configura `baseUrl` como `http://localhost:3000`. La solicitud **Crear nota** guarda el ID devuelto en la variable `notaId`, que usan las solicitudes para obtener, actualizar y eliminar una nota.

## Estado actual

La aplicación y las solicitudes están en desarrollo. En el código actual, el montaje de las rutas de notas en `src/app.js` no incluye la `/` inicial (`api/v1/notas`); además, el endpoint de preferencia usa `nunll` en lugar de `null`. Por ello, algunos endpoints documentados pueden no funcionar hasta corregir esos detalles.

---
### Creador: _Henrik Anderson Oloroso García_
### Ultima modificacion: 23/10/2026
