function enter(pi) {
    if (!pi.haveItem(4031890)) {
        pi.getPlayer().dropMessage(6, "你需要霍夫卡才能激活传送。");
        return false;
    }

    pi.playPortalSound();
    pi.warp(120000101, "earth01");
    return true;
}