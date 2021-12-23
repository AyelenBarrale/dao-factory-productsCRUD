export default class ProductoDto {
    constructor({ id, nombre, descripcion, precio }) {
        this.id = id
        this.nombre = nombre
        this.descripcion = descripcion
        this.precio = precio
    }
}

export function asDto(prod) {
    if (Array.isArray(prod))
        return prod.map(p => new ProductoDto(p))
    else
        return new ProductoDto(prod)
}
