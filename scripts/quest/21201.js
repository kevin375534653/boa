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

var status = -1;

function end(mode, type, selection) {
    if (mode == -1) {
        qm.sendNext("说什么呢？在冰窟里冻了几百年，难道连脑子也冻坏了吧快，准备好了，就跟我说话！");
        qm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            qm.sendNext("嘿！至少你试过了！");
            qm.dispose();
            return;
        }

        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {
            qm.sendNext("曾经是谁说要我成为击退黑魔法师的传世武器的？结果中了诅咒，自顾自地沉睡了几百年，把我丢在一边不管不顾。......什么？想不起来了？一句想不起来了就想了事？当初苦苦求我，拜托我的兽怎么说来着......");
        }//Giant Polearm
        else if (status == 1) {
            qm.sendNextPrev("说要向#p1203000#证明自己的实力，请他给我一个机会。", 2);
        } else if (status == 2) {
            qm.sendNextPrev("没错！当初为了得到我，你低三下四地苦苦哀求。要知道像我这样优秀的武器，你上哪里去找啊？能够和黑魔法师相抗衡的最强的#p1201001#就是我了！结果你却把我扔在冰窟里，一放就是几百年……");
        } else if (status == 3) {
            qm.sendNextPrev("倒也没有苦苦哀求。", 2);
        } else if (status == 4) {
            qm.sendNextPrev("什么？没有苦苦哀求？是谁哭着闹着要得到我，甚至不惜双膝下跪苦苦哀求？要不#p1203000#怎么会答应……等等？战神！你难道……难道已经想起来了？！");
        } else if (status == 5) {
            qm.sendNextPrev("有一点点……", 2);
        } else if (status == 6) {
            qm.sendNextPrev("……真不愧是战神啊……呜，呜呜！不，我一点都没有感动！……虽然中了黑魔法师的诅咒，能力尽失，连拿起我的力气都没有了……即便如此，你居然还能想起我，真不愧是我的主人啊！");
        } else if (status == 7) {
            qm.sendAcceptDecline("就算你失去记忆也还是我的主人。能经过极端训练的身体依然能够记得当初的技能，虽然在冰窟中沉睡了数百年，但这一点我还是很清楚的。好吧，我帮你唤醒你的能力！");
        } else if (status == 8) {
            if (!qm.isQuestCompleted(21201)) {
                if (!qm.canHold(1142130)) {
                    qm.sendOk("哇，你的#b背包#k已满。我需要你至少腾出一个空位来完成这个任务。");   // thanks MedicOP for finding an issue here
                    return;
                }

                qm.gainItem(1142130, true);
                qm.changeJobById(2110);

                const YamlConfig = Java.type('config.YamlConfig');
                if (YamlConfig.config.server.USE_FULL_ARAN_SKILLSET) {
                    qm.teachSkill(21100000, 0, 20, -1);   //polearm mastery
                    qm.teachSkill(21100002, 0, 30, -1);   //final charge
                    qm.teachSkill(21100004, 0, 20, -1);   //combo smash
                    qm.teachSkill(21100005, 0, 20, -1);   //combo drain
                }

                qm.completeQuest();
            }

            qm.sendNext("你的等级还没有以前那么高，没法帮你唤醒所有的能力。不过，先帮你唤醒一部分的能力，这样将来升级也会更快一些。快点恢复从前的能力吧！");
        } else if (status == 9) {
            qm.dispose();
        }
    }
}