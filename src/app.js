import express, { json, response } from "express";
import productosRoutes from './routes/productos.routes.js'
import ventasRoutes from './routes/ventas.routes.js'
import indexRoutes from './routes/index.routes.js'

const app = express()

app.use(express.json())
app.use('/api',productosRoutes)
app.use('/api',ventasRoutes)
app.use(indexRoutes)
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found'
    })
})

app.get('/', (req, res) =>{
    res.send("Hola desde express")
})

export default app