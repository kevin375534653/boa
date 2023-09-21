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
function enter(pi) {
    if (pi.isQuestCompleted(3706)) {
        pi.playPortalSound();
        pi.warp(240040612, "out00");
        return true;
    } else if (pi.isQuestStarted(100203) || pi.getPlayer().haveItem(4001094)) {
        var em = pi.getEventManager("NineSpirit");
        if (!em.startInstance(pi.getPlayer())) {
            pi.message("这张地图上目前已经有人了，请稍后再来。");
            return false;
        } else {
            pi.playPortalSound();
            return true;
        }
    } else {
        pi.message("一股奇怪的力量阻止你进入。");
        return false;
    }
}