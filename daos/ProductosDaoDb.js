import mongoose from 'mongoose'
import { asDto } from '../dtos/ProductoDTO.js'

const productoSchema = new mongoose.Schema({
    id: { type: Number },
    nombre: { type: String },
    descripcion: { type: String },
    precio: { type: Number }
});

export default class ProductosDaoDb {

    constructor(cnxStr) {
        this.cnxStr = cnxStr
        this.productos = mongoose.model('Producto', productoSchema)
    }

    async init() {
        await mongoose.connect(this.cnxStr)
        console.log('productos dao en mongodb -> listo')
    }

    async disconnect() {
        await mongoose.disconnect()
        console.log('productos dao en mongodb -> cerrado')
    }

    async getAll() {
        const productos = await this.productos.find({})
        return asDto(productos)
    }

    async getById(idBuscado) {
        const producto = await this.productos.findOne({ id: idBuscado })
        return asDto(producto)
    }

    async save(productoNuevo) {
        await this.productos.create(productoNuevo)
        return asDto(productoNuevo)
    }

    async deleteById(idParaBorrar) {
        const borrado = await this.productos.findOneAndDelete({ id: idParaBorrar })
        return asDto(borrado)
    }

    async deleteAll() {
        await this.productos.deleteMany({})
    }

    async updateById(idParaReemplazar, nuevoProducto) {
        const actualizado = await this.productos.findOneAndUpdate({ id: idParaReemplazar }, { $set: nuevoProducto })
        return asDto(actualizado)
    }
}
