function start() {
	if (cm.haveItem(4031289, 1)) {
		//cm.sendOk("你！你知道这里很危险吗？不管多么强大，也不能放松警惕，请你一定要小心。");
		cm.warp(701010321);
	} else {
		cm.sendOk("这里面很危险，你没有带来#v4031289#，我就不能让你进去了。");
		cm.dispose();
	}
}