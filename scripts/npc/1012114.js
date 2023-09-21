/*
  Growlie (that fatass uhh.. hungry lion or whatever)

  @author FightDesign (RageZONE)
  @author Ronan
  */

var status = 0;
var chosen = -1;

function clearStage(stage, eim) {
    eim.setProperty(stage + "stageclear", "true");
    eim.showClearEffect(true);

    eim.giveEventPlayersStageReward(stage);
}

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 0) {
        cm.dispose();

    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 0) {
            status += ((chosen == 2) ? 1 : -1);
        } else {
            status++;
        }

        if (status == 0) {
            if (cm.isEventLeader()) {
                cm.sendSimple("我是看守这个迎月花山丘的兴儿，我随时准备保护这个地方。\r\n#b#L0#请告诉我关于这里的事情。#l\r\n#L1#我把#t4001101#拿来了。#l\r\n#L2#我想离开这里。#l");
            } else {
                cm.sendSimple("我是看守这个迎月花山丘的兴儿，我随时准备保护这个地方。什么风把你吹来了？\r\n#b#L0#请告诉我关于这里的事情。#l\r\n#L1#我把#t4001101#拿来了。#l\r\n#L2#我想离开这里。#l");
            }
        } else if (status == 1) {
            if (chosen == -1) {
                chosen = selection;
            }
            if (chosen == 0) {
                cm.sendNext("每当月圆之夜，你都可以在这里品尝到月妙做的年糕。");
            } else if (chosen == 1) {
                if (cm.haveItem(4001101, 10)) {
                    cm.sendNext("喔喔喔……这不就是月妙所制作的年糕吗？快快~快把年糕交给我吧。嗯……这些看起来很好吃。");
                } else {
                    cm.sendOk("我建议你检查一下，你确定已经收集好了#b10个#t4001101##k吗？");
                    cm.dispose();
                }
            } else if (chosen == 2) {
                cm.sendYesNo("你确定要离开这里吗？");
            } else {
                cm.dispose();

            }
        } else if (status == 2) {
            if (chosen == 0) {
                cm.sendNextPrev("从这片区域的迎月花叶子上收集迎月花的种子，把种子种在月亮附近的台阶上，就可以看到迎月花了。迎月花有6种颜色，每一种都需要对应不同的台阶。");
            } else if (chosen == 1) {
                cm.gainItem(4001101, -10);

                var eim = cm.getEventInstance();
                clearStage(1, eim);

                var map = eim.getMapInstance(cm.getPlayer().getMapId());
                map.killAllMonstersNotFriendly();

                eim.clearPQ();
                cm.dispose();
            } else {
                if (mode == 1) {
                    cm.warp(910010300);
                } else {
                    cm.sendOk("你最好给我收集一些美味的年糕，因为时间不多了，咆哮吧！");
                }
                cm.dispose();
            }
        } else if (status == 3) {
            if (chosen == 0) {
                cm.sendNextPrev("当樱草花盛开的时候，满月就会升起，这时月亮兔就会出现，开始捣碎磨盘。你的任务是打败怪物，以确保月亮兔可以集中精力做最好的年糕。");
            }
        } else if (status == 4) {
            if (chosen == 0) {
                cm.sendNextPrev("我想为你和你的党员合作，给我10个年糕。我强烈建议你在规定的时间内给我送来年糕。");
            }
        } else {
            cm.dispose();
        }
    }
}