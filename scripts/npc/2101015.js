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
            menuStr = generateSelectionMenu(["我要检查我的竞技场得分！/我想兑换 (1) 椰汁树沙滩椅", "我想知道更多关于竞技场的要点。"]);
            cm.sendSimple("你好，我能为您做些什么吗？\r\n" + menuStr);
        } else if (status == 1) {
            if (selection == 0) {
                apqpoints = cm.getPlayer().getAriantPoints();
                if (apqpoints < 100) {
                    cm.sendOk("你的竞技场得分是#b" + apqpoints + "#k分。超过#b100分#k才能给你#b椰汁树沙滩椅#k。很烦哦，得到充足的分数之后再来吧。");
                    cm.dispose();
                } else if (apqpoints + arena.getAriantRewardTier(cm.getPlayer()) >= 100) {
                    cm.sendOk("你的竞技场得分是#b" + apqpoints + "#k分。你已经获得了相应分数！和#p2101016#谈谈，然后再和我对话！");
                    cm.dispose();
                } else {
                    cm.sendNext("哇，看起来你获得了#b100#k分，那么，让我们开始交易？！");
                }
            } else if (selection == 1) {
                cm.sendOk("速成石吸收怪兽力量，可以制作阿烈达王妃喜欢的灵魂的宝石。制作最多的斗士可以获得胜利，妨碍其他斗士的进程也是很有帮助的。");
                cm.dispose();
            }
        } else if (status == 2) {
            cm.getPlayer().gainAriantPoints(-100);
            cm.gainItem(3010018, 1);
            cm.dispose();
        }
    }
}

function generateSelectionMenu(array) {     // nice tool for generating a string for the sendSimple functionality
    var menu = "";
    for (var i = 0; i < array.length; i++) {
        menu += "#L" + i + "##b" + array[i] + "#l#k\r\n";
    }
    return menu;
}