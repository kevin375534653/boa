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
/*
@	Author : Twdtwd
@       Author : Ronan
@
@	NPC = Violet Balloon
@	Map = Hidden-Street <Crack on the Wall>
@	NPC MapId = 922010900
@	Function = LPQ - Last Stage
@
@	Description: Used after the boss is killed to trigger the bonus stage.
*/

var status = 0;
var curMap, stage;

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

function start() {
    curMap = cm.getMapId();
    stage = Math.floor((curMap - 922010100) / 100) + 1;

    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else if (mode == 0) {
        cm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        var eim = cm.getPlayer().getEventInstance();

        if (eim.getProperty(stage.toString() + "stageclear") != null) {
            cm.sendNext("快点，进入下一阶段，入口已经打开了！");
        } else {
            if (eim.isEventLeader(cm.getPlayer())) {
                var state = eim.getIntProperty("statusStg" + stage);

                if (state == -1) {           // preamble
                    cm.sendOk("我来说明一下第六关。终于到这里了……现在到了打倒引起这一切骚乱的罪魁祸首了。请你们打倒这里的#b#o9300012##k。它好像因为你们而非常生气，请一定要小心。\r\n只要全体队员合力把它打倒，次元之门就不会再被打开了。请加油吧！");
                    eim.setProperty("statusStg" + stage, 0);
                } else {                      // check stage completion
                    if (cm.haveItem(4001023, 1)) {
                        cm.gainItem(4001023, -1);
                        eim.setProperty("statusStg" + stage, 1);

                        var list = eim.getClearStageBonus(stage);     // will give bonus exp & mesos to everyone in the event
                        eim.giveEventPlayersExp(list.get(0));
                        eim.giveEventPlayersMeso(list.get(1));

                        eim.setProperty(stage + "stageclear", "true");
                        eim.showClearEffect(true);

                        eim.clearPQ();
                    } else {
                        cm.sendNext("请击败阿丽莎乐，然后把#b#t4001023##k带给我。");
                    }
                }
            } else {
                cm.sendNext("请让你的#b队长#k与我交谈。");
            }
        }

        cm.dispose();
    }
}
