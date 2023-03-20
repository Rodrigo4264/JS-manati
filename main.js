// me traigo todos los productos de productos.js
let contenedorProductos =document.getElementById("contenedor-productos")
let contenedorProductosPorCategoria =document.getElementById("mostrar-productos-categoria")
let listaDeCompras = document.getElementById("listaDeCompras")
let vercarrito=document.getElementById("img_carrito")
//Inicio mi carrito vacio
let carrito=[]

//==============Esta parte es para el buscador por categorias===========================
let selecionPoCategoria=document.getElementById("filtroPorCategoria")
selecionPoCategoria.addEventListener("change",()=>{
  contenedorProductosPorCategoria.innerHTML=""    // para que me limpie el buscador 
  //let selecionPoCategoria_productos=[]
  //inyectarProductoHTML("",contenedorProductosPorCategoria)
  let selecionPoCategoria_option= selecionPoCategoria.value;
  let selecionPoCategoria_productos = listaProductos.filter((selec)=> selec.grupo === selecionPoCategoria_option)
  

  inyectarProductoHTML(selecionPoCategoria_productos,contenedorProductosPorCategoria)
})
/**************************************************************************************** */
//===============Esta parte del codigo agrega los item de producto.js al contenedor-productos del html====================================
inyectarProductoHTML(listaProductos,contenedorProductos)
//==========================================================================================================================================

vercarrito.addEventListener("click",()=>{
  listaDeCompras.innerHTML=""
  const listaDeagregados = document.createElement("div")
listaDeagregados.innerHTML =`
<h3>Tu lista de compras</h3>`
listaDeCompras.append(listaDeagregados)



for (const producto of carrito) {
  let carritocompra = document.createElement("div")
  carritocompra.className ="col-md-3 mt-4"
  carritocompra.id = `carritocompra-${producto.id}`
  carritocompra.innerHTML = `
    <div class="card">
        <div class="card-body">
          <div>
               <img src="${producto.imagen}" class="img-fluid " alt="producto">
          </div>
          <div>
              <p class="card-text">Nombre: <b>${producto.nombre}</b></p>
              <p class="card-text">Precio: <b>${producto.precio}</b></p>
              <p class="card-text">Cantidad: <b>${producto.cantidad}</b></p>
              <p class="card-text">Subtotal: <b>${producto.cantidad * producto.precio}</b></p>
              
          </div>        
        </div>
    </div>`;
    listaDeCompras.append(carritocompra)
}


let totalFinal= carrito.map(itemCompra=> itemCompra.precio * itemCompra.cantidad).reduce((acc, el) => acc+el,0)
const totalDeCompra= document.createElement("div")
totalDeCompra.innerHTML =`<H2>
total a pagar: ${totalFinal}</H2>
`
listaDeCompras.append(totalDeCompra)
})


//<img src="$(producto.imagen)" alt="">








//***********************************************************************FUNCIONES********************************************************************* */
//**************************************************************Hace los card en el html */
function inyectarProductoHTML(array,ubicacion){
  for (const producto of array) {
    let item = document.createElement("div")
    item.className ="col-md-3 mt-4"
    item.id = `item-${producto.id}`
    item.innerHTML = `
      <div class="card">
          <div class="card-body">
            <div>
                 <img src="${producto.img}" class="img-fluid " alt="produco">
            </div>
            <div>
                <p class="card-text">Nombre: <b>${producto.nombre}</b></p>
                <p class="card-text">Precio: <b>${producto.precio}</b></p>
                <button id="agregar${producto.id}" class="boton-agregar">Agregar </button>
            </div>        
          </div>
      </div>`;
      ubicacion.append(item)

      const botonComprar = document.getElementById(`agregar${producto.id}`)
      botonComprar.addEventListener("click",()=>{
        agregarAlCarrito(producto.id)
        console.log(carrito)
      })

  }  }
//******************************************************************************Me agrega cuado hago click en comprar al carrito  */
  const agregarAlCarrito=(productoId)=>{
    const existencia = carrito.some ((carrito) => carrito.id === productoId)

    if (existencia){
        const prod = carrito.map ((itemcarrito) => { 
            if (itemcarrito.id === productoId){
                itemcarrito.cantidad ++
            }
        })
    } else { 
        const item = listaProductos.find((listadeproductos) => listadeproductos.id === productoId)
        item.cantidad =1
        carrito.push({
          id: item.id,
          nombre: item.nombre,
          precio: item.precio,
          imagen: item.img,
          cantidad: item.cantidad
        })
    }
  }