/**
 * Created by bigqiang on 15/7/24.
 */

var BaseLayer = cc.LayerColor.extend({
    _className:"BaseLayer",
    _delegate:null,
    _cSize:null,
    _btnZoomScale:0.05,
    _menuItemScale:1.02,

    ctor:function(){
        this._super();
        this.setColor(cc.color(255, 255, 255));
        this._cSize = cc.winSize;
        this.setContentSize(this._cSize);
        this.setPosition(0, 0);

        return true;
    },

    onEnter:function(){
        this._super();
    },

    onExit:function(){
        this._super();
    },

    setDelegate:function(del){
        this._delegate = del;
    },

    getDelegate:function(){
        if (this._delegate) {
            return this._delegate;
        } else {
            return cc.director.getRunningScene();
        }
    },

    removeSelfAndCleanUp:function(isCleanUp){
        var isClean = (isCleanUp)? true : false;
        this.removeFromParent(isClean);
    },

    closeSelf:function(sender, type){
        if(ccui.Widget.TOUCH_ENDED === type){
            cc.log("closeSelf");
            this.removeSelfAndCleanUp();
        }
    },

    createTouchEnabledBg:function(isClose, parent){
        var bgLayout = new ccui.Layout();
        bgLayout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        bgLayout.setBackGroundColor(cc.color(0, 0, 0));
        bgLayout.setBackGroundColorOpacity(90);
        //bgLayout.setBackGroundColorOpacity(0);
        bgLayout.setPosition(0, 0);
        bgLayout.setTouchEnabled(true);
        bgLayout.setContentSize(this._cSize);
        bgLayout.setLocalZOrder(-1);
        if(isClose) {
            bgLayout.addTouchEventListener(this.closeSelf, this);
            this._createTouchUnRemoveSelfLayout(parent);
        }
        this.addChild(bgLayout);
    },

    _createTouchUnRemoveSelfLayout:function(parent){
        if(null == parent) return;
        var bgLayout = new ccui.Layout();
        bgLayout.setPosition(0, 0);
        bgLayout.setTouchEnabled(true);
        bgLayout.setContentSize(parent.getContentSize());
        parent.addChild(bgLayout);
    },

    createCloseBtn:function(tag){
        var closeBtn = new ccui.Button();
        closeBtn.loadTextures(CommonRes.backBtn,CommonRes.backBtn,CommonRes.backBtn,ccui.Widget.PLIST_TEXTURE);
        closeBtn.setPosition(21, this._cSize.height - 21);
        closeBtn.setAnchorPoint(cc.p(0,1));
        closeBtn.setPressedActionEnabled(true);
        closeBtn.setZoomScale(this._btnZoomScale);
        closeBtn.addTouchEventListener(this.closeSelf, this);
        if(tag != undefined){
            closeBtn.setTag(tag);
        }
        this.addChild(closeBtn);
        return closeBtn;
    },

    getButtonZoomScale:function(){
        return this._btnZoomScale;
    },

    getMenuItemScale:function(){
        return this._menuItemScale;
    }
})