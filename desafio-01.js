class ProductManager {
    products = [];

    constructor() { }

    addProducto = (title, description, thumbnail, code, stock) => {
        try {
            // Validación de parámetros
            if (
                typeof title !== 'string' ||
                typeof description !== 'string' ||
                typeof thumbnail !== 'string' ||
                typeof code !== 'string' ||
                typeof stock !== 'number' || stock < 0
            ) {
                throw new Error("Los parámetros no son válidos");
            }

            // Verificación de código duplicado
            const productoExistente = this.products.find(producto => producto.code === code);
            if (productoExistente) {
                throw new Error("El código del producto ya está siendo utilizado");
            }

            // Creación del producto
            const producto = {
                id: this.generarIdUnico(),
                code: code,
                title: title,
                description: description,
                thumbnail: thumbnail,
                stock: stock
            };
            this.products.push(producto);

        } catch (error) {
            console.error("Error al agregar producto:", error.message);
        }
    };

    generarIdUnico() {
        const parteAleatoria = Math.random().toString(36).substr(2, 9);
        const marcaDeTiempo = Date.now().toString(36);
        const idUnico = parteAleatoria + marcaDeTiempo;
        return idUnico;
    }

    getProducts = () => {
        console.log("****Productos x getProducts******");
        console.table(this.products);
        return this.products;
    };

    getProductById = (id) => {
        try {
            // Validación de parámetros
            if (typeof id !== 'string') {
                throw new Error("El parámetro 'id' no es válido");
            }

            // Búsqueda del producto por ID
            const producto = this.products.find(producto => producto.id === id);
            if (!producto) {
                throw new Error("Producto no encontrado");
            }

            return producto;

        } catch (error) {
            console.error("Error al obtener producto por ID:", error.message);
            return null;
        }
    };
}

// Prueba de la Clase ProductManager
let productoManager = new ProductManager();

productoManager.addProducto("Artic1", "Tomate al natural", "/imagenes.artic1", "1", 5);
productoManager.addProducto("Artic2", "Tomate al natural", "/imagenes.artic2", "2", 5);
console.log("***Validacion en addProducto de Code ya existente");
productoManager.addProducto("Artic3", "Tomate al natural", "/imagenes.artic3", "2", 5);

productoManager.getProducts();

console.log("***Prueba getProductById *****");
console.log("Con id existente");
let productoById = productoManager.getProductById(productoManager.getProducts()[1].id);
console.log(productoById);
console.log("**** Con id inexistente***");
productoById = productoManager.getProductById("no_existe");
console.log(productoById);
