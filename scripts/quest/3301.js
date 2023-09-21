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
/**
 NPC Name:        Han the Broker
 Map(s):        Magatia
 Description:        Quest - Test from the Head of Zenumist Society
 */

var status = -1;
var oreArray;

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            qm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {
            oreArray = getOreArray();
            if (oreArray.length > 0) {
                qm.sendSimple("噢，看来有人准备做一笔交易了。 你非常想加入#r禅宗主义者#k，是吗？ 我真的不明白你的意思，但没关系。 你会给我什么回报？\r\n" + getOreString(oreArray));
            } else {
                qm.sendOk("这是什么，你没有带#r宝石矿石#k。 没有矿石，就没有交易。");
                qm.dispose();

            }
        } else if (status == 1) {
            if (!qm.haveItem(oreArray[selection], 2)) {
                qm.sendNext("这是什么，你还没有#r宝石矿石#k。 没有矿石就没有交易！");
                qm.dispose();
                return;
            }

            qm.gainItem(oreArray[selection], -2); // Take 2 ores
            qm.sendNext("然后等待一段时间。 我去拿些东西来帮助你通过首席禅师的测试。");
            qm.forceCompleteQuest();
        } else if (status == 2) {
            qm.dispose();
        }
    }
}

function getOreArray() {
    var ores = [];
    var y = 0;
    for (var x = 4020000; x <= 4020008; x++) {
        if (qm.haveItem(x, 2)) {
            ores[y] = x;
            y++;
        }
    }
    return ores;
}

function getOreString(ids) { // Parameter 'ids' is just the array of getOreArray()
    var thestring = "#b";
    var extra;
    for (x = 0; x < ids.length; x++) {
        extra = "#L" + x + "##t" + ids[x] + "##l\r\n";
        thestring += extra;
    }
    thestring += "#k";
    return thestring;
}
