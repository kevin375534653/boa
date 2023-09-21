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
var status = 0;
var fee = 15000;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode != 1) {
        if (mode == 0) {
            cm.sendOk("好的，下次见。");
        }
        cm.dispose();
    } else {
        status++;
        if (cm.getPlayer().getMapId() == 682000000) {
            if (status == 0) {
                if (selection == 0) {
                    cm.sendYesNo("你想回到#b新叶城#k？费用是 " + fee + " 金币。");
                }
            } else if (status == 1) {
                if (cm.getMeso() >= fee) {
                    cm.gainMeso(-fee);
                    cm.warp(600000000);
                } else {
                    cm.sendOk("嘿，你想干什么？你没有足够的金币支付费用。");
                }

                cm.dispose();
            }
        } else {
            if (status == 0) {
                cm.sendYesNo("嘿，你好。有兴趣深入大师领地荒野探险吗？这片大陆还有很多地方无人涉足……所以说能走的路不多。幸好我们有这东西……有了它，没有路也能前进，而且看上去还特别帅！我现在可以带你去#b幽影森林#k。那里有个叫#b普伦德加斯特庄园#k的地方。有人说那儿闹鬼！怎么样……想去见识一下么？");
            } else if (status == 1) {
                if (cm.getMeso() >= fee) {
                    cm.gainMeso(-fee);
                    cm.warp(682000000, 0);
                } else {
                    cm.sendOk("嘿，你想干什么？你没有足够的金币支付费用。");
                }

                cm.dispose();
            }
        }
    }
}