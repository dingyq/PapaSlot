/**
 * Created by bigqiang on 15/7/25.
 */

var GameBasicData = cc.Class.extend({
    _className:"GameBasicData",
    _cardProbabilityList:null,
    _typeValue:null,
    _typeList:null,
    _dataIndex:0,
    _typeCount:11,
    _cardProbabilityArr:null,
    _nameValueList:null,
    _numSegmentAssistant:null,
    _baseNum:10000,
    _linesArr:null,
    _cardJMaxAppear:1,

    ctor:function(){5

        this._baseNum = 10000;
        this._cardProbabilityList = [
            [0.160, 0.130, 0.130, 0.110, 0.100, 0.080, 0.070, 0.060, 0.030, 0.005, 0.125],
            [0.160, 0.130, 0.130, 0.110, 0.100, 0.080, 0.070, 0.060, 0.030, 0.010, 0.120],
            [0.150, 0.130, 0.130, 0.110, 0.090, 0.080, 0.070, 0.060, 0.045, 0.010, 0.125],
            [0.145, 0.130, 0.130, 0.110, 0.100, 0.090, 0.080, 0.060, 0.040, 0.012, 0.103],
            [0.155, 0.130, 0.130, 0.110, 0.100, 0.090, 0.080, 0.060, 0.042, 0.013, 0.090],
            [0.150, 0.130, 0.130, 0.110, 0.100, 0.090, 0.080, 0.060, 0.045, 0.015, 0.090],
            [0.150, 0.130, 0.130, 0.110, 0.100, 0.090, 0.080, 0.060, 0.055, 0.015, 0.080],
            [0.150, 0.130, 0.130, 0.110, 0.100, 0.090, 0.070, 0.060, 0.050, 0.020, 0.090],
            [0.160, 0.130, 0.130, 0.110, 0.100, 0.080, 0.070, 0.060, 0.030, 0.030, 0.100],
            [0.150, 0.130, 0.130, 0.110, 0.100, 0.080, 0.070, 0.060, 0.050, 0.030, 0.090],
            [0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.999, 0.001],
        ];

        this._nameValueList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
        this._typeValue = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

        var valueArr = this._typeValue;
        this._typeList = {A:valueArr[0], B:valueArr[1], C:valueArr[2], D:valueArr[3], E:valueArr[4], F:valueArr[5], G:valueArr[6], H:valueArr[7], I:valueArr[8], J:valueArr[9], K:valueArr[10]};
        this._dataIndex = 9;
        this._typeCount = this._typeValue.length;

        this._linesArr = [
            [new Point(0,1), new Point(1,1), new Point(2,1), new Point(3,1), new Point(4,1)],
            [new Point(0,2), new Point(1,2), new Point(2,2), new Point(3,2), new Point(4,2)],
            [new Point(0,0), new Point(1,0), new Point(2,0), new Point(3,0), new Point(4,0)],
            [new Point(0,2), new Point(1,1), new Point(2,0), new Point(3,1), new Point(4,2)],
            [new Point(0,0), new Point(1,1), new Point(2,2), new Point(3,1), new Point(4,0)],
            [new Point(0,2), new Point(1,2), new Point(2,1), new Point(3,0), new Point(4,0)],
            [new Point(0,0), new Point(1,0), new Point(2,1), new Point(3,2), new Point(4,2)],
            [new Point(0,1), new Point(1,2), new Point(2,1), new Point(3,0), new Point(4,1)],
            [new Point(0,1), new Point(1,0), new Point(2,1), new Point(3,2), new Point(4,1)],
        ];

        this.initBasicData();
        return true;
    },

    init:function(){
        //this.checkProbabilityLegality(this._cardProbabilityList);
        return true;
    },

    initBasicData:function(){
        this._cardProbabilityArr = new Array();

        var runData = this._cardProbabilityList[this._dataIndex];
        this._numSegmentAssistant = new Array();
        for(var i = 0; i < runData.length; i ++) {
            this._numSegmentAssistant[i] = runData[i]*this._baseNum;
        }

        for(var i = 0; i < this._typeCount; i++){
            this._cardProbabilityArr.push({name:this._nameValueList[i], type:this._typeValue[i], pro:runData[i]})
        }
    },

    getCurrentDataSegmentAssistantArr:function(){
        return this._numSegmentAssistant;
    },

    getBaseNum:function(){
        return this._baseNum;
    },

    getTypeList:function(){
        return this._typeList;
    },

    getTypeValueList:function(){
        return this._typeValue;
    },

    getLineArrayLength:function(){
        return this._linesArr.length;
    },

    getNameValueList:function(){
        return this._nameValueList;
    },

    getTypeCount:function(){
        return this._typeCount;
    },

    getCardsProbabilityConfig:function(){
        return this._cardProbabilityArr;
    },

    getLinePointsArrByIndex:function(index){
        if (parseInt(index) >= 0 && parseInt(index) < this._linesArr.length) {
            return this._linesArr[index];
        } else {
            return [];
        }
    },

    getThreeRandomCards:function(){
        var baseNum = this.getBaseNum();
        var numSegment = this.getCurrentDataSegmentAssistantArr();
        var typeValueList = this.getTypeValueList();

        var randomCard = new Array();
        var randCount = 3;
        while(randCount > 0){
            var baseSegmentNum = 0;
            var randomNum = Math.floor(Math.random()*baseNum);
            //cc.log(randomNum);
            for(var i = 0; i < numSegment.length; i ++){
                baseSegmentNum += numSegment[i];
                if (randomNum < baseSegmentNum) {
                    randomCard.push(typeValueList[i]);
                    break;
                }
            }
            randCount --;
        }
        //cc.log("result is "+randomCard);
        return randomCard;
    },

    checkWhetherHasPrizeOnLine:function(cardsArr){
        var convertArr = [];
        //lines circle
        for (var k = 0; k < this._linesArr.length; k++){
            var line = this._linesArr[k];
            var tmpArr = [];
            for(var i = 0; i < cardsArr.length; i++){
                var y = line[i].y;
                tmpArr.push( cardsArr[i][y]);
            }
            convertArr.push(tmpArr);
        }

        var prizePak = [];
        var cardJMaxAppear = this._cardJMaxAppear;
        cc.log("this._linesArr.length is "+this._linesArr.length);
        for (var k = 0; k < this._linesArr.length; k++) {
            var targetArr = convertArr[k];
            for(var i = 0; i < targetArr.length; i ++){
                var letter = targetArr[i];
                var cardType = CardPropertyData.countCardType(letter);
                var appearCount = 1;
                var cardJAppear = 0;
                for(var j = i+1; j < targetArr.length; j ++){
                    var nextLetter = targetArr[j];
                    // 当下一个card类型与目标字母相同或下一个字母为万能字母时，则目标字母的出现次数自动加1；
                    // 当出现类似AAAJJ组合时，下边会筛选出JJ作为中奖组合，每条线上只取最高赔率作为一次中奖组合。
                    var nextCardType = CardPropertyData.countCardType(nextLetter);

                    if((nextCardType.isPowerful) && (cardJAppear < cardJMaxAppear)) {
                        cardJAppear++;
                        appearCount++;
                    } else {
                        if (nextLetter == letter){
                            appearCount ++;
                        }
                    }

                }

                var baseMultiple = 0;
                switch (appearCount){
                    case 5:
                        baseMultiple = cardType.fiveRepeat;
                        break;
                    case 4:
                        baseMultiple = cardType.fourRepeat;
                        break;
                    case 3:
                        baseMultiple = cardType.threeRepeat;
                        break;
                    case 2:
                        baseMultiple = cardType.twoRepeat;
                        break;
                    default :
                        baseMultiple = 0;
                        break;
                }

                if(baseMultiple > 0){
                    var noExist = true;
                    if (prizePak.length > 0) {
                        var lastPrizeObj = prizePak[prizePak.length - 1];
                        if((lastPrizeObj.cardTypeFlag == letter) && (parseInt(lastPrizeObj.line) == k)){
                            //如果这条线上这个标识之前被计算过一次。则不列入中奖。例如AAAAA，不筛选则会出现AAAAA，AAAA，AAA的中奖组合；
                            noExist = false;
                        }
                    }

                    if(noExist){
                        // 两个万能替换时需要筛选；
                        // 一个万能替换时无需筛选，可出现一条线上出现两种中奖可能；
                        if ((prizePak.length > 0) && (cardJMaxAppear >= 2)) {
                            //如果此条线上出现这种组合AAAII，则只计算II的作为中奖组合(取最大翻倍率作为中奖)；
                            var lastPrizeObj = prizePak[prizePak.length - 1];
                            if((parseInt(lastPrizeObj.line) == k) && (lastPrizeObj.multiple < baseMultiple)){
                                prizePak.pop();
                            }
                        }
                        var prizeObj = {cardTypeFlag:letter, multiple:baseMultiple, line:k, appearTimes:appearCount};
                        prizePak.push(prizeObj);
                    }

                }
                //cc.log("letter is "+letter+" baseMultiple is "+baseMultiple);
            }
        }

        if(prizePak.length > 0){
            cc.log(prizePak);
        }
        UpdateUIManager.getInstance().dispatch(NOTIFY.GAME_WIN, prizePak);

    },

    checkProbabilityLegality:function(arr){
        for (var i = 0; i < arr.length; i++){
            var arr1 = arr[i];
            var count = 0;
            for (var j = 0; j < arr1.length; j++){
                count+=arr1[j];
            }
            cc.log("count"+i+" is "+count);
        }
    }
})

GameBasicData._sharedInstance = null;
GameBasicData.getInstance = function(){
    if (!this._sharedInstance) {
        this._sharedInstance = new GameBasicData();
        if(this._sharedInstance.init()){
            return this._sharedInstance;
        }
    }else{
        return this._sharedInstance;
    }
    return this._sharedInstance;
}
