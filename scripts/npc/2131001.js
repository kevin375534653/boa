var status = -1;
var exchangeItem = 4000439;

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
        cm.sendSimple("我的名字是 #p2131001#, 我是这一带最厉害的魔术师.#b\r\n#L0#嘿，拿着这些石头。你可以在他们身上施展魔法.#l");
    } else if (status == 1) {
	if (!cm.haveItem(exchangeItem, 100)) {
	    cm.sendNext("你没有足够的。。。我至少需要 100.");
	    cm.dispose();
	} else {
            // thanks yuxaij for noticing a few methods having parameters not matching the expected Math library function parameter types
	    cm.sendGetNumber("嘿，这是个好主意！我可以给你 #i4310000#但是每个需要100个 #i" + exchangeItem + "##t" + exchangeItem + "# 交给我. 你想要多少? (兑换: " + cm.itemQuantity(exchangeItem) + ")", Math.min(300, cm.itemQuantity(exchangeItem) / 100), 1, Math.min(300, cm.itemQuantity(exchangeItem) / 100));
	}
    } else if (status == 2) { 
	if (selection >= 1 && selection <= cm.itemQuantity(exchangeItem) / 100) {
	    if (!cm.canHold(4310000, selection)) {
		cm.sendOk("请留出足够的背包空间.");
	    } else {
		cm.gainItem(4310000, selection);
		cm.gainItem(exchangeItem, -(selection * 100));
		cm.sendOk("感谢!");
	    }
	}
        cm.dispose();
    }
}