function enter(pi) {
    if (pi.isQuestStarted(21701)) {
        pi.playPortalSound();
        pi.warp(914010000, 1);
        return true;
    } else if (pi.isQuestStarted(21702)) {
        pi.playPortalSound();
        pi.warp(914010100, 1);
        return true;
    } else if (pi.isQuestStarted(21703)) {
        pi.playPortalSound();
        pi.warp(914010200, 1);
        return true;
    } else {
        pi.playerMessage(5, "在普奥那里得到充分的修炼后才能进入企鹅修炼场。");
        return false;
    }
}