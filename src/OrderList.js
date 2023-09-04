export class OrdersList {
  constructor() {
    this.fetchDataOnInit().then(this.setDataStructures);
  }

  async fetchDataOnInit() {
    const [buyersResponse, ordersResponse, productsResponse] =
      await Promise.all([
        fetch(
          'https://my-json-server.typicode.com/Solnick/fake-orders-db/buyers',
        ),
        fetch(
          'https://my-json-server.typicode.com/Solnick/fake-orders-db/orders',
        ),
        fetch(
          'https://my-json-server.typicode.com/Solnick/fake-orders-db/products',
        ),
      ]);
    const [buyersArray, ordersArray, productsArray] = await Promise.all([
      buyersResponse.json(),
      ordersResponse.json(),
      productsResponse.json(),
    ]);
    return { buyersArray, ordersArray, productsArray };
  }

  setDataStructures = (data) => {
    const { buyersArray, ordersArray, productsArray } = data;
    this.buyersArray = buyersArray;
    this.ordersArray = ordersArray;
    this.productsArray = productsArray;
    this.productsDictionary = this.createProductsDictionary(this.productsArray);
    this.buyersDictionary = this.createBuyersDictionary(this.buyersArray);
  };

  createProductsDictionary(productsArray) {
    const productsDictionary = {};
    productsArray.forEach(function (product) {
      productsDictionary[product.id] = product;
    });
    return productsDictionary;
  }

  createBuyersDictionary(buyersArray) {
    const buyersDictionary = {};
    buyersArray.forEach(function (buyer) {
      buyersDictionary[buyer.id] = buyer;
    });
    return buyersDictionary;
  }

  createOrderTile(order, buyer) {
    const tile = document.createElement('div');
    tile.style.border = '1px solid black';
    tile.style.width = '200px';
    tile.style.height = '100px';
    const orderDetails = document.createElement('span');
    orderDetails.innerText = `order: ${order.id} \n ${order.product.amount}: ${order.product.name}`;
    const buyerDetails = document.createElement('span');
    buyerDetails.innerHTML = `bought by: ${buyer.name}`;

    tile.append(orderDetails);
    tile.append(document.createElement('p'));
    tile.append(buyerDetails);

    return tile;
  }
}
