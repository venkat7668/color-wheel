/**
 * Created by venkat on 3/9/2015.
 */
angular.module("rgbSliders",[]).directive('rgbSliders',function abc(){
    return{
        template : '<input type="range" step="1" min="0" max="255" ng-model="rgb.r"/>'+
                   '<input type="range" step="1" min="0" max="255" ng-model="rgb.g"/>'+
                   '<input type="range" step="1" min="0" max="255" ng-model="rgb.b"/>',
        //transclude: true,
        link : function(scope,element,attrs,controller){
            //console.log(element);
        }
    }
})