/* 天皇boss */

function enter(pi) {
        //if(pi.isQuestCompleted(8169)) {
        if (!pi.haveItem(4000342,1)) {
                pi.playerMessage(5, "你还不能进入这个地方。");
                return false;
        } else {
                var em = pi.getEventManager("z_Ravana");

                if (pi.getParty() == null) {
                        pi.playerMessage(5, "只有队长才能申请进入。");
                        return false;
                } else if(!pi.isLeader()) {
                        pi.playerMessage(5, "你的队长必须进入后才能开始战斗。");
                        return false;
                } else {
                        var eli = em.getEligibleParty(pi.getParty());
                        if(eli.size() > 0) {
                                if(!em.startInstance(pi.getParty(), pi.getPlayer().getMap(), 1)) {
                                        pi.playerMessage(5, "里面的战斗已经开始了，所以你还不能进入这个地方。");
                                        return false;
                                }
                        }
                        else {  //this should never appear
                                pi.playerMessage(5, "你还不能开始这场战斗，请召集队员后再来尝试。");
                                return false;
                        }

                        pi.playPortalSound();
                        return true;
                }
        }
}