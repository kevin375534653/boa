var item;
var stance;
var status = -1;
var vecItem;

function end(mode, type, selection) {
    if (mode == 0) {
        qm.dispose();
        return;
    }
    status++;

    if (status == 0) {
        qm.sendNext("呵呵呵…！就是這個！只要有這個樣本，現在正在地球防衛總部進行的研究，就更加活躍了！不過，沒想到還會有比我更出色的人啊…我還需要更努力呀！不管怎麼說，這樣幫了我大忙，應該給點酬勞才行。");
    } else if (status == 1) {
        const InventoryType = Java.type('client.inventory.InventoryType');
        if (qm.getPlayer().getInventory(InventoryType.USE).getNumFreeSlot() < 1) {
            qm.getPlayer().dropMessage(1, "消耗栏已满。");
            qm.dispose();
            return;
        }

        var talkStr = "來…請選擇感興趣的卷軸吧！成功的機率都是10%。\r\n\r\n#r选择卷轴\r\n#b"
        stance = qm.getPlayer().getJobStyle();

        const Job = Java.type('client.Job');
        if (stance == Job.WARRIOR || stance == Job.BEGINNER) {
            vecItem = [2043002, 2043102, 2043202, 2044002, 2044102, 2044202, 2044402, 2044302];
        } else if (stance == Job.MAGICIAN) {
            vecItem = [2043702, 2043802];
        } else if (stance == Job.BOWMAN || stance == Job.CROSSBOWMAN) {
            vecItem = [2044502, 2044602];
        } else if (stance == Job.THIEF) {
            vecItem = [2043302, 2044702];
        } else {
            vecItem = [2044802, 2044902];
        }

        for (var i = 0; i < vecItem.length; i++) {
            talkStr += "\r\n#L" + i + "# #i" + vecItem[i] + "# #t" + vecItem[i] + "#";
        }
        qm.sendSimple(talkStr);
    } else if (status == 2) {
        item = vecItem[selection];
        qm.gainItem(item, 1);
        qm.gainItem(4031103, -1);
        qm.gainItem(4031104, -1);
        qm.gainItem(4031105, -1);
        qm.gainItem(4031106, -1);
        qm.gainExp(12000);
        qm.completeQuest();

        qm.dispose();
    }
}