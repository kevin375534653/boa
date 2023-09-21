var status = 0;

var maps =[1000000,104000000,100000000,101000000,102000000,103000000,120000000,105040300,140000000,889100001,219000000,
106020000,110000000,200000000,211000000,230000000,222000000,220000000,250000000,260000000,
600000000,240000000,261000000,221000000,251000000,550000000,130000000,551000000,801000000,801040000,541000000,
300000000,270000100,800000000,610020006,682000000];

var mobMaps=[100040001,100040002,100040003,100040004];
var cost = 1;
var costItem=5041000;
var selectedMap = -1;

var mesos;

function start() {
    cm.sendNext("如果你厌倦了单调的日常生活，出去换换口味怎么样？没有什么比吸收一种新的文化，一分钟一分钟地学习新的东西更重要的了！ 是你出去旅行的时候了。我们枫叶旅行社推荐您参加“世界之旅”#k！");
}
var selection1=0;
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 1 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 2 && mode == 0) {
            cm.sendNext("这个镇上也有很多值得一看的地方。当你需要去另一个城镇时，请回来找我们。");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if(status==1)
		{
			var selStr="#d欢迎来到世界旅行社，请选择您想去的方向：\r\n";
			selStr +="\r\n #b \t\t你现在有#v"+costItem+"##z"+costItem+"#:[ #r#c"+costItem+"##b ]"
			selStr+="\r\n\r\n  \t\t#L0#城市旅游#l  \t\t  #L1#怪物旅行#l\r\n \r\n "
			cm.sendSimple(selStr);
		}
		else if (status == 2) {
            var selStr = "";
			selection1=selection;
			if(selection==1)
			{
				selStr += "选择您的目的地，因为费用会因地而异。#b";
                for (var i = 0; i < mobMaps.length; i++)
                selStr += "\r\n#d#L" + i + "##m" + mobMaps[i] + "# (#r" + 1 + "#b #v"+costItem+"##z"+costItem+"##d)#l";
                cm.sendSimple(selStr);
			}
		    else{
            selStr += "选择您的目的地，因为费用会因地而异。#b";
            for (var i = 0; i < maps.length; i++)
                selStr += "\r\n#d#L" + i + "##m" + maps[i] + "# (#r" + 1 + " #v"+costItem+"##z"+costItem+"##d)#l";
                cm.sendSimple(selStr);
		    }
        }
		else if (status == 3) {
			if(selection1==0)
			{
			cm.sendYesNo("你在这里没有别的事要做了吧？你真的想去看电影吗？#b#m" + maps[selection] + "##k?你得为此付出代价#r" + 1 + "#b #v"+costItem+"##z"+costItem+"##d#k。");
            selectedMap = selection;
			}
		    else
		   {
			cm.sendYesNo("你在这里没有别的事要做了吧？你真的想去看电影吗？#b#m" + mobMaps[selection] + "##k？你得为此付出代价#r" + 1 + "#b #v"+costItem+"##z"+costItem+"##d#k。");
            selectedMap = selection;
		   }
        } else if (status == 4) {

          
            if (cm.haveItem(costItem,cost)==false) {
                cm.sendNext("你的钱不够#z"+costItem+"#。很抱歉这么说，但是没有他们，你就不能坐出租车了。");
                cm.dispose();
                return;
            }
            
            cm.gainItem(costItem,-cost);
			if(selection1==0)
			{cm.warp(maps[selectedMap], 0);}
		    else
		    {cm.warp(mobMaps[selectedMap], 0);}
            
            cm.dispose();
			return;
        }
    }
}