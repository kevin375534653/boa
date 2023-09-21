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
	Author : 		Ronan
	NPC Name: 	        Yulete
	Map(s): 		Magatia
	Description: 		Quest - Yulete's Reward
	Quest ID: 		3382
*/

var status = -1;

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
            if (qm.haveItem(4001159, 25) && qm.haveItem(4001160, 25) && !qm.haveItemWithId(1122010, true)) {
                if (qm.canHold(1122010)) {
                    qm.gainItem(4001159, -25);
                    qm.gainItem(4001160, -25);
                    qm.gainItem(1122010, 1);

                    qm.sendOk("谢谢你找回弹珠。 接受这个吊坠作为我的谢意。");
                } else {
                    qm.sendNext("在领取奖品之前，请确保装备栏有足够的空间。");
                    return;
                }
            } else if (qm.haveItem(4001159, 10) && qm.haveItem(4001160, 10)) {
                if (qm.canHold(2041212)) {
                    qm.gainItem(4001159, -10);
                    qm.gainItem(4001160, -10);
                    qm.gainItem(2041212, 1);

                    qm.sendOk("谢谢你找回弹珠。 我给你的这块石头可以用来提高 #b#t1122010##k 的属性。 把它当作我的感激之情并明智地使用它。");
                } else {
                    qm.sendNext("在领取奖品之前，请确保消耗栏有足够的空间。");
                    return;
                }
            } else {
                qm.sendNext("我至少需要 #t4001159# 和 #t4001160##k 中的 #b10个才能适当地奖励你。 如果你碰巧带着#b25个这些#k来代替，我可以奖励你一件有价值的装备。 告别。");
                return;
            }

            qm.forceCompleteQuest();
        } else if (status == 1) {
            qm.dispose();
        }
    }
}
