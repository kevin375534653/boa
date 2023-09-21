function enter(pi) {
    pi.removeAll(4001162);
    pi.removeAll(4001163);
    pi.removeAll(4001164);
    pi.removeAll(4001169);
    pi.removeAll(2270004);

    var spring = pi.getMap().getReactorById(3008000);  // thanks Chloek3, seth1 for noticing fragments not being awarded properly
    if (spring != null && spring.getState() > 0) {
        if (!pi.canHold(4001198, 1)) {
            pi.playerMessage(5, "进入之前，请检查你是否有足够的空间来存放物品。");
            return false;
        }

        pi.gainItem(4001198, 1);
    }

    pi.playPortalSound();
    pi.warp(300030100, 0);
    return true;
}