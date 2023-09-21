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

/**
 * @author: Ronan
 * @npc: Guon
 * @map: 251010404 - Over the Pirate Ship
 * @func: Pirate PQ
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

        if (status == 0) {
            em = cm.getEventManager("PiratePQ");
            if (em == null) {
                cm.sendOk("海盗PQ遇到了一个错误。");
                cm.dispose();
                return;
            } else if (cm.isUsingOldPqNpcStyle()) {
                action(1, 0, 0);
                return;
            }

            cm.sendSimple("#e#b<组队任务：海盗船组队任务>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n  你想要干什么呢？#b\r\n#L0#我想执行组队任务\r\n#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "开启" : "关闭") + "寻找组队。\r\n#L2#我想听听说明。");
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getParty() == null) {
                    cm.sendOk("组队任务只有组成组队后才能参加。请和其他人组成组队之后再来挑战。");
                    cm.dispose();
                } else if (!cm.isLeader()) {
                    cm.sendOk("请让你的队长来跟我谈话。");
                    cm.dispose();
                } else {
                    var eli = em.getEligibleParty(cm.getParty());
                    if (eli.size() > 0) {
                        if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                            cm.sendOk("已经有队伍在进行了.请换一个频道,或者等待他们完成.");
                        }
                    } else {
                        cm.sendOk("你还不能开始组队任务，因为你的队员不在地图当中，或者他们没有资格参加.");
                    }

                    cm.dispose();
                }
            } else if (selection == 1) {
                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                cm.sendOk("你的组队搜索状态为：#b" + (psState ? "开启" : "关闭") + "#k. 想换回来的时候跟我说.");
                cm.dispose();
            } else {
                cm.sendOk("#e#b<组队任务：海盗船组队任务>#k#n\r\n\r\n老海盗发动了袭击，请帮帮我们好吗？");
                cm.dispose();
            }
        }
    }
}