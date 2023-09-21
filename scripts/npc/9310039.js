/**
	武林妖僧PQ
*/

var status = 0;
var state;
var em = null;
var channel = 3; //频道限制
var 次数 = 3;

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
            if (state == 0) {
                cm.sendYesNo("你想放弃挑战吗？");
            } else {
                em = cm.getEventManager("z_Damo");
                if (em == null) {
                    cm.sendOk("副本遇到了一个错误。");
                    cm.dispose();
                }
                // else if (cm.getPlayer().getClent().getChannel() != channel) {
                //    cm.sendOk("抱歉，武林妖僧只能在" + channel + "线挑战。");
                //    cm.dispose();
                //    return;
                // }
                if (cm.getBossLog("妖僧") >= 次数) {
                    cm.sendOk("抱歉，你已经达到了挑战次数，请稍后再试。");
                    cm.dispose();
                    return;
                } else if (cm.isQuestCompleted(8534)) {
                    cm.sendNext("你是为了挑战武林妖僧来的吧？我送你到武林妖僧那里。");
                } else {
                    cm.sendOk("你没有完成任务。");
                    cm.dispose();
                    return;
                }
            }
        } else if (status == 1) {
            if (state == 0) {
                cm.warp(702060000);
                cm.dispose();
            } else {
                if (cm.getParty() == null) {
                    cm.sendOk("你只有加入队伍才能参加挑战。");
                    cm.dispose();
                } else if (!cm.isLeader()) {
                    cm.sendOk("请让你的队长来跟我对话。");
                    cm.dispose();
                } else {
                    var party = cm.getParty().getMembers();
                    var mapId = cm.getPlayer().getMapId();
                    var Channel = cm.getPlayer().getClient().getChannel();
                    var it = party.iterator();
                    for (var i = 0; i < party.size(); i++) {
                        if (party.get(i) == null) //如果有队友掉线则跳过该队友检测
                        {
                            continue; //跳过该判断进入下一个循环判断中
                        }
                        // if (party.get(i).getMapId() != mapId) { //地图判断
                        // 	//cm.sendOk("很抱歉，你的组队成员[" + party.get(i).getName() + "]与你不在同一个地图上。");
                        // 	cm.sendOk("没有与组队长同一地图的组队成员。");
                        // 	cm.dispose();
                        // 	return;
                        // }
                        // if (party.get(i).getChannel() != Channel) { //频道判断
                        // 	cm.sendOk("没有与组队长同一地图的组队成员。");
                        // 	cm.dispose();
                        // 	return;
                        // }
                        var charlll = cm.getPlayer().getClient().getChannelServer().getPlayerStorage().getCharacterById(party.get(i).getId());
                        if (charlll == null) {
                            continue; //跳过该判断进入下一个循环判断中
                        }
                        if (!charlll.isQuestCompleted(8534)) {
                            cm.sendOk("很抱歉，你的组队成员中" + charlll.getName() + "没有完成任务。");
                            // cm.sendOk("很抱歉，你的组队成员中，有人没有完成任务。");
                            cm.dispose();
                            return;
                        }
                        if (charlll.getBossLog("妖僧") >= 次数) {
                            cm.sendOk("很抱歉，你的组队成员中，有人已经达到了挑战次数。");
                            cm.dispose();
                            return;
                        }
                    }
                    var eli = em.getEligibleParty(cm.getParty());
                    if (eli.size() > 0) {
                        if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                            cm.sendOk("已经有人在此频道进行挑战，请稍后再试。");
                        } else {
                            var party = cm.getParty().getMembers();
                            var mapId = cm.getPlayer().getMapId();
                            var Channel = cm.getPlayer().getClient().getChannel();
                            var it = party.iterator();
                            for (var i = 0; i < party.size(); i++) {
                                if (party.get(i) == null) //如果有队友掉线则跳过该队友检测
                                {
                                    continue; //跳过该判断进入下一个循环判断中
                                }
                                var charlll = cm.getPlayer().getClient().getChannelServer().getPlayerStorage().getCharacterById(party.get(i).getId());
                                if (charlll == null) {
                                    continue; //跳过该判断进入下一个循环判断中
                                }
                                charlll.setBossLog("妖僧"); //在线的队员增加一次挑战记录
                            }
                        }
                    }
                    cm.dispose();
                }
            }
        }
    }
}