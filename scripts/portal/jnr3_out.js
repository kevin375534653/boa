function enter(pi) {
    if (pi.getMap().getReactorByName("jnr3_out3").getState() == 1) {
        pi.playPortalSound();
        pi.warp(926110203, 0); //next
        return true;
    } else {
        pi.playerMessage(5, "门还没开。");
        return false;
    }
}