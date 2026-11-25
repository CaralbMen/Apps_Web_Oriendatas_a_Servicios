Guia_endpoints

Direcciones base

| Proyecto | Dirección base | Puerto predeterminado |
| --- | --- | --- |
| `PracticaDB` (API segura) | `http://localhost:4000/api` | `4000` (`PORT`) |
| `PracticaDB2` (API sin autenticación) | `http://127.0.0.1:4001/api` | `4001` (`PRACTICADB2_PORT`) |

En las tablas, concatena la ruta indicada con la dirección base correspondiente.
Por ejemplo, `GET /productos` en `PracticaDB` es
`http://localhost:4000/api/productos`.

Requisitos para usar la API segura (`PracticaDB`)

- Configura en `.env` las variables de conexión a PostgreSQL: `DB_HOST`,
  `DB_PORT`, `DB_NAME`, `DB_USER` y `DB_PASSWORD`.
- Configura `JWT_SECRET` para firmar y validar tokens. No lo compartas.
- Configura `API_KEY` para habilitar la ruta de categorías. Envíala en el
  encabezado `X-API-Key`.
- Para las rutas protegidas, inicia sesión y envía el token en el encabezado:
  `Authorization: Bearer <token>`. El token vence después de una hora.
- El registro asigna el rol `usuario`. Las operaciones administrativas requieren
  el rol `administrador`, que debe asignarse en la base de datos; no hay una ruta
  pública para elevar el rol.

Rutas de autenticación (`PracticaDB` solamente)

Estas rutas tienen el prefijo `/api/auth`.

| Método y ruta | Descripción | Requisitos en `PracticaDB` |
| --- | --- | --- |
| `POST /auth/register` | Registra una cuenta y guarda la contraseña como hash. | JSON `{ "email": "persona@ejemplo.com", "password": "..." }`. No requiere token. |
| `POST /auth/login` | Valida las credenciales y devuelve un token JWT. | JSON con `email` y `password`. No requiere token; máximo 5 intentos por minuto. |
| `GET /auth/usuarios` | Lista usuarios (id, correo y rol). | Token Bearer y rol `administrador`. |
| `GET /auth/profile/:id` | Consulta el perfil del usuario indicado. | Token Bearer; solo el propio usuario o un `administrador`. |
| `DELETE /auth/delete/:id` | Elimina la cuenta indicada. | Token Bearer y rol `administrador`. Puede responder conflicto si la cuenta tiene productos asociados. |

En `PracticaDB2` estas rutas no están disponibles: el servidor no monta
`/api/auth`.

## Productos y categorías

| Método y ruta | Descripción | Requisitos en `PracticaDB` (segura) | `PracticaDB2` |
| --- | --- | --- | --- |
| `GET /categorias/:categoria` | Busca categorías cuyo nombre contenga el texto indicado. | Encabezado `X-API-Key` válido. | Sin autenticación. |
| `GET /productos` | Lista productos. | Token Bearer; devuelve solo los productos del usuario autenticado. | Sin autenticación; lista todos los productos. |
| `GET /productos/id/:id` | Busca un producto por identificador. | Token Bearer; solo encuentra productos del usuario autenticado. | Sin autenticación. |
| `GET /productos/:nombre` | Busca productos cuyo nombre contenga el texto indicado. | Token Bearer; busca solo entre los productos del usuario autenticado. | Sin autenticación. |
| `POST /productos/crear` | Crea un producto. | Token Bearer; el producto se asocia al usuario autenticado. | Sin autenticación; el producto no se asocia a un usuario. |
| `PUT /productos/:id` | Actualiza precio y stock del producto. | Token Bearer; solo modifica productos del usuario autenticado. | Sin autenticación. |
| `DELETE /productos/:id` | Elimina el producto indicado. | Token Bearer; solo elimina productos del usuario autenticado. | Sin autenticación. |

Para `POST /productos/crear`, envía JSON con `nombre`, `precio` e `imagen`
(obligatorios). `stock` es opcional y por defecto vale `0`; `descripcion`,
`categoria`, `youtube_id`, `latitud` y `longitud` son opcionales.
El precio debe ser positivo y el stock un entero no negativo.

Para `PUT /productos/:id`, envía JSON con `precio` positivo y `stock` entero no
negativo; ambos son obligatorios.

En `PracticaDB2`, `GET /productos/id/:id`, `GET /productos/:nombre` y
`GET /productos` son de acceso público y pueden exponer datos de todos los
productos. Las operaciones de creación, modificación y eliminación también son
públicas. Esa copia escucha en `127.0.0.1`; no la expongas a una red o a internet.

## Carga de datos externos

Estas rutas consultan Fake Store API para poblar datos.

| Método y ruta | Descripción | Requisitos en `PracticaDB` (segura) | `PracticaDB2` |
| --- | --- | --- | --- |
| `POST /poblarCategorias` | Importa categorías a la base de datos. | Token Bearer y rol `administrador`. | Sin autenticación. |
| `POST /poblar` | Importa productos; primero deben existir sus categorías. | Token Bearer y rol `administrador`; los productos quedan asociados a ese usuario. | Sin autenticación; los productos no se asocian a un usuario. |
| `POST /aniadirIdCategoria` | Actualiza los productos importados con el identificador de su categoría. | Token Bearer y rol `administrador`. | Sin autenticación. |

## Códigos de respuesta frecuentes

- `400`: datos enviados inválidos o incompletos.
- `401`: falta o no es válido el token/API key requerido.
- `403`: el usuario autenticado no tiene permiso para esa operación.
- `404`: no se encontró el producto, perfil o usuario solicitado.
- `409`: conflicto, por ejemplo correo ya registrado o categorías aún no cargadas.
