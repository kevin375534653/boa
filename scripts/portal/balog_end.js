function enter(pi) {
    if (!pi.canHold(4001261, 1)) {
        pi.playerMessage(5, "请在其他栏留出一个空位。");
        return false;
    }
    pi.gainItem(4001261, 1);
    pi.playPortalSound();
    pi.warp(105100100, 0);
    return true;
}