function enter(pi) {
    if (pi.isQuestStarted(21610) && pi.haveItem(4001193, 1) == 0) {
        var em = pi.getEventManager("Aran_2ndmount");
        if (em == null) {
            pi.message("抱歉，第二次登山任务（Scadur）已关闭。");
            return false;
        } else {
            var em = pi.getEventManager("Aran_2ndmount");
            if (!em.startInstance(pi.getPlayer())) {
                pi.message("地图上有人，请稍后再来。");
                return false;
            } else {
                pi.playPortalSound();
                return true;
            }
        }
    } else {
        pi.playerMessage(5, "只有第二次骑狼任务的随从可以进入这个区域。");
        return false;
    }
}