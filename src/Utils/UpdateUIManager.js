/**
 * Created by bigqiang on 15/7/1.
 */

//全局事件名称
var NOTIFY = {
    START_LOOP:"startLoop",
    GAME_WIN:"gameWin",
    SHOW_WIN_LINE_TIP:"showWinLineTip",
    NEW_RESULT_GENERATED:"newResultGenerated",
}

var UpdateUIManager=cc.Class.extend({
    _pageManagers:null,
    init:function(){
        this._pageManagers={};
    },
    /**
     * 添加事件监听
     * @param pageStr 标识在哪个page上(自定义的，不同page的pageStr不同)
     * @param func
     */
    addPageUpdateListeners :function(pageStr,func,targetObj, multiple){
        multiple = multiple || 0;
        if(!this._pageManagers[pageStr]){
            this._pageManagers[pageStr]=new signals.Signal();
        }

        if(!multiple){
            this._pageManagers[pageStr].removeAll();
        }
        this._pageManagers[pageStr].add(func,targetObj);
    },
    removeListeners:function(pageStr){
        if(this._pageManagers&&this._pageManagers[pageStr])
            this._pageManagers[pageStr].removeAll();
    },
    /**
     * 根据pageStr分发pageStr指定的页面的事件
     * @param pageStr
     * @param params type json
     */
    dispatch:function(pageStr,params){
        if(this._pageManagers[pageStr]){
            this._pageManagers[pageStr].dispatch(params);
        }
    }
});
UpdateUIManager.s_SharedPageManager = null;
UpdateUIManager.getInstance = function () {
    if (!UpdateUIManager.s_SharedPageManager) {
        UpdateUIManager.s_SharedPageManager = new UpdateUIManager();
        UpdateUIManager.s_SharedPageManager.init();
    }
    return UpdateUIManager.s_SharedPageManager;
};