function enter(pi) {
    var em = pi.getEventManager("KerningTrain");
    if (!em.startInstance(pi.getPlayer())) {
        pi.message("旅行车已经满了。稍后再试一次。");
        return false;
    }

    pi.playPortalSound();
    return true;
}