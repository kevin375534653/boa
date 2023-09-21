


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

function start(){
    action(1,0,0);
}
function action(mode, type, selection) {
    if(mode == 0){
        // cm.sendOk("好的");
        cm.dispose();
        return
    }

    cm.sendOk("敬请期待！！！");
    cm.dispose();




}
