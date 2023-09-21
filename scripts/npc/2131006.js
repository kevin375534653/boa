var status = -1;
var exchangeItem = 4000440;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
        cm.sendSimple("怪物就在前面。。我不能继续前进了。我被原始野猪撞伤了...#b\r\n#L0#嘿，拿着这些野猪皮。你可以从他们那里恢复过来.#l");
    } else if (status == 1) {
	if (!cm.haveItem(exchangeItem, 100)) {
	    cm.sendNext("你没有足够的。。。我至少需要100个.");
	    cm.dispose();
	} else {
	    cm.sendGetNumber("嘿，这真是个好主意! 我可以给你 #i4310000#但是你要给我 100个 #i" + exchangeItem + "##t" + exchangeItem + "#.你要交换嘛? (兑换: " + cm.itemQuantity(exchangeItem) + ")", Math.min(300, cm.itemQuantity(exchangeItem) / 100), 1, Math.min(300, cm.itemQuantity(exchangeItem) / 100));
	}
    } else if (status == 2) { 
	if (selection >= 1 && selection <= cm.itemQuantity(exchangeItem) / 100) {
	    if (!cm.canHold(4310000, selection)) {
		cm.sendOk("请留出足够的空间.");
	    } else {
		cm.gainItem(4310000, selection);
		cm.gainItem(exchangeItem, -(selection * 100));
		cm.sendOk("感谢!");
	    }
	}
        cm.dispose();
    }
}