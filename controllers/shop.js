const Product = require('../models/product');
//const Cart = require('../models/cart');//dont need
//const Order = require('../models/order');//dont need 
// will show all products added by all users 
exports.getIndex = (req, res, next) => {
  Product
  .fetchAll()
  .then((products)=>{
    
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });

  })
  .catch(err=>{
    console.log(err);

  });

  
};
// will be shown all products added by all users 
exports.getProducts = (req, res, next) => {
  Product.fetchAll().then((products)=>{
    //console.log(fieldData);
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All products',
      path: '/products'
    });
  }).catch(err=>{
    console.log(err);

  });
    
};


//accesiing a single product 
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  
  Product
  .findById(prodId)
  .then(product=>{
    //console.log('single product is ', product)
    res.render('shop/product-detail', {
          product: product,
          pageTitle: product.title,
          path: '/products'
        });
  })
  .catch(err=>{
    console.log(err);
  });

    

 };


exports.getCart = (req, res, next) => {

  req.user
  .getCart()
  .then(products=>{
      res.render('shop/cart', {
              path: '/cart',
              pageTitle: 'Your Cart',
              products: products
          })
  })
  .catch(err=>{
    console.log(err);
  });
  

  };
//  //postCart will a particular product (prodId) to the cart , it will check if a product is exis ted first or else it will add new product 
  
// add to cart will go to this route
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    console.log('product id got is ',prodId);
    Product.findById(prodId).then(product=>{
      console.log('add to cart product is ',product);

      return req.user.addToCart(product);

    }).then(result=>{
      console.log(result);
      res.redirect('/cart');
    });
    // let fetchedCart;
    // let newQuantity = 1;
    // req.user
    //   .getCart()
    //   .then(cart => {
    //     fetchedCart = cart;
        
    //     return cart.getProducts({ where: { id: prodId } }); //return a promise 
    //   })
    //   .then(products => {
    //           let product;
              

    //           if (products.length > 0) {
    //             product = products[0];
                
    //           }
              
    //           if (product) {
    //             const oldQuantity = product.cartItem.quantity;
    //             newQuantity = oldQuantity + 1;
    //             return product;
    //           }
    //           return Product.findByPk(prodId);
    //   })
    //     .then(product => {

    //       return fetchedCart.addProduct(product, {
    //         through: { quantity: newQuantity }
    //       });
    //     })
    //   .then(() => {
    //     res.redirect('/cart');
    //   })
    //   .catch(err => console.log(err));
  };

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user //always request a user first
  .deleteItemFromCart(prodId)
  .then((result)=>{
    res.redirect('/cart');
  })

  .catch(err =>{
    console.log(err);
  });

 
};
exports.postOrder =(req,res,next)=>{
  let fetchedCart;

  req.user
  .addOrder()
  .then(result=>{
    res.redirect('/orders');
  })
  .catch(err=>{console.log(err);});


}
exports.getOrders = (req, res, next) => {
  req.user
  .getOrders()
  .then(orders=>{
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'orders',
      orders : orders
    });

  })
  .catch(err=>{
    console.log(err);
  });
  
};

