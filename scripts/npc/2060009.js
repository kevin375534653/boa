var status = 0;
var menu;
var payment = false;
var atHerbTown = false;

function start() {
    if (cm.getPlayer().getMap().getId() == 251000100) {
        atHerbTown = true;
    }

    if (cm.haveItem(4031242)) {
        if (atHerbTown) {
            menu = "#L0##b我想使用#t4031242##k移动到#b#m230030200##k.#l\r\n#L1#去往#b#m230000000##k#l";
        } else {
            menu = "#L0##b我想使用#t4031242##k移动到#b#m230030200##k.#l\r\n#L1#去往#b#m251000000##k#l";
        }
    } else {
        if (atHerbTown) {
            menu = "#L0##b去往#m230030200#。#k#l\r\n#L1##b去往#m230000000##k。#l";
        } else {
            menu = "#L0##b去往#m230030200#。（玩具城/童话村方向）#k#l\r\n#L1##b去往#m251000000##k。#l";
        }
        payment = true;
    }
    cm.sendSimple("世界上所有的海都是相通的。走着去很远的地方，通过大海很快就能到达。怎么样？你想乘坐#b海豚出租车#k吗？\r\n" + menu);
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
    } else {
        if (selection == 0) {
            if (payment) {
                if (cm.getPlayer().getMeso() < 1000) {
                    cm.sendOk("我想你没有足够的金币。");
                    cm.dispose();
                } else {
                    cm.gainMeso(-1000);
                }
            } else {
                cm.gainItem(4031242, -1);
            }
            cm.warp(230030200, 2);
            cm.dispose();
            return;
        } else if (selection == 1) {
            if (cm.getPlayer().getMeso() < 10000) {
                cm.sendOk("我想你没有足够的金币。");
                cm.dispose();
                return;
            } else {
                cm.gainMeso(-10000);
                cm.warp(atHerbTown ? 230000000 : 251000100);
            }
        }
        cm.dispose();
    }
}