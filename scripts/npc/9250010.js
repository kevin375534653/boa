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
/* NPC:     Thomas Swift
 * Maps:    740000000, 680000000
 * Author:  Moogra
 * Purpose: Amoria warper.
*/

status = -1;

function start() {
    if (cm.getPlayer().getMapId() == 500000000) {
        cm.sendYesNo("你想去泰国寺庙游览一番吗？我可以快速的送你到达泰国寺庙~ 但会收取一些费用，你想现在移动过去吗？");
    } else {
        cm.sendYesNo("在这玩的怎么样？准备回去了吗？那我们就出发吧。");
    }
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (mode == 0)
            cm.sendOk("等你想好了再来找我吧。");
            cm.dispose();
            return;
    }
    
    if (status == 0) {
        if (cm.getMeso() < 1000) {
            cm.sendNext("你确定你有#b1000#k金币吗？带够金币再来试试吧。");
            cm.dispose();
        } else if (cm.getPlayer().getMapId() == 501000000) {
            cm.gainMeso(-1000);
            cm.warp(500000000, 0);
            cm.dispose();
        } else {
            cm.gainMeso(-1000);
            cm.warp(501000000, 0);
            cm.dispose();
        }
    }
}