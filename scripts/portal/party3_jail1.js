function enter(pi) {
    if (pi.getEventInstance().getIntProperty("statusStg8") == 1) {
        pi.playPortalSound();
        pi.warp(920010910, 0);
        return true;
    } else {
        pi.playerMessage(5, "由于精灵的力量，目前无法进入。");
        return false;
    }
}