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
 * @author: Ronan
 * @npc: Romeo & Juliet
 * @func: MagatiaPQ exit
*/

/**副本活跃数据配置*/
var partyTaskList = Array(
    //等级,副本名称,次数,活跃点数,记录名字
    Array(21,"废弃都市",2,50,"p_fqds_hy_"),
    Array(30,"嘉年华",2,50,"p_jnh_hy_"),
    Array(35,"玩具副本",1,50,"p_wjc_hy_"),
    Array(45,"毒物森林",2,50,"p_dwsl_hy_"),
    Array(55,"海盗副本",5,50,"p_bcthd_hy_"),
    Array(71,"男女副本",2,50,"p_nvfb_hy_"),
    Array(85,"女神塔",2,50,"p_vst_hy_")
    // Array(85,"金字塔",2,50,"p_vst_hy_"),
    // Array(85,"竞技场",2,50,"p_vst_hy_"),
    // Array(85,"列车平台",2,50,"p_vst_hy_"),
    // Array(85,"武陵道场",2,50,"p_vst_hy_"),
    // Array(85,"强化特训",2,50,"p_vst_hy_"),
    // Array(85,"公会对抗",2,50,"p_vst_hy_"),

);

var status;
 
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
                if (mode == 1)
                        status++;
                else
                        status--;
    
                var eim = cm.getEventInstance();
                
                if(status == 0) {
                        if(eim.getIntProperty("escortFail") == 1) {
                                cm.sendNext("多亏了你，我们才得以重逢。尤利特现在将因企图触犯玛加提亚法律而被关进监狱。再次感谢你.");
                        } else {
                                cm.sendNext("多亏了你，我们才得以重逢。尤利特现在将通过重建，因为他的研究对我们镇的发展是无价的，他的所有行为都是因为他被对权力的贪婪蒙蔽了双眼，尽管这是为了玛加提亚。再次感谢你.");
                        }
                } else {
                        if(eim.giveEventReward(cm.getPlayer())) {
                                /**通用活跃点数加成奖励*/
                                var p = cm.getPlayer();
                                if(p.getActiveByName(partyTaskList[5][4]) < partyTaskList[5][3]){
                                        var hyd = partyTaskList[5][3]/partyTaskList[5][2];
                                        p.insertActive(partyTaskList[5][4],hyd,1);
                                        p.dropMessage(5,"获得"+partyTaskList[5][1]+"活跃点:"+hyd);
                                        p.gainExp(620000);
                                }
                                cm.warp((eim.getIntProperty("isAlcadno") == 0) ? 261000011 : 261000021);
                        } else {
                                cm.sendOk("在收到奖励之前，请在您的背包上留出充足的位置.");
                        }
                        
                        cm.dispose();
                }
        }
}