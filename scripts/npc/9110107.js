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
/* NPC:     9110107
 * Maps:    800000000, 800040000
 * Author:  Moogra
 * Purpose: 枫叶古城 warper.
*/

status = -1;

function start() {
    if (cm.getPlayer().getMapId() == 800000000)
        cm.sendYesNo("你想去枫城天下太平吗？我可以马上送你过去。");
    else
        cm.sendYesNo("我可以带你回到古代神社。准备回去了吗？");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (mode == 0)
            cm.sendOk("难道你不想去看看吗！好吧，等你想好了再来找我吧。");
        cm.dispose();
        return;
    }
    if (status == 0){
        if (cm.getPlayer().getMapId() == 800040000)
            cm.warp(800000000, 0);
        else
            cm.warp(800040000, 5);
        cm.dispose();
    }
}