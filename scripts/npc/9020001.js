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

/**
 * @author: Stereo, Moogra, Ronan
 * @npc: Cloto
 * @map: 1st Accompaniment - KPQ
 * @func: Kerning PQ
 */

// var stage1Questions = Array(
//     "问题是。收集与作为战士首次转职所需的最低等级水平相同数量的通行证。",
//
//     "问题是。收集与作为战士首次转职所需的最低STR数量相同的通行证。",
//
//     "问题是。收集与魔术师首次转职所需的最低INT数量相同的通行证。",
//
//     "问题是。收集与作为弓箭手首次转职所需的最低DEX数量相同的通行证。",
//
//     "问题是。收集与飞侠第一次转职所需的最低DEX数量相同的通行证。",
//
//     "问题是。收集与第二次转职所需最低等级水平相同数量的通行证。",
//
//     "问题是。收集与魔术师首次转职所需最低等级水平相同数量的通行证。");
// var stage1Answers = Array(10, 35, 20, 25, 25, 30, 8);

var stage1Questions = Array(
    "第一个问题：转职成战士的最低等级是多少?#b\r\n(打倒怪物，获取相应数量的证书.)",
    "第一个问题：转职成战士的最低力量值(SEX)是多少?#b\r\n(打倒怪物，获取相应数量的证书.)",
    "第一个问题：转职成魔法师的最低智力值(INT)是多少?#b\r\n(打倒怪物，获取相应数量的证书.)",
    "第一个问题：转职成弓箭手的最低敏捷值(DEX)是多少？#b\r\n(打倒怪物，获取相应数量的证书。)",
    "第一个问题：转职成飞侠的最低敏捷值(DEX)是多少？#b\r\n(打倒怪物，获取相应数量的证书。)",
    "第一个问题：第二次转职最低需要的等级(LEVEL)是多少? #b\r\n(打倒怪物，获取相应数量的证书。)",
    "第一个问题：转职成魔法师的最低等级(LEVEL)是多少?#b\r\n(打倒怪物，获取相应数量的证书.)");

var stage1Questions = Array(
    "第一个问题：转职成战士的最低等级是多少?#b\r\n(打倒怪物，获取相应数量的证书.)",
    "第一个问题：转职成战士的最低等级是多少?#b\r\n(打倒怪物，获取相应数量的证书.)",
    "第一个问题：转职成战士的最低等级是多少?#b\r\n(打倒怪物，获取相应数量的证书.)",
    "第一个问题：转职成战士的最低等级是多少?#b\r\n(打倒怪物，获取相应数量的证书.)",
    "第一个问题：转职成战士的最低等级是多少?#b\r\n(打倒怪物，获取相应数量的证书.)",
    "第一个问题：转职成战士的最低等级是多少?#b\r\n(打倒怪物，获取相应数量的证书.)",
    "第一个问题：转职成战士的最低等级是多少?#b\r\n(打倒怪物，获取相应数量的证书.)",);

// var stage1Answers = Array(10, 35, 20, 25, 25, 30, 8);
var stage1Answers = Array(10, 10, 10, 10, 10, 10, 10,);

const Rectangle = Java.type('java.awt.Rectangle');
var stage2Rects = Array(new Rectangle(-755, -132, 4, 218), new Rectangle(-721, -340, 4, 166), new Rectangle(-586, -326, 4, 150), new Rectangle(-483, -181, 4, 222));
var stage3Rects = Array(new Rectangle(608, -180, 140, 50), new Rectangle(791, -117, 140, 45),
    new Rectangle(958, -180, 140, 50), new Rectangle(876, -238, 140, 45),
    new Rectangle(702, -238, 140, 45));
var stage4Rects = Array(new Rectangle(910, -236, 35, 5), new Rectangle(877, -184, 35, 5),
    new Rectangle(946, -184, 35, 5), new Rectangle(845, -132, 35, 5),
    new Rectangle(910, -132, 35, 5), new Rectangle(981, -132, 35, 5));

var stage2Combos = Array(Array(0, 1, 1, 1), Array(1, 0, 1, 1), Array(1, 1, 0, 1), Array(1, 1, 1, 0));
var stage3Combos = Array(Array(0, 0, 1, 1, 1), Array(0, 1, 0, 1, 1), Array(0, 1, 1, 0, 1),
    Array(0, 1, 1, 1, 0), Array(1, 0, 0, 1, 1), Array(1, 0, 1, 0, 1),
    Array(1, 0, 1, 1, 0), Array(1, 1, 0, 0, 1), Array(1, 1, 0, 1, 0),
    Array(1, 1, 1, 0, 0));
var stage4Combos = Array(Array(0, 0, 0, 1, 1, 1), Array(0, 0, 1, 0, 1, 1), Array(0, 0, 1, 1, 0, 1),
    Array(0, 0, 1, 1, 1, 0), Array(0, 1, 0, 0, 1, 1), Array(0, 1, 0, 1, 0, 1),
    Array(0, 1, 0, 1, 1, 0), Array(0, 1, 1, 0, 0, 1), Array(0, 1, 1, 0, 1, 0),
    Array(0, 1, 1, 1, 0, 0), Array(1, 0, 0, 0, 1, 1), Array(1, 0, 0, 1, 0, 1),
    Array(1, 0, 0, 1, 1, 0), Array(1, 0, 1, 0, 0, 1), Array(1, 0, 1, 0, 1, 0),
    Array(1, 0, 1, 1, 0, 0), Array(1, 1, 0, 0, 0, 1), Array(1, 1, 0, 0, 1, 0),
    Array(1, 1, 0, 1, 0, 0), Array(1, 1, 1, 0, 0, 0));

function clearStage(stage, eim, curMap) {
    eim.setProperty(stage + "stageclear", "true");
    eim.showClearEffect(true);

    eim.linkToNextStage(stage, "kpq", curMap);  //opens the portal to the next map
}

function rectangleStages(eim, property, areaCombos, areaRects) {
    var c = eim.getProperty(property);
    if (c == null) {
        c = Math.floor(Math.random() * areaCombos.length);
        eim.setProperty(property, c.toString());
    } else {
        c = parseInt(c);
    }

    // get player placement
    var players = eim.getPlayers();
    var playerPlacement = [0, 0, 0, 0, 0, 0];

    for (var i = 0; i < eim.getPlayerCount(); i++) {
        for (var j = 0; j < areaRects.length; j++) {
            if (areaRects[j].contains(players.get(i).getPosition())) {
                playerPlacement[j] += 1;
                break;
            }
        }
    }

    var curCombo = areaCombos[c];
    var accept = true;
    for (var j = 0; j < curCombo.length; j++) {
        if (curCombo[j] != playerPlacement[j]) {
            accept = false;
            break;
        }
    }

    return accept;
}

var status = -1;
var eim;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    eim = cm.getEventInstance();

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
            var curMap = cm.getMapId();
            var stage = curMap - 103000800 + 1;
            if (eim.getProperty(stage.toString() + "stageclear") != null) {
                if (stage < 5) {
                    cm.sendNext("请抓紧时间进入下一阶段,入口打开了！");
                    cm.dispose();
                } else {
                    cm.sendNext("难以置信的为了达到这一点,你扫清了所有的障碍。这是对你出色工作的一个小奖励。然而,在您接受它之前,请确保您的使用等库存有空的空间。");
                    // cm.sendNext("Incredible! You cleared all the stages to get to this point. Here's a small prize for your job well done. Before you accept it, however, please make sure your use and etc. inventories have empty slots available.");
                }
            } else if (curMap == 103000800) {   // stage 1
                if (cm.isEventLeader()) {
                    var numpasses = eim.getPlayerCount() - 1;     // minus leader

                    if (cm.hasItem(4001008, numpasses)) {
                        cm.sendNext("你收集了"+numpasses+"通行证！祝贺你扫清了舞台！我将制作门户网站,将您发送到下一阶段。到那里有时间限制,所以请快点。祝你们好运！");
                        // cm.sendNext("You gathered up " + numpasses + " passes! Congratulations on clearing the stage! I'll make the portal that sends you to the next stage. There's a time limit on getting there, so please hurry. Best of luck to you all!");
                        clearStage(stage, eim, curMap);
                        eim.gridClear();
                        cm.gainItem(4001008, -numpasses);
                    } else {
                        cm.sendNext("对不起,你的通行证数量不够。你需要给我正确的通行证数量;它应该是你所在队伍的成员人数减去队长,在这种情况下是"+numpasses+"的总数来清空平台。告诉你的队员解决问题,收集通行证,交给你。");
                    }
                } else {
                    var data = eim.gridCheck(cm.getPlayer());

                    if (data == 0) {
                        cm.sendNext("谢谢你给我带来通行证。请将通行证交给您的队长继续.");
                    } else if (data == -1) {
                        data = Math.floor(Math.random() * stage1Questions.length) + 1;   //data will be counted from 1
                        eim.gridInsert(cm.getPlayer(), data);

                        var question = stage1Questions[data - 1];
                        cm.sendNext(question);
                    } else {
                        var answer = stage1Answers[data - 1];

                        if (cm.itemQuantity(4001007) == answer) {
                            cm.sendNext("这是正确的答案！为此,你刚刚收到了##z4001007##k。请把它交给组队长。");
                            cm.gainItem(4001007, -answer);
                            cm.gainItem(4001008, 1);
                            eim.gridInsert(cm.getPlayer(), 0);
                        } else {
                            var question = stage1Questions[eim.gridCheck(cm.getPlayer()) - 1];
                            cm.sendNext("对不起,但这不是正确的答案!\r\n" + question);
                        }
                    }
                }

                cm.dispose();
            } else if (curMap == 103000801) {   // stage 2
                var stgProperty = "stg2Property";
                var stgCombos = stage2Combos;
                var stgAreas = stage2Rects;

                var nthtext = "第二", nthobj = "绳子", nthverb = "爬着", nthpos = "把绳子挂得太低";
                var nextStgId = 103000802;

                if (!eim.isEventLeader(cm.getPlayer())) {
                    cm.sendOk("按照你的队长的指示进行这一阶段的工作。");
                } else if (eim.getProperty(stgProperty) == null) {
                    cm.sendNext("好欢迎来到"+nthtext+"阶段。在我旁边,你会看到一些"+nthobj+"。在这些"+nthobj+"中,#b连接到将您发送到下一阶段#k的门户。你所需要做的就是让#b3队员在他们身上找到正确的"+nthobj+"和"+nthverb+"#k\r\nBUT,如果您"+nthpos+",则不算作答案;请接近"+nthobj+"的中间位置,作为正确答案。此外,在"+nthobj+"上只允许您所在队伍的3名成员。一旦他们对他们进行了"+nthverb+",组队长必须#b双击我查看答案是否正确#k。现在,在上找到正确的"+nthobj+"到"+nthverb+"！");

                    // cm.sendNext("Hi. Welcome to the " + nthtext + " stage. Next to me, you'll see a number of " + nthobj + ". Out of these " + nthobj + ", #b3 are connected to the portal that sends you to the next stage#k. All you need to do is have #b3 party members find the correct " + nthobj + " and " + nthverb + " on them.#k\r\nBUT, it doesn't count as an answer if you " + nthpos + "; please be near the middle of the " + nthobj + " to be counted as a correct answer. Also, only 3 members of your party are allowed on the " + nthobj + ". Once they are " + nthverb + "ing on them, the leader of the party must #bdouble-click me to check and see if the answer's correct or not#k. Now, find the right " + nthobj + " to " + nthverb + " on!");
                    var c = Math.floor(Math.random() * stgCombos.length);
                    eim.setProperty(stgProperty, c.toString());
                } else {
                    var accept = rectangleStages(eim, stgProperty, stgCombos, stgAreas);

                    if (accept) {
                        clearStage(stage, eim, curMap);
                        cm.sendNext("请抓紧时间进入下一阶段,入口打开了！");
                    } else {
                        eim.showWrongEffect();
                        cm.sendNext("看起来你还没有找到 "+nthobj+"。请考虑"+nthobj+"的不同组合。只有3个被允许在"+nthobj+"上"+nthverb+",如果你"+nthpos+",它可能不算是一个答案,所以请记住这一点。继续前进！");
                        // cm.sendNext("It looks like you haven't found the 3 " + nthobj + " just yet. Please think of a different combination of " + nthobj + ". Only 3 are allowed to " + nthverb + " on " + nthobj + ", and if you " + nthpos + " it may not count as an answer, so please keep that in mind. Keep going!");
                    }
                }

                cm.dispose();
            } else if (curMap == 103000802) {
                var stgProperty = "stg3Property";
                var stgCombos = stage3Combos;
                var stgAreas = stage3Rects;

                var nthtext = "第三", nthobj = "位置", nthverb = "站立", nthpos = "站得离边缘太近";
                var nextStgId = 103000803;

                if (!eim.isEventLeader(cm.getPlayer())) {
                    cm.sendOk("按照组队长的指示进行这一阶段的工作。");
                } else if (eim.getProperty(stgProperty) == null) {
                    cm.sendNext("你好欢迎来到"+nthtext+"阶段。在我旁边,你会看到一些"+nthobj+"。在这些"+nthobj+"中,#b3连接到将您发送到下一阶段#k的门户。你所需要做的就是让#b组员在他们身上找到正确的"+nthobj+"和"+nthverb+"#k\r\nBUT,如果您"+nthpos+",则不算作答案;请接近"+nthobj+"的中间位置,作为正确答案。此外,在"+nthobj+"上只允许您所在队伍的3名成员。一旦他们对他们进行了"+nthverb+",组队长必须#b双击我查看答案是否正确#k。现在,在上找到正确的"+nthobj+"到"+nthverb+"！");

                    // cm.sendNext("Hi. Welcome to the " + nthtext + " stage. Next to me, you'll see a number of " + nthobj + ". Out of these " + nthobj + ", #b3 are connected to the portal that sends you to the next stage#k. All you need to do is have #b3 party members find the correct " + nthobj + " and " + nthverb + " on them.#k\r\nBUT, it doesn't count as an answer if you " + nthpos + "; please be near the middle of the " + nthobj + " to be counted as a correct answer. Also, only 3 members of your party are allowed on the " + nthobj + ". Once they are " + nthverb + "ing on them, the leader of the party must #bdouble-click me to check and see if the answer's correct or not#k. Now, find the right " + nthobj + " to " + nthverb + " on!");
                    var c = Math.floor(Math.random() * stgCombos.length);
                    eim.setProperty(stgProperty, c.toString());
                } else {
                    var accept = rectangleStages(eim, stgProperty, stgCombos, stgAreas);

                    if (accept) {
                        clearStage(stage, eim, curMap);
                        cm.sendNext("请抓紧时间进入下一阶段,入口打开了！");
                    } else {
                        eim.showWrongEffect();
                        cm.sendNext("看起来你还没有找到3"+nthobj+"。请考虑"+nthobj+"的不同组合。只有3个被允许在"+nthobj+"上"+nthverb+",如果你"+nthpos+",它可能不算是一个答案,所以请记住这一点。继续前进！");

                        // cm.sendNext("It looks like you haven't found the 3 " + nthobj + " just yet. Please think of a different combination of " + nthobj + ". Only 3 are allowed to " + nthverb + " on " + nthobj + ", and if you " + nthpos + " it may not count as an answer, so please keep that in mind. Keep going!");
                    }
                }

                cm.dispose();
            } else if (curMap == 103000803) {
                var stgProperty = "stg4Property";
                var stgCombos = stage4Combos;
                var stgAreas = stage4Rects;

                var nthtext = "第四", nthobj = "桶", nthverb = "战力", nthpos = "站得离边缘太近";
                var nextStgId = 103000804;

                if (!eim.isEventLeader(cm.getPlayer())) {
                    cm.sendOk("按照你的组队长的指示进行这一阶段的工作。");
                    // cm.sendOk("Follow the instructions given by your party leader to proceed through this stage.");
                } else if (eim.getProperty(stgProperty) == null) {
                    cm.sendNext("你好欢迎来到"+nthtext+"阶段。在我旁边,你会看到一些"+nthobj+"。在这些"+nthobj+"中,#b3连接到将您发送到下一阶段#k的门户。你所需要做的就是让#b3队员在他们身上找到正确的"+nthobj+"和"+nthverb+"#k\r\nBUT,如果您"+nthpos+",则不算作答案;请接近"+nthobj+"的中间位置,作为正确答案。此外,在"+nthobj+"上只允许您所在队伍的3名成员。一旦他们对他们进行了"+nthverb+",组队长必须#b双击我查看答案是否正确#k。现在,在上找到正确的"+nthobj+"到"+nthverb+"！");

                    // cm.sendNext("Hi. Welcome to the " + nthtext + " stage. Next to me, you'll see a number of " + nthobj + ". Out of these " + nthobj + ", #b3 are connected to the portal that sends you to the next stage#k. All you need to do is have #b3 party members find the correct " + nthobj + " and " + nthverb + " on them.#k\r\nBUT, it doesn't count as an answer if you " + nthpos + "; please be near the middle of the " + nthobj + " to be counted as a correct answer. Also, only 3 members of your party are allowed on the " + nthobj + ". Once they are " + nthverb + "ing on them, the leader of the party must #bdouble-click me to check and see if the answer's correct or not#k. Now, find the right " + nthobj + " to " + nthverb + " on!");
                    var c = Math.floor(Math.random() * stgCombos.length);
                    eim.setProperty(stgProperty, c.toString());
                } else {
                    var accept = rectangleStages(eim, stgProperty, stgCombos, stgAreas);

                    if (accept) {
                        clearStage(stage, eim, curMap);
                        cm.sendNext("请抓紧时间进入下一阶段,入口打开了！");
                        // cm.sendNext("Please hurry on to the next stage, the portal opened!");
                    } else {
                        eim.showWrongEffect();
                        cm.sendNext("看起来你还没有找到3"+nthobj+"。请考虑"+nthobj+"的不同组合。只有3个被允许在"+nthobj+"上"+nthverb+",如果你"+nthpos+",它可能不算是一个答案,所以请记住这一点。继续前进！");

                        // cm.sendNext("It looks like you haven't found the 3 " + nthobj + " just yet. Please think of a different combination of " + nthobj + ". Only 3 are allowed to " + nthverb + " on " + nthobj + ", and if you " + nthpos + " it may not count as an answer, so please keep that in mind. Keep going!");
                    }
                }

                cm.dispose();
            } else if (curMap == 103000804) {
                if (eim.isEventLeader(cm.getPlayer())) {
                    if (cm.haveItem(4001008, 10)) {
                        cm.sendNext("这是引导您进入最后一个奖励阶段的门户网站。这是一个让你更容易击败普通怪物的阶段。你将有一定的时间尽可能多地狩猎,但你可以通过NPC在狩猎过程中离开舞台。再次祝贺你扫清了所有的障碍。让你们的团队与我交谈,以获得他们的奖品,因为他们可以进入奖金阶段。当心。。。");

                        // cm.sendNext("Here's the portal that leads you to the last, bonus stage. It's a stage that allows you to defeat regular monsters a little easier. You'll be given a set amount of time to hunt as much as possible, but you can always leave the stage in the middle of it through the NPC. Again, congratulations on clearing all the stages. Let your party talk to me to receive their prizes as they are allowed to pass to the bonus stage. Take care...");
                        cm.gainItem(4001008, -10);

                        clearStage(stage, eim, curMap);
                        eim.clearPQ();
                    } else {
                        cm.sendNext("你好欢迎来到第五阶段,也是最后一阶段。在地图上走一圈,你会发现一些Boss怪物。击败所有人,收集#b通行证#k,请把它们交给我。一旦你获得通行证,你所在队伍就会收集它们,然后在收集#b通行证#k后把它们交还给我。这些怪物你可能很熟悉,但它们可能比你想象的要强大得多,所以请小心。祝你好运")

                        // cm.sendNext("Hello. Welcome to the 5th and final stage. Walk around the map and you'll be able to find some Boss monsters. Defeat all of them, gather up #bthe passes#k, and please get them to me. Once you earn your pass, the leader of your party will collect them, and then get them to me once the #bpasses#k are gathered up. The monsters may be familiar to you, but they may be much stronger than you think, so please be careful. Good luck!");
                    }
                } else {
                    cm.sendNext("欢迎来到第五阶段,也是最后一阶段。在地图上漫步,你会发现一些Boss怪物。击败他们,收集#bpass#k,并将他们交给你的组队长#k。一旦你完成了,就回到我这里领取你的奖励。");

                    // cm.sendNext("Welcome to the 5th and final stage.  Walk around the map and you will be able to find some Boss monsters.  Defeat them all, gather up the #bpasses#k, and #bgive them to your leader#k.  Once you are done, return to me to collect your reward.");
                }

                cm.dispose();
            }
        } else if (status == 1) {
            if (!eim.giveEventReward(cm.getPlayer())) {
                cm.sendNext("请检查背有没空位!");
            } else {

                /**通用活跃点数加成奖励*/
                var p = cm.getPlayer();
                if(p.getActiveByName(partyTaskList[0][4]) < partyTaskList[0][3]){
                    var hyd = partyTaskList[0][3]/partyTaskList[0][2];
                    p.insertActive(partyTaskList[0][4],hyd,1);
                    p.dropMessage(5,"获得"+partyTaskList[0][1]+"活跃点:"+hyd);
                    p.gainExp(6100);//废弃经验奖励

                }


                cm.warp(103000805, "st00");
            }

            cm.dispose();
        }
    }
}
