function enter(pi) {
    if (pi.isQuestStarted(22008)) {
        pi.playPortalSound();
        pi.warp(100030103, "west00");
    } else {
        pi.playerMessage(5, "你没有理由不能去后院。");
    }
    return true;
}  