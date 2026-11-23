
-- La base de datos debe llamarse awos_tienda
create table categorias(
	id serial primary key,
	nombre text
);

create table productos(
	id serial primary key,
	nombre text,
	precio numeric(10,2),
	stock int,
	descripcion text,
	imagen_url text,
	id_categoria int,
	youtube_id text,
	latitud numeric(10,5),
	longitud numeric(10,6),
	constraint fk_cp foreign key(id_categoria) references categorias(id)
);

create table usuarios(
	id serial primary key,
	email text,
	password text,
	role text
);