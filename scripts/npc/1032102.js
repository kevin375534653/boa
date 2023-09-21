/*
        @author RMZero213 (RaGEZONE)
	Just keep this header here and don't claim that you made it.
*/

/*
	1032102.js
	Mar the Fairy
	Dragon Evolver
*/

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            cm.sendOk("好的，下次见。");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {
            cm.sendYesNo("我是妖精玛丽。如果你有15级以上的宝贝龙和进化石，我可以进化你的龙。如果幸运的话，你甚至可能会得到一个黑色的！你希望我这样做吗？");
        } else if (status == 1) {
            // if (cm.haveItem(5000028, 1)) {
            //     cm.gainItem(5000028, -1);
            //     cm.gainItem(5000029, 1);
            //     cm.sendOk("我不知道你是怎么得到那个龙蛋的，但它显然已经孵化了！");
            //     cm.dispose();
            // } else

            if (cm.getPlayer().getPet(0) == null) {
                cm.sendOk("确保您的宠物装备在插槽1上。");
                cm.dispose();
            } else if (cm.getPlayer().getPet(0).getItemId() < 5000029 || cm.getPlayer().getPet(0).getItemId() > 5000033 || !cm.haveItem(5380000, 1)) {
                //cm.sendOk("你的宠物不符合进化要求。宠物进化需要1个#i5380000##t5380000#，以及下面其中一个宝贝龙#d#i5000029##t5000029##k, #g#i5000030##t5000030##k, #r#i5000031##t5000031##k, #b#i5000032##t5000032##k或者#e#i5000033##t5000033##n，并且放在插槽1上才能进化。达到以上要求再来找我。");
                cm.sendOk("你的宠物不符合进化要求。宠物进化需要1个#i5380000#，以及其中一个#i5000029# #i5000030# #i5000031# #i5000032# #i5000033##n，并且放在插槽1上才能进化。达到以上要求再来找我。");
                cm.dispose();
            } else if (cm.getPlayer().getPet(0).getLevel() < 15) {
                cm.sendOk("Your pet must be level 15 or above to evolve.");
                cm.dispose();
            } else if (cm.haveItem(5000029, 2) || cm.haveItem(5000030, 2) || cm.haveItem(5000031, 2) || cm.haveItem(5000032, 2) || cm.haveItem(5000033, 2)) {
                cm.sendSimple("你有一条未出局的龙，还有一条出局的龙。我可以帮你取一个。记住，我要删除的龙的数据将丢失。\r\n#r#L0#先把我的现金取出。#l#k\r\n#b#L1#移除我库存中的第一只龙。#l#k\r\n#g#L2#不，谢谢。#l#k");
            } else {
                var i;

                for (i = 0; i < 3; i++) {
                    if (cm.getPlayer().getPet(i) != null && cm.getPlayer().getPet(i).getItemId() == 5000029) {
                        pet = cm.getPlayer().getPet(i);
                        break;
                    }
                }
                if (i == 3) {
                    cm.sendOk("你的背包中没有宝贝龙或者#b#t5380000##k，请准备好以后再来找我。");
                    cm.dispose();
                    return;
                }

                var id = cm.getPlayer().getPet(i).getItemId();
                //var name = cm.getPlayer().getPet(i).getName();
                //var level = cm.getPlayer().getPet(i).getLevel();
                //var closeness = cm.getPlayer().getPet(i).getCloseness();
                //var fullness = cm.getPlayer().getPet(i).getFullness();
                //ItemInformationProvider ii = ItemInformationProvider.getInstance();
                if (id < 5000029 || id > 5000033) {
                    cm.sendOk("有点不对劲，再试一次。");
                    cm.dispose();
                }
                var rand = 1 + Math.floor(Math.random() * 10);
                var after = 0;
                if (rand >= 1 && rand <= 3) {
                    after = 5000030;
                } else if (rand >= 4 && rand <= 6) {
                    after = 5000031;
                } else if (rand >= 7 && rand <= 9) {
                    after = 5000032;
                } else if (rand == 10) {
                    after = 5000033;
                } else {
                    cm.sendOk("有点不对劲，再试一次。");
                    cm.dispose();
                }

                /*if (name.equals(ItemInformationProvider.getInstance().getName(id))) {
     name = ItemInformationProvider.getInstance().getName(after);
}*/

                cm.gainItem(5380000, -1);
                cm.evolvePet(i, after);

                cm.sendOk("你的龙已经进化了！它曾经是一只#i" + id + "# #t" + id + "#，现在它是一只#i" + after + "##t" + after + "#！");
                cm.dispose();
            }
        } else if (status == 2) {
            if (selection == 0) {
                const InventoryManipulator = Java.type('client.inventory.manipulator.InventoryManipulator');
                const InventoryType = Java.type('client.inventory.InventoryType');
                InventoryManipulator.removeFromSlot(cm.getClient(), InventoryType.CASH, 1, 1, true);
                cm.sendOk("您的第一个现金槽已删除。");
            } else if (selection == 1) {
                if (cm.haveItem(5000029, 2)) {
                    cm.gainItem(5000029, -1);
                } else if (cm.haveItem(5000030, 2)) {
                    cm.gainItem(5000030, -1);
                } else if (cm.haveItem(5000031, 2)) {
                    cm.gainItem(5000031, -1);
                } else if (cm.haveItem(5000032, 2)) {
                    cm.gainItem(5000032, -1);
                } else if (cm.haveItem(5000033, 2)) {
                    cm.gainItem(5000033, -1);
                }
                cm.sendOk("背包中的第一只宝贝龙被移除。");
            } else if (selection == 2) {
                cm.sendOk("好的，下次再来。");
            }
            cm.dispose();
        }
    }
}