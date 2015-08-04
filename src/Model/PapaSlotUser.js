/**
 * Created by bigqiang on 15/7/25.
 */

var PapaSlotUser = cc.Class.extend({
    _className:"PapaSlotUser",
    _gameMoney:0,
    _perLinePrice:0,
    _lastWinMoney:0,
    _winLineArr:null,
    _freeChance:0,

    ctor:function(){
        this._gameMoney = LocalStorage.getInstance().getGameMoneyBalance() || 1000000;
        this._perLinePrice = 1000;
        this._lastWinMoney = 0;
        if(LocalStorage.getInstance().getGameFreeChance() == undefined) {
            this._freeChance = 0;
        } else {
            this._freeChance = LocalStorage.getInstance().getGameFreeChance();
        }

        this._winLineArr = new Array();

        return true;
    },

    init:function(){
        return true;
    },

    getPerExpense:function(){
        return this._perLinePrice*GameBasicData.getInstance().getLineArrayLength();
    },

    getPerPrice:function(){
        return this._perLinePrice;
    },

    getGameMoney:function(){
        return this._gameMoney;
    },

    setGameMoney:function(gameMoney){
        this._gameMoney = gameMoney;
        LocalStorage.getInstance().setGameMoneyBalance(this._gameMoney);
    },

    getLastWinMoney:function(){
        return this._lastWinMoney;
    },

    setFreeChance:function(freeChance){
        this._freeChance = parseInt(this._freeChance) + parseInt(freeChance);
        LocalStorage.getInstance().setGameFreeChance(this._freeChance);
    },

    getFreeChance:function(){
        return this._freeChance;
    },

    setWinLineArr:function(linesArr){
        if(linesArr) {
            this._winLineArr = linesArr;
        } else {
            this._winLineArr = new Array();
        }

    },

    getWinLineArr:function(){
        return this._winLineArr;
    },

    deductFreeChance:function(){
        this._freeChance = this._freeChance - 1;
    },

    deductPerRoundFee:function(){
        this.setGameMoney(this._gameMoney - this._perLinePrice*GameBasicData.getInstance().getLineArrayLength())
    },

    updateGameMoney:function(lastWin, freeTimes){
        this._lastWinMoney = lastWin;
        this.setGameMoney(this._gameMoney + this._lastWinMoney);
        this.setFreeChance(freeTimes)
    },

    updateGamePlayData:function(gameData){
        if(gameData){
            var lineArr = new Array();
            var lastWin = 0;
            var freeTimes = 0;
            for(var i = 0; i < gameData.length; i++){
                if(CardPropertyData.countCardType(gameData[i].cardTypeFlag).isFree) {
                    freeTimes = freeTimes + gameData[i].multiple;
                    lineArr.push(gameData[i].line);
                } else {
                    lastWin = lastWin + gameData[i].multiple * this._perLinePrice;
                    lineArr.push(gameData[i].line);
                }
            }
            this.updateGameMoney(lastWin, freeTimes);
            this.setWinLineArr(lineArr);
        }
    },

})

PapaSlotUser._sharedInstance = null;
PapaSlotUser.getInstance = function(){
    if (!this._sharedInstance) {
        this._sharedInstance = new PapaSlotUser();
        if(this._sharedInstance.init()){
            return this._sharedInstance;
        }
    }else{
        return this._sharedInstance;
    }
    return this._sharedInstance;
}