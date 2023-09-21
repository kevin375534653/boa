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
 * @Author Ronan
 * Player NPC Ranking System */

importPackage(Packages.constants.game);

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
                if (mode == 1)
                        status++;
                else
                        status--;
    
                if(status == 0) {
                        var pnpc = cm.getPlayerNPCByScriptid(cm.getNpc());
                        
                        if(pnpc != null) {
                            var branchJobName = GameConstants.getJobName(pnpc.getJob());
                            
                            var rankStr = "您好，我是#b" + pnpc.getName() + "#k, #r" + GameConstants.ordinal(pnpc.getWorldJobRank()) + "#r 中的#k" + BranchJobName + "#k 类达到最高等级并获得雕像" + GameConstants.WORLD_NAMES[cm.getPlayer( ).getWorld()] + ".\r\n";
                            rankStr += "\r\n    世界排名: #e#b" + GameConstants.ordinal(pnpc.getWorldRank()) + "#k#n";
                            rankStr += "\r\n    全部的 " + branchJobName + " 等级: #e#b" + GameConstants.ordinal(pnpc.getOverallJobRank()) + "#k#n";
                            rankStr += "\r\n    总排名: #e#b" + GameConstants.ordinal(pnpc.getOverallRank()) + "#k#n";
                            
                            cm.sendOk(rankStr);
                        } else {
                            cm.sendOk("嗨，你这是在干嘛？");
                        }
                        
                        cm.dispose();
                }
        }
}
