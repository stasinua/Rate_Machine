angular.module('productService', [])

.factory('Product', function($http){
  var productFactory = {};

  // //get all products
  productFactory.all = function(userData){
    return $http.get('http://smktesting.herokuapp.com/api/products/');
  };

  productFactory.addReview = function(rate, text, productId){
    console.log(productId);
    $http.post('http://smktesting.herokuapp.com/api/reviews/' + productId, {
      rate: rate,
      text: text
    })
    .success(function(data){
        console.log("Дошел до сервиса добавления отзывов");
        return data;
    });
  };

  productFactory.getReviews = function(productId){
    return $http.get('http://smktesting.herokuapp.com/api/reviews/' + productId);
    // .success(function(data){
    //     console.log("Дошел до сервиса получения отзывов");
    //     return data;
    // });
  };

  return productFactory;
});
