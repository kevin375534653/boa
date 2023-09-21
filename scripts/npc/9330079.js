function start() {
	cm.sendYesNo("现在带你回到活动地图？");
}

function action(mode, type, selection) {
    if (mode == 1) {
	if (cm.getPlayer().getMapId()==749020920) {
		cm.warp(749020910, 0);
	} else {
	cm.warp(749020900,0);
	}
    }
    cm.dispose();
}