angular.module('productCtrl', ['productService'])

.controller('productController', function(Product, $scope){
  var vm = this;
  vm.processing = true;

  Product.all()
  .success(function(data){
    vm.processing = false;
    vm.products = data;
  });

  vm.addReview = function(reviewRate, reviewText, id){

    Product.addReview(reviewRate, reviewText, id)
    .success(function(data){
      console.log("Добавил отзыв");
      vm.processing = false;
      vm.reviewId = data.reviewId;
    });
  };

  vm.getReviews = function(id){

    Product.getReviews(id)
    .success(function(data){
        console.log("Получил отзыв");
      vm.reviews = data;
    });
  };
});
