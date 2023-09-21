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
/*
 * Gachapon Script - Henesys, currently with Ellinia items
 * @author Moogra
 * @NPC : Gachapon - Henesys
 * @NPC ID : 9100101
 * TODO: FINISH REAL TEXT, use sendSimpleNext for text selection
*/

var status = 0;
var remoteGachapon = false;
var ticketId = 5220000;

function start() {
	if(remoteGachapon)
		ticketId = 5451000;
		
    if (cm.haveItem(ticketId)) {
        cm.sendYesNo("你可以使用" + curMapName + "快乐百宝箱进行抽奖，你确定要使用它吗？");
    } else {
        cm.sendSimple("欢迎来到" + curMapName + "快乐百宝箱，我能为你效劳吗？\r\n\r\n#L0#什么是快乐百宝箱？#l\r\n#L1#在哪里可以获得快乐百宝券。#l");
    }
}

function action(mode, type, selection){
	if(mode == -1) {
		cm.dispose();
	} else if (mode == 1 && cm.haveItem(ticketId)) {
		if(cm.canHold(1302000) && cm.canHold(2000000) && cm.canHold(3010001) && cm.canHold(4000000)) { // One free slot in every inventory.
			cm.gainItem(ticketId, -1);
			cm.doGachapon();
		} else {
			cm.sendOk("请确认你的背包中有足够的空间。");
		}
		cm.dispose();
    } else {
        if (mode > 0) {
            status++;
            if (selection == 0) {
                cm.sendNext("使用快乐百宝箱可以获得稀有的卷轴、时装、椅子、宠物和其他很酷的物品！只需要使用一张#b快乐百宝券#k就可以随机抽到它。");
            } else if (selection == 1) {
                cm.sendNext("快乐百宝券可以在#r游戏商城#k中购买，点击游戏右下方的红色商店访问#r游戏商城#k即可购买。");
            } else if (status == 2) {
                cm.sendNext("你可以在" + curMapName + "使用#r快乐百宝箱#k。");
                cm.dispose();
            } else {
				
			}
        } else {
			cm.dispose();
		}
    }
}