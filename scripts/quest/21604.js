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
            qm.sendNext("很不错啊，已经成功获取了狼神。但是乘骑的话还是需要特制的鞍子才能骑上去的。如果由于材料不够，我无发给你`你所需要的东西。");
        } else if (status == 1) {
            qm.sendNext("别着急，虽然我这里没有足够的材料。但是也不是没办法了。这样吧，你帮我去搜索#b小白雪人的皮50个#k来吧！我就可以给你做了！");
        } else if (status == 2) {
            qm.forceStartQuest();
            cm.sendNext('快去快回啊，好冷！记好是 #b50个小白雪人的皮#k。');
            qm.dispose();
        }
    }
}
