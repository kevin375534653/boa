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
// Jane the Alchemist
var status = -1;
var amount = -1;
var items = [[2000002, 310], [2022003, 1060], [2022000, 1600], [2001000, 3120]];
var item;

function start() {
    if (cm.isQuestCompleted(2013)) {
        cm.sendNext("谢谢你能够帮助我，我可以低价出售你一些东西。");
    } else {
        if (cm.isQuestCompleted(2010)) {
            cm.sendNext("我的梦想是做一名冒险家。就像你们一样，可是爸爸担心我，不许我去。");
        } else {
            cm.sendOk("如果你能帮助我说服父亲让我去冒险，我可以低价出售一些药品作为补偿。");
        }
        cm.dispose();
    }
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (mode == 0 && type == 1) {
            cm.sendNext("我还有不少你以前给我的资料。所有的项目都在那里，所以你可以慢慢选择。");
        }
        cm.dispose();
        return;
    }
    if (status == 0) {
        var selStr = "你想从我这里购买什么？#b";
        for (var i = 0; i < items.length; i++) {
            selStr += "\r\n#L" + i + "##i" + items[i][0] + "# (Price : " + items[i][1] + " mesos)#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        item = items[selection];
        var recHpMp = ["300 HP.", "1000 HP.", "800 MP", "1000 HP and MP."];
        cm.sendGetNumber("你想要 #b#t" + item[0] + "##k？#t" + item[0] + "#让你恢复" + recHpMp[selection] + "，你想买多少？", 1, 1, 100);
    } else if (status == 2) {
        cm.sendYesNo("你会购买#r" + selection + "#k #b#t" + item[0] + "#(s)#k？#t" + item[0] + "#成本" + item[1] +  金币+"首先，总数是#r" + (item[1] * selection) + "#k金币。");
        amount = selection;
    } else if (status == 3) {
        if (cm.getMeso() < item[1] * amount) {
            cm.sendNext("你有可能缺少金币吗?请检查，看看你是否有一个空间背包，如果你至少有#r" + (item[1] * selectedItem) + "#k金币在身上。");
        } else {
            if (cm.canHold(item[0])) {
                cm.gainMeso(-item[1] * amount);
                cm.gainItem(item[0], amount);
                cm.sendNext("谢谢你的到来。这里的东西总是可以做的，所以如果你需要什么，请再来。");
            } else {
                cm.sendNext("请检查一下，看看你的库存是否还有空位。");
            }
        }
        cm.dispose();
    }
}