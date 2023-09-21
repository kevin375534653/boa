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
/**
 -- Odin JavaScript --------------------------------------------------------------------------------
 2x EXP Event Script
 -- Author --------------------------------------------------------------------------------------
 Twdtwd
 **/

var timer1;
var timer2;
var timer3;
var timer4;

function init() {
    // if(em.getChannelServer().getId() == 1) {
    //     em.schedule("start",1000);
    //     // em.schedule("start", 10 * 60 * 1000);
    // }

    /*
        if(em.getChannelServer().getId() == 1) { // Only run on channel 1.
        // AEST
        timer1 = em.scheduleAtTimestamp("start", 1428220800000);
        timer2 = em.scheduleAtTimestamp("stop", 1428228000000);
        // EDT
        timer1 = em.scheduleAtTimestamp("start", 1428271200000);
        timer2 = em.scheduleAtTimestamp("stop", 1428278400000);
    }
        */
}

function cancelSchedule() {
    if (timer1 != null) {
        timer1.cancel(true);
    }
    if (timer2 != null) {
        timer2.cancel(true);
    }
    if (timer3 != null) {
        timer3.cancel(true);
    }
    if (timer4 != null) {
        timer4.cancel(true);
    }
}

function start() {
    const Server = Java.type('net.server.Server');
    const PacketCreator = Java.type('tools.PacketCreator');
    var world = Server.getInstance().getWorld(em.getChannelServer().getWorld());
    // world.setExpRate(8);
    world.broadcastPacket(PacketCreator.serverNotice(1, "欢迎来到MapleBoast 最低2倍渐变式经验 1倍金币 1倍掉落 主打市场价值，让你的付出有回报！ 输入 @帮助 可以查看指令哦！"));
}

function stop() {
    const Server = Java.type('net.server.Server');
    const PacketCreator = Java.type('tools.PacketCreator');
    var world = Server.getInstance().getWorld(em.getChannelServer().getWorld());
    world.setExpRate(4);
    world.broadcastPacket(PacketCreator.serverNotice(6, "Unfortunately the Emergency XP Pool (EXP) has run out of juice for now and needs to recharge causing the EXP rate to go back to normal."));
}

// ---------- FILLER FUNCTIONS ----------

function dispose() {}

function setup(eim, leaderid) {}

function monsterValue(eim, mobid) {return 0;}

function disbandParty(eim, player) {}

function playerDisconnected(eim, player) {}

function playerEntry(eim, player) {}

function monsterKilled(mob, eim) {}

function scheduledTimeout(eim) {}

function afterSetup(eim) {}

function changedLeader(eim, leader) {}

function playerExit(eim, player) {}

function leftParty(eim, player) {}

function clearPQ(eim) {}

function allMonstersDead(eim) {}

function playerUnregistered(eim, player) {}

