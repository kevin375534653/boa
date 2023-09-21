var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var eim = cm.getEventInstance();
    if (eim != null && eim.getIntProperty("glpq6") == 3) {
        cm.sendOk("... 打的好。 您超越了扭曲大师，穿过那扇门去领奖。");
        cm.dispose();
        return;
    }

    if (!cm.isEventLeader()) {
        cm.sendNext("我希望你的组长能和我谈谈。");
        cm.dispose();
        return;
    }

    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    if (eim != null) {
        if (eim.getIntProperty("glpq6") == 0) {
            if (status == 0) {
                cm.sendNext("欢迎来到扭曲大师的城堡。今晚我将成为你的主人。。。");
            } else if (status == 1) {
                cm.sendNext("哈哈哈.........你們可以去和我的守護者們打個招呼吧.....哈哈哈....");
            } else if (status == 2) {
                cm.sendNext("哈哈哈........守護者的大師們正在欢迎你们的到来.....哈哈哈....！！");
                cm.mapMessage(6, "守护大师来了！");
                for (var i = 0; i < 10; i++) {
                    var mob = eim.getMonster(9400594);
                    const xPos = Math.floor(-1337 + (Math.random() * 1337))
                    cm.getMap().spawnMonsterOnGroundBelow(mob, new java.awt.Point(xPos, 276));
                }
                for (var i = 0; i < 20; i++) {
                    var mob = eim.getMonster(9400582);
                    const xPos = Math.floor(-1337 + (Math.random() * 1337))
                    cm.getMap().spawnMonsterOnGroundBelow(mob, new java.awt.Point(xPos, 276));
                }
                eim.setIntProperty("glpq6", 1);
                cm.dispose();
            }
        } else if (eim.getIntProperty("glpq6") == 1) {
            if (cm.getMap().countMonsters() == 0) {
                if (status == 0) {
                    cm.sendOk("呃。这是什么？你打败了他们？");
                } else if (status == 1) {
                    cm.sendNext("我正在为你们的到来准备盛大的欢迎典礼...哦...想想都兴奋....hahaha。");
                    cm.mapMessage(6, "请注意！！！守护者的军团已经来了！！");

                    //Margana
                    var mob = eim.getMonster(9400590);
                    cm.getMap().spawnMonsterOnGroundBelow(mob, new java.awt.Point(-22, 1));

                    //Red Nirg
                    var mob2 = eim.getMonster(9400591);
                    cm.getMap().spawnMonsterOnGroundBelow(mob2, new java.awt.Point(-22, 276));

                    //Hsalf
                    var mob4 = eim.getMonster(9400593);
                    cm.getMap().spawnMonsterOnGroundBelow(mob4, new java.awt.Point(496, 276));

                    //Rellik
                    var mob3 = eim.getMonster(9400592);
                    cm.getMap().spawnMonsterOnGroundBelow(mob3, new java.awt.Point(-496, 276));

                    eim.setIntProperty("glpq6", 2);
                    cm.dispose();
                }
            } else {
                cm.sendOk("Pay no attention to me. The Master Guardians will escort you!");
                cm.dispose();
            }
        } else if (eim.getIntProperty("glpq6") == 2) {
            if (cm.getMap().countMonsters() == 0) {
                cm.sendOk("别理我。守护大师会护送你！");
                cm.mapMessage(5, "通往机械库的大门已经打开！");
                eim.setIntProperty("glpq6", 3);

                eim.showClearEffect(true);
                eim.giveEventPlayersStageReward(6);

                eim.clearPQ();
                cm.dispose();
            } else {
                cm.sendOk("别理我。扭曲的主人会护送你！");
                cm.dispose();
            }
        } else {
            cm.sendOk("...你们表现的非常好，已经超越了守护者的大师们，通往机械库的大门已经打开。");
            cm.dispose();
        }
    } else {
        cm.dispose();
    }
}