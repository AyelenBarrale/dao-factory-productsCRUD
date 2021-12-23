import ProductosDaoFile from "./ProductosDaoFile.js";
import ProductosDaoDb from "./ProductosDaoDb.js";
import ProductosDaoMem from "./ProductosDaoMem.js";

const rutaArchivoProductos = "./productos.txt";
const cnxStr = "mongodb://myUserAdmin:backend2021@localhost:27017/entregaDAO?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const opcion = process.argv[2] || "Mem";

let dao;
switch (opcion) {
  case "mongo":
    dao = new ProductosDaoDb(cnxStr);
    dao.init();
    break;
  case "file":
    dao = new ProductosDaoFile(rutaArchivoProductos);
    dao.init();
    break;
  default:
    dao = new ProductosDaoMem();
}

export default class ProductosDaoFactory {
  static getDao() {
    return dao;
  }
}
