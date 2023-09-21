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
/*	
	Author: Traitor
	Map(s):	Mu Lung Dojo Entrance
	Desc:   Sends the entrance message or the taunt message from that dojo guy
*/
var messages = Array("来挑战武陵道场啊？真有勇气啊！", "如果你想品尝失败的苦涩，那就来吧！", "我会让你彻底后悔挑战武陵道场！快点！"); //胆子可真大啊！别把贤明跟轻率搞混了！

function start(ms) {
    if (ms.getPlayer().getMap().getId() == 925020000) {
        if (ms.getPlayer().getMap().findClosestPlayerSpawnpoint(ms.getPlayer().getPosition()).getId() == 0) {
            ms.getPlayer().startMapEffect(messages[(Math.random() * messages.length) | 0], 5120024);
        }

        ms.resetDojoEnergy();
    } else {
        ms.getPlayer().resetEnteredScript(); //in case the person dcs in here we set it at dojang_tuto portal
        ms.getPlayer().startMapEffect("哈哈！让我们来看看你有什么！你不先打败我我是不会让你走的！", 5120024);
    }
}
