/**
 * Created by bigqiang on 15/8/3.
 */

var LocalStorage = cc.Class.extend({
    _db: null,
    _dbKey: {
        uid: "uid",
        username: "user_name",
        userpwd: "user_pwd",
        isrempwd: "is_rem_pwd",
        authkey: "auth_key",
        urlkey: "url_key",
        music: "music_switch",
        sound: "sound_switch",
        isfreshhand: "is_fresh_hand",
        gamemoney:"game_money",
        freechance:"free_chance"
    },

    init: function () {

        return true;
    },

    setGameFreeChance:function(val){
        cc.sys.localStorage.setItem(this._dbKey.freechance, val);
    },

    getGameFreeChance:function(){
        return cc.sys.localStorage.getItem(this._dbKey.freechance);
    },
    setGameMoneyBalance:function(val){
        cc.sys.localStorage.setItem(this._dbKey.gamemoney, val);
    },

    getGameMoneyBalance:function(){
        return cc.sys.localStorage.getItem(this._dbKey.gamemoney);
    },

})

LocalStorage._sharedStorage = null;
LocalStorage.getInstance = function(){
    if(!this._sharedStorage){
        this._sharedStorage = new LocalStorage();
        if(this._sharedStorage.init()){
            return this._sharedStorage;
        }
    }else{
        return this._sharedStorage;
    }
}