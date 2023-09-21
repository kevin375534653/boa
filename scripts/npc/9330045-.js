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
 * Maps:    741000201, 741000201
 * Author:  Moogra
 * Purpose: Amoria warper.
*/

status = -1;

function start() {
    if (cm.getPlayer().getMapId() == 741000200)
        cm.sendYesNo();
    else
        //cm.sendYesNo("你是要去钓鱼场吗？在钓鱼场可以钓到很多美味的大鱼，想不想一起去试试？");
        cm.sendYesNo("你是要去钓鱼场吗？里面可以钓到美味的鱼儿，想去试试吗？");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (mode == 0)
            cm.sendOk("要想前往钓鱼场的话，随时来找我吧。");
        cm.dispose();
        return;
    }
    if (status == 0){
        if (cm.getPlayer().getMapId() == 741000200)
            cm.warp(741000201, 0);
        else
            cm.warp(741000201, 5);
        cm.dispose();
    }
}