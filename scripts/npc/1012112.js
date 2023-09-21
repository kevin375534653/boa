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
/**
 * @author BubblesDev
 * @author Ronan
 * @NPC Tory
 */

var status = 0;
var em = null;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (cm.getMapId() == 100000200) {
            if (status == 0) {
                em = cm.getEventManager("HenesysPQ");
                if (em == null) {
                    cm.sendOk("活动遇到了一个错误。");
                    cm.dispose();
                    return;
                } else if (cm.isUsingOldPqNpcStyle()) {
                    action(1, 0, 0);
                    return;
                }

                cm.sendSimple("#e#b<迎月花山丘保护月妙>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n我是达尔利。这里有一座美丽的小山，迎月花在那里盛开。山上住着一只老虎，叫兴儿，他似乎在找东西吃。你愿意和你的队友们一起去迎月花山丘帮助兴儿吗？#b\r\n#L0#我想参加组队任务。\r\n#L2#我想了解更多的细节。\r\n#L3#我想兑换头顶年糕。");
            } else if (status == 1) {
                if (selection == 0) {
                    if (cm.getParty() == null) {
                        cm.sendOk("嘿，你好！我是达尔利。这个地方笼罩着神秘的满月光环，没有人可以一个人进入。");
                        cm.dispose();
                    } else if (!cm.isLeader()) {
                        cm.sendOk("请让队长与我交谈。");
                        cm.dispose();
                    } else {
                        var eli = em.getEligibleParty(cm.getParty());
                        if (eli.size() > 0) {
                            if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                cm.sendOk("有人已经在开始挑战了,请等待他们完成。");
                            }
                        } else {
                            cm.sendOk("你还不能开始这个组队任务，因为你的队伍不在范围内或者队伍成员没有资格参加组队任务。");
                        }

                        cm.dispose();
                    }
                } else if (selection == 1) {
                    var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                    cm.sendOk("你的队伍搜索状态是现在：#b" + (psState ? "启用" : "禁用") + "#k。你什么时候想兑换就什么时候跟我说。");
                    cm.dispose();
                } else if (selection == 2) {
                    cm.sendOk("#e#b<迎月花山丘保护月妙>#k#n\r\n从地图底部的花中搜集迎月花的种子，把它们放在月亮周围的平台上，迎月花种子的颜色必须与平台相对应，才能生长出迎月花，所有的种子都种好后，就会开启第二阶段的任务，当月妙为饥饿难耐的兴儿制作10个年糕时，你的任务就完成了。");
                    cm.dispose();
                } else {
                    cm.sendYesNo("你想要用20个#b月妙的年糕#v4001101##k兑换#b头顶年糕#v1002798##k吗？");
                }
            } else {
                if (cm.hasItem(4001158, 20)) {
                    if (cm.canHold(1002798)) {
                        cm.gainItem(4001158, -20);
                        cm.gainItem(1002798, 20);
                        cm.sendNext("兑换成功！");
                    }
                } else {
                    cm.sendNext("#b月妙的年糕#v4001101##k不够，无法兑换！");
                }

                cm.dispose();
            }
        } else if (cm.getMapId() == 910010100) {
            if (status == 0) {
                cm.sendYesNo("感谢你为饥饿难耐的兴儿搜集了食物。看来你来这里的任务已经达成...让我帮你送出去吧！");
            } else if (status == 1) {
                if (cm.getEventInstance().giveEventReward(cm.getPlayer())) {
                    cm.warp(100000200);
                } else {
                    cm.sendOk("你的物品材料不够，无法进行兑换奖励。");
                }
                cm.dispose();
            }
        } else if (cm.getMapId() == 910010400) {
            if (status == 0) {
                cm.sendYesNo("那么，你现在要回去吗？");
            } else if (status == 1) {
                if (cm.getEventInstance() == null) {
                    cm.warp(100000200);
                } else if (cm.getEventInstance().giveEventReward(cm.getPlayer())) {
                    cm.warp(100000200);
                } else {
                    cm.sendOk("你的背包空间不够，请先检查一下以获得适当的奖励。");
                }
                cm.dispose();
            }
        }
    }
}