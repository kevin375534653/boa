var arena;
var status = 0;

function start() {
    arena = cm.getPlayer().getAriantColiseum();
    if (arena == null) {
        cm.sendOk("嘿，我在竞技场的战斗中没有看到你在场上！你在这儿干什么？");
        cm.dispose();
        return;
    }

    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            copns = arena.getAriantScore(cm.getPlayer());
            if (copns < 1 && !cm.getPlayer().isGM()) {
                cm.sendOk("太糟糕了，你没有得到任何珠宝！");
                cm.dispose();
            } else {
                cm.sendNext("让我看一下......排名是第#b" + copns + "#k位，拿来我喜欢的宝石8个啊。竞技赛结束了，给你竞技场得分#b" + arena.getAriantRewardTier(cm.getPlayer()) + "分#k。想了解竞技场得分系统的话，去问#b#p2101015##k吧。");
            }
        } else if (status == 1) {
            //cm.warp(980010020, 0);
            copns = arena.getAriantRewardTier(cm.getPlayer());
            arena.clearAriantRewardTier(cm.getPlayer());
            arena.clearAriantScore(cm.getPlayer());
            cm.removeAll(4031868);

            cm.getPlayer().gainExp(92.7 * cm.getPlayer().getExpRate() * copns, true, true);
            cm.getPlayer().gainAriantPoints(copns);
            cm.sendOk("好吧！下次给我制造更多的珠宝吧！啊哈哈哈哈！");
            cm.dispose();
        }
    }
}