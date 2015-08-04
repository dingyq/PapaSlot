/**
 * Created by bigqiang on 15/7/24.
 */

var GameMainLayer = BaseLayer.extend({
    _className:"GameMainLayer",
    _gameMoney:100000,
    _perPrice:1000,
    _moneyLabel:null,
    _priceLabel:null,
    _lastWinLabel:null,
    _freeChanceLabel:null,
    _slotBtn:null,

    ctor:function(){
        this._super();

    },

    onEnter:function(){
        this._super();
        this.initUserInterface();
    },

    onExit:function(){

        this._super();
    },

    initUserInterface:function(){
        this.createSlotRoller();
        this.createTipLabelLayer();
    },

    createSlotRoller:function(){
        this._slotRoller = new SlotRollerLayer();
        this._slotRoller.setDelegate(this.getDelegate());
        this.addChild(this._slotRoller);
    },

    createTipLabelLayer:function(){
        var bgLayerSize = cc.size(cc.winSize.width, 200);
        var bgLayer = new cc.LayerColor(cc.color(255, 255, 255));
        bgLayer.setPosition(0, this._slotRoller.height + this._slotRoller.y + 50);
        bgLayer.setContentSize(bgLayerSize);
        this.addChild(bgLayer);

        var moneyLabel = new cc.LabelTTF("余额：" + PapaSlotUser.getInstance().getGameMoney(), "Arial", 28);
        moneyLabel.setPosition(bgLayerSize.width/4, bgLayerSize.height*2/3);
        moneyLabel.setColor(cc.color(0,0,0));
        bgLayer.addChild(moneyLabel);
        this._moneyLabel = moneyLabel;

        var priceLabel = new cc.LabelTTF("每次消费：" + PapaSlotUser.getInstance().getPerExpense(), "Arial", 28);
        priceLabel.setPosition(bgLayerSize.width*3/4, bgLayerSize.height*2/3);
        priceLabel.setColor(cc.color(0,0,0));
        bgLayer.addChild(priceLabel);
        this._priceLabel = priceLabel;

        var lastWinLabel = new cc.LabelTTF("上局赢取：" + PapaSlotUser.getInstance().getLastWinMoney(), "Arial", 28);
        lastWinLabel.setPosition(bgLayerSize.width/4, bgLayerSize.height/3);
        lastWinLabel.setColor(cc.color(0,0,0));
        bgLayer.addChild(lastWinLabel);
        this._lastWinLabel = lastWinLabel;

        var freeChanceLabel = new cc.LabelTTF("免费机会：" + PapaSlotUser.getInstance().getLastWinMoney(), "Arial", 28);
        freeChanceLabel.setPosition(bgLayerSize.width*3/4, bgLayerSize.height/3);
        freeChanceLabel.setColor(cc.color(0,0,0));
        bgLayer.addChild(freeChanceLabel);
        this._freeChanceLabel = freeChanceLabel;

        var button = new ccui.Button(res.SlotBeginBtnNor, res.SlotBeginBtnNor);
        //var button = new ccui.Button(res.CloseBtnNor, res.CloseBtnSel);
        //button.setScale(2);
        button.setPosition(this._cSize.width/2, this._slotRoller.y - 100);
        button.addTouchEventListener(this.handTouchHandler, this);
        this.addChild(button);
        this._slotBtn = button;
    },

    handTouchHandler:function(sender, eventType){
        if (ccui.Widget.TOUCH_ENDED == eventType){
            sender.setTouchEnabled(false);
            this._slotRoller.beginRunLoop();
            //this.updateGameBalanceTip();
        }
    },

    updateGameBalanceTip:function(){
        this._moneyLabel.setString("余额：" + PapaSlotUser.getInstance().getGameMoney());
        this._freeChanceLabel.setString("免费机会：" + PapaSlotUser.getInstance().getFreeChance());
    },

    updateGameOverTip:function(){
        this.updateGameBalanceTip();
        this._lastWinLabel.setString("上局赢取：" + PapaSlotUser.getInstance().getLastWinMoney());
        this._freeChanceLabel.setString("免费机会：" + PapaSlotUser.getInstance().getFreeChance());
        this._slotRoller.showWinLine(PapaSlotUser.getInstance().getWinLineArr());

        this._slotBtn.setTouchEnabled(true);
    },

})