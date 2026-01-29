//const { propfind } = require("../PracticaDB/routes/routes");

const boton= document.getElementById('btnCargar');
const lista= document.getElementById('listaProductos');

boton.addEventListener('click', async()=>{
    try{
        const respuesta= await fetch('http://localhost:4000/api/productos');
        
        const datos= await respuesta.json();
        lista.innerHTML="";
        datos.forEach(producto => {
            const li= document.createElement('li');
            if(parseInt(producto.stock)>5){
                li.innerHTML='<li>'+producto.nombre+' - '+producto.precio+' - '+producto.stock+'</li>';
            }else{
                li.innerHTML=`<li>${producto.nombre} - ${producto.precio} - <span style="color:red">${producto.stock}</span></li>`;
            }
            lista.appendChild(li);
        });

    }catch(error){
        console.log(error);
        alert('No se puede conectar la API');
    }
});