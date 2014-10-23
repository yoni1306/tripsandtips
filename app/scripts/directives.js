'use strict';

/* Directives */
var tntDirectives = angular.module('tntDirectives', []);

tntDirectives.directive('slider', function ($timeout) {
  return {
    restrict: 'AE',
	replace: true,
    link: function (scope, elem, attrs) {
		scope.images=JSON.parse(attrs.images);

		scope.currentIndex=0;

		scope.next=function(){
			scope.currentIndex<scope.images.length-1?scope.currentIndex++:scope.currentIndex=0;
		};
		
		scope.prev=function(){
			scope.currentIndex>0?scope.currentIndex--:scope.currentIndex=scope.images.length-1;
		};
		
		scope.$watch('currentIndex',function(){
			scope.images.forEach(function(image){
				image.visible=false;
			});
			scope.images[scope.currentIndex].visible=true;
		});
		
		/* Start: For Automatic slideshow*/
		
		var timer;
		var randInterval = Math.floor((Math.random() * 5) + 3) * 1000;

		var sliderFunc=function(){
			timer=$timeout(function(){
				scope.next();
				timer=$timeout(sliderFunc,5000);
			},randInterval);
		};
		
		sliderFunc();
		
		scope.$on('$destroy',function(){
			$timeout.cancel(timer);
		});
		
		/* End : For Automatic slideshow*/
		
    },
	templateUrl:'templates/templateurl.html'
  };
});