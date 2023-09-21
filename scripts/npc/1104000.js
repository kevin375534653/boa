var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || (mode == 0 && status == 0)) {
        cm.dispose();
        return;
    } else if (mode == 0) {
        status--;
    } else {
        status++;
    }

    if (status == 0) {
        cm.sendNext("你这个家伙......你是怎么进来的？我不是警告过你，叫你别跟我作对吗？");
    } else if (status == 1) {
        var puppet = cm.getEventManager("Puppeteer");
        puppet.setProperty("player", cm.getPlayer().getName());
        puppet.startInstance(cm.getPlayer());
        cm.dispose();

    }
}