import fs from "fs";
import { asDto } from "../dtos/ProductoDTO.js";

export default class ProductosDaoFile {
  #ready = false;

  constructor(ruta) {
    this.ruta = ruta;
    this.productos = [];
  }

  async init() {
    try {
      await fs.promises.readFile(this.ruta, "utf-8");
      this.#ready = true;
      console.log("productos dao en archivo -> listo");
    } catch (error) {
      await fs.promises.writeFile(this.ruta, "[]");
      this.#ready = true;
      console.log("productos dao en archivo -> listo");
    }
  }

  disconnect() {
    console.log("productos dao en archivo -> cerrado");
  }

  #checkReady = () => {
    if (!this.#ready) throw new Error("INTERNAL_ERROR: dao no conectado!");
  };

  #leerArchivo = async () => {
    this.#checkReady();
    const texto = await fs.promises.readFile(this.ruta, "utf-8");
    this.productos = JSON.parse(texto);
  };

  #escribirArchivo = async () => {
    this.#checkReady();
    const texto = JSON.stringify(this.productos, null, 2);
    await fs.promises.writeFile(this.ruta, texto);
  };

  #getIndex = (id) => {
    return this.productos.findIndex((producto) => producto.id === id);
  };

  async getAll() {
    await this.#leerArchivo();
    return asDto(this.productos);
  }

  async getById(idBuscado) {
    await this.#leerArchivo();
    return asDto(this.productos[this.#getIndex(idBuscado)]);
  }

  async save(productoNuevo) {
    await this.#leerArchivo();
    this.productos.push(productoNuevo);
    await this.#escribirArchivo();
    return asDto(productoNuevo);
  }

  async deleteById(idParaBorrar) {
    await this.#leerArchivo();
    const [borrada] = this.productos.splice(this.#getIndex(idParaBorrar), 1);
    await this.#escribirArchivo();
    return asDto(borrada);
  }

  async deleteAll() {
    this.productos = [];
    await this.#escribirArchivo();
  }

  async updateById(idParaReemplazar, nuevoProducto) {
    await this.#leerArchivo();
    const index = this.#getIndex(idParaReemplazar);
    const actualizado = { ...this.productos[index], ...nuevoProducto };
    this.productos.splice(index, 1, actualizado);
    await this.#escribirArchivo();
    return asDto(actualizado);
  }
}
