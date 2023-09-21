function enter(pi) {
    if (pi.canHold(4001193, 1)) {
        pi.gainItem(4001193, 1);
        pi.playPortalSound();
        pi.warp(211050000, 4);
        return true;
    } else {
        pi.playerMessage(5, "在收到库斯·克利尔的代币之前，在你的背包上留出一个空位。");
        return false;
    }
}