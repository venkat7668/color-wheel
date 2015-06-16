/**
 * Created by venkat on 2/7/2015.
 */
var colorApp = angular.module("colorApp",['rgbSliders']).
    factory("Color",function(){
        //returning from window object
        return tinycolor;
    }).run(function(){
        var dropImage = document.getElementById('dropImage');
        dropImage.addEventListener('dragover',function(e){
            e.preventDefault();
        })
        dropImage.addEventListener('drop',function(e){
            e.preventDefault();
            readAsImg(e.dataTransfer.files[0]);
        });
        var renderOnCanvas = function(img){
            var canvas = document.createElement('canvas'),
                size = 6*0.01, // get from UI controller
                ctx = canvas.getContext('2d'),
                scope = angular.element(dropImage).scope(),
                w,
                h;
            canvas.width = 500;
            canvas.height = 500;
            w = canvas.width * size;
            h = canvas.height * size;
            ctx.webkitImageSmoothingEnabled = false;
            ctx.drawImage(img, 0, 0, w, h);
            ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
            dropImage.appendChild(canvas);
            canvas.addEventListener('click',function(e){
                var point = {x: e.offsetX, y: e.offsetY},
                    //getting one pixle data from canvas
                    ctxData = ctx.getImageData(point.x,point.y,1,1).data;

                scope.rgb = { r:ctxData[0], g:ctxData[1], b:ctxData[2]};
                scope.$apply();
            })
        };
        var readAsImg =  function(file){
            var img = document.createElement('img'),
                fileReader = new FileReader();
            fileReader.onload = (function(aImg){
                return function(e){
                    aImg.src= e.target.result;
                    renderOnCanvas(aImg);
                }
            })(img);
            fileReader.readAsDataURL(file)

        }
    });
colorApp.controller("MainController",['$scope',"Color",function($scope,Color){

	$scope.rgb={
        r:0,
        g:0,
        b:0
    };
    // creating new color object with black color
    $scope.color = new Color({r:0,g:0,b:0});
    $scope.hexString = "#000";
    $scope.RGB2Hex = function(){
        $scope.color._r = $scope.rgb.r;
        $scope.color._g = $scope.rgb.g;
        $scope.color._b = $scope.rgb.b;
      /*
        $scope.hexString = $scope.color.toHexString();
        $scope.lighten = $scope.color.lighten(20).toHexString();
        $scope.darken = $scope.color.darken(20).toHexString();
        $scope.saturate = $scope.color.saturate(20).toHexString();
        $scope.desaturate = $scope.color.desaturate(20).toHexString();
        $scope.greyscale = $scope.color.greyscale(20).toHexString();
        $scope.brighten = $scope.color.brighten(20).toHexString();
        color = $scope.color
        */

    }
//updating R,G,B values on change of each value, and updateing the same to $scope.toHex
    $scope.$watch("[rgb.r, rgb.g, rgb.b]",$scope.RGB2Hex);

}]);