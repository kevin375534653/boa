var status = 0;
var itemList =   
Array(   
Array(1322055, 100, 1, 1),
Array(1302035, 100, 1, 1), //燃烧的冰焰刀
Array(1302036, 100, 1, 1), //南瓜枪
Array(1302058, 100, 1, 1), //南瓜灯笼
Array(1302066, 800, 1, 1) //彩色雨伞

);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
           selStr = "#e#r该玩具箱可以获得以下物品，99%获得\r\n#b是否消耗 #g1#r个#b#v4032226#\r\n来一发？#b[#r100%获得，绝无欺骗#b]#n#k\r\n";
		   for (i = 0; i < itemList.length; i++) {
                selStr += "#d#v" + itemList[i][0] + "#";
            }
			cm.sendOk(selStr);
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
		selStr = "\r\n";
		   for (i = 0; i < itemList.length; i++) {
                selStr += "#d#v" + itemList[i][0] + "#";
            }
           // cm.sendOk("以下道具可在宿命剪刀作用下实现可交易"+selStr);
			cm.sendOk("只要道具描述中显示有#b使用宿命剪刀,可以使物品交易1次#k的物品，都可以使用宿命剪刀");
            cm.dispose();
			return;
    } else if (status == 1) {
        var chance = Math.floor(Math.random() * 800);
        var finalitem = Array();
        for (var i = 0; i < itemList.length; i++) {
            if (itemList[i][1] >= chance) {
                finalitem.push(itemList[i]);
            }
        }
        if (finalitem.length != 0) {
            var item;
            var random = new java.util.Random();
            var finalchance = random.nextInt(finalitem.length);
            var itemId = finalitem[finalchance][0];
            var quantity = finalitem[finalchance][2];
            var notice = finalitem[finalchance][3];
            item = cm.gainGachaponItem(itemId, quantity, "活动金猪抽奖", notice);
            if (item != -1) {
                cm.gainItem(5220040, -1);
                cm.sendOk("你获得了 #b#t" + item + "##k " + quantity + "个。");
            } else {
                cm.sendOk("你确实有#b#v5220040##k吗？如果是，请你确认在背包的装备，消耗，其他窗口中是否有一格以上的空间。");
            }
            cm.dispose();
        } else {
            cm.sendOk("今天的运气可真差，什么都没有拿到。");
            cm.gainItem(5220040, -1);
            safeDispose
        }
    }
}