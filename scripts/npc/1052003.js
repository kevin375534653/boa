/* Chris
        Victoria Road : Kerning City Repair Shop (103000006)
        
        Refining NPC: 
        * Minerals
        * Jewels
        * Special - Iron Hog's Metal Hoof x 100 into Steel Plate
        * Claws
*/

var status = 0;
var selectedType = -1;
var selectedItem = -1;
var item;
var mats;
var matQty;
var cost;
var qty;
var equip;
var last_use; //last item is a use item

function start() {
    cm.getPlayer().setCS(true);
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && type > 0) {    // hope types 2 & 3 works as well, as 1 and 4 END CHAT
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {
            var selStr = "嗨，我是#b矿石加工技术员#k，如果你愿意付出，我可以给你我的一些服务。#b"
            var options = ["制作矿石", "制作宝石", "我有铁猪的金属蹄...", "升级拳套"];
            for (var i = 0; i < options.length; i++) {
                selStr += "\r\n#L" + i + "# " + options[i] + "#l";
            }

            cm.sendSimple(selStr);
        } else if (status == 1) {
            selectedType = selection;
            if (selectedType == 0) { //mineral refine
                var selStr = "那么，你想提炼什么样的矿石？#b";
                var minerals = ["青铜", "钢铁", "锂矿石", "朱矿石", "银", "紫矿石", "黄金"];
                for (var i = 0; i < minerals.length; i++) {
                    selStr += "\r\n#L" + i + "# " + minerals[i] + "#l";
                }
                equip = false;
                cm.sendSimple(selStr);
            } else if (selectedType == 1) { //jewel refine
                var selStr = "所以你要我提炼哪种宝石？#b";
                var jewels = ["石榴石", "紫水晶", "海蓝宝石", "祖母绿", "蛋白石", "蓝宝石", "黄晶", "钻石", "黑水晶"];
                for (var i = 0; i < jewels.length; i++) {
                    selStr += "\r\n#L" + i + "# " + jewels[i] + "#l";
                }
                equip = false;
                cm.sendSimple(selStr);
            } else if (selectedType == 2) { //foot refine
                var selStr = "你知道吗？没有多少人意识到铁猪金属蹄的潜力……如果你愿意的话，我可以把它做成一些特别的东西。";
                equip = false;
                cm.sendYesNo(selStr);
            } else if (selectedType == 3) { //claw refine
                var selStr = "啊你想要升级拳套，告诉我要升级哪一个？#b";
                var claws = ["赤红战神拳套#k - 飞侠 Lv. 60#b", "蓝宝战神拳套#k - 飞侠 Lv. 60#b", "黑战神拳套#k - 飞侠 Lv. 60#b"];
                for (var i = 0; i < claws.length; i++) {
                    selStr += "\r\n#L" + i + "# " + claws[i] + "#l";
                }
                equip = true;
                cm.sendSimple(selStr);
            }
            if (equip) {
                status++;
            }
        } else if (status == 2 && mode == 1) {
            selectedItem = selection;
            if (selectedType == 0) { //mineral refine
                var itemSet = [4011000, 4011001, 4011002, 4011003, 4011004, 4011005, 4011006];
                var matSet = [4010000, 4010001, 4010002, 4010003, 4010004, 4010005, 4010006];
                var matQtySet = [10, 10, 10, 10, 10, 10, 10];
                var costSet = [300, 300, 300, 500, 500, 500, 800];
                item = itemSet[selectedItem];
                mats = matSet[selectedItem];
                matQty = matQtySet[selectedItem];
                cost = costSet[selectedItem];
            } else if (selectedType == 1) { //jewel refine
                var itemSet = [4021000, 4021001, 4021002, 4021003, 4021004, 4021005, 4021006, 4021007, 4021008];
                var matSet = [4020000, 4020001, 4020002, 4020003, 4020004, 4020005, 4020006, 4020007, 4020008];
                var matQtySet = [10, 10, 10, 10, 10, 10, 10, 10, 10];
                var costSet = [500, 500, 500, 500, 500, 500, 500, 1000, 3000];
                item = itemSet[selectedItem];
                mats = matSet[selectedItem];
                matQty = matQtySet[selectedItem];
                cost = costSet[selectedItem];
            } else if (selectedType == 2) { //special refine
                var itemSet = [4011001, 1];
                var matSet = [4000039, 1];
                var matQtySet = [100, 1];
                var costSet = [1000, 1]
                item = itemSet[0];
                mats = matSet[0];
                matQty = matQtySet[0];
                cost = costSet[0];
            }

            var prompt = "所以,你要我制作一些#t" + item + "#？那样的话，你需要制作多少个？";

            cm.sendGetNumber(prompt, 1, 1, 100)
        } else if (status == 3) {
            if (equip) {
                selectedItem = selection;
                qty = 1;
            } else {
                qty = (selection > 0) ? selection : (selection < 0 ? -selection : 1);
            }

            last_use = false;

            if (selectedType == 3) { //claw refine
                var itemSet = [1472023, 1472024, 1472025];
                var matSet = [[1472022, 4011007, 4021000, 2012000], [1472022, 4011007, 4021005, 2012002], [1472022, 4011007, 4021008, 4000046]];
                var matQtySet = [[1, 1, 8, 10], [1, 1, 8, 10], [1, 1, 3, 5]];
                var costSet = [80000, 80000, 100000]
                item = itemSet[selectedItem];
                mats = matSet[selectedItem];
                matQty = matQtySet[selectedItem];
                cost = costSet[selectedItem];
                if (selectedItem != 2) {
                    last_use = true;
                }
            }

            var prompt = "你想让我做";
            if (qty == 1) {
                prompt += "1个#t" + item + "#？";
            } else {
                prompt += qty + "个#t" + item + "#？";
            }

            prompt += "在这种情况下，我需要你提供特定的物品才能制作它。不过，请确保您的背包中有足够空间！#b";

            if (mats instanceof Array) {
                for (var i = 0; i < mats.length; i++) {
                    prompt += "\r\n#i" + mats[i] + "# " + matQty[i] * qty + " #t" + mats[i] + "#";
                }
            } else {
                prompt += "\r\n#i" + mats + "# " + matQty * qty + " #t" + mats + "#";
            }

            if (cost > 0) {
                prompt += "\r\n#i4031138# " + cost * qty + " 金币";
            }
            cm.sendYesNo(prompt);
        } else if (status == 4) {
            var complete = true;

            if (!cm.canHold(item, qty)) {
                cm.sendOk("首先检查您的背包中是否有空位。");
                cm.dispose();
                return;
            } else if (cm.getMeso() < cost * qty) {
                cm.sendOk("Cash only, no credit.");
                cm.dispose();
                return;
            } else {
                if (mats instanceof Array) {
                    for (var i = 0; complete && i < mats.length; i++) {
                        if (!cm.haveItem(mats[i], matQty[i] * qty)) {
                            complete = false;
                        }
                    }
                } else if (!cm.haveItem(mats, matQty * qty)) {
                    complete = false;
                }
            }

            if (!complete) {
                cm.sendOk("我不能接受替代品。如果你没有我需要的东西，那么我将无法帮助你。");
            } else {
                if (mats instanceof Array) {
                    for (var i = 0; i < mats.length; i++) {
                        cm.gainItem(mats[i], -matQty[i] * qty);
                    }
                } else {
                    cm.gainItem(mats, -matQty * qty);
                }
                cm.gainMeso(-cost * qty);
                cm.gainItem(item, qty);
                cm.sendNext("呼……我几乎没想到这会起作用……好吧，无论如何，我希望你喜欢它。");
            }
            cm.dispose();
        }
    }
}