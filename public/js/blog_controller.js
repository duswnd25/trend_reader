let app=angular.module("trendReaderApp",[]);app.controller("blog_controller",function($scope,$http){$http.get("./api/blog/all").then(function(result){$scope.list=result.data;let $container=jQuery('#masonry-grid');$container.masonry({itemSelector:'#masonry-item',isAnimated:true});});});