/* @author RonanLana */

function enter(pi) {
    var stage = ((Math.floor(pi.getMapId() / 100)) % 10) - 1;
    var em = pi.getEventManager("TD_Battle" + stage);
    if (em == null) {
        pi.playerMessage(5, "蘑菇城堡" + stage + "遇到意外错误，当前不可用。");
        return false;
    }

    if (pi.getParty() == null) {
        pi.playerMessage(5, "你当前不在一个队伍中，请创建一个队伍再来尝试。");
        return false;
    } else if (!pi.isLeader()) {
        pi.playerMessage(5, "你的队长必须进入后才能开始战斗。");
        return false;
    } else {
        var eli = em.getEligibleParty(pi.getParty());
        if (eli.size() > 0) {
            if (!em.startInstance(pi.getParty(), pi.getPlayer().getMap(), 1)) {
                pi.playerMessage(5, "其他人已经在挑战了，请稍后再试。");
                return false;
            }
        } else {
            pi.playerMessage(5, "你的队伍必须由至少两名队员组成，才能进行挑战。");
            return false;
        }

        pi.playPortalSound();
        return true;
    }
}
