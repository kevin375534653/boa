var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0 && type == 0) {
        status--;
    } else if (mode == -1) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        cm.sendNext("你终于来了。拥有契约者资格的人……", 1);
    } else if (status == 1) {
        cm.sendNextPrev("执行契约吧……", 1);
    } else if (status == 2) {
        cm.warp(900090101, 0);
        cm.dispose();
    }
}