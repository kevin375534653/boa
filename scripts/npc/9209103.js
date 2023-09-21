/*
 ZEVMS冒险岛(079)游戏服务端
 */

var 新年小红包 = 4031546;
var 新年中红包 = 4031547;
var 新年大红包 = 4031548;
var 新年特制红包 = 4031549;


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
    //开始
    if (status == 0) {

        var selStr = "	Hi~#b#h ##k在我们这里，每一天都是新年，每一天都热热闹闹的对吧。你如果可以给我红包，我会给你一些报酬。\r\n";
        selStr += "\t #L1#" + cm.显示物品(新年小红包) + "  [ #b#c" + 新年小红包 + "##k ]#l\r\n";
        selStr += "\t #L2#" + cm.显示物品(新年中红包) + "  [ #b#c" + 新年中红包 + "##k ]#l\r\n";
        selStr += "\t #L3#" + cm.显示物品(新年大红包) + "  [ #b#c" + 新年大红包 + "##k ]#l\r\n";
        selStr += "\t #L4#" + cm.显示物品(新年特制红包) + "  [ #b#c" + 新年特制红包 + "##k ]#l\r\n";




        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
			//特大红包
            case 4:
                if (cm.haveItem(新年特制红包, 1)) {
                    if (cm.百分率(60)) {
                        cm.给点券(cm.随机数(50));
                    }
                    if (cm.百分率(90)) {
                        cm.给金币(cm.随机数(5000));
                    }
                    if (cm.百分率(50)) {
                        cm.给经验(cm.随机数(50000));
                    }
					cm.gainItem(新年特制红包,-1);
                }else{
					cm.sendOk("你没有新年特制红包。");
				}
                cm.dispose();
                break;
			//大红包
            case 3:
                if (cm.haveItem(新年大红包, 1)) {
                    if (cm.百分率(60)) {
                        cm.给点券(cm.随机数(30));
                    }
                    if (cm.百分率(90)) {
                        cm.给金币(cm.随机数(3000));
                    }
                    if (cm.百分率(50)) {
                        cm.给经验(cm.随机数(30000));
                    }
					cm.gainItem(新年大红包,-1);
                }else{
					cm.sendOk("你没有新年大红包。");
				}
                cm.dispose();
                break;
			//中红包
            case 2:
                if (cm.haveItem(新年中红包, 1)) {
                    if (cm.百分率(60)) {
                        cm.给点券(cm.随机数(30));
                    }
                    if (cm.百分率(90)) {
                        cm.给金币(cm.随机数(2000));
                    }
                    if (cm.百分率(50)) {
                        cm.给经验(cm.随机数(20000));
                    }
					cm.gainItem(新年中红包,-1);
                }else{
					cm.sendOk("你没有新年中红包。");
				}
                cm.dispose();
                break;
            //小红包
            case 1:
                if (cm.haveItem(新年小红包, 1)) {
                    if (cm.百分率(60)) {
                        cm.给点券(cm.随机数(10));
                    }
                    if (cm.百分率(90)) {
                        cm.给金币(cm.随机数(1000));
                    }
                    if (cm.百分率(50)) {
                        cm.给经验(cm.随机数(10000));
                    }
					cm.gainItem(新年小红包,-1);
                }else{
					cm.sendOk("你没有新年小红包。");
				}
                cm.dispose();
                break;

        }
    }
}





















