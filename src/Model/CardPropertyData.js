/**
 * Created by bigqiang on 15/7/25.
 */


var CardPropertyData = cc.Class.extend({
    _className:"CardPropertyData",

    ctor:function(){
        return true;
    }

})

CardPropertyData.prototype.TYPE_A = {isFree:false, isPowerful:false, fiveRepeat:30, fourRepeat:10, threeRepeat:2, twoRepeat:0};
CardPropertyData.prototype.TYPE_B = {isFree:false, isPowerful:false, fiveRepeat:50, fourRepeat:15, threeRepeat:3, twoRepeat:0};
CardPropertyData.prototype.TYPE_C = {isFree:false, isPowerful:false, fiveRepeat:50, fourRepeat:15, threeRepeat:3, twoRepeat:0};
CardPropertyData.prototype.TYPE_D = {isFree:false, isPowerful:false, fiveRepeat:80, fourRepeat:20, threeRepeat:5, twoRepeat:0};
CardPropertyData.prototype.TYPE_E = {isFree:false, isPowerful:false, fiveRepeat:100, fourRepeat:20, threeRepeat:5, twoRepeat:0};
CardPropertyData.prototype.TYPE_F = {isFree:false, isPowerful:false, fiveRepeat:100, fourRepeat:30, threeRepeat:8, twoRepeat:0};
CardPropertyData.prototype.TYPE_G = {isFree:false, isPowerful:false, fiveRepeat:120, fourRepeat:30, threeRepeat:10, twoRepeat:0};
CardPropertyData.prototype.TYPE_H = {isFree:false, isPowerful:false, fiveRepeat:150, fourRepeat:50, threeRepeat:20, twoRepeat:1};
CardPropertyData.prototype.TYPE_I = {isFree:false, isPowerful:false, fiveRepeat:200, fourRepeat:60, threeRepeat:30, twoRepeat:3};
CardPropertyData.prototype.TYPE_J = {isFree:false, isPowerful:true, fiveRepeat:500, fourRepeat:150, threeRepeat:50, twoRepeat:10};
CardPropertyData.prototype.TYPE_K = {isFree:true, isPowerful:false, fiveRepeat:10, fourRepeat:5, threeRepeat:2, twoRepeat:0};

CardPropertyData.countCardType = function(typeStr){
    var tmpType;
    var typeList = GameBasicData.getInstance().getTypeList();
    //cc.log("typeList is "+typeList);
    //cc.log("typeStr is "+typeStr);
    switch(typeStr){
        case typeList.A:
            tmpType = this.prototype.TYPE_A;
            break;
        case typeList.B:
            tmpType = this.prototype.TYPE_B;
            break;
        case typeList.C:
            tmpType = this.prototype.TYPE_C;
            break;
        case typeList.D:
            tmpType = this.prototype.TYPE_D;
            break;
        case typeList.E:
            tmpType = this.prototype.TYPE_E;
            break;
        case typeList.F:
            tmpType = this.prototype.TYPE_F;
            break;
        case typeList.G:
            tmpType = this.prototype.TYPE_G;
            break;
        case typeList.H:
            tmpType = this.prototype.TYPE_H;
            break;
        case typeList.I:
            tmpType = this.prototype.TYPE_I;
            break;
        case typeList.J:
            tmpType = this.prototype.TYPE_J;
            break;
        case typeList.K:
            tmpType = this.prototype.TYPE_K;
            break;
        default :
            tmpType = this.prototype.TYPE_A;
            break;
    }

    return tmpType;
}