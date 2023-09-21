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
/* NPC Base
	Map Name (Map ID)
	Extra NPC info.
 */

var status;
var ticketId = 5451000;
var mapName = ["Henesys", "Ellinia", "Perion", "Kerning City", "Sleepywood", "Mushroom Shrine", "Showa Spa (M)", "Showa Spa (F)", "Ludibrium", "New Leaf City", "Nautilus"];
var curMapName = "";

function start() {
    status = -1;
	curMapName = mapName[(cm.getNpc() != 9100117 && cm.getNpc() != 9100109) ? (cm.getNpc() - 9100100) : cm.getNpc() == 9999800 ? 8 : 9];
	
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 0)
        cm.dispose();
    else {
        if (mode == 1)
            status++;
        else
            status--;
		if(status == 0){
			cm.sendSimple("#L1# 抽一次#l \r\n#L2# 抽10次");
		} else if(status == 1){
			if(selection == 1){
				if(cm.haveItem(ticketId)){
					if(cm.canHold(1302000) && cm.canHold(2000000) && cm.canHold(3010001) && cm.canHold(4000000)) { // One free slot in every inventory.
						cm.gainItem(ticketId, -1);
						cm.doGachapon();
					} else {
						cm.sendOk("请确认是不是你的背包的空间不够。");
						cm.dispose();
					}

				} else {
					cm.sendOk("物品不足。");
					cm.dispose();
				}
				cm.dispose();


			} else if(selection == 2){//10连抽
				if(cm.haveItem(ticketId,10)){
					for(var i = 0;i < 10;i++){
						if(cm.canHold(1302000) && cm.canHold(2000000) && cm.canHold(3010001) && cm.canHold(4000000)) { // One free slot in every inventory.
							cm.gainItem(ticketId, -1);
							cm.doGachapon();
						} else {

							cm.sendOk("请确认是不是你的背包的空间不够。");
							cm.dispose();
							break;
						}
					}

				} else {
					cm.sendOk("物品不足。");
					cm.dispose();
				}

				cm.dispose();

			}
		}
		// if(status == 0 && cm.haveItem(ticketId)) {
		// 	if(cm.canHold(1302000) && cm.canHold(2000000) && cm.canHold(3010001) && cm.canHold(4000000)) { // One free slot in every inventory.
		// 		cm.gainItem(ticketId, -1);
		// 		cm.doGachapon();
		// 	} else {
		// 		cm.sendOk("请确认是不是你的背包的空间不够。");
		// 	}
		// } else {
		// 	cm.dispose();
		// }
    }
}