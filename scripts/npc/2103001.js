var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (cm.isQuestStarted(3927)) {
        cm.sendNext("虽然是堵平凡的墙，但细看的话，有一些怪异的纹样。墙后面写着很多怪异的词。\r\n\r\n#b若有铁锤和短剑，如果有弓和箭……#k");
        cm.setQuestProgress(3927, 1);
    }

    cm.dispose();
}