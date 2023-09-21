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

/*
    NPC ID: 1052013 
    NPC NAME: Computer
    @author Ronan
*/

var status;
var pqArea;

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

        if (cm.getMapId() != 193000000) {
            var eim = cm.getEventInstance();

            if (status == 0) {
                if (!eim.isEventCleared()) {
                    var couponsNeeded = eim.getIntProperty("couponsNeeded");

                    if (cm.isEventLeader()) {
                        if (cm.haveItem(4001007, couponsNeeded)) {
                            cm.sendNext("你的队伍收集了所有需要的优惠券，干得好！");
                            cm.gainItem(4001007, couponsNeeded);
                            eim.clearPQ();

                            cm.dispose();

                        } else {
                            cm.sendYesNo("你的队伍必须收集 #r" + couponsNeeded + "#k 优惠券来完成任务。 当你手里有足够的材料时，跟我说话......或者你想现在#b退出#k？请注意，如果您现在退出，#r您的队伍也将被迫退出#k。");
                        }
                    } else {
                        cm.sendYesNo("你的队伍必须收集 #r" + couponsNeeded + "#k 优惠券来完成任务。 让你的队长拿着足够的材料来跟我说话......或者你想#b退出#k？请注意，如果您现在退出，您的队伍#r可能会人手不足#k以进一步继续该任务。");
                    }
                } else {
                    if (!eim.giveEventReward(cm.getPlayer())) {
                        cm.sendOk("请在您的其他背包上腾出一个空间来领取奖励。");
                        cm.dispose();
                    } else {
                        cm.warp(193000000);
                        cm.dispose();
                    }
                }
            } else if (status == 1) {
                cm.warp(193000000);
                cm.dispose();
            }
        } else {
            var levels = ["#m190000000#", "#m191000000#", "#m192000000#", "#m195000000#", "#m196000000#", "#m197000000#"];
            if (status == 0) {
                var sendStr = "高级之路是一个多区域的地方，各种类型的怪物聚集在一起，一个获得大量经验和兑换#p1052014#的理想场所。选择您要前往的区域:\r\n\r\n#b";
                for (var i = 0; i < 6; i++) {
                    sendStr += "#L" + i + "#" + levels[i] + "#l\r\n";
                }

                cm.sendSimple(sendStr);
            } else if (status == 1) {
                pqArea = selection + 1;

                em = cm.getEventManager("CafePQ_" + pqArea);
                if (em == null) {
                    cm.sendOk("The CafePQ_" + pqArea + "has encountered an error.");
                    cm.dispose();
                    return;
                } else if (cm.isUsingOldPqNpcStyle()) {
                    status = 1;
                    action(1, 0, 0);
                    return;
                }

                cm.sendSimple("#e#b<组队任务: 高级之路 - " + levels[selection] + ">\r\n#k#n" + em.getProperty("party") + "\r\n\r\n#p1052014# 的操作方式与普通的不同. 他们不使用金币或扭蛋券，而是使用 #r ERASERS #k, 可以通过完成#b高级之路#k上的任务来获得. 要前往那里，你必须找到伙伴并参加组队任务. 组队并准备好后，请让您的#b队长#k 与我交谈.#b\r\n#L0#我想参加组队任务.\r\n#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "禁用" : "启用") + " 组队搜索.\r\n#L2#我想听听更多细节.");
            } else if (status == 2) {
                if (selection == 0) {
                    if (cm.getParty() == null) {
                        cm.sendOk("你只有在队伍中时才可以参加组队任务");
                        cm.dispose();
                    } else if (!cm.isLeader()) {
                        cm.sendOk("你的队长必须与我交谈才能开始这个组队任务");
                        cm.dispose();
                    } else {
                        var eli = em.getEligibleParty(cm.getParty());
                        if (eli.size() > 0) {
                            if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                cm.sendOk("#r其他队伍#k已进入此频道，请尝试更换其他频道，或等待当前参与方完成。");
                            }
                        } else {
                            cm.sendOk("您还无法开始此队伍任务，因为您的队伍不在范围内，您的某些队伍成员没有资格尝试它，或者他们不在这张地图中。 如果您在寻找队伍成员时遇到困难，请尝试“队伍搜索”。");
                        }

                        cm.dispose();
                    }
                } else if (selection == 1) {
                    var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                    cm.sendOk("您的组队搜索状态现在为: #b" + (psState ? "启用" : "禁用") + "#k。 每当你想改回来的时候都可以跟我说。");
                    cm.dispose();
                } else {
                    cm.sendOk("#e#b<组队任务: 高级之路>#k#n\r\n在前面的地图中，你将面对许多普通级别的怪物。 从他们那里掉落的所有需要的优惠券并将其给我。 然后，所有成员都会收到一块与所面临的级别相对应的橡皮擦。 在机器#b上插入许多相同的橡皮擦或多个不同的橡皮擦#k，以获得更好的奖品的机会更大。");
                    cm.dispose();
                }
            }
        }
    }
}
