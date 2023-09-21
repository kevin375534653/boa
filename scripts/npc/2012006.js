var status = -1;
var sel;

var destinations = ["金银岛的船的升降场", "玩具城的船的升降场", "神木村的船的升降场", "武陵的船的升降场", "阿里安特的船的升降场", "圣地的船的升降场"];
var boatType = ["", "", "", "", "", ""];

function start() {
    var message = "在天空之城码头，有很多升降场。根据目的地的不同，必须找到对应的升降场才行，你想到哪个升降场去，乘坐去哪里的船呢？\r\n";
    for (var i = 0; i < destinations.length; i++) {
        message += "\r\n#L" + i + "##b乘坐" + boatType[i] + "开往" + destinations[i] + "#l";
    }
    cm.sendSimple(message);
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
        return;
    }
    status++;
    if (status == 0) {
        sel = selection;
        cm.sendNext("如果走错了地方，你可以通过传送口回到我这里来，所以请你放心。你想移动到#b#m" + (200000110 + (sel * 10)) + "##k去吗?");
    } else if (status == 1) {
        cm.warp(200000110 + (sel * 10), "west00");
        cm.dispose();
    }
}