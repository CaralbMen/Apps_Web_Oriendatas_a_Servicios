create database awos_tienda;
use awos_tienda;

create table productos(
	id int auto_increment primary key,
    nombre varchar(100) not null,
    precio decimal(10,2) not null,
    stock int default 0
);

insert into productos(nombre, precio, stock) values
('Laptop DEV', 15000.00, 5),
('Mouse Logi', 250.50, 20),
('Monitor 24"',3200.00, 8); 