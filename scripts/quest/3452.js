var status = -1;

function end(mode, type, selection) {
    status++;
    if (mode != 1) {
        qm.dispose();
    } else {
        if (status == 0) {
            qm.sendNext("收下这些#b法力丹药#k作为我的谢意。");
        } else if (status == 1) {
            const InventoryType = Java.type('client.inventory.InventoryType');
            if (qm.getPlayer().getInventory(InventoryType.USE).getNumFreeSlot() >= 1) {
                qm.gainItem(4000099, -1);
                qm.gainItem(2000011, 50);
                qm.gainExp(8000);
                qm.forceCompleteQuest();
                qm.dispose();
            } else {
                qm.sendNext("嗯？ 您的库存似乎已满。");
            }
        } else if (status == 2) {
            qm.dispose();
        }
    }
}