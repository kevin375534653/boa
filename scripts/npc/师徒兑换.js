
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

var 师徒点 = 0;

var slc = 0;

var itemList = Array(
    Array(5040000,1,30),
    Array(5390005,1,55),
    Array(5041000,1,60),
    Array(5150040,1,65),
    Array(5450000,1,70),
    Array(5050000,1,75),
    Array(5130000,1,80),
    Array(5220000,1,90),
    Array(2049100,1,300),
    Array(1082149,1,1000),
    Array(1102042,1,1500),
    Array(1102041,1,1888),
    Array(1102163,1,3000)

);


function start(){
    action(1,0,0);
}

function action(mode, type, selection) {
    师徒点 = cm.getPlayer().getMyShiTuPoints();
    // cm.getPlayer().dropMessage(5,mode+" "+type+" "+selection+" "+status);
    if(mode == 0){
        // cm.sendOk("好的");
        cm.dispose();
        return
    }
    if(status == 0){

        var text="#b------------------------------------------------------------------------------\r\n";
        text+=金币+"#r师徒点:"+师徒点+"\r\n";
        text+="#b------------------------------------------------------------------------------\r\n";
        for(var i = 0;i<itemList.length;i++){
            text+="#L"+i+"##b[#v"+itemList[i][0]+"##z"+itemList[i][0]+"#]*"+itemList[i][1]+"\t\t师徒点:#r"+itemList[i][2]+"#l\r\n";
        }


        status++;
        cm.sendSimple(text);

    } else if(status == 1){
        slc = selection;
        if(师徒点 < itemList[slc][2]){
            cm.sendOk("你的师徒点不够!");
            cm.dispose();
            return;
        }
        status++;
        cm.sendYesNo("#b是否花费#r["+itemList[slc][2]+"]师徒点#b 兑换 "+itemList[slc][1]+"个[#v"+itemList[slc][0]+"# #z"+itemList[slc][0]+"#]");
    } else if (status == 2){
        师徒点 = cm.getPlayer().getMyShiTuPoints();
        if(!cm.canHold(itemList[slc][0],itemList[slc][1])){
            cm.sendOk("清理一下背包再来!");
            cm.dispose();
            return;
        }
        if(师徒点 > itemList[slc][2]){
            /**扣除师徒点*/
            cm.getPlayer().addShiTuPoints(cm.getPlayer().getId(),-itemList[slc][2],0);
            /**给物品*/
            cm.gainItem(itemList[slc][0],itemList[slc][1]);
            cm.sendOk("兑换成功!");
            cm.dispose();
            return;
        }
        cm.sendOk("你的师徒点不够!");
        cm.dispose();
        return;
    }


}