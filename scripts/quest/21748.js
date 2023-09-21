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
            qm.sendNext("我听说了，为了调查黑色之翼的事件，你去了#m250000000#，战神。辛苦了。不过……这次是不是又中了黑色之翼的招儿？", 9);
        } else if (status == 1) {
            qm.sendNext("……什么？是英雄……过去的你把封印石交给大家的吗？#m250000000#封印石被抢走了也没关系。这个情报可意义重大！", 9);
        } else if (status == 2) {
            qm.sendNext("意义重大？", 3);
        } else if (status == 3) {
            qm.sendNext("'既然过去封印石是英雄的东西，那么#b只要对英雄进行一些调查，哪怕是很琐碎的一些情报，说不定就能发现封印石的下落了呢#k？那样的话，我们就能在黑色之翼之前，找到封印石了！", 9);
        } else if (status == 4) {
            qm.sendNext("原来是这样，真是个好办法！", 3);
        } else if (status == 5) {
            qm.sendNext("呵呵呵……太好了！现在又斗志昂扬了吧？来，战神！这是新的技能！");
        } else if (status == 6) {
            qm.sendNext("看来应该重新调查英雄的行踪了！特鲁大叔会继续打听关于黑色之翼的信息，你还是专心修炼吧！一定要练到把黑色之翼鼻子打扁的程度啊！");
        } else if (status == 7) {
            qm.gainExp(20000);
            qm.teachSkill(21100002, 0, 30, -1); // final charge

            qm.forceCompleteQuest();

            qm.dispose();
        }
    }
}