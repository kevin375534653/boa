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

/*
BossRushPQ - Rest Spot portal
@author Ronan
*/

function enter(pi) {
    var evLevel = ((pi.getMapId() - 1) % 5) + 1;

    if (pi.getPlayer().getEventInstance().isEventLeader(pi.getPlayer()) && pi.getPlayer().getEventInstance().getPlayerCount() > 1) {
        pi.message("作为队长，你不能在队友离开之前离开，也不能在你通过任务之前离开。");
        return false;
    }

    if (pi.getPlayer().getEventInstance().giveEventReward(pi.getPlayer(), evLevel)) {
        pi.playPortalSound();
        pi.warp(970030000);
        return true;
    } else {
        pi.message("请确认你的装备栏、消耗栏以及其他栏都至少有一个空位来获取奖励。");
        return false;
    }
}