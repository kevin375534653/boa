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
            qm.sendNext("您现在可能知道，我是德朗博士。 我曾经是阿尔卡德诺社会中颇有影响力的炼金术士，但由于实验失败后的灾难，我与他们的社会脱节了，这种情况现在在马加蒂亚随处可见。");
        } else if (status == 1) {
            qm.sendNextPrev("我创造的Huroids最初是为了满足国内、科学和军事事务而设计的，然而其主处理单元芯片的严重故障使它们变得不稳定和暴力，迅速引起了各地的动乱和破坏。 因此，我被剥夺了阿尔卡德诺炼金术士和研究员的身份，并收到了逮捕令。");
        } else if (status == 2) {
            qm.sendAcceptDecline("即便如此，现在也不能阻止我！ 我的创造物仍在四处游荡，每天造成破坏和人员伤亡，但将它们赶出城市的希望渺茫！ 他们复制自己的速度太快，普通武器无法阻止他们。 从那时起，我一直在不懈地研究一种方法来立即关闭它们，试图找到一种方法来阻止这种疯狂。 你肯定能理解我的处境吧？");
        } else if (status == 3) {
            qm.sendNext("感谢您理解我的观点。 你一定见过帕尔文，因为你知道我在哪里。 让他了解目前的情况。");
        } else if (status == 4) {
            qm.sendNext("哦，我还有一件个人事想请你帮忙，如果不是太多的话。 我担心我的妻子，#b#p2111004##k。 自从Huroids事件发生后，我可以给她发一句话，这一定对她造成了伤害...拜托，如果可以的话，你能拿走我#bback在家里#k的#bSilver Pendant#k吗？ 代替我给她？ 我很遗憾没有立即把这个东西送给她，那天是她的生日……也许现在把它送给她至少可以让她睡个好觉。");
        } else if (status == 5) {
            qm.sendNext("#r一定要记住这个图案！#k我把吊坠藏在我家里的一个容器里#b水管后面#k。 管道必须旋转#b按钮#k：顶部、底部、中间。 然后，输入秘密密码：“#rmy love Phyllia#k”。");
            qm.forceStartQuest();
        } else if (status == 6) {
            qm.dispose();
        }
    }
}