function enter(pi) {
    if (pi.getMap().countMonster(9300285) > 0) {
        pi.getPlayer().message("出发前需要打败人偶师。");
        return false;
    } else {
        var eim = pi.getEventInstance();
        if (eim != null) {
            eim.stopEventTimer();
            eim.dispose();
        }

        pi.playPortalSound();
        pi.warp(105070300, 3);
        return true;
    }
}