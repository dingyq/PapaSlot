/**
 * Created by bigqiang on 15/7/25.
 */

var Helper = cc.Class.extend({
    _className:"Helper",

    ctor:function(){

        return true;
    }
})

Helper.getThreeRandomCards = function(){
    var baseNum = GameBasicData.getInstance().getBaseNum();
    var numSegment = GameBasicData.getInstance().getCurrentDataSegmentAssistantArr();
    var typeValueList = GameBasicData.getInstance().getTypeValueList();

    var randomCard = new Array();
    var randCount = 3;
    while(randCount > 0){
        var baseSegmentNum = 0;
        var randomNum = Math.floor(Math.random()*baseNum);
        cc.log(randomNum);
        for(var i = 0; i < numSegment.length; i ++){
            baseSegmentNum += numSegment[i];
            if (randomNum < baseSegmentNum) {
                randomCard.push(typeValueList[i]);
                break;
            }
        }
        randCount --;
    }
    cc.log("result is "+randomCard);
}