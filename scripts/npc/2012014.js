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

/**
 -- Odin JavaScript --------------------------------------------------------------------------------
 Orbis Magic Spot - Orbis Tower <1st Floor>(200082100)
 -- By ---------------------------------------------------------------------------------------------
 Unknown
 -- Version Info -----------------------------------------------------------------------------------
 1.2 - Now Official method (action(x,0,0) is weak) by Moogra
 1.1 - Official Text and Method [Information]
 1.0 - First Version by Unknown
 ---------------------------------------------------------------------------------------------------
 **/

function start() {
    if (cm.haveItem(4001019)) {
        cm.sendYesNo("你确定要使用#b#t4001019##k从#b通天塔<20层>#k移动到#b通天塔<1层>#k吗？");
    } else {
        cm.sendOk("这是为通天塔的旅行者而设的魔法石。你只要使用#b#t4001019##k，就能移动至#b通天塔<1层>#k，但是没有#b#t4001019##k你无法激活它。");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode > 0) {
        cm.gainItem(4001019, -1);
        cm.warp(200082100, 0);
    }
    cm.dispose();
}
