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
/* Mr. Smith
	Victoria Road: Perion (102000000)
	
	Refining NPC: 
	* Warrior Gloves - 10-60 + upgrades
	* Processed Wood/Screws
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
        var selStr = "我是斯密斯，很高兴为你服务~#b"
        var options = ["制作手套", "升级手套", "木材与螺丝钉制作"];
        for (var i = 0; i < options.length; i++) {
            selStr += "\r\n#L" + i + "# " + options[i] + "#l";
        }

        cm.sendSimple(selStr);
    } else if (status == 1 && mode == 1) {
        selectedType = selection;
        if (selectedType == 0) { //glove refine
            var selStr = "好的，你想要制作哪一种手套呢？#b";
            var items = ["腕甲#k - 战士 Lv. 10#b", "钢制短手套#k - 战士 Lv. 15#b", "皮手套#k - 战士 Lv. 20#b", "白纹短手套#k - 战士 Lv. 25#b",
                "青铜机器手套#k - 战士 Lv. 30#b", "铁制轻便手套#k - 战士 Lv. 35#b", "钢铁指节手套#k - 战士 Lv. 40#b", "钢铁合金手套#k - 战士Lv. 50#b", "青铜战斗手套#k - 战士 Lv. 60#b"];
            for (var i = 0; i < items.length; i++) {
                selStr += "\r\n#L" + i + "# " + items[i] + "#l";
            }
            cm.sendSimple(selStr);
            equip = true;
        } else if (selectedType == 1) { //glove upgrade
            var selStr = "升级手套？可以哦~你想要升级哪一种手套呢？#b";
            var crystals = ["钢制机器手套#k - 战士 Lv. 30#b", "紫矿机器手套#k - 战士 Lv. 30#b", "黄轻便手套#k - 战士 Lv. 35#b", "黑轻便手套#k - 战士 Lv. 35#b",
                "朱矿指节手套#k - 战士 Lv. 40#b", "黑指节手套#k - 战士 Lv. 40#b", "锂矿合金手套#k - 战士 Lv. 50#b", "黄金合金手套#k - 战士 Lv. 50#b",
                "蓝战斗手套#k - 战士 Lv. 60#b", "黑战斗手套#k - 战士 Lv. 60#b"];
            for (var i = 0; i < crystals.length; i++) {
                selStr += "\r\n#L" + i + "# " + crystals[i] + "#l";
            }
            cm.sendSimple(selStr);
            equip = true;
        } else if (selectedType == 2) { //material refine
            var selStr = "木材和螺丝钉，你需要什么呢？#b";
            var materials = ["用10个树枝制作1个木材", "用5个木柴制作1个木材", "制作螺丝钉(1次15个)"];
            for (var i = 0; i < materials.length; i++) {
                selStr += "\r\n#L" + i + "# " + materials[i] + "#l";
            }
            cm.sendSimple(selStr);
            equip = false;
        }
        if (equip) {
            status++;
        }
    } else if (status == 2 && mode == 1) {
        selectedItem = selection;
        if (selectedType == 2) { //material refine
            var itemSet = [4003001, 4003001, 4003000];
            var matSet = [4000003, 4000018, [4011000, 4011001]];
            var matQtySet = [10, 5, [1, 1]];
            var costSet = [0, 0, 0];
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }

        var prompt = "所以你需要我帮你做一些#t" + item + "#？那你想要我做多少个呢？";

        cm.sendGetNumber(prompt, 1, 1, 100)
    } else if (status == 3 && mode == 1) {
        if (equip) {
            selectedItem = selection;
            qty = 1;
        } else {
            qty = (selection > 0) ? selection : (selection < 0 ? -selection : 1);
        }

        if (selectedType == 0) { //glove refine
            var itemSet = [1082003, 1082000, 1082004, 1082001, 1082007, 1082008, 1082023, 1082009, 1082059];
            var matSet = [[4000021, 4011001], 4011001, [4000021, 4011000], 4011001, [4011000, 4011001, 4003000], [4000021, 4011001, 4003000], [4000021, 4011001, 4003000],
                [4011001, 4021007, 4000030, 4003000], [4011007, 4011000, 4011006, 4000030, 4003000]];
            var matQtySet = [[15, 1], 2, [40, 2], 2, [3, 2, 15], [30, 4, 15], [50, 5, 40], [3, 2, 30, 45], [1, 8, 2, 50, 50]];
            var costSet = [1000, 2000, 5000, 10000, 20000, 30000, 40000, 50000, 70000];
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 1) { //glove upgrade
            var itemSet = [1082005, 1082006, 1082035, 1082036, 1082024, 1082025, 1082010, 1082011, 1082060, 1082061];
            var matSet = [[1082007, 4011001], [1082007, 4011005], [1082008, 4021006], [1082008, 4021008], [1082023, 4011003], [1082023, 4021008],
                [1082009, 4011002], [1082009, 4011006], [1082059, 4011002, 4021005], [1082059, 4021007, 4021008]];
            var matQtySet = [[1, 1], [1, 2], [1, 3], [1, 1], [1, 4], [1, 2], [1, 5], [1, 4], [1, 3, 5], [1, 2, 2]];
            var costSet = [20000, 25000, 30000, 40000, 45000, 50000, 55000, 60000, 70000, 80000];
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }

        var prompt = "你需要我帮你做";
        if (qty == 1) {
            prompt += "1个#t" + item + "#？";
        } else {
            prompt += qty + "个#t" + item + "#？";
        }

        prompt += "好的我会帮你完成的，但请你确认你的背包是否有以下的材料与足够的空间哦！#b";

        if (mats instanceof Array) {
            for (var i = 0; i < mats.length; i++) {
                prompt += "\r\n#i" + mats[i] + "# " + matQty[i] * qty + " #t" + mats[i] + "#";
            }
        } else {
            prompt += "\r\n#i" + mats + "# " + matQty * qty + " #t" + mats + "#";
        }

        if (cost > 0) {
            prompt += "\r\n#i4031138# " + cost * qty + " meso";
        }

        cm.sendYesNo(prompt);
    } else if (status == 4 && mode == 1) {
        var complete = true;
        var recvItem = item, recvQty;

        if (item == 4003000)//screws
        {
            recvQty = 15 * qty;
        } else {
            recvQty = qty;
        }

        if (!cm.canHold(recvItem, recvQty)) {
            cm.sendOk("Check your inventory for a free slot first.");
            cm.dispose();
            return;
        } else if (cm.getMeso() < cost * qty) {
            cm.sendOk("糟糕...你的钱好像不够哦...");
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
            cm.sendOk("糟糕！？你的材料好像不够哦...这样子我就不能帮你制作了，请重新确认一下。");
        } else {
            if (mats instanceof Array) {
                for (var i = 0; i < mats.length; i++) {
                    cm.gainItem(mats[i], -matQty[i] * qty);
                }
            } else {
                cm.gainItem(mats, -matQty * qty);
            }

            if (cost > 0) {
                cm.gainMeso(-cost * qty);
            }

            cm.gainItem(recvItem, recvQty);
            cm.sendOk("很棒吧？我的手艺，如果还有需要欢迎来找我，我哪都不会去的。");
        }
        cm.dispose();
    }
}