
var status = 0;
var xx = "#fEffect/ItemEff.img/1049000/0/0#"
var 信封未拆 = "#fEffect/BasicEff.img/FindPrize/Success/0#";
var 信封已拆 = "#fEffect/BasicEff.img/FindPrize/Success/11#";
var 金币 = "#fUI/UIWindow.img/Item/BtCoin/normal/0#";
var 叹号按钮 = "#fUI/UIWindow.img/Item/BtGather/mouseOver/0#";
var maxActive = 650; //最大活跃只能是490
var nowActive = 250; //当前活跃
var encourageList = Array(80,170,270,380,500,650) //奖励档数
var encourageCharList = Array("①","②","③","④","⑤","⑥","⑦","⑧") //单个字符展示
var btstat = Array("#k[未完成]#k","#b[未领取]#k","#r[已领取]#k")
var logName = "activeValueDay_"

var slc = 0;

var control = 0;//3创建师门

var createMeso = 50000000;
var 创建等级 = 70;

var 出师等级 = 69;

var tdList = null;

var partyList = null;

var MasterCache = Java.type("cache.MasterCache");


function start(){
    action(1,0,0);
}

function action(mode, type, selection) {
    // cm.getPlayer().dropMessage(5,mode+" "+type+" "+selection+" "+status);
    if(mode == 0){
        // cm.sendOk("好的");
        cm.dispose();
        return
    }
    if(status == 0){
        var info = MasterCache.ST_INVITE.get(cm.getPlayer().getId());
        var text="#b------------------------------------------------------------------------------\r\n";
        text+=金币+"#r玩家:"+info.getName()+"\r\n";
        text+=金币+"#r等级:"+info.getLevel()+"\r\n";
        text+=金币+"#r力量:"+info.getStr()+"\r\n";
        text+=金币+"#r敏捷:"+info.getDex()+"\r\n";
        text+=金币+"#r智力:"+info.getInt()+"\r\n";
        text+=金币+"#r运气:"+info.getLuk()+"\r\n";
        text+="#b------------------------------------------------------------------------------\r\n";
        text+="#r邀请你进入他的师门，是否同意\r\n";


        status++;
        cm.sendAcceptDecline(text);
        // cm.dispose();
    } else if(status == 1){

        /**接受了继续往下走*/
        var info = MasterCache.ST_INVITE.get(cm.getPlayer().getId());
        cm.getPlayer().joinMaster(cm.getPlayer().getId(),info.getId());
        info.dropMessage(5,"[师徒通知]:'"+cm.getPlayer().getName()+"'同意了你的师徒邀请!");


        MasterCache.ST_INVITE.remove(cm.getPlayer().getId());
        cm.dispose();
    }


}