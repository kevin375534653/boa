/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* Warrior Job Instructor
	Warrior 2nd Job Advancement
	Victoria Road : West Rocky Mountain IV (102020300)
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
            if (cm.isQuestCompleted(100004)) {
                cm.sendOk("你真是个英雄！");
                cm.dispose();
            } else if (cm.isQuestCompleted(100003)) {
                cm.sendNext("好吧，我送你进去！打败里面的怪物，收集30个#b#t4031013##k，然后和我的分身对话。他会给你#b英雄证书#k，祝你好运。");
                status = 4;
            } else if (cm.isQuestStarted(100003)) {
                cm.sendNext("嗯...这封信是在#b武术教练#k那里带来的吗？......所以你来这里参加测试，打算进行第二次转职吗？好吧，我来给你解释一下测试过程。别担心，没那么复杂。");
            } else {
                cm.sendOk("一旦你准备好了，我可以送你进去。");
                cm.dispose();
            }
        } else if (status == 1) {
            cm.sendNextPrev("我会送你进入战士2转考验场，在那里你会看到平时看不到的怪物，它们看起来和平常一样，但是不能为你提供经验值，也不会掉落物品。");
        } else if (status == 2) {
            cm.sendNextPrev("你可以从怪物身上获得#b#t4031013##k。这是一种特殊的珠子，收集30个，然后去和我的分身对话，你就可以通过考验。");
        } else if (status == 3) {
            cm.sendYesNo("一旦进去后，你就不能离开，除非完成那里的任务。如果你死了，你的经验值会降低，所以最好准备充分以后…好吧，你想现在就进去吗？");
        } else if (status == 4) {
            cm.sendNext("好吧，我送你进去！打败里面的怪物，收集30个#b#t4031013##k，然后和我的分身对话。他会给你#b英雄证书#k，祝你好运。");
            cm.completeQuest(100003);
            cm.startQuest(100004);
            cm.gainItem(4031008, -1);
        } else if (status == 5) {
            cm.warp(108000300, 0);
            cm.dispose();
        } else {
            cm.dispose();
        }
    }
}
