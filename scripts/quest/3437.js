var item;
var stance;
var status = -1;
var item;

function end(mode, type, selection) {
    if (mode == 0) {
        qm.dispose();
        return;
    }
    status++;

    if (status == 0) {
        qm.sendNext("什么？ 你是说你已经取出了 150 个#o4230120#s 吗？ 这些......是的，这些确实是 120 #t4000122#s。 我想知道你将如何独自完成这个任务，但你做得很好。 好吧，给了……这对我来说是一件很重要的东西，但是请收下。");
    } else if (status == 1) {
        const InventoryType = Java.type('client.inventory.InventoryType');
        if (qm.getPlayer().getInventory(InventoryType.EQUIP).getNumFreeSlot() < 1) {
            qm.sendOk("在领取奖品之前，请确保装备栏有足够的空间。");
            qm.dispose();
            return;
        }

        var talkStr = "你喜欢这款手套吗？ 我已经保留这个有一段时间了，我计划有一天使用它，但它看起来更适合你。 请好好利用它； 而且，我从星区得到了太多东西，我不再需要它们了。";
        stance = qm.getPlayer().getJobStyle();

        const Job = Java.type('client.Job');
        if (stance == Job.WARRIOR) {
            item = 1082024;
        } else if (stance == Job.MAGICIAN) {
            item = 1082063;
        } else if (stance == Job.BOWMAN || stance == Job.CROSSBOWMAN) {
            item = 1082072;
        } else if (stance == Job.THIEF) {
            item = 1082076;
        } else if (stance == Job.BRAWLER || stance == Job.GUNSLINGER) {
            item = 1082195;
        } else {
            item = 1082149;
        }

        qm.sendNext(talkStr);
    } else if (status == 2) {
        qm.completeQuest();
        qm.gainItem(item, 1);
        qm.gainItem(4000122, -120);
        qm.gainExp(6100);
        qm.sendOk("非常感谢你作为 Mesorangers 的一员完成了你的使命。 我已经向部门讲述了你的成功故事，部门似乎也对你很满意。 希望您能继续与我们合作。 再见~");
    } else if (status == 3) {
        qm.dispose();
    }
}