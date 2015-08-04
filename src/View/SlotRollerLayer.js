/**
 * Created by bigqiang on 15/7/24.
 */

var wheelSize = cc.size(120, 120);
//var wheelSize = cc.size(150, 150);

var SingleWheel = BaseLayer.extend({
    _className:"SingleSlotRoller",
    _viewCount:3,
    _pageCount:33,
    _scrollView:null,

    ctor:function(){
        this._super();
        this._viewCount = 3;
        this._cSize = cc.size(wheelSize.width, wheelSize.height*this._viewCount);
        this.setContentSize(this._cSize);
        this.setColor(cc.color(255, 255, 255));
    },

    onEnter:function(){
        this._super();
        this.initUserInterface();
    },

    onExit:function(){

        this._super();
    },

    initUserInterface:function(){

        var scrollView = new ccui.ScrollView();
        scrollView.setBackGroundColor(cc.color.GREEN);
        scrollView.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        scrollView.setTouchEnabled(true);
        scrollView.setContentSize(this._cSize.width, this._cSize.height - 2);
        scrollView.setPosition(0, 0);
        scrollView.setInnerContainerSize(this._cSize);
        scrollView.setInnerContainerSize(cc.size(wheelSize.width, wheelSize.height*this._pageCount));
        scrollView.setTouchEnabled(false);
        scrollView.setInertiaScrollEnabled(true);

        var nameValueList = GameBasicData.getInstance().getNameValueList();
        var typeCount = GameBasicData.getInstance().getTypeCount();
        for(var i = 0; i < this._pageCount; i++) {
            var layout = new ccui.Layout();
            layout.setContentSize(cc.size(wheelSize.width, wheelSize.height - 2));
            layout.setBackGroundColor(cc.color(0, 0, 0));
            layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            layout.setTag((i+1)*100);
            layout.setPosition(0, wheelSize.height*(i));

            //var label = new ccui.Text("page " + (i+1) , "Marker Felt", 26);
            var label = new ccui.Text(nameValueList[Math.floor(i%typeCount)] , "Arial", 32);
            label.setColor(cc.color(192, 192, 192));
            label.setPosition(cc.p(layout.getContentSize().width / 2.0, layout.getContentSize().height / 2.0));
            label.setTag(100);
            layout.addChild(label);
            scrollView.addChild(layout);
        }
        this.addChild(scrollView);
        scrollView.jumpToBottom();

        this._scrollView = scrollView;
    },

    updateTheFormerThreeCard:function(randomCards){
        for (var i = this._pageCount-3; i < this._pageCount; i++){
            var label1 = this._scrollView.getChildByTag((i+1)*100).getChildByTag(100);
            label1.setString(randomCards[i%3]);
        }
        //
        //for (var i = 0; i < 3; i++){
        //    var label1 = this._scrollView.getChildByTag((i+1)*100).getChildByTag(100);
        //    label1.setString(randomCards[i%3]);
        //}
    },

    beginScrollLoop:function(index){
        //var oneLoopTime = 0.5;
        var repeatTimes = 2;
        var oneLoopTime = 1.5;

        var self = this;
        var randomCards = GameBasicData.getInstance().getThreeRandomCards();
        UpdateUIManager.getInstance().dispatch(NOTIFY.START_LOOP, randomCards);

        var scrollToTopAction = function(){
            self._scrollView.jumpToBottom();
            self._scrollView.scrollToTop(oneLoopTime, false);
            self.updateTheFormerThreeCard(randomCards);
        }

        //var scrollSeq = cc.repeatForever(cc.sequence(cc.callFunc(scrollToBottomAction), cc.delayTime(oneLoopTime), cc.callFunc(jumpToTopAction)));
        //var scrollSeq = cc.repeat(cc.sequence(cc.callFunc(scrollToTopAction), cc.delayTime(oneLoopTime), cc.callFunc(jumpToBottomAction)), repeatTimes);
        var scrollSeq = cc.sequence(cc.delayTime(index*0.3), cc.callFunc(scrollToTopAction));
        if(parseInt(index) == 4){
            var notifyCallBack = cc.callFunc(function(){
                UpdateUIManager.getInstance().dispatch(NOTIFY.SHOW_WIN_LINE_TIP);
            });
            scrollSeq = cc.sequence(cc.delayTime(index*0.3), cc.callFunc(scrollToTopAction), cc.delayTime(oneLoopTime), notifyCallBack);
        }
        var scrollAction = function(){
            self._scrollView.runAction(scrollSeq);
        }
        scrollAction();
    }

})

var SlotRollerLayer = BaseLayer.extend({
    _className:"SingleSlotRoller",
    _lineLayer:null,
    _slotBtn:null,
    _viewCount:3,
    _rollerCount:5,
    _gap:2,

    ctor:function(){
        this._super();
        this._viewCount = 3;
        this._rollerCount = 5;
        this._cSize = cc.size((wheelSize.width + this._gap)*this._rollerCount - this._gap, wheelSize.height*this._viewCount - 2);
        this.setContentSize(this._cSize);
        this.setColor(cc.color(0, 255, 0));
        this.setPosition(cc.winSize.width/2 - this._cSize.width/2, cc.winSize.height/2 - this._cSize.height/2);
    },

    onEnter:function(){
        this._super();
        this.createWheels();
        this.createLineLayer();
    },

    onExit:function(){

        this._super();
    },

    createLineLayer:function(){
        this._lineLayer = new cc.Layer();
        this._lineLayer.setContentSize(this._cSize);
        this._lineLayer.setPosition(0, 0);
        this.addChild(this._lineLayer);
    },

    createWheels:function(){
        for(var i = 0; i < this._rollerCount; i ++) {
            var wheel = new SingleWheel();
            wheel.setPosition(i*(wheelSize.width+this._gap), 0);
            wheel.setTag((i+1)*100);
            this.addChild(wheel);
        }
    },

    beginRunLoop:function(){
        for(var i = 0; i < this._rollerCount; i ++) {
            var roller = this.getChildByTag((i+1)*100);
            roller.beginScrollLoop(i);
        }
        this.hideWinLine();
    },

    convertLineToPositionArr:function(line){
        var xOrigin = wheelSize.width/2;
        var yOrigin = wheelSize.height/2;
        var pointsArr = GameBasicData.getInstance().getLinePointsArrByIndex(line);
        var positionArr = new Array();
        for (var i = 0; i < pointsArr.length; i ++){
            var point = pointsArr[i];
            positionArr.push(cc.p(xOrigin + parseInt(point.x)*wheelSize.width, yOrigin + parseInt(point.y)*wheelSize.height));
        }

        return positionArr;
    },

    hideWinLine:function(){
        this._lineLayer.removeAllChildren(true);
        this._lineLayer.stopAllActions();
    },

    showWinLine:function(lineArr){
        if(lineArr.length < 1) {
            return ;
        }
        var tmpLayer = this._lineLayer;
        var blinkTimes = 1;
        var blinkTime = 1;
        var lineCurrent = 0;
        var lineCount = lineArr.length;

        var roundTimes = 3;

        var drawLine = function(){
            if(lineCurrent >= lineCount) {
                if(--roundTimes <=0 ){
                    //return ;
                }
                lineCurrent = 0;
            }
            var removeCallBack = cc.callFunc(function(){
                tmpLayer.removeAllChildren(true);
            });

            var positionArr = this.convertLineToPositionArr(lineArr[lineCurrent]);
            for(var i = 0; i < positionArr.length-1; i++){
                var drawNode = new cc.DrawNode();
                drawNode.setLineWidth(2);
                drawNode.setDrawColor(cc.color(255, 255, 0));
                drawNode.drawSegment(positionArr[i], positionArr[i+1], 2, cc.color(255, 255, 0));
                tmpLayer.addChild(drawNode);
            }
            var blinkAction = cc.blink(blinkTime, blinkTimes);
            var timeDelay = cc.delayTime(blinkTime);
            //var seq = cc.sequence(timeDelay, removeCallBack, drawNextLine);
            var seq = cc.sequence(timeDelay, removeCallBack, cc.delayTime(0.1),cc.callFunc(drawLine));
            if(parseInt(lineCount) == 1) {
                seq = cc.sequence(blinkAction, timeDelay, removeCallBack, cc.callFunc(drawLine));
                //seq = cc.sequence(timeDelay, removeCallBack, cc.callFunc(drawLine));
            } else {
                tmpLayer.runAction(seq);
            }

            lineCurrent ++;
        }.bind(this);
        drawLine();
    },
})