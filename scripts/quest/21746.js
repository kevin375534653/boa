/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2019 RonanLana

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

var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            qm.dispose();
            return;
        }

        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {
            qm.sendNext("封印石......那是很久很久以前，由武陵看管的东西......难道说觊觎它的人又出现了......");
        } else if (status == 1) {
            qm.sendNextPrev("请告诉我有关封印石的事情。", 3);
        } else if (status == 2) {
            qm.sendNextPrev("那可不行。#o9300351#这个家伙确实很危险，但我怎么知道你会比他不危险呢？我要考验一下你……你接受#b考验#k吗？", 9);
        } else if (status == 3) {
            qm.sendNextPrev("战士的武器，其实就是自信。技能比任何言语都能更好地体现你的内心。由我的#r分身#k来和你战斗，让我看看你的内心是怎样的。", 9);
        } else {
            var mapobj = qm.getWarpMap(925040001);
            if (mapobj.countPlayers() == 0) {
                mapobj.resetPQ(1);

                qm.warp(925040001, 0);
                qm.forceStartQuest();
            } else {
                qm.sendOk("有人已经在挑战，请稍后再试。");
            }


            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            qm.dispose();
            return;
        }

        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {
            qm.sendNext("那可不行。#o9300351#这个家伙确实很危险，但我怎么知道你会比他不危险呢？我要考验一下你……你接受#b考验#k吗？");
        } else if (status == 1) {
            qm.gainItem(4032342, -8);
            qm.gainItem(4220151, -1);
            qm.gainExp(10000);

            qm.forceCompleteQuest();
            qm.dispose();
        }
    }
}