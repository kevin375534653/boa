/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2019 RonanLana

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

var status = -1;

function start(mode, type, selection) {
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
            if (!qm.haveItem(4001094, 1)) {
                qm.sendNext("你没有#b#t4001094##k...");
                qm.dispose();
                return;
            }

            if (qm.haveItem(2041200, 1)) {
                qm.sendOk("（我包里的#b#t2041200##k到了这里就变得更亮了……再仔细一看，那边的幼龙似乎正对着它恶狠狠地瞪着。）");
                qm.dispose();
                return;
            }

            qm.sendNext("你带来了一只#b#t4001094##k，谢谢你又把我的一只亲戚带回了巢穴！ 请将此...\r\n\r\n呃, #b#t2041200##k 作为标记 我的亲人的感激之情。 请帮我们一个忙，把那东西带出这里……");
        } else if (status == 1) {
            if (!qm.canHold(2041200, 1)) {
                qm.sendOk("首先请确保你的消耗栏留有足够的空间");
                qm.dispose();
                return;
            }

            qm.forceCompleteQuest();
            qm.gainItem(4001094, -1);
            qm.gainItem(2041200, 1);    // quest not rewarding properly found thanks to MedicOP & Thora
            qm.gainExp(42000);
            qm.dispose();
        }
    }
}
