/*2101017.js
 *Cesar
 *@author Jvlaple
 */

var status = 0;
var toBan = -1;
var choice;
var arena;
var arenaName;
var type;
var map;
const ExpeditionType = Java.type('server.expeditions.ExpeditionType');
var exped;
var expedicao;
var expedMembers;

function start() {
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

        const GameConstants = Java.type('constants.game.GameConstants');
        if (cm.getPlayer().getMapId() == 980010100 || cm.getPlayer().getMapId() == 980010200 || cm.getPlayer().getMapId() == 980010300) {
            if (cm.getPlayer().getMapId() == 980010100) {
                exped = ExpeditionType.ARIANT;
                expedicao = cm.getExpedition(exped);

            } else if (cm.getPlayer().getMapId() == 980010200) {
                exped = ExpeditionType.ARIANT1;
                expedicao = cm.getExpedition(exped);
            } else {
                exped = ExpeditionType.ARIANT2;
                expedicao = cm.getExpedition(exped);
            }

            if (expedicao == null) {
                cm.dispose();
                return;
            }

            expedMembers = expedicao.getMemberList();
            if (status == 0) {
                if (cm.isLeaderExpedition(exped)) {
                    cm.sendSimple("你想做什么？#b\r\n#L1#查看当前成员#l\r\n#L2#踢出玩家#l\r\n#L3#进入战场#l\r\n#L4#离开房间#l");
                    status = 1;
                } else {
                    var toSend = "这个竞技场的当前成员：\r\n#b";
                    toSend += cm.getExpeditionMemberNames(exped);
                    cm.sendOk(toSend);
                    cm.dispose();
                }
            } else if (status == 1) {
                if (selection == 1) {
                    var toSend = "这个竞技场的当前成员：\r\n#b";
                    toSend += cm.getExpeditionMemberNames(exped);
                    cm.sendOk(toSend);
                    cm.dispose();
                } else if (selection == 2) {
                    var size = expedMembers.size();
                    if (size == 1) {
                        cm.sendOk("你是队伍中唯一的队员。");
                        cm.dispose();
                        return;
                    }
                    var text = "下列成员参与你的探险任务 (点击他们可以踢出)：\r\n";
                    text += "\r\n\t\t1." + expedicao.getLeader().getName();
                    for (var i = 1; i < size; i++) {
                        text += "\r\n#b#L" + (i + 1) + "#" + (i + 1) + ". " + expedMembers.get(i).getValue() + "#l\n";
                    }
                    cm.sendSimple(text);
                    status = 6;
                } else if (selection == 3) {
                    if (expedicao.getMembers().size() < 1) {
                        cm.sendOk("需要多一个玩家来开始战斗。");
                        cm.dispose();
                    } else {
                        if (cm.getParty() != null) {
                            cm.sendOk("你不能作为一个小队参加战斗。");
                            cm.dispose();
                            return;
                        }

                        var errorMsg = cm.startAriantBattle(exped, cm.getPlayer().getMapId());
                        if (errorMsg != "") {
                            cm.sendOk(errorMsg);
                        }

                        cm.dispose();
                    }
                } else if (selection == 4) {
                    cm.mapMessage(5, "竞技场的房主离开了。");
                    expedicao.warpExpeditionTeam(980010000);
                    cm.endExpedition(expedicao);
                    cm.dispose();
                }
            } else if (status == 6) {
                if (selection > 0) {
                    var banned = expedMembers.get(selection - 1);
                    expedicao.ban(banned);
                    cm.sendOk("你已经禁止" + banned.getValue() + "进入竞技场。");
                    cm.dispose();
                } else {
                    cm.sendSimple(list);
                    status = 2;
                }
            }
        } else if (GameConstants.isAriantColiseumArena(cm.getPlayer().getMapId())) {
            if (cm.getPlayer().getMapId() == 980010101) {
                exped = ExpeditionType.ARIANT;
                expedicao = cm.getExpedition(exped);
            } else if (cm.getPlayer().getMapId() == 980010201) {
                exped = ExpeditionType.ARIANT1;
                expedicao = cm.getExpedition(exped);
            } else {
                exped = ExpeditionType.ARIANT2;
                expedicao = cm.getExpedition(exped);
            }
            if (status == 0) {
                var gotTheBombs = expedicao.getProperty("gotBomb" + cm.getChar().getId());
                if (gotTheBombs != null) {
                    cm.sendOk("我已经给你炸弹了，现在就去捕获沙漠毒蝎吧！");
                    cm.dispose();
                } else if (cm.canHoldAll([2270002, 2100067], [50, 5])) {
                    cm.sendOk("我已经给了你50个减速石和5个炸弹。\r\n请用减速石来捕获沙漠毒蝎获取#r#e灵魂的宝石#k#n！");
                    expedicao.setProperty("gotBomb" + cm.getChar().getId(), "1");
                    cm.gainItem(2270002, 50);
                    cm.gainItem(2100067, 5);
                    cm.dispose();
                } else {
                    cm.sendOk("看来你的背包已经满了。");
                    cm.dispose();
                }
            }
        } else {
            cm.sendOk("阿里安特竞技场开始了，你想做什么呢？");
            cm.dispose();
        }
    }
}
