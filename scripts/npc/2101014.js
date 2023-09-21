/*2101014.js - Lobby and Entrance
 * @author Jvlaple
 * For Jvlaple's AriantPQ
 */

var status = 0;
var toBan = -1;
var choice;
var arenaType;
var arena;
var arenaName;
var type;
var map;
const ExpeditionType = Java.type('server.expeditions.ExpeditionType');
var exped = ExpeditionType.ARIANT;
var exped1 = ExpeditionType.ARIANT1;
var exped2 = ExpeditionType.ARIANT2;

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
        if (cm.getPlayer().getMapId() == 980010000) {
            if (cm.getLevel() > 30) {
                cm.sendOk("级别在20~30的斗士才能参加竞技赛。");
                cm.dispose();
                return;
            }

//cm.askYesNo('#e<阿里安特竞技场:注意事项>#n\r\n#d\r\n\r\n#b1）进入竞技场后，将有五分钟的时间消灭怪物。\r\n2）在规定时间内，消灭的怪物越多，结束时获得奖励越多。\r\n#e3）如果触碰陷阱，将会有可怕的怪物出现。#n\r\n4）组队中，消灭怪物最多的将会有额外的奖励。\r\n5）从竞技场获取的积分，可以从拍卖处兑换奖励。\r\n\r\n\r\n确定进入等候室吗？');
            if (status == 0) {
                var expedicao = cm.getExpedition(exped);
                var expedicao1 = cm.getExpedition(exped1);
                var expedicao2 = cm.getExpedition(exped2);

                var channelMaps = cm.getClient().getChannelServer().getMapFactory();
                var startSnd = "请选择你想要进入的竞技场。\r\n#b";
                var toSnd = startSnd;

                if (expedicao == null) {
                    toSnd += "#L0#第一个竞技场 （空房）#l\r\n";
                } else if (channelMaps.getMap(980010101).getCharacters().isEmpty()) {
                    toSnd += "#L0#加入战斗竞技场 (1)  Owner (" + expedicao.getLeader().getName() + ")" + " 目前的成员: " + cm.getExpeditionMemberNames(exped) + "\r\n";
                }
                if (expedicao1 == null) {
                    toSnd += "#L1#第二个竞技场 （空房）#l\r\n";
                } else if (channelMaps.getMap(980010201).getCharacters().isEmpty()) {
                    toSnd += "#L1#加入战斗竞技场 (2)  Owner (" + expedicao1.getLeader().getName() + ")" + " 目前的成员: " + cm.getExpeditionMemberNames(exped1) + "\r\n";
                }
                if (expedicao2 == null) {
                    toSnd += "#L2#第三个竞技场 （空房）#l\r\n";
                } else if (channelMaps.getMap(980010301).getCharacters().isEmpty()) {
                    toSnd += "#L2#加入战斗竞技场 (3)  Owner (" + expedicao2.getLeader().getName() + ")" + " 目前的成员: " + cm.getExpeditionMemberNames(exped2) + "\r\n";
                }
                if (toSnd === startSnd) {
                    cm.sendOk("所有的竞技场现在都有人了，请更换频道或稍后再试。");
                    cm.dispose();
                } else {
                    cm.sendSimple(toSnd);
                }
            } else if (status == 1) {
                arenaType = selection;
                expedicao = fetchArenaType();
                if (expedicao == "") {
                    cm.dispose();
                    return;
                }

                if (expedicao != null) {
                    enterArena(-1);
                } else {
                    cm.sendGetText("请设置开启竞技场人数 (2~5 人)");
                }
            } else if (status == 2) {
                var players = parseInt(cm.getText());   // AriantPQ option limit found thanks to NarutoFury (iMrSiN)
                if (isNaN(players)) {
                    cm.sendNext("请输入实例中允许玩家的数字限制值。");
                    status = 0;
                } else if (players < 2) {
                    cm.sendNext("设置限值不应小于2个玩家。");
                    status = 0;
                } else {
                    enterArena(players);
                }
            }
        }
    }
}

function fetchArenaType() {
    switch (arenaType) {
        case 0 :
            exped = ExpeditionType.ARIANT;
            expedicao = cm.getExpedition(exped);
            map = 980010100;
            break;
        case 1 :
            exped = ExpeditionType.ARIANT1;
            expedicao = cm.getExpedition(exped);
            map = 980010200;
            break;
        case 2 :
            exped = ExpeditionType.ARIANT2;
            expedicao = cm.getExpedition(exped);
            map = 980010300;
            break;
        default :
            exped = null;
            map = 0;
            expedicao = "";
    }

    return expedicao;
}

function enterArena(arenaPlayers) {
    expedicao = fetchArenaType();
    if (expedicao == "") {
        cm.dispose();

    } else if (expedicao == null) {
        if (arenaPlayers != -1) {
            var res = cm.createExpedition(exped, true, 0, arenaPlayers);
            if (res == 0) {
                cm.warp(map, 0);
                cm.getPlayer().dropMessage("你的竞技场已成功创建。等待人们加入战斗。");
            } else if(res > 0) {
                cm.sendOk("抱歉，您已达到本次挑战次数！改天再试。。。");
            } else {
                cm.sendOk("开始挑战时发生意外错误，请稍后再试。");
            }
        } else {
            cm.sendOk("游戏发生意外错误，请稍后再试。");
        }

        cm.dispose();
    } else {
        if (playerAlreadyInLobby(cm.getPlayer())) {
            cm.sendOk("对不起，你已经在大厅了。");
            cm.dispose();
            return;
        }

        var playerAdd = expedicao.addMemberInt(cm.getPlayer());
        if (playerAdd == 3) {
            cm.sendOk("对不起，现在人员已经满了。");
            cm.dispose();
        } else {
            if (playerAdd == 0) {
                cm.warp(map, 0);
                cm.dispose();
            } else if (playerAdd == 2) {
                cm.sendOk("对不起，房主不允许您进入。");
                cm.dispose();
            } else {
                cm.sendOk("未知错误。");
                cm.dispose();
            }
        }
    }
}

function playerAlreadyInLobby(player) {
    return cm.getExpedition(ExpeditionType.ARIANT) != null && cm.getExpedition(ExpeditionType.ARIANT).contains(player) ||
        cm.getExpedition(ExpeditionType.ARIANT1) != null && cm.getExpedition(ExpeditionType.ARIANT1).contains(player) ||
        cm.getExpedition(ExpeditionType.ARIANT2) != null && cm.getExpedition(ExpeditionType.ARIANT2).contains(player);
}