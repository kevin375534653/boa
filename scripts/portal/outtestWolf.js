function enter(pi) {
    if (pi.getMap().countMonsters() == 0) {
        if (pi.canHold(4001193, 1)) {
            pi.gainItem(4001193, 1);
            pi.playPortalSound();
            pi.warp(140010210, 0);
            return true;
        } else {
            pi.playerMessage(5, "在收到库斯·克利尔的代币之前，在你的背包上留出一个空位。");
            return false;
        }
    } else {
        pi.playerMessage(5, "在离开地图前击败所有的狼。");
        return false;
    }
}