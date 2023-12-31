/**
 * @author: Ronan
 * @npc: Chamberlain Eak
 * @map: Orbis - Tower of Goddess
 * @func: Orbis PQ
 */

var status = 0;
var em = null;

function isStatueComplete() {
    for (var i = 1; i <= 6; i++) {
        if (cm.getMap().getReactorByName("scar" + i).getState() < 1) {
            return false;
        }
    }

    return true;
}

function clearStage(stage, eim) {
    eim.setProperty("statusStg" + stage, "1");
    eim.showClearEffect(true);
}

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

        if (cm.getPlayer().getMapId() == 920011200) { //exit
            cm.warp(200080101);
            cm.dispose();
            return;
        }
        if (!cm.isEventLeader()) {
            if (cm.getPlayer().getMapId() == 920010000) {
                cm.warp(920010000, 2);
                cm.dispose();
                return;
            }

            cm.sendOk("请让队长跟我讲话。");
            cm.dispose();
            return;
        }

        var eim = cm.getEventInstance();

        switch (cm.getPlayer().getMapId()) {
            case 920010000:
                if (eim.getIntProperty("statusStg0") != 1) {
                    eim.warpEventTeamToMapSpawnPoint(920010000, 2);
                    eim.giveEventPlayersExp(3500);
                    clearStage(0, eim);

                    cm.sendNext("请帮帮我！我被远古精灵困在封印里了！它把女神雕像的所有部分都放错了，我们必须把它全部找回来！");
                } else {
                    cm.warp(920010000, 2);
                }
                cm.dispose();
                break;
            case 920010100:
                if (isStatueComplete()) {
                    if (eim.getIntProperty("statusStg7") == -1) {
                        eim.warpEventTeam(920010800);
                    } else if (eim.getIntProperty("statusStg8") == -1) {
                        cm.sendOk("哇！你居然带来了#t4001055#！请把它放在雕像的底部，把女神带回来！");
                    } else {
                        cm.sendOk("感谢你为女神做的一切！");
                    }
                } else {
                    cm.sendOk("请帮帮我！我被远古精灵困在封印里无法行动！它把女神雕像的所有部分都放错了，现在必须把它全部找回来！\r\n#e我在这里等你们。");
                }
                break;
            case 920010200: //walkway
                if (!cm.haveItem(4001050, 30)) {
                    cm.sendOk("从这个阶段的怪物那里收集30个雕像碎片，请把它们带给我，这样我就可以把它们拼在一起了！");
                } else {
                    cm.sendOk("都给你了！这里是第一尊雕像。");
                    cm.removeAll(4001050);
                    cm.gainItem(4001044, 1); //first piece
                    eim.giveEventPlayersExp(3500);
                    clearStage(1, eim);
                }
                break;
            case 920010300: //storage
                if (eim.getIntProperty("statusStg2") != 1) {
                    if (cm.getMap().countMonsters() == 0 && cm.getMap().countItems() == 0) {
                        if (cm.canHold(4001045)) {
                            cm.sendOk("哦，我找到了第二尊雕像。给，拿着。");
                            cm.gainItem(4001045, 1);
                            eim.giveEventPlayersExp(3500);
                            clearStage(2, eim);
                            eim.setProperty("statusStg2", "1");
                        } else {
                            cm.sendOk("我找到了第二尊雕像。在你的其他栏中留出一个空位。");
                        }
                    } else {
                        cm.sendOk("找到藏在这个房间里的第二尊雕像。");
                    }
                } else {
                    cm.sendOk("做得好。去找其他的雕像碎片。");
                }

                break;
            case 920010400: //lobby
                if (eim.getIntProperty("statusStg3") == -1) {
                    cm.sendOk("请找到本周当天的唱片并将其丢在音乐播放器上。\r\n#v4001056#雄壮音乐之LP\r\n#v4001057#可爱音乐之LP\r\n#v4001058#恐怖音乐之LP\r\n#v4001059#有趣音乐之LP\r\n#v4001060#忧郁音乐之LP\r\n#v4001061#冷冰冰音乐之LP\r\n#v4001062#晴朗音乐之LP\r\n");
                } else if (eim.getIntProperty("statusStg3") == 0) {
                    cm.getMap().getReactorByName("stone3").forceHitReactor(1);
                    cm.sendOk("哦，音乐。。。听起来很适合周围的环境。干得好，一个盒子出现在地上。从中取出雕像的一部分！");
                    eim.giveEventPlayersExp(3500);
                    clearStage(3, eim);
                    eim.setProperty("statusStg3", "2");

                } else {
                    cm.sendOk("感谢你为女神做的一切！");
                }
                break;
            case 920010500: //sealed
                if (eim.getIntProperty("statusStg4") == -1) {
                    var total = 3;
                    for (var i = 0; i < 2; i++) {
                        var rnd = Math.round(Math.random() * total);
                        total -= rnd;

                        eim.setProperty("stage4_" + i, rnd);
                    }
                    eim.setProperty("stage4_2", "" + total);

                    eim.setProperty("statusStg4", "0");
                }
                if (eim.getIntProperty("statusStg4") == 0) {
                    var players = Array();
                    var total = 0;
                    for (var i = 0; i < 3; i++) {
                        var z = cm.getMap().getNumPlayersInArea(i);
                        players.push(z);
                        total += z;
                    }
                    if (total != 3) {
                        cm.sendOk("平台上需要3个玩家或物品。");
                    } else {
                        var num_correct = 0;
                        for (var i = 0; i < 3; i++) {
                            if (eim.getProperty("stage4_" + i) === ("" + players[i])) {
                                num_correct++;
                            }
                        }
                        if (num_correct == 3) {
                            cm.sendOk("你找到了正确的组合！一个盒子出现在这张地图的顶部，去把雕像从里面拿出来！");
                            cm.getMap().getReactorByName("stone4").forceHitReactor(1);
                            eim.giveEventPlayersExp(3500);
                            clearStage(4, eim);
                        } else {
                            eim.showWrongEffect();
                            if (num_correct > 0) {
                                cm.sendOk("其中一个平台是正确的。");
                            } else {
                                cm.sendOk("所有的平台都错了。");
                            }
                        }
                    }
                } else {
                    cm.sendOk("做得好！拜托你了，去把其他的东西拿来救女神！");
                }
                cm.dispose();
                break;
            case 920010600: //lounge
                if (eim.getIntProperty("statusStg5") == -1) {
                    if (!cm.haveItem(4001052, 40)) {
                        cm.sendOk("从这个阶段的怪物那里收集40个雕像碎片，请把它们带给我，这样我就可以把它们拼在一起了！");
                    } else {
                        cm.sendOk("都给你了！这里是第五尊雕像。");
                        cm.removeAll(4001052);
                        cm.gainItem(4001048, 1); //fifth piece
                        eim.giveEventPlayersExp(3500);
                        clearStage(5, eim);
                        eim.setIntProperty("statusStg5", 1);
                    }
                } else {
                    cm.sendOk("他们都在这里。去搜索塔上的其他房间。");
                }
                break;
            case 920010700: //on the way up
                if (eim.getIntProperty("statusStg6") == -1) {
                    var rnd1 = Math.floor(Math.random() * 5);

                    var rnd2 = Math.floor(Math.random() * 5);
                    while (rnd2 == rnd1) {
                        rnd2 = Math.floor(Math.random() * 5);
                    }

                    if (rnd1 > rnd2) {
                        rnd1 = rnd1 ^ rnd2;
                        rnd2 = rnd1 ^ rnd2;
                        rnd1 = rnd1 ^ rnd2;
                    }

                    var comb = "";
                    for (var i = 0; i < rnd1; i++) {
                        comb += "0";
                    }
                    comb += "1";
                    for (var i = rnd1 + 1; i < rnd2; i++) {
                        comb += "0";
                    }
                    comb += "1";
                    for (var i = rnd2 + 1; i < 5; i++) {
                        comb += "0";
                    }

                    eim.setProperty("stage6_c", "" + comb);

                    eim.setProperty("statusStg6", "0");
                }

                var comb = eim.getProperty("stage6_c");

                if (eim.getIntProperty("statusStg6") == 0) {
                    var react = "";
                    var total = 0;
                    for (var i = 1; i <= 5; i++) {
                        if (cm.getMap().getReactorByName("" + i).getState() > 0) {
                            react += "1";
                            total += 1;
                        } else {
                            react += "0";
                        }
                    }

                    if (total != 2) {
                        cm.sendOk("塔顶处有3个杠杆，请调试其中2个然后与我对话。");
                    } else {
                        var num_correct = 0;
                        var psh_correct = 0;
                        for (var i = 0; i < 5; i++) {
                            if (react.charCodeAt(i) == comb.charCodeAt(i)) {
                                num_correct++;
                                if (react.charAt(i) == '1') {
                                    psh_correct++;
                                }
                            }
                        }
                        if (num_correct == 5) {
                            cm.sendOk("您找到了正确的组合！ 从里面取出雕像碎片！");
                            cm.getMap().getReactorByName("stone6").forceHitReactor(1);
                            eim.giveEventPlayersExp(3500);
                            clearStage(6, eim);
                        } else {
                            eim.showWrongEffect();
                            if (psh_correct >= 1) {
                                cm.sendOk("其中一个操纵杆是正确的。");
                            } else {
                                cm.sendOk("两个杠杆都错了。");
                            }
                        }
                    }
                } else {
                    cm.sendOk("感谢你为女神做的一切！");
                }
                break;
            case 920010800:
                cm.sendNext("这是最后的决战了！\r\n找到邪恶食人花，击败它后远古精灵就会出现。\r\n获得生命之根来拯救女神！！！");
                break;
            case 920010900:
                if (eim.getProperty("statusStg8") == "1") {
                    cm.sendNext("这是塔楼的监狱。你可以在这里找到一些好东西，只要确保尽快清除前面的谜题。");
                } else {
                    cm.sendNext("在那里你找不到任何雕像碎片。爬上梯子回到中心塔，到别处去寻找。一旦你救了女神，你就可以回到这里来领取你的奖品。");
                }
                break;
            case 920011000:
                if (cm.getMap().countMonsters() > 0) {
                    cm.sendNext("这是塔楼的暗室。你可以在这里找到一些好东西。");
                } else {
                    cm.warp(920011100, "st00");
                }
                break;
        }
        cm.dispose();
    }
}

function clear() {
    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
}