function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 0 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            cm.sendSimple("等待！下面列出的信息都可以简单地通过第十级来获得，所以这不是你需要提前学习的东西。只有那些想提前学习的人应该从这里继续下去。OK，你想了解哪一个？\r\n#b#L0#关于你#l\r\n#L1#迷你地图#l\r\n#L2#任务窗口#l\r\n#L3#物品栏#l\r\n#L4#常规攻击狩猎#l\r\n#L5#如何拾取物品#l\r\n#L6#如何装备物品#l\r\n#L7#技能栏#l\r\n#L8#如何使用消耗品#l\r\n#L9#如何打破盒子#l\r\n#L10#如何坐在椅子上#l\r\n#L11#世界地图#l\r\n#L12#任务通知#l\r\n#L13#增强属性#l\r\n#L14#魂骑士是什么？#l");
        } else if (status == 1) {
            if (selection == 0) {
                cm.sendNext("我在米哈尔的手下工作，米哈尔是圣地女皇的守护者。已经命令我引导所有来到冒险岛世界的人加入骑士团。我会一直在你身边帮助你直到你到11级。如果你有任何问题，请告诉我。");
            } else if (selection == 1) {
                cm.guideHint(1);
                cm.dispose();
            } else if (selection == 2) {
                cm.guideHint(2);
                cm.dispose();
            } else if (selection == 3) {
                cm.guideHint(3);
                cm.dispose();
            } else if (selection == 4) {
                cm.guideHint(4);
                cm.dispose();
            } else if (selection == 5) {
                cm.guideHint(5);
                cm.dispose();
            } else if (selection == 6) {
                cm.guideHint(6);
                cm.dispose();
            } else if (selection == 7) {
                cm.guideHint(7);
                cm.dispose();
            } else if (selection == 8) {
                cm.guideHint(8);
                cm.dispose();
            } else if (selection == 9) {
                cm.guideHint(9);
                cm.dispose();
            } else if (selection == 10) {
                cm.guideHint(10);
                cm.dispose();
            } else if (selection == 11) {
                cm.guideHint(11);
                cm.dispose();
            } else if (selection == 12) {
                cm.guideHint(12);
                cm.dispose();
            } else if (selection == 13) {
                cm.guideHint(13);
                cm.dispose();
            } else if (selection == 14) {
                cm.sendOk("冒险岛世界在很长一段时间里一直保持着和平，黑魔法师正试图复兴和征服我们和平的冒险岛世界。为了阻止黑魔法师，女皇建立了骑士团。当你达到10级的时候就可以加入了。");
                cm.dispose();
            }
        } else if (status == 2) {
            cm.sendNextPrev("但你真的不需要在这么短的时间内找出一切。我这里的所有信息都是游戏的基本知识，你可以通过玩游戏来简单地了解。事实上，我觉得你应该只问你是否在10级，但仍然不知道该怎么做，或者如果你只是想澄清，并仔细检查你已经知道。你真的不需要一下子就知道所有的事情，所以放松。");
            cm.dispose();
        }
    }
}