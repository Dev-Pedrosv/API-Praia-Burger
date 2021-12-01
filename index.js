const express = require('express')
const uuid = require('uuid')
const cors = require('cors')

const port = process.env.PORT || 3000
const app = express()
app.use(express.json())
app.use(cors())


const pedidos = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = pedidos.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ message: 'User not found' })
    }

    request.userIndex = index
    request.userId = id

    next()

}


app.get('/pedidos', (request, response) => {

    return response.json(pedidos)
})


app.post('/pedidos', (request, response) => {

    const { mesa } = request.body

    const pedido = { id: uuid.v4(), mesa }

    pedidos.push(pedido)

    return response.status(201).json(pedido)
})


app.delete('/pedidos/:id', checkUserId, (request, response) => {

    const index = request.userIndex

    pedidos.splice(index, 1)

    return response.status(204).json()
})


app.listen(port, () => {
    console.log(`Serve started ${port}`)
})
