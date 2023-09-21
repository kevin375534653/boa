function enter(pi) {
    var nex = pi.getEventManager("GuardianNex");
    if (nex == null) {
        pi.message("副本遇到错误。");
        return false;
    }

    var quests = [3719, 3724, 3730, 3736, 3742, 3748];
    var mobs = [7120100, 7120101, 7120102, 8120100, 8120101, 8140510];

    for (var i = 0; i < quests.length; i++) {
        if (pi.isQuestActive(quests[i])) {
            if (pi.getQuestProgressInt(quests[i], mobs[i]) != 0) {
                pi.message("你已经面对Nex了。完成你的任务。");
                return false;
            }

            if (!nex.startInstance(i, pi.getPlayer())) {
                pi.message("已经有人在挑战了，请稍后再试。");
                return false;
            } else {
                pi.playPortalSound();
                return true;
            }
        }
    }

    pi.message("一股神秘的力量阻止你进入。");
    return false;
}