var mapp = -1;
var map = 0;

function enter(pi) {
    if (pi.getQuestStatus(20701) == 1) {
        map = 913000000;
    } else if (pi.getQuestStatus(20702) == 1) {
        map = 913000100;
    } else if (pi.getQuestStatus(20703) == 1) {
        map = 913000200;
    }
    if (map > 0) {
        if (pi.getPlayerCount(map) == 0) {
            var mapp = pi.getMap(map);
            mapp.resetPQ();

            pi.playPortalSound();
            pi.warp(map, 0);
            return true;
        } else {
            pi.playerMessage(5, "地图上已经有人了。");
            return false;
        }
    } else {
        pi.playerMessage(5, "1号大厅只有在你进行提提阿纳的驯化训练时才能进入。");
        return false;
    }
}