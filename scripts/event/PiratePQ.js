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
 * @author: 海盗副本
 * @event: Pirate PQ
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

var isPq = true;
var isGrindMode = false;     // stages done after breaking all boxes on maps

var minPlayers = 3, maxPlayers = 6;
var minLevel = 55, maxLevel = 300;
var entryMap = 925100000;
var exitMap = 925100700;
var recruitMap = 251010404;
var clearMap = 925100600;

var minMapId = 925100000;
var maxMapId = 925100500;

var eventTime = 4;     // 4 minutes

const maxLobbies = 1;

function init() {
    setEventRequirements();
}

function getMaxLobbies() {
    return maxLobbies;
}

function setEventRequirements() {
    var reqStr = "";

    reqStr += "\r\n    参加人数: ";
    if (maxPlayers - minPlayers >= 1) {
        reqStr += minPlayers + " ~ " + maxPlayers;
    } else {
        reqStr += minPlayers;
    }

    reqStr += "\r\n    等级限制: ";
    if (maxLevel - minLevel >= 1) {
        reqStr += minLevel + " ~ " + maxLevel;
    } else {
        reqStr += minLevel;
    }

    reqStr += "\r\n    时间限制: ";
    reqStr += eventTime + " 分钟";

    em.setProperty("party", reqStr);
}

function setEventExclusives(eim) {
    var itemSet = [4001117, 4001120, 4001121, 4001122];
    eim.setExclusiveItems(itemSet);
}

function setEventRewards(eim) {}

function getEligibleParty(party) {      //selects, from the given party, the team that is allowed to attempt this event
    var eligible = [];
    var hasLeader = false;

    if (party.size() > 0) {
        var partyList = party.toArray();

        for (var i = 0; i < party.size(); i++) {
            var ch = partyList[i];

            if (ch.getMapId() == recruitMap && ch.getLevel() >= minLevel && ch.getLevel() <= maxLevel) {
                if (ch.isLeader()) {
                    hasLeader = true;
                }
                eligible.push(ch);
            }
        }
    }

    if (!(hasLeader && eligible.length >= minPlayers && eligible.length <= maxPlayers)) {
        eligible = [];
    }
    return Java.to(eligible, Java.type('net.server.world.PartyCharacter[]'));
}

function setup(level, lobbyid) {
    var eim = em.newInstance("Pirate" + lobbyid);
    eim.setProperty("level", level);

    eim.setProperty("stage2", "0");
    eim.setProperty("stage2a", "0");
    eim.setProperty("stage3a", "0");
    eim.setProperty("stage2b", "0");
    eim.setProperty("stage3b", "0");
    eim.setProperty("stage4", "0");
    eim.setProperty("stage5", "0");

    eim.setProperty("curStage", "1");
    eim.setProperty("grindMode", isGrindMode ? "1" : "0");

    eim.setProperty("openedChests", "0");
    eim.setProperty("openedBoxes", "0");
    eim.getInstanceMap(925100000).resetPQ(level);
    eim.getInstanceMap(925100000).shuffleReactors();

    eim.getInstanceMap(925100100).resetPQ(level);
    var map = eim.getInstanceMap(925100200);
    map.resetPQ(level);
    map.shuffleReactors();
    for (var i = 0; i < 5; i++) {
        var mob = em.getMonster(9300124);
        var mob2 = em.getMonster(9300125);
        var mob3 = em.getMonster(9300124);
        var mob4 = em.getMonster(9300125);
        eim.registerMonster(mob);
        eim.registerMonster(mob2);
        eim.registerMonster(mob3);
        eim.registerMonster(mob4);
        mob.changeDifficulty(level, isPq);
        mob2.changeDifficulty(level, isPq);
        mob3.changeDifficulty(level, isPq);
        mob4.changeDifficulty(level, isPq);
        map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(430, 75));
        map.spawnMonsterOnGroundBelow(mob2, new java.awt.Point(1600, 75));
        map.spawnMonsterOnGroundBelow(mob3, new java.awt.Point(430, 238));
        map.spawnMonsterOnGroundBelow(mob4, new java.awt.Point(1600, 238));
    }
    map = eim.getInstanceMap(925100201);
    map.resetPQ(level);
    for (var i = 0; i < 10; i++) {
        var mob = em.getMonster(9300112);
        var mob2 = em.getMonster(9300113);
        eim.registerMonster(mob);
        eim.registerMonster(mob2);
        mob.changeDifficulty(level, isPq);
        mob2.changeDifficulty(level, isPq);
        map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(0, 238));
        map.spawnMonsterOnGroundBelow(mob2, new java.awt.Point(1700, 238));
    }
    eim.getInstanceMap(925100202).resetPQ(level);
    map = eim.getInstanceMap(925100300);
    map.resetPQ(level);
    map.shuffleReactors();
    for (var i = 0; i < 5; i++) {
        var mob = em.getMonster(9300124);
        var mob2 = em.getMonster(9300125);
        var mob3 = em.getMonster(9300124);
        var mob4 = em.getMonster(9300125);
        eim.registerMonster(mob);
        eim.registerMonster(mob2);
        eim.registerMonster(mob3);
        eim.registerMonster(mob4);
        mob.changeDifficulty(level, isPq);
        mob2.changeDifficulty(level, isPq);
        mob3.changeDifficulty(level, isPq);
        mob4.changeDifficulty(level, isPq);
        map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(430, 75));
        map.spawnMonsterOnGroundBelow(mob2, new java.awt.Point(1600, 75));
        map.spawnMonsterOnGroundBelow(mob3, new java.awt.Point(430, 238));
        map.spawnMonsterOnGroundBelow(mob4, new java.awt.Point(1600, 238));
    }
    map = eim.getInstanceMap(925100301);
    map.resetPQ(level);
    for (var i = 0; i < 10; i++) {
        var mob = em.getMonster(9300112);
        var mob2 = em.getMonster(9300113);
        eim.registerMonster(mob);
        eim.registerMonster(mob2);
        mob.changeDifficulty(level, isPq);
        mob2.changeDifficulty(level, isPq);
        map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(0, 238));
        map.spawnMonsterOnGroundBelow(mob2, new java.awt.Point(1700, 238));
    }
    eim.getInstanceMap(925100302).resetPQ(level);
    eim.getInstanceMap(925100400).resetPQ(level);
    eim.getInstanceMap(925100500).resetPQ(level);

    respawnStages(eim);

    eim.startEventTimer(eventTime * 60000);
    setEventRewards(eim);
    setEventExclusives(eim);
    return eim;
}

function afterSetup(eim) {}

function respawnStages(eim) {
    var stg = eim.getIntProperty("stage2");
    if (stg < 3) {  // thanks Chloek3, seth1, BHB for suggesting map respawn rather than waves on stg2
        eim.getMapInstance(925100100).spawnAllMonsterIdFromMapSpawnList(9300114 + stg, eim.getIntProperty("level"), true);
    }

    eim.getMapInstance(925100400).instanceMapRespawn();
    eim.schedule("respawnStages", 10 * 1000);
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(entryMap);
    player.changeMap(map, map.getPortal(0));
}

function scheduledTimeout(eim) {
    end(eim);
}

function playerUnregistered(eim, player) {}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    player.changeMap(exitMap, 0);
}

function playerLeft(eim, player) {
    if (!eim.isEventCleared()) {
        playerExit(eim, player);
    }
}

function changedMapInside(eim, mapid) {
    var stage = eim.getIntProperty("curStage");

    if (stage == 1) {
        if (mapid == 925100100) {
            eim.restartEventTimer(6 * 60 * 1000);
            eim.setIntProperty("curStage", 2);
        }
    } else if (stage == 2) {
        if (mapid == 925100200) {
            eim.restartEventTimer(6 * 60 * 1000);
            eim.setIntProperty("curStage", 3);
        }
    } else if (stage == 3) {
        if (mapid == 925100300) {
            eim.restartEventTimer(6 * 60 * 1000);
            eim.setIntProperty("curStage", 4);
        }
    } else if (stage == 4) {
        if (mapid == 925100400) {
            eim.restartEventTimer(6 * 60 * 1000);
            eim.setIntProperty("curStage", 5);
        }
    } else if (stage == 5) {
        if (mapid == 925100500) {
            eim.restartEventTimer(8 * 60 * 1000);
            eim.setIntProperty("curStage", 6);
        }
    }
}

function changedMap(eim, player, mapid) {
    if (mapid < minMapId || mapid > maxMapId) {
        if (eim.isEventTeamLackingNow(true, minPlayers, player)) {
            eim.unregisterPlayer(player);
            end(eim);
        } else {
            eim.unregisterPlayer(player);
        }
    } else {
        changedMapInside(eim, mapid);
    }
}

function changedLeader(eim, leader) {
    var mapid = leader.getMapId();
    if (!eim.isEventCleared() && (mapid < minMapId || mapid > maxMapId)) {
        end(eim);
    }
}

function playerDead(eim, player) {}

function playerRevive(eim, player) { // player presses ok on the death pop up.
    if (eim.isEventTeamLackingNow(true, minPlayers, player)) {
        eim.unregisterPlayer(player);
        end(eim);
    } else {
        eim.unregisterPlayer(player);
    }
}


function playerDisconnected(eim, player) {
    if (eim.isEventTeamLackingNow(true, minPlayers, player)) {
        end(eim);
    } else {
        playerExit(eim, player);
    }
}

function leftParty(eim, player) {
    if (eim.isEventTeamLackingNow(false, minPlayers, player)) {
        end(eim);
    } else {
        playerLeft(eim, player);
    }
}

function disbandParty(eim) {
    if (!eim.isEventCleared()) {
        end(eim);
    }
}

function monsterValue(eim, mobId) {
    return 1;
}

function end(eim) {
    var party = eim.getPlayers();
    for (var i = 0; i < party.size(); i++) {
        playerExit(eim, party.get(i));
    }
    eim.dispose();
}

function clearPQ(eim) {
    eim.stopEventTimer();
    eim.setEventCleared();

    var chests = parseInt(eim.getProperty("openedChests"));
    var expGain = (chests == 0 ? 28000 : (chests == 1 ? 35000 : 42000));
    eim.giveEventPlayersExp(expGain);

    eim.warpEventTeam(925100600);
}

function isLordPirate(mob) {
    var mobid = mob.getId();
    return (mobid == 9300105) || (mobid == 9300106) || (mobid == 9300107) || (mobid == 9300119);
}

function passedGrindMode(map, eim) {
    if (eim.getIntProperty("grindMode") == 0) {
        return true;
    }
    return eim.activatedAllReactorsOnMap(map, 2511000, 2517999);
}

function monsterKilled(mob, eim) {
    var map = mob.getMap();

    if (isLordPirate(mob)) {  // lord pirate defeated, spawn the little fella!
        map.broadcastStringMessage(5, "海盗王死后，无恙被释放了！");
        /**活跃点*/
        /**获取玩家列表*/
        var characterList = eim.getPlayers();

        /**通用活跃点数加成奖励*/
        for(var i = 0;i<characterList.size();i++){
            var player = characterList.get(i);
            if(player.getActiveByName(partyTaskList[4][4]) < partyTaskList[4][3]){
                var hyd = partyTaskList[4][3]/partyTaskList[4][2];
                player.insertActive(partyTaskList[4][4],hyd,1);
                player.dropMessage(5,"获得"+partyTaskList[4][1]+"活跃点:"+hyd);
                player.gainExp(230000);
            }

        }


        eim.spawnNpc(2094001, new java.awt.Point(777, 140), mob.getMap());
    }

    if (map.countMonsters() == 0) {
        var stage = ((map.getId() % 1000) / 100) + 1;

        if ((stage == 1 || stage == 3 || stage == 4) && passedGrindMode(map, eim)) {
            eim.showClearEffect(map.getId());
        } else if (stage == 5) {
            if (map.getReactorByName("sMob1").getState() >= 1 && map.getReactorByName("sMob2").getState() >= 1 && map.getReactorByName("sMob3").getState() >= 1 && map.getReactorByName("sMob4").getState() >= 1) {
                eim.showClearEffect(map.getId());
            }
        }
    }
}

function allMonstersDead(eim) {}

function cancelSchedule() {}

function dispose(eim) {}
