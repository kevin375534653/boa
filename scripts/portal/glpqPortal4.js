function enter(pi) {
    var eim = pi.getEventInstance();
    if (eim != null) {
        if (eim.getIntProperty("glpq4") < 5) {
            pi.playerMessage(5, "门尚未打开。");
            return false;
        } else {
            pi.playPortalSound();
            pi.warp(610030500, 0);
            return true;
        }
    }

    return false;
}