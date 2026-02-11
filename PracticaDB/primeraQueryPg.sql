create table productos(
	id serial primary key, 
	nombre varchar(100) not null,
	precio decimal (10,2) not null,
	stock int default 0
);


comment on table public.productos is 'Esta tabla almacena los productos';
comment on column public.productos.id is 'En este campo va el ID, int serial';
comment on column public.productos.nombre is 'Aqui se almacena el nombre del producto max 100 caracteres';
comment on column public.productos.precio is 'Aqui se almacena el precio del producto. Decimal 10 enteros 2 decimales';
comment on column public.productos.stock is 'Aqui se almacena el stock disponible de los productos. Entero';

alter table productos add column descripcion text, add column imagen_url tex;

comment on column public.productos.descripcion is 'Descripcion de los productos, tipo text';
comment on column public.productos.imagen_url is 'Direccion de la imagen del producto';

select * from productos;

truncate productos;

create table  categorias(
	id serial primary key,
	nombre text
)

select * From categorias;
drop table categorias;
truncate categorias;

1	"men's clothing"
2	"jewelery"
3	"electronics"
4	"women's clothing"

alter table productos add column id_categoria int;
alter table productos add constraint fk_categoria foreign key(id_categoria) references categorias(id); 
