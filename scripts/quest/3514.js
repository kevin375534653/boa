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
/* Author: PurpleMadness
 * The sorcerer who sells emotions
*/

var status = -1;

function start(mode, type, selection) {
    if (qm.getPlayer().getMeso() >= 1000000) {
        if (qm.canHold(2022337, 1)) {
            qm.gainItem(2022337, 1);
            qm.gainMeso(-1000000);

            //qm.sendOk("Nice doing business with you~~.");
            qm.startQuest(3514);
        } else {
            qm.sendOk("首先检查您的消耗栏中是否有足够的空间。");
        }
    } else {
        qm.sendOk("哎呀，你没钱啊。 我收取#r1,000,000金币#k 的情感药水费用。 没钱，没生意。");
    }

    qm.dispose();
}

function usedPotion(ch) {
    const BuffStat = Java.type('client.BuffStat');
    return ch.getBuffSource(BuffStat.HPREC) == 2022337;
}

function end(mode, type, selection) {
    if (mode == 0 && type == 0) {
        status--;
    } else if (mode == -1) {
        qm.dispose();
        return;
    } else {
        status++;
    }

    if (status == 0) {
        if (!usedPotion(qm.getPlayer())) {
            if (qm.haveItem(2022337)) {
                qm.sendOk("你害怕喝药水吗？ 我可以向你保证它只有轻微的#r副作用#k。");
            } else {
                if (qm.canHold(2022337)) {
                    qm.gainItem(2022337, 1);
                    qm.sendOk("失去了它？ 对你来说幸运的是我设法把它恢复回来。 拿去。");
                } else {
                    qm.sendOk("失去了它？ 对你来说幸运的是我设法把它恢复回来。 开个房间去拿它。");
                }
            }

            qm.dispose();

        } else {
            qm.sendOk("看来药剂起了作用，你的情绪不再被冻结。 而且，哦，我的...你病得很厉害，#bpurge#k 快点康复吧。");
        }
    } else if (status == 1) {
        qm.gainExp(891500);
        qm.completeQuest(3514);
        qm.dispose();
    }
}