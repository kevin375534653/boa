/* @author RonanLana */

function enter(pi) {
    if (!pi.haveItem(4000381)) {
        pi.playerMessage(5, "你没有白色精华。");
        return false;
    } else {
        var em = pi.getEventManager("LatanicaBattle");

        if (pi.getParty() == null) {
            pi.playerMessage(5, "你不在一个组队中，请创建一个组队再来挑战。");
            return false;
        } else if (!pi.isLeader()) {
            pi.playerMessage(5, "你的队长必须进入后才能开始战斗。");
            return false;
        } else {
            var eli = em.getEligibleParty(pi.getParty());
            if (eli.size() > 0) {
                if (!em.startInstance(pi.getParty(), pi.getPlayer().getMap(), 1)) {
                    pi.playerMessage(5, "与首领的战斗已经开始了，所以你还不能进入这个地方。");
                    return false;
                }
            } else {  //this should never appear
                pi.playerMessage(5, "你还不能开始这场战斗，因为你的队伍不在范围内，或者队员没有资格尝试，或者他们不在这个地图上。");
                return false;
            }

            pi.playPortalSound();
            return true;
        }
    }
}