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
/* Aura
 * 
 * Adobis's Mission I: Unknown Dead Mine (280010000)
 * 
 * Zakum PQ NPC (the one and only)
*/

var status;
var selectedType;
var gotAllDocs;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        var eim = cm.getPlayer().getEventInstance();

        if (status == 0) {
            if (!eim.isEventCleared()) {
                cm.sendSimple("...#b\r\n#L0#你还想知道什么？#l\r\n#L1#收集好了#t4001018##l\r\n#L2#我想放弃任务#l");
           } else {
               cm.sendNext("你们已经完成了这里的任务，接收奖励后通过那边出现的门点，你们能去阿杜比斯所在的地点。那么你们快点进去那门口里吧。");
            }
        } else if (status == 1) {
            if (!eim.isEventCleared()) {
                selectedType = selection;
                if (selection == 0) {
                    cm.sendNext("你们是为了调查洞穴来的吧？为了与扎昆的大怪物见面必要一个东西。为了得到那个东西你们先要收集材料。在这里你们能获取那材料之一。那就是#t4001018#。");
                    cm.dispose();

                } else if (selection == 1) {
                    if (!cm.isEventLeader()) {
                        cm.sendNext("请让你们的组长把#b#t4001018##k交给我，让我完成这场考验。");
                        cm.dispose();
                        return;
                    }

                    if (!cm.haveItem(4001018)) { //fire ore
                        cm.sendNext("请把#b#t4001018##k交给我，让我完成这场考验。");
                        cm.dispose();
                    } else {
                        gotAllDocs = cm.haveItem(4001015, 30);
                        if (!gotAllDocs) { //documents
                            cm.sendYesNo("祝贺你们成功完成第一阶段任务。我将用你给我的#b#t4001018##k做#b#t4031061##k，给所有队员。");
                        } else {
                            cm.sendYesNo("你们终于收集好了1个#b#t4001018##k和30个#b废矿卷轴#k，这些是组队全员收集的，我会给予你们奖励。");
                        }
                    }
                } else if (selection == 2) {
                    cm.sendYesNo("你确定要出去吗？如果你是队长你的队伍也会被一起传送出去的！");
                }
            } else {
                if (eim.getProperty("gotDocuments") == 1) {
                    if (eim.gridCheck(cm.getPlayer()) == -1) {
                        if (cm.canHoldAll([2030007, 4031061], [5, 1])) {
                            cm.gainItem(2030007, 5);
                            cm.gainItem(4031061, 1);

                            eim.gridInsert(cm.getPlayer(), 1);
                        } else {
                            cm.sendOk("在继续之前，确保库存中有足够的空间。");
                        }
                    } else {
                        //cm.sendOk("You have already received your share. You can now exit the mines through the portal over there.");
                    }
                } else {
                    if (eim.gridCheck(cm.getPlayer()) == -1) {
                        if (cm.canHold(4031061, 1)) {
                            cm.gainItem(4031061, 1);

                            eim.gridInsert(cm.getPlayer(), 1);
                        } else {
                            cm.sendOk("在继续之前，确保库存中有足够的空间。");
                        }
                    } else {
                        //cm.sendOk("You have already received your share. You can now exit the mines through the portal over there.");
                    }
                }

                cm.dispose();
            }

        } else if (status == 2) {
            if (selectedType == 1) {
                cm.gainItem(4001018, -1);

                if (gotAllDocs) {
                    cm.gainItem(4001015, -30);

                    eim.setProperty("gotDocuments", 1);
                    eim.giveEventPlayersExp(20000);
                } else {
                    eim.giveEventPlayersExp(12000);
                }

                eim.clearPQ();
                cm.dispose();
            } else if (selectedType == 2) {
                cm.warp(211042300);
                cm.dispose();
            }
        }
    }
}