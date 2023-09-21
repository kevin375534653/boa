var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || (mode == 0 && status == 0)) {
        cm.dispose();
        return;
    } else if (mode == 0) {
        status--;
    } else {
        status++;
    }


    if (status == 0) {
        cm.sendGetText("#b（要说出暗号才能进入。）#k");
    } else if (status == 1) {
        if (cm.getWarpMap(925040100).countPlayers() > 0) {
            cm.sendOk("已经有人进去了，请更换频道或稍后再试。");
            cm.dispose();
            return;
        }
        if (cm.getText() == "道可道非常道") {
            if (cm.isQuestStarted(21747) && cm.getQuestProgressInt(21747, 9300351) == 0) {
                cm.warp(925040100, 0);
            } else {
                cm.playerMessage(5, "无法进入封印的寺院。请稍后再试。");
            }

            cm.dispose();
        } else {
            cm.sendOk("#b（这个暗号似乎不正确。）#k");
        }
    } else if (status == 2) {
        cm.dispose();
    }
}