export interface Reparacion {

    id?: number,
    fecha_ingreso: Date,
    fecha_salida: Date,
    estado: string,
    fecha_finalizacion: Date,
    presupuesto: number,
    precio_total: number,
}
