/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* Lira
 * 
 * Adobis's Mission I : Breath of Lava <Level 2> (280020001)
 * Zakum Quest NPC 
 */

var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
    } else {
        status++;

        if (status == 0) {
            //cm.sendNext("你居然能通过无比艰难的过程？真了不起。这里有#b#t4031062##k。把这东西送给我哥哥。你马上会遇到你们想要见的东西。");
            cm.sendNext("你居然从那凶险之路到达了此地！真是太厉害了。那么，我马上送你去可通往扎昆所在地的门。");
        } else if (status == 1) {
            if (!cm.canHold(4031062)) {
                cm.sendOk("好像你背包的其他栏里没有空间，必须保证一个以上的空格才可以收到道具。");
                cm.dispose();
                return;
            }

            cm.sendNext("好吧，你可以离开了。");
        } else if (status == 2) {
            cm.gainItem(4031062, 1);
            cm.gainExp(10000 * cm.getPlayer().getExpRate());
            cm.warp(211042300);

            cm.dispose();
        }
    }
}