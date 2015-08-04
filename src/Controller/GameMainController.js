/**
 * Created by bigqiang on 15/7/24.
 */


var GameMainController = cc.Scene.extend({
    _className:"GameMainController",
    _slotCardsModel:null,
    _gameMainLayer:null,

    onEnter:function(){
        this._super();
        UpdateUIManager.getInstance().addPageUpdateListeners(NOTIFY.START_LOOP, this.handleSlotResult, this);//绑定事件方法
        UpdateUIManager.getInstance().addPageUpdateListeners(NOTIFY.GAME_WIN, this.settleAccoutOneRoundOver, this);//绑定事件方法
        UpdateUIManager.getInstance().addPageUpdateListeners(NOTIFY.SHOW_WIN_LINE_TIP, this.showWinLineTip, this);//绑定事件方法

        this._slotCardsModel = new CardsAssembly(GameBasicData.getInstance().getCardsProbabilityConfig());
        //this._slotCardsModel.toString();

        this.initUserInterface();
    },

    onExit:function(){
        UpdateUIManager.getInstance().removeListeners(NOTIFY.START_LOOP);//删除事件方法
        UpdateUIManager.getInstance().removeListeners(NOTIFY.GAME_WIN);//删除事件方法
        UpdateUIManager.getInstance().removeListeners(NOTIFY.SHOW_WIN_LINE_TIP);//删除事件方法

        this._super();
    },

    initUserInterface:function(){
        this._gameMainLayer = new GameMainLayer();
        this._gameMainLayer.setDelegate(this);
        this.addChild(this._gameMainLayer);
    },

    getSlotCardsModel:function(){
        return this._slotCardsModel;
    },

    handleSlotResult:function(randomCards){
        cc.log(randomCards);
        this._slotCardsModel.addSelectedCardsToArr(randomCards);
        this._gameMainLayer.updateGameBalanceTip();
        this._slotCardsModel.checkWhetherHasPrizeOnLine();
    },

    settleAccoutOneRoundOver:function(newData){

        PapaSlotUser.getInstance().updateGamePlayData(newData);
    },

    showWinLineTip:function(){
        this._gameMainLayer.updateGameOverTip();
    }

})