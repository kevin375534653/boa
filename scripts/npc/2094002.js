var status = -1;
var level = 1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (cm.getPlayer().getMapId() == 925100700) {
        cm.warp(251010404, 0);
        cm.dispose();
        return;
    }

    if (status == 1) {   // leaders cant withdraw
        cm.warp(251010404, 0);
        return;
    }

    if (!cm.isEventLeader()) {
        cm.sendOk("要放弃找队长和我说?");
        cm.dispose();
    } else {
        var eim = cm.getEventInstance();
        if (eim == null) {
            cm.warp(251010404, 0);
            cm.sendNext("你怎么会在这里?出去.");
            cm.dispose();
            return;
        }

        level = eim.getProperty("level");

        switch (cm.getPlayer().getMapId()) {
            case 925100000:
                cm.sendNext("我们现在正驶向海盗船！为了进去，我们必须消灭所有守卫它的怪物.");
                cm.dispose();
                break;
            case 925100100:
                var emp = eim.getProperty("stage2");
                if (emp === "0") {
                    if (cm.haveItem(4001120, 20)) {
                        cm.sendNext("现在给我20个#z4001120#.");
                        cm.gainItem(4001120, -20);
                        cm.getMap().killAllMonsters();
                        eim.setProperty("stage2", "1");
                    } else {
                        cm.sendNext("想要通关需要给我20个#z4001120#..去吧怪物杀掉就会掉落!");
                    }
                } else if (emp === "1") {
                    if (cm.haveItem(4001121, 20)) {
                        cm.sendNext("现在给我20个#z4001121#.");
                        cm.gainItem(4001121, -20);
                        cm.getMap().killAllMonsters();
                        eim.setProperty("stage2", "2");
                    } else {
                        cm.sendNext("想要通关需要给我20个#z4001121#..去吧怪物杀掉就会掉落!");
                    }
                } else if (emp === "2") {
                    if (cm.haveItem(4001122, 20)) {
                        cm.sendNext("走走走，下一关");
                        cm.gainItem(4001122, -20);
                        cm.getMap().killAllMonsters();
                        eim.setProperty("stage2", "3");
                        eim.showClearEffect(cm.getMapId());
                    } else {
                        cm.sendNext("想要通关需要给我20个#z4001122#..去吧怪物杀掉就会掉落!");
                    }
                } else {
                    cm.sendNext("下一阶段已经开始.走!");
                }
                cm.dispose();
                break;
            case 925100200:
            case 925100300:
                cm.sendNext("要想袭击海盗船，我们必须先消灭警卫!");
                cm.dispose();
                break;
            case 925100201:
                if (cm.getMap().getMonsters().size() == 0) {
                    cm.sendNext("海盗BOSS的箱子出现了! 如果你碰巧有钥匙, 把他放到属于他得位置. 露出它的珍宝。boss一定会炸毛.");
                    if (eim.getProperty("stage2a") == "0") {
                        cm.getMap().setReactorState();
                        eim.setProperty("stage2a", "1");
                    }
                } else {
                    cm.sendNext("这些喇叭花藏起来了。我们必须解放他们.");
                }
                cm.dispose();
                break;
            case 925100301:
                if (cm.getMap().getMonsters().size() == 0) {
                    cm.sendNext("海盗领主的箱子出现了！如果你碰巧有一把钥匙，把它放在胸前，露出它的宝藏。那肯定会让他心烦意乱。");
                    if (eim.getProperty("stage3a") === "0") {
                        cm.getMap().setReactorState();
                        eim.setProperty("stage3a", "1");
                    }
                } else {
                    cm.sendNext("这些喇叭花藏起来了。我们必须解放他们。");
                }
                cm.dispose();
                break;
            case 925100202:
            case 925100302:
                cm.sendNext("这些是船长和克鲁，他们将自己的一生奉献给了海盗领主。在你认为合适的时候杀死他们。");
                cm.dispose();
                break;
            case 925100400:
                cm.sendNext("这些是船的动力来源。我们必须用门上的旧金属钥匙把它封住！");
                cm.dispose();
                break;
            case 925100500:
                if (cm.getMap().getMonsters().size() == 0) {
                    cm.sendNext("谢谢你救了我们的领袖！我们欠你的债。");
                } else {
                    cm.sendNext("击败所有怪物！和这个海盗王的小黄人！");
                }
                cm.dispose();
                break;
        }
    }


}