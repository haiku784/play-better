class ProductService {
    """
    This class implements the product service logic for managing product-related operations.
    """

    constructor(productRepository) {
        """
        Initializes the ProductService with a product repository.
        :param productRepository: An instance of ProductRepository to interact with product data.
        """
        this.productRepository = productRepository;
    }

    addProduct(name, price) {
        """
        Add a new product with the specified name and price.
        :param name: The name of the new product.
        :param price: The price of the new product.
        :return: The added product object.
        """
        const product = this.productRepository.createProduct(name, price);
        return product;
    }

    getProduct(productId) {
        """
        Retrieve a product by its product ID.
        :param productId: The ID of the product to retrieve.
        :return: The product object if found, else null.
        """
        const product = this.productRepository.findProductById(productId);
        return product;
    }

    removeProduct(productId) {
        """
        Delete a product by its product ID.
        :param productId: The ID of the product to delete.
        :return: True if the product was deleted, False otherwise.
        """
        return this.productRepository.deleteProduct(productId);
    }
}