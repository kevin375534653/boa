/*
 By 梓条
 */

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
		var Editing = false //true=显示;false=开始活动
          if(Editing){
          cm.sendOk("暂停运作");
          cm.dispose();
          return;
        }    //黄金猪#i4032226##bx20#r换#b绵羊单人床 #i3010054#\r\n#L102##r
			cm.sendSimple("欢迎你!#b#h ##k,你知道吗？做梦获得的#b黄金猪猪#i4032226##k能在我这里兑换各种物品哦！" +
            "#k\r\n#L101#使用#b20个黄金猪猪#i4032226#换#b呼噜呼噜床#i3010054#x1\r\n#L103##k使用#b1个黄金猪猪#i4032226#换#b加持道具(加移速)#i2022484#x1\r\n#L104##k使用#b1个黄金猪猪#i4032226#换#b加持道具(加跳跃)#i2022485#x1\r\n#L105##k使用#b1个黄金猪猪#i4032226#换#b加持道具(加回避)#i2022486#x1\r\n#L106##k使用#b1个黄金猪猪#i4032226#换#b加持道具(加命中)#i2022487#x1");
        } else if (status == 1) {
            
            if (selection == 101) {
                if (cm.haveItem(4032226, 20) ) {
                    cm.gainItem(4032226, -20);
                    cm.gainItem(3010054, 1);
                    cm.sendOk("获得#b呼噜呼噜床#i3010054#");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有足够的#i4032226#,请确认");
                    cm.dispose();
                }
            } else if (selection == 102) {
                if (cm.haveItem(4032226, 2) ) {
                    cm.gainItem(4032226, -2);
                    cm.gainItem(2022483, 1);
                    cm.sendOk("获得#i2022483#x1");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有#i4032226#,请确认");
                    cm.dispose();
				}
			 }else if (selection == 103) {
                if (cm.haveItem(4032226, 1) ) {
                    cm.gainItem(4032226, -1);
                    cm.gainItem(2022484, 1);
                    cm.sendOk("获得#b加持道具(加移速)#i2022484#x1");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有#i4032226#,请确认");
                    cm.dispose();
				}
			 }else if (selection == 104) {
                if (cm.haveItem(4032226, 1) ) {
                    cm.gainItem(4032226, -1);
                    cm.gainItem(2022485, 1);
                    cm.sendOk("获得#b加持道具(加跳跃)#i2022485#x1");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有#i4032226#,请确认");
                    cm.dispose();
				}
			 }else if (selection == 105) {
                if (cm.haveItem(4032226, 1) ) {
                    cm.gainItem(4032226, -1);
                    cm.gainItem(2022486, 1);
                    cm.sendOk("获得#b加持道具(加回避)#i2022486#x1");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有#i4032226#,请确认");
                    cm.dispose();
				}
			 }else if (selection == 106) {
                if (cm.haveItem(4032226, 1) ) {
                    cm.gainItem(4032226, -1);
                    cm.gainItem(2022487, 1);
                    cm.sendOk("获得#b加持道具(加命中)#i2022487#x1");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有#i4032226#,请在次确认");
                    cm.dispose();
				}
			 }else if (selection == 107) {
                if (cm.haveItem(4032226, 1) ) {
                    cm.gainItem(4032226, -1);
                    cm.gainItem(2022488, 1);
                    cm.sendOk("获得#i2022488#x1");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有#i4032226#,请确认");
                    cm.dispose();
				}
			 }else if (selection == 108) {
                if (cm.haveItem(4032226, 20) ) {
                    cm.gainItem(4032226, -20);
                    cm.gainItem(2022489, 1);
                    cm.sendOk("获得#i2022489#x1");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有#i4032226#,请在次确认");
                    cm.dispose();
				}
			 }else if (selection == 109) {
                if (cm.haveItem(4032226, 20) ) {
                    cm.gainItem(4032226, -20);
                    cm.gainItem(2022490, 1);
                    cm.sendOk("获得#i2022490#x1");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有#i4032226#,请在次确认");
                    cm.dispose();
				}
			 }
        }
    }
}

	
