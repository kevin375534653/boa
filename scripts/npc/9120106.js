/*
 ZEVMS冒险岛(079)游戏服务端
 脚本：情人节红线女
 */




var status = 0

function start() {
    cm.sendYesNo("#e#b想要进入商城购买豆豆吗？#n#k");
}

function action(mode, type, selection) {
    if (mode != 1) {
        if (mode == 0)
            cm.sendOk("请想好以后再联系我。");
        cm.dispose();
        return;
    }
    status++;
    if (status == 1) {
        cm.EnterCashShopHandler();
    }
}