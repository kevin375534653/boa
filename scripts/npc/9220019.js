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

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {
            var mapid = cm.getMapId();
            if (mapid == 674030100) {
                cm.sendNext("嗨，我是#p9220019#。");
                cm.dispose();
                return;
            } else if (mapid == 674030300) {
                cm.sendNext("嗨，#h0#，这里是盖福克斯的藏宝城。利用你在这里的时间可以做任何你想做的事，实际上这里有很多事情需要揭露。如果你想离开这里，可以使用旁边的门#r传送#k出去。");
                cm.dispose();
                return;
            }

            cm.sendYesNo("你确定要回去吗？现在回去，你就要丢下你的搭档，你真的想这么做吗？");
        } else if (status == 1) {
            cm.warp(674030100);
            cm.dispose();
        }
    }
}