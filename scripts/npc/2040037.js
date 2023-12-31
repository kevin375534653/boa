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
@	Author : Raz
@       Author : Ronan
@
@	NPC = Orange Balloon
@	Map = Hidden-Street <Stage 2>
@	NPC MapId = 922010200
@	Function = LPQ - 2nd Stage
@
*/

var status = 0;
var curMap, stage;

function start() {
    curMap = cm.getMapId();
    stage = Math.floor((curMap - 922010100) / 100) + 1;

    status = -1;
    action(1, 0, 0);
}

function clearStage(stage, eim, curMap) {
    eim.setProperty(stage + "stageclear", "true");
    eim.showClearEffect(true);

    eim.linkToNextStage(stage, "lpq", curMap);  //opens the portal to the next map
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else if (mode == 0) {
        cm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        var eim = cm.getPlayer().getEventInstance();

        if (eim.getProperty(stage.toString() + "stageclear") != null) {
            cm.sendNext("快点，进入下一阶段，入口打开了！");
        } else {
            if (eim.isEventLeader(cm.getPlayer())) {
                var state = eim.getIntProperty("statusStg" + stage);

                if (state == -1) {           // preamble
                    cm.sendOk("你好，欢迎来到#b" + stage + "#k。在这张地图上收集5张#t4001022#，然后带回来给我。");
                    eim.setProperty("statusStg" + stage, 0);
                } else {       // check stage completion
                    if (cm.haveItem(4001022, 5)) {
                        cm.sendOk("做得好！你带来了5张#b#t4001022##k。");
                        cm.gainItem(4001022, -5);

                        eim.setProperty("statusStg" + stage, 1);
                        clearStage(stage, eim, curMap);
                    } else {
                        cm.sendNext("你确定有收集了#r5张#b#t4001022##k？");
                    }
                }
            } else {
                cm.sendNext("请让你的#b队长#k来与我交谈.");
            }
        }

        cm.dispose();
    }
}