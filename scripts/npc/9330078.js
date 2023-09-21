/*
 ZEVMS冒险岛(079)游戏服务端
 脚本：酷男孩
 */
var JT = "#fUI/Basic/BtHide3/mouseOver/0#";
var 心 = "#fUI/GuildMark.img/Mark/Etc/00009001/14#";
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        var selStr = "你好~#b#h ##k,我是酷男孩，活动已经开始了!想跟我一起参加就走吧!\r\n";
		if(cm.getPlayer().getMapId()!=749020910){
        selStr += " #L4##b去国庆蛋糕活动地图#k#l\r\n";
		//selStr += " #L100##b兑换国庆币#k#l\r\n";
		}else{
			selStr += " #L1##b我要离开了#k#l\r\n";
			selStr += " #L2##b进入活动地图#k#l\r\n";
			selStr += " #L3##b国庆币兑换物品#k#l\r\n";
		}

        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
            case 1:
                cm.warp(cm.getPlayer().getSavedLocation("FREE_MARKET"));
                cm.dispose();
				//cm.openNpc(2007,7);
                break;
			case 2:
                cm.dispose();
				cm.openNpc(9330078,"1");
				//cm.dispose();
                break;
			case 3:
                cm.dispose();
				cm.openNpc(9330078,"2");
				//cm.dispose();
                break;
			case 4:
			    cm.getPlayer().saveLocation("FREE_MARKET");
			    cm.warp(749020910);
                cm.dispose();
                break;
			case 100:
                cm.dispose();
				cm.openNpc(9330078,"2");
                break;
        }
    }
}