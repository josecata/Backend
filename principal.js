const container = require('./manejoDeArchivos.js');


const express = require('express');
const app = express();

app.listen(8080, () => console.log ("Servidor Listo"));

app.get('/productos', async (req, res) => {
        container.getAll().then(resp=>res.send(JSON.parse(resp))) 

});

app.get('/productoRandom', async (req, res) => {

    container.getAll().then(resp=>res.send(
       resp[Math.floor(Math.random()*resp.length)] 
    ))
})

ServiceWorkerRegistration.on("error", (error) => console.log(`Error en Servidor ${error}`));