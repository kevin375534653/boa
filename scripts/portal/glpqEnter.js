function enter(pi) {
    if (pi.haveItem(3992041, 1)) {
        pi.playPortalSound();
        pi.warp(610030020, "out00");
        return true;
    } else {
        pi.playerMessage(5, "巨大的铁门无论怎样都不会动，但是有一个看得见的钥匙形状的插孔。");
        return false;
    }
}