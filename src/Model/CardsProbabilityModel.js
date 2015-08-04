/**
 * Created by bigqiang on 15/7/25.
 */

var CardProperty = cc.Class.extend({
    _className:"CardProperty",
    _cardName:"",
    _cardType:null,
    _probability:0.01,

    ctor:function(cardName, cardType, probability){
        this._cardName = cardName;
        this._probability = probability;
        this.setCardType(cardType);

        return true;
    },

    getCardName:function(){
        return this._cardName;
    },

    getCardProbability:function(){
        return this._probability;
    },

    getIsPowerful:function(){
        return this._cardType.isPowerful;
    },

    getIsFree:function(){
        return this._cardType.isFree;
    },

    setCardType:function(typeStr){
        this._cardType = CardPropertyData.countCardType(typeStr);
    },

    toString:function(){
        var str = ""
        str = this.getCardName() + " " + this.getCardProbability() + " "+ this.getIsFree() + " " + this.getIsPowerful();
        cc.log(str);
    },
})

//---------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------//


var CardsAssembly = cc.Class.extend({
    _className:"CardsAssembly",
    _cardCount:11,
    _cardsList:null,
    _cardsSelectedArr:null,

    ctor:function(config){
        this._cardCount = 11;
        this._cardsSelectedArr = new Array();

        this.initDataModel(config);
        return true;
    },

    initDataModel:function(config){
        this._cardsList = new Array();
        config.forEach(function(value){
            var card = new CardProperty(value.name, value.type, value.pro);
            this._cardsList.push(card);
        }.bind(this));
    },

    getCardsConfigList:function(){
        return this._cardsList;
    },

    clearCardsSelectedArr:function(){
        cc.log("clearCardsSelectedArr1");
    },


    addSelectedCardsToArr:function(randomCards){
        if(this._cardsSelectedArr.length == 5) {
            this._cardsSelectedArr = new Array();
        }
        this._cardsSelectedArr.push(randomCards);

        if(this._cardsSelectedArr.length == 5) {
            if(parseInt(PapaSlotUser.getInstance().getFreeChance()) > 0){
                PapaSlotUser.getInstance().deductFreeChance();
            } else {
                PapaSlotUser.getInstance().deductPerRoundFee();
            }
        }
    },

    checkWhetherHasPrizeOnLine:function(){
        if(this._cardsSelectedArr.length == 5) {
            GameBasicData.getInstance().checkWhetherHasPrizeOnLine(this._cardsSelectedArr);
        }
    },

    toString:function(){
        this._cardsList.forEach(function (value) {
            value.toString();
        })
    }
})