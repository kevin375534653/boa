/**
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Drago (MapleStorySA)
        2.0 - Second Version by Jayd - translated CPQ contents to English
---------------------------------------------------------------------------------------------------
**/
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
var status = 0;
var rnk = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.sendOk("那好吧，我们下次再聊。");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        
        if (cm.getPlayer().getMapId() == 980030010) {
            if (status == 0) {
                cm.sendNext("我希望你在怪物嘉年华上玩得开心！");
            } else if (status > 0) {
                cm.warp(980030000, 0);
                cm.dispose();
            }
        } else if (cm.getChar().getMap().isCPQLoserMap()) {
            if (status == 0) {
                if (cm.getChar().getParty() != null) {
                    var shiu = "";
                    if (cm.getPlayer().getFestivalPoints() >= 300) {
                        shiu += "#rA#k";
                        cm.sendOk("不幸的是，尽管你表现出色，你要么战平要么输掉了这场战斗。继续加油吧！\r\n\r\n#b你的结果：" + shiu);
                        rnk = 10;
                    } else if (cm.getPlayer().getFestivalPoints() >= 100) {
                        shiu += "#rB#k";
                        rnk = 20;
                        cm.sendOk("不幸的是，你要么战平，要么输掉了这场战斗，即使是你的终极表现。只要一点点，胜利就可能属于你！\r\n\r\n#b你的结果：" + shiu);
                    } else if (cm.getPlayer().getFestivalPoints() >= 50) {
                        shiu += "#rC#k";
                        rnk = 30;
                        cm.sendOk("不幸的是，你要么战平要么输了。胜利是为了那些奋斗的人。我看到你的努力，所以胜利离你不远。坚持下去！\r\n\r\n#b你的结果: " + shiu);
                    } else {
                        shiu += "#rD#k";
                        rnk = 40;
                        cm.sendOk("不幸的是，你要么扳平了比分，要么输掉了比赛，你的表现清楚地反映了这一点。我希望下次你能给我更多。\r\n\r\n#b你的结果: " + shiu);
                    }
                } else {
                    cm.warp(980030000, 0);
                    cm.dispose();
                }
            } else if (status == 1) {
                /**通用活跃点数加成奖励*/
                var p = cm.getPlayer();
                if(p.getActiveByName(partyTaskList[1][4]) < partyTaskList[1][3]){
                    var hyd = partyTaskList[1][3]/partyTaskList[1][2];
                    p.insertActive(partyTaskList[1][4],hyd,1);
                    p.dropMessage(5,"获得"+partyTaskList[1][1]+"活跃点:"+hyd);
                }
                switch (rnk) {
                    case 10:
                        cm.warp(980030000, 0);
                        cm.gainExp(150000);
                        cm.dispose();
                        break;
                    case 20:
                        cm.warp(980030000, 0);
                        cm.gainExp(100000);
                        cm.dispose();
                        break;
                    case 30:
                        cm.warp(980030000, 0);
                        cm.gainExp(70000);
                        cm.dispose();
                        break;
                    case 40:
                        cm.warp(980030000, 0);
                        cm.gainExp(20000);
                        cm.dispose();
                        break;
                    default:
                        cm.warp(980030000, 0);
                        cm.dispose();
                        break;
                }
            }
        } else if (cm.getChar().getMap().isCPQWinnerMap()) {
            if (status == 0) {
                if (cm.getChar().getParty() != null) {
                    var shi = "";
                    if (cm.getPlayer().getFestivalPoints() >= 300) {
                        shi += "#rA#k";
                        rnk = 1;
                        cm.sendOk("恭喜你获得了胜利！！！多精彩的表演啊！另一组什么也做不了！希望下次也能有同样的好成绩！\r\n\r\n#b你的结果: " + shi);
                    } else if (cm.getPlayer().getFestivalPoints() >= 100) {
                        shi += "#rB#k";
                        rnk = 2;
                        cm.sendOk("祝贺你获得了胜利！太棒了！你在对抗对手的比赛中表现得很好！再长一点，你下次一定会得到的！\r\n\r\n#b你的结果: " + shi);
                    } else if (cm.getPlayer().getFestivalPoints() >= 50) {
                        shi += "#rC#k";
                        rnk = 3;
                        cm.sendOk("祝贺你获得了胜利。你做了一些事情，但这或许还不够好。我希望下次你能给我更多。\r\n\r\n#b你的结果: " + shi);
                    } else {
                        shi += "#rD#k";
                        rnk = 4;
                        cm.sendOk("祝贺你的胜利，尽管你的表现并不完全反映这一点。更积极地参与怪物嘉年华! \r\n\r\n#b你的结果: " + shi);
                    }
                } else {
                    cm.warp(980030000, 0);
                    cm.dispose();
                }
            } else if (status == 1) {
                /**通用活跃点数加成奖励*/
                var p = cm.getPlayer();
                if(p.getActiveByName(partyTaskList[1][4]) < partyTaskList[1][3]){
                    var hyd = partyTaskList[1][3]/partyTaskList[1][2];
                    p.insertActive(partyTaskList[1][4],hyd,1);
                    p.dropMessage(5,"获得"+partyTaskList[1][1]+"活跃点:"+hyd);
                }
                switch (rnk) {
                    case 1:
                        cm.warp(980030000, 0);
                        cm.gainExp(350000);
                        cm.dispose();
                        break;
                    case 2:
                        cm.warp(980030000, 0);
                        cm.gainExp(300000);
                        cm.dispose();
                        break;
                    case 3:
                        cm.warp(980030000, 0);
                        cm.gainExp(220000);
                        cm.dispose();
                        break;
                    case 4:
                        cm.warp(980030000, 0);
                        cm.gainExp(100000);
                        cm.dispose();
                        break;
                    default:
                        cm.warp(980030000, 0);
                        cm.dispose();
                        break;
                }
            }
        }
    }
}  