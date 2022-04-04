const fs = require('fs');


class container {
    constructor(fileName) {
        this.fileName = fileName;
    }

    async save(title, price, imagen) {
        const product = {
            id: null,
            title: title,
            price: price,
            imagen: imagen,
        }
        try{
            const contenido = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
            const products = JSON.parse(contenido);
            product.id = products.length +  1;
            products.push(product);
            fs.writeFileSync(`./${this.fileName}`, JSON.stringify(products));
        }
        catch(error){
            const products = []
            product.id = 1;
            products.push(product);
            fs.writeFileSync(`./${this.fileName}`, JSON.stringify(products));
        }
    }

    async getAll() {
        try{
            const contenido = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
            console.table(JSON.parse(contenido))
        }
        catch(error){
            console.log(error)
        }
    }

    async getById(id) {
            const contenido = await fs.promises.readFile(`./${this.fileName}`, 'utf-8');
            const products = JSON.parse(contenido);
            return products.find(prod=> prod.id == id)
    }

    async deleteAll() {
        try{
            const products = [];
            fs.writeFileSync(`./${this.fileName}`, JSON.stringify(products));
        }
        catch(error){
            console.log('error getAll')
        }
    }

    async deleteById(id) {
        try{
            const contenido = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
            const products = JSON.parse(contenido)
            const index = products.findIndex( x => x.id === id );
            if(index === -1){
                console.log('no existe el id buscado')
            }
            products.splice( index, 1 );
            fs.writeFileSync(`./${this.fileName}`, JSON.stringify(products));
        }
        catch(error){
            console.log('error getById')
        }
    }
}

const archivo1 = new container('products.txt');

(async function () {
    await archivo1.getAll();
    await archivo1.save('PC', 90000, 'foto de pc');
    await archivo1.save('monitor', 50000, 'foto de monitor');
    await archivo1.getAll();
    console.table(archivo1.getById(2)) ;
    await archivo1.deleteById(2);
    await archivo1.getAll();
    await archivo1.deleteAll();
    await archivo1.getAll();
    await archivo1.save('PC', 90000, 'foto de pc');
    await archivo1.save('monitor', 50000, 'foto de monitor');
    }
)()

module.exports = container;






