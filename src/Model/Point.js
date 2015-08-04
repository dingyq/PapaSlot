/**
 * Created by bigqiang on 15/7/25.
 */

var Point = cc.Class.extend({
    x:0,
    y:0,

    ctor:function(x, y){
        this.x = x;
        this.y = y;
    },

    toString:function(){
//        cc.log("point (x,y) is ("+this.x+","this.y+")");
        return "(x, y) is ("+this.x+","+this.y+")";
    },
})

Point.isEqualToPoint = function(sourcePoint, targetPoint){
    return (sourcePoint.x == targetPoint.x && sourcePoint.y == targetPoint.y)? true :false;
}

Point.isNeighborToPoint = function(sourcePoint, targetPoint){
    if (sourcePoint.y == targetPoint.y) {
        if(sourcePoint.x + 1 == targetPoint.x || sourcePoint.x - 1 == targetPoint.x ){
            return true;
        }
    } else if (sourcePoint.x == targetPoint.x){
        if(sourcePoint.y + 1 == targetPoint.y || sourcePoint.y - 1 == targetPoint.y ){
            return true;
        }
    }
    return false;
}
