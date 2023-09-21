function enter(pi) {
    var eim = pi.getEventInstance();
    if (eim != null) {
        eim.stopEventTimer();
        eim.dispose();
    }

    var questProgress = pi.getQuestProgressInt(2330, 3300005) + pi.getQuestProgressInt(2330, 3300006) + pi.getQuestProgressInt(2330, 3300007); //3 Yetis
    if (questProgress == 3 && !pi.hasItem(4032388)) {
        if (pi.canHold(4032388)) {
            pi.getPlayer().message("恭喜你击败了企鹅国王，请收下#b结婚礼堂钥匙#k吧。");
            pi.gainItem(4032388, 1);

            pi.playPortalSound();
            pi.warp(106021400, 2);
            return true;
        } else {
            pi.getPlayer().message("请在您的其他栏中留出空间。");
            return false;
        }
    } else {
        pi.playPortalSound();
        pi.warp(106021400, 2);
        return true;
    }
}