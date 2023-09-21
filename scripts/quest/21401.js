var status = -1;

function start(mode, type, selection) {
    status++;
    if (mode == 0 && type == 0) {
        status -= 2;
    } else if (mode != 1) {
        //if (mode == 0)
        qm.sendNext("#b(你需要考虑一下。。。)#k");
        qm.dispose();
        return;
    }

    if (status == 0) {
        qm.sendNext("……问我怎么会变成这样？……本来不太想说的……不是，当然瞒不过主人你了……");
    } else if (status == 1) {
        qm.sendNextPrev("……你被冰封的数百年间，我也被冰在了冰窟里。那么长的时间，没有主人的陪伴……渐渐的，我的心里便出现了黑暗。");
    } else if (status == 2) {
        qm.sendNextPrev("不过，你重新苏醒后，我心中的黑暗也跟着完全消失了。既然主人回来了，心里也没有什么可难过的了。本以为这样就没事了……没想到这只是我的错觉。");
    } else if (status == 3) {
        qm.sendAcceptDecline("拜托了，战神……一定要阻止我。能够阻止我暴走的只有你了。我再也抑制不住内心中的黑暗了！无论如何，一定要#r打败暴走的我#k！");
    } else if (status == 4) {
        var em = qm.getEventManager("MahaBattle");
        if (!em.startInstance(qm.getPlayer())) {
            qm.sendOk("地图上有人，请稍后再来。");
        } else {
            qm.startQuest();
        }

        qm.dispose();
    }
}

function end(mode, type, selection) {
    status++;
    if (mode == 0 && type == 0) {
        status -= 2;
    } else if (mode != 1) {
        //if (mode == 0)
        qm.sendNext("#b(你需要考虑一下……)#k");
        qm.dispose();
        return;
    }

    if (status == 0) {
        qm.sendNext("谢谢你，战神。多亏了你，才阻止了我的暴走。真是万幸……！以主人的实力，这点小事当然不在话下了！");
    } else if (status == 1) {
        qm.sendYesNo("现在来看，你的等级已经很高了。既然能够打倒暴走状态下的我……那么唤醒你过去全部的力量也应该是可以的了。");
    } else if (status == 2) {
        if (!qm.isQuestCompleted(21401)) {
            if (!qm.canHold(1142132)) {
                qm.sendOk("哇，你的#b装备栏#k已满. 请留出多余的空间来获取物品.");
                qm.dispose();
                return;
            }
            if (!qm.canHold(2280003, 1)) {
                qm.sendOk("'你的#b物品栏#k已满. 请留出多余的空间来获取物品.");
                qm.dispose();
                return;
            }

            qm.gainItem(1142132, true);
            qm.gainItem(2280003, 1);
            qm.changeJobById(2112);

            qm.completeQuest();
        }
        qm.sendNext("沉睡的技能全都唤醒了……毕竟好久没用了，还需要熟悉熟悉。不过，应该进步会很快的。");
    } else if (status == 3) {
        qm.dispose();
    }
}

function spawnMob(x, y, id, map) {
    if (map.getMonsterById(id) != null) {
        return;
    }

    const LifeFactory = Java.type('server.life.LifeFactory');
    const Point = Java.type('java.awt.Point');
    var mob = LifeFactory.getMonster(id);
    map.spawnMonsterOnGroundBelow(mob, new Point(x, y));
}