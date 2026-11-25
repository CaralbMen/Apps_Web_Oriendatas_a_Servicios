
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



begin;

alter table usuarios
    alter column role set default 'usuario';

update usuarios
set role = 'usuario'
where role is null;

create unique index if not exists usuarios_email_unico
    on usuarios (email);

alter table productos
    add column if not exists id_usuario integer
    constraint fk_productos_usuario references usuarios(id);

commit;