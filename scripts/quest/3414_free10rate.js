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
        qm.sendNext("哇……就是这个！！！ 有了这个样本，欧米茄部门正在进行的研究将得到新的成果！ 对于找到比我更有狩猎天赋的人，我也无话可说。 我必须回到正轨！ 不管怎样，既然你干得好，我就得给你相应的奖励。");
    } else if (status == 1) {
        var talkStr = "在这里，请选择您喜欢的卷轴。 所有成功率均为 10%。 \r\n\r\n#r选择卷轴\r\n#b"
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
        item = qm.gainItem(item, 1);

        if (item != null) {
            qm.gainExp(12000);
            qm.completeQuest();
        }

        qm.dispose();
    }
}