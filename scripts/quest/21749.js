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
            qm.sendNext("哦，战神。你的等级提高得那么快，我都快认不出你来了。你有什么事吗？");
        } else if (status == 1) {
            qm.sendNext("在你勤奋修炼的时候，#p1201000#和我对封印石进行了全方位的调查。不久之前，我们发现了一件非常有趣的事情。你知道专为孩子们生产玩具的村庄#m220000000#吗？");
        } else if (status == 2) {
            qm.sendNext("但是其中一座时间之塔好像由于某种原因坏掉了。从#b#m220000000#通往另一端的时间之门因此被打开，人们可以通过时间之门回到过去。如果前往那里的话是不是有可能得到有关封印石的信息呢？");
        } else if (status == 3) {
            qm.sendNext("战神，你现在要做的就是再次通过#b通往艾琳森林的时光之门#k。这次你一定要找回#r艾琳森林的封印石#k。通过我的情报了解到，#b#p2131002##k有关于那个封印石的线索，#r找到她#k。请一定要做到，我们的世界比以前更需要你的帮助！");
        } else if (status == 4) {
            qm.forceCompleteQuest();
            qm.gainExp(500);
            qm.dispose();
        }
    }
}
