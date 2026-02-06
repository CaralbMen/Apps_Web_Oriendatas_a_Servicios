create table producto(
	id serial primary key,
	nombre varchar(50) not null,
	precio decimal(10,2) not null,
	stock int default 0,
	descripcion varchar(50)
);

comment on table public.producto is 'Esta tabla almacena los productos';
comment on column public.producto.id is 'Campo para almacenar el id, Serial para que autoincremente';
comment on column public.producto.nombre is 'Campo para almacenar el nombre, maximo 50 caracteres';
comment on column public.producto.precio is 'Campo para almacenar el precio del producto maximo 10 enteros, 2 decimales';
comment on column public.producto.stock is 'Campo para almacenar el stock, por defecto se pone cero';
comment on column public.producto.descripcion is 'Campo para almacenar la descripcion, maximo 50 caracteres';

insert into producto (nombre, precio, stock, descripcion) values
('Teclado', 167.30, 3, 'Mecanico') returning id;
select * from producto;