import ProductosDaoFactory from "./daos/ProductosDaoFactory.js";

async function start() {
  const generadorDeIds = {
    id: 1,
    next() {
      return this.id++;
    },
  };

  const productosDao = ProductosDaoFactory.getDao();
  await productosDao.init();

  console.log("-----------------------------");
  console.log("1) Obtener todos los productos");
  console.log(await productosDao.getAll());

  console.log("-----------------------------");
  console.log("2) Incorporar un producto");
  const producto1 = {
    nombre: "Microondas",
    descripcion: "Grill y sistema de descongelado",
    precio: 5300,
    id: generadorDeIds.next(),
  };
  console.log(await productosDao.save(producto1));

  console.log("-----------------------------");
  console.log("3) Obtener todos los productos");
  console.log(await productosDao.getAll());

  console.log("-----------------------------");
  console.log("4) Incorporar otro producto");
  const producto2 = {
    nombre: "Heladera",
    descripcion: "27 lt. no frost",
    precio: 45000,
    id: generadorDeIds.next(),
  };
  console.log(await productosDao.save(producto2));

  console.log("-----------------------------");
  console.log("5) Obtener todos los productos");
  console.log(await productosDao.getAll());

  console.log("--------------------------------");
  console.log("6) Obtener un producto por su id");
  console.log(await productosDao.getById(producto2.id));

  console.log("--------------------------------");
  console.log("7) Actualizar un producto por su id");
  console.log(
    await productosDao.updateById(producto2.id, { nombre: "Microondas", descripcion: "marca bgh capacidad de 20 lt.", precio: 6000 }),
  );

  console.log("-----------------------------");
  console.log("8) Obtener todos los productos");
  console.log(await productosDao.getAll());

  console.log("--------------------------------");
  console.log("9) Borrar un producto por su id");
  console.log(await productosDao.deleteById(producto1.id));

  console.log("-----------------------------");
  console.log("10) Obtener todos los productos");
  console.log(await productosDao.getAll());

  console.log("-----------------------------");
  console.log("Borrar todos los productos (limpieza final) y desconectarme");
  await productosDao.deleteAll();
  await productosDao.disconnect();
}
start();
