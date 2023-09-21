var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendOk("被封印的六手邪神复活了，这个村子陷入了危机之中，希望你帮帮我们。只要完成一定的任务就能获得封印六手邪神的力量。");
		cm.dispose();
		}
	}
}