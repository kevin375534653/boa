var status = -1;
var itemids = Array(2040728, 2040729, 2040730, 2040731, 2040732, 2040733, 2040734, 2040735, 2040736, 2040737, 2040738, 2040739);

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    }
    status++;
    if (status == 0) {
        cm.sendSimple("你好，#h0#你要制作什么样的卷轴呢？卷轴种类不同，需要的皮毛数量也不同。\r\n\r\n#r#L1#兑换物品#l#k");
    } else if (status == 1) {
        var selStr = "好吧，好吧。这些是你可以购买的。。。\r\n\r\n#b";
        for (var i = 0; i < itemids.length; i++) {
            selStr += "#L" + i + "##i" + itemids[i] + "##z" + itemids[i] + "##l\r\n";
        }
        cm.sendSimple(selStr);
    } else if (status == 2) {
        if (!cm.canHold(itemids[selection], 1)) {
            cm.sendOk("请留出足够的背包空间。");
        } else if (!cm.haveItemWithId(4001261)) {
            cm.sendOk("不过你好像没有足够的蝙蝠怪皮毛啊……材料不够。这样怎么能兑换卷轴呢？");
        } else {
            cm.gainItem(4001261, -1);
            cm.gainItem(itemids[selection], 1);
            cm.sendOk("嗯，皮毛的成色刚刚好。喏，这是你要的卷轴，拿好了。");
        }
        cm.dispose();
    }
}