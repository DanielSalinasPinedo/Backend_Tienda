import { pool } from "../db.js"

export const getVentas = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM ventas')
        if(rows.length <= 0) return res.status(404).json({
            message: 'No hay ventas disponibles'
        })
        res.send(rows)
    } catch (error) {
        return res.status(500).json({message: 'Ha ocurrido un error'})
    }
}

export const getVenta = async(req, res) => {
    const codigo = req.params.codigo
    try {
        const [rows] = await pool.query('SELECT * FROM ventas WHERE codigo =?',[codigo])
        if(rows.length <= 0) return res.status(404).json({
            message: 'Venta no registrada'
        })
        res.send(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Ha ocurrido un error'
        })
    }
}

export const createVenta = async (req, res) => {
    console.log(req.body)
    const { codigo_producto, nombre_cliente, telefono_cliente, cantidad_vendida } = req.body
    try {
        const [result] = await pool.query('SELECT * FROM productos WHERE codigo=?', [codigo_producto])
        if (result.length <= 0) {
            return res.status(404).json({
                message: 'El producto que desea ingresar no esta registrado'
            })
        }

        const precio = result[0].precio * cantidad_vendida

        const [rows] = await pool.query('INSERT INTO ventas (codigo_producto, nombre_cliente, telefono_cliente, cantidad_vendida, total_venta) VALUES (?, ?, ?, ?, ?)', [codigo_producto, nombre_cliente, telefono_cliente, cantidad_vendida, precio])
        console.log(rows.insertId)

        const [fecha] = await pool.query('SELECT * FROM ventas WHERE codigo=?', [rows.insertId])

        res.send({
            codigo: rows.insertId,
            codigo_producto,
            nombre_cliente,
            telefono_cliente,
            fecha_venta: fecha[0].fecha_venta,
            cantidad_vendida,
            total_venta: precio
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateVenta = async(req, res) => {
    const {codigo} = req.params
    const {nombre_cliente, telefono_cliente, fecha_venta, cantidad_vendida, total_venta} = req.body

    try {
        const [result] = await pool.query('UPDATE ventas SET nombre_cliente=IFNULL(?,nombre_cliente),telefono_cliente=IFNULL(?,telefono_cliente),fecha_venta=IFNULL(?,fecha_venta),cantidad_vendida=IFNULL(?,cantidad_vendida),total_venta=IFNULL(?,total_venta) WHERE codigo=?',[nombre_cliente,telefono_cliente,fecha_venta,cantidad_vendida,total_venta,codigo])

        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'Venta no encontrada'
        })

        const [rows] = await pool.query('SELECT * FROM ventas WHERE codigo=?',[codigo])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteVenta = async (req, res) => {
    const codigo = req.params.codigo;
    
    try {
        // Verificar si el producto está asociado a alguna venta
        const [checkResult] = await pool.query('SELECT * FROM ventas WHERE codigo_producto=?', [codigo]);
        
        if (checkResult.length > 0) {
            // Si hay ventas asociadas, enviar un mensaje de error
            return res.status(400).json({
                message: 'El producto está asociado a una venta y no se puede eliminar.'
            });
        }
        
        // Si no hay ventas asociadas, proceder con la eliminación del producto
        const [result] = await pool.query('DELETE FROM ventas WHERE codigo=?', [codigo]);
        
        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: 'Venta no encontrada'
            });
        }
        
        res.sendStatus(204); // Enviar un código 204 para indicar que la eliminación fue exitosa
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}
