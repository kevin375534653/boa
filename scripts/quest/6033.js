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
/* Maker Skill
	Moren's Second round of teaching
	2nd skill level
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
            qm.sendNext("嗯，那么你声称带来了#b#t4260003##k？好的，让我们来看看。");
        } else if (status == 1) {
            if (qm.getQuestProgressInt(6033) == 1 && qm.haveItem(4260003, 1)) {
                qm.sendNextPrev("我明白了，你确实制作了一块精美的#b#t4260003##k。你通过了！现在，我将教你制造者技能的下一步。把#b#t4260003##k也带在身边，这是你的工作。");
            } else {
                qm.sendNext("嘿，怎么了？我确实告诉过你做一个#b#t4260003##k来通过我的测试，不是吗？在测试开始前购买或制作不是交易的一部分。去给我做一个#b#t4260003##k。");
                qm.dispose();

            }
        } else if (status == 2) {
            qm.forceCompleteQuest();

            var skillid = Math.floor(qm.getPlayer().getJob().getId() / 1000) * 10000000 + 1007;
            qm.teachSkill(skillid, 2, 3, -1);
            qm.gainExp(230000);
            qm.dispose();
        }
    }
}