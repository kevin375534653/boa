var status = 0;
function start() {
    status = -1;
    action(1, 0, 0);
}
function action(c, b, a) {
    if (c != 1) {
        cm.dispose();
    } else {
        status++;
        if (status == 0) {
            if (cm.getMapId() != 970010000) {
                cm.sendNext('你想进入#b枫树山丘#k吗？这里有一颗枫树正在茁长成长，它需要得到更多#b温暖的阳光#k的滋养');
            } else {
                cm.sendNext('你好~ 这里是#b枫树山丘#k，你是不是想让枫树长的更健康一些呢？给我一些#b温暖的阳光#k吧！枫树长大以后可以获得奖励哦。#b温暖的阳光#k可以在怪物的身上得到，如果想要枫树开花，可能需要5000个#b温暖的阳光#k！');
            }
        } else {
            if (status == 1) {
                if (cm.getMapId() != 970010000) {
                    cm.warp(970010000, 0);
                    cm.dispose();
                } else {
                    cm.askMenu('枫树每次得到滋养都会长得更强壮一些！\r\n#b#L0#我有一些#r温暖的阳光#k#l\r\n#b#L1#请告诉我还需要多少#r温暖的阳光#l#k');
                }
            } else {
                if (status == 2) {
                    if (a == 0) {
                        cm.askNumber('你想给我多少#b温暖的阳光#k？我会好好照顾枫树的。', cm.itemQuantity(4001246), 0, cm.itemQuantity(4001246));
                    } else {
                        cm.sendOk('枫树的成长状况：\r\n已捐献#r' + cm.getSunshines() + '#k个，需要5000个\r\n如果你有#r温暖的阳光#k，记得拿给我。');
                        cm.dispose();
                    }
                } else {
                    if (status == 3) {
                        if (a < 0 || a > cm.itemQuantity(4001246)) {
                            a = cm.itemQuantity(4001246);
                        }
                        if (a == 0) {
                            cm.sendOk('请带来一些#b温暖的阳光#k');
                        } else {
                            cm.addSunshines(a);
                            cm.gainItem(4001246, -a);
                            cm.sendOk('谢谢你，有了你的帮助枫树成长的更快了');
                        }
                        cm.dispose();
                    }
                }
            }
        }
    }
}