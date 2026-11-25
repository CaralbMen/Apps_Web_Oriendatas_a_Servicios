# PracticaDB2: API sin autenticacion

Esta copia mantiene la base de datos y la logica de productos de `PracticaDB`,
pero sus rutas no requieren token, API key ni rol. Los productos se consultan y
modifican sin filtrar por usuario. El login y la emision de tokens no estan
expuestos en esta copia.

Por seguridad, el servidor solo escucha en `127.0.0.1`. No la expongas a una
red ni a internet.

Desde PowerShell, en esta carpeta:

```powershell
pnpm install
$env:PRACTICADB2_PORT = "4001"
pnpm start
```

En Postman, prueba `GET http://127.0.0.1:4001/api/productos` sin el encabezado
`Authorization`. Para cambiar el puerto usa la variable `PRACTICADB2_PORT`.
La ruta no tiene rate limit.

La carpeta `.env` se copia para reutilizar la conexion local configurada. No
compartas ese archivo; contiene credenciales de la base de datos.
