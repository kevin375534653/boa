/*
        This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/* Mr. Thunder
        Victoria Road: Perion (102000000)
        
        Refining NPC: 
        * Minerals
        * Jewels
        * Shields
        * Helmets
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

function start() {
    cm.getPlayer().setCS(true);
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
    }
    if (status == 0 && mode == 1) {
        var selStr = "嗯？你是谁……？哦，难道你听说过我的锻造技能吗？在这种情况下，我很愿意为你制作一些矿石……但是，你必须支付我一些金币。#b"
        var options = ["冶炼矿石母矿", "冶炼宝石母矿", "制作头盔", "制作盾牌"];
        for (var i = 0; i < options.length; i++) {
            selStr += "\r\n#L" + i + "# " + options[i] + "#l";
        }

        cm.sendSimple(selStr);
    } else if (status == 1 && mode == 1) {
        selectedType = selection;
        if (selectedType == 0) { //mineral refine
            var selStr = "那么，你想冶炼什么样的矿石？#b";
            var minerals = ["青铜", "钢铁", "锂矿石", "朱矿石", "银", "紫矿石", "黄金"];
            for (var i = 0; i < minerals.length; i++) {
                selStr += "\r\n#L" + i + "# " + minerals[i] + "#l";
            }
            cm.sendSimple(selStr);
            equip = false;
        } else if (selectedType == 1) { //jewel refine
            var selStr = "那么，你想冶炼什么样的宝石？#b";
            var jewels = ["石榴石", "紫水晶", "海蓝石", "祖母绿", "蛋白石", "蓝宝石", "黄晶", "钻石", "黑水晶"];
            for (var i = 0; i < jewels.length; i++) {
                selStr += "\r\n#L" + i + "# " + jewels[i] + "#l";
            }
            cm.sendSimple(selStr);
            equip = false;
        } else if (selectedType == 2) { //helmet refine
            var selStr = "啊，你想制作头盔吗？那告诉我，哪一个？#b";
            var helmets = ["蓝色金属头箍#k - 全职业 Lv. 15#b", "黄色金属头箍#k - 全职业 Lv. 15#b", "金属头盔#k - 战士 Lv. 10#b", "锂矿头盔#k - 战士 Lv. 10#b", "钢铁帽#k - 战士 Lv. 12#b", "锂矿帽#k - 战士 Lv. 12#b", "铁制头具#k - 战士 Lv. 15#b",
                "锂矿头盔#k - 战士 Lv. 15#b", "钢制海王帽#k - 战士 Lv. 20#b", "锂矿海王头盔#k - 战士 Lv. 20#b", "钢铁橄榄球帽#k - 战士 Lv. 20#b", "锂矿橄榄球帽#k - 战士 Lv. 20#b", "锂矿尖头盔#k - 战士 Lv. 22#b", "黄金尖头盔#k - 战士 Lv. 22#b",
                "紫矿骑士头盔#k - 战士 Lv. 25#b", "黄金骑士头盔#k - 战士 Lv. 25#b", "红色战士头盔#k - 战士 Lv. 35#b", "蓝色战士头盔#k - 战士 Lv. 35#b", "锂矿诺曼头盔#k - 战士 Lv. 40#b", "黄金诺曼头盔#k - 战士 Lv. 40#b", "锂矿十字军帽#k - 战士 Lv. 50#b",
                "银制十字军帽子#k - 战士 Lv. 50#b", "旧诺曼头盔#k - 战士 Lv. 55#b", "旧锂矿诺曼头盔#k - 战士 Lv. 55#b"];
            for (var i = 0; i < helmets.length; i++) {
                selStr += "\r\n#L" + i + "# " + helmets[i] + "#l";
            }
            cm.sendSimple(selStr);
            equip = true;
        } else if (selectedType == 3) { //shield refine
            var selStr = "啊，你想制作盾牌吗？那告诉我，哪一个？#b";
            var shields = ["朱矿方盾#k - 战士 Lv. 40#b", "锂矿方盾#k - 战士 Lv. 40#b", "古老银盾#k - 战士 Lv. 60#b", "古老朱矿盾#k - 战士 Lv. 60#b"];
            for (var i = 0; i < shields.length; i++) {
                selStr += "\r\n#L" + i + "# " + shields[i] + "#l";
            }
            cm.sendSimple(selStr);
            equip = true;
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
        }

        var prompt = "那么，你想要我做#t" + item + "#吗？让我看看，你想做几个？";

        cm.sendGetNumber(prompt, 1, 1, 100)
    } else if (status == 3 && mode == 1) {
        if (equip) {
            selectedItem = selection;
            qty = 1;
        } else {
            qty = (selection > 0) ? selection : (selection < 0 ? -selection : 1);
        }

        if (selectedType == 2) { //helmet refine
            var itemSet = [1002042, 1002041, 1002002, 1002044, 1002003, 1002040, 1002007, 1002052, 1002011, 1002058, 1002009, 1002056, 1002087, 1002088, 1002050, 1002049, 1002047, 1002048, 1002099, 1002098, 1002085, 1002028, 1002022, 1002101];
            var matSet = [[1002001, 4011002], [1002001, 4021006], [1002043, 4011001], [1002043, 4011002], [1002039, 4011001], [1002039, 4011002], [1002051, 4011001], [1002051, 4011002], [1002059, 4011001], [1002059, 4011002],
                [1002055, 4011001], [1002055, 4011002], [1002027, 4011002], [1002027, 4011006], [1002005, 4011005], [1002005, 4011006], [1002004, 4021000], [1002004, 4021005], [1002021, 4011002], [1002021, 4011006], [1002086, 4011002],
                [1002086, 4011004], [1002100, 4011007, 4011001], [1002100, 4011007, 4011002]];
            var matQtySet = [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 2], [1, 2], [1, 3], [1, 3], [1, 3], [1, 3], [1, 4], [1, 4], [1, 5], [1, 5], [1, 3], [1, 3],
                [1, 5], [1, 6], [1, 5], [1, 4], [1, 1, 7], [1, 1, 7]];
            var costSet = [500, 300, 500, 800, 500, 800, 1000, 1500, 1500, 2000, 1500, 2000, 2000, 4000, 4000, 5000, 8000, 10000, 12000, 15000, 20000, 25000, 30000, 30000];
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 3) { //shield refine
            var itemSet = [1092014, 1092013, 1092010, 1092011];
            var matSet = [[1092012, 4011003], [1092012, 4011002], [1092009, 4011007, 4011004], [1092009, 4011007, 4011003]];
            var matQtySet = [[1, 10], [1, 10], [1, 1, 15], [1, 1, 15]];
            var costSet = [100000, 100000, 120000, 120000];
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        var prompt = "你想要我去做";
        if (qty == 1) {
            prompt += "1个#t" + item + "#吗？";
        } else {
            prompt += qty + "个#t" + item + "#吗？";
        }
        prompt += "让我看看，我将需要使用特殊的物品，请确保你的背包是否有足够的空间。#b";
        if (mats instanceof Array) {
            for (var i = 0; i < mats.length; i++) {
                prompt += "\r\n#i" + mats[i] + "# " + matQty[i] * qty + " #t" + mats[i] + "#";
            }
        } else {
            prompt += "\r\n#i" + mats + "# " + matQty * qty + " #t" + mats + "#";
        }
        if (cost > 0) {
            prompt += "\r\n#i4031138# " + cost * qty + "金币";
        }
        cm.sendYesNo(prompt);
    } else if (status == 4 && mode == 1) {
        var complete = true;

        if (!cm.canHold(item, qty)) {
            cm.sendOk("你的背包没有足够的空间。");
            cm.dispose();
            return;
        } else if (cm.getMeso() < cost * qty) {
            cm.sendOk("你好像没有足够的金币。");
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
            cm.sendOk("你好像没有足够的材料。");
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
            cm.sendOk("全部做好了，如果你还需要什么东西，请再来找我。");
        }
        cm.dispose();
    }
}