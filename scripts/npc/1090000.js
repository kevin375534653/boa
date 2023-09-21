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
/* Kyrin
	Pirate Job Advancement
	
	Custom Quest 100009, 100011
*/

status = -1;
actionx = {"1stJob": false, "2ndjob": false, "2ndjobT": false, "3thJobI": false, "3thJobC": false};
job = 510;

spawnPnpc = false;
spawnPnpcFee = 7000000;
jobType = 5;

var advQuest = 0;

function start() {
    const GameConstants = Java.type('constants.game.GameConstants');
    if (cm.isQuestStarted(6330)) {
        if (cm.getEventInstance() != null) {    // missing script for skill test found thanks to Jade?
            advQuest = 5;                       // string visibility thanks to iPunchEm & Glvelturall
            cm.sendNext("一点也不差。 我们去外面讨论这个吧！");
        } else if (cm.getQuestProgressInt(6330, 6331) == 0) {
            advQuest = 1;
            cm.sendNext("你准备好了，对吧？ 现在尝试抵挡我的攻击2分钟。 我不会轻易对你好。 祝你好运，因为你会需要它。");
        } else {
            advQuest = 3;
            cm.teachSkill(5121003, 0, 10, -1);
            cm.forceCompleteQuest(6330);

            cm.sendNext("恭喜。 你已经成功通过了我的测试。 我将教你一项新技能，叫做\"超级变身\"。\r\n\r\n  #s5121003#    #b#q5121003##k");
        }
    } else if (cm.isQuestStarted(6370)) {
        if (cm.getEventInstance() != null) {
            advQuest = 6;
            cm.sendNext("一点也不差。 我们去外面讨论这个吧！");
        } else if (cm.getQuestProgressInt(6370, 6371) == 0) {
            advQuest = 2;
            cm.sendNext("你准备好了，对吧？ 现在尝试抵挡我的攻击2分钟。 我不会轻易对你好。 祝你好运，因为你会需要它。");
        } else {
            advQuest = 4;
            cm.teachSkill(5221006, 0, 10, -1);
            cm.forceCompleteQuest(6370);

            cm.sendNext("恭喜。 你已经成功通过了我的测试。 我将教你一项新技能，叫做\"战舰\"。\r\n\r\n  #s5221006#    #b#q5221006##k");
        }
    } else if (parseInt(cm.getJobId() / 100) == jobType && cm.canSpawnPlayerNpc(GameConstants.getHallOfFameMapid(cm.getJob()))) {
        spawnPnpc = true;

        var sendStr = "你走了很长的路才获得今天的力量、智慧和勇气，不是吗？ 对于现在#r 名人堂上有一个 NPC 持有您角色#k 的当前图像，您有何看法？ 你喜欢它？";
        if (spawnPnpcFee > 0) {
            sendStr += "我可以为您做，费用为 #b " + cm.numberWithCommas(spawnPnpcFee) + " 金币.#k";
        }

        cm.sendYesNo(sendStr);
    } else {
        if (cm.getJobId() == 0) {
            actionx["1stJob"] = true;
            cm.sendNext("想成为#r 海盗#k 吗？ 有一些标准需要满足。 因为我们不能接受每个人... #b 您的等级应至少为 LV.10，且最低为 " + cm.getFirstJobStatRequirement(jobType) + "#k.");   // thanks Vcoc for noticing a need to state and check requirements on first job adv starting message
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 500) {
            actionx["2ndJob"] = true;
            if (cm.isQuestCompleted(2191) || cm.isQuestCompleted(2192)) {
                cm.sendNext("我看你做得很好。 我会让你在漫长的道路上迈出下一步。");
            } else {
                cm.sendNext("你所取得的进步是惊人的。");
            }
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 5 && !cm.getPlayer().gotPartyQuestItem("JBP"))) {
            actionx["3thJobI"] = true;
            cm.sendNext("你在这。 几天前，奥西利亚的#b#p2020013##k跟我谈论了你。 我发现你有兴趣晋升海盗3转。 为了实现这个目标，我必须测试你的实力，看看你是否值得晋升。 金银岛的一个洞穴中间有一个开口，它会带你到一条秘密通道。 一旦进去，你就会面对我自己的克隆体。 你的任务是打败他并把#b#t4031059##k带回来。");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)) {
            cm.sendNext("请给我带来 #b#t4031059##k.");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")) {
            actionx["3thJobC"] = true;
            cm.sendNext("干得好。 你打败了我的克隆体并安全地带#b#t4031059##k回来。 从身体的角度来看，你现在已经证明自己值得第三次工作晋升。 现在你应该把这条项链交给奥西里亚的#b#p2020013##k来参加第二部分的测试。 祝你好运。 你会需要它。");
        } else {
            cm.sendOk("你的选择是明智的。");
            cm.dispose();
        }
    }
}

function action(mode, type, selection) {
    status++;
    if (mode == -1 && selection == -1) {
        cm.dispose();
        return;
    } else if (mode == 0 && type != 1) {
        status -= 2;
    }

    if (status == -1) {
        start();
        return;
    } else {
        if (advQuest > 0) {
            if (advQuest < 3) {
                var em = cm.getEventManager(advQuest == 1 ? "4jship" : "4jsuper");
                if (!em.startInstance(cm.getPlayer())) {
                    cm.sendOk("Someone is already challenging the test. Please try again later.");
                }
            } else if (advQuest < 5) {
                if (advQuest == 3) {
                    cm.sendOk("It is similar to that of 'Transformation', but it's much more powerful than that. Keep training, and hope to see you around.");
                } else {
                    cm.sendOk("Unlike most of the other skills you used as a Pirate, this one definitely is different. You can actually ride the 'Battleship' and attack enemies with it. Your DEF level will increase for the time you're on board, so that'll help you tremendously in combat situations. May you become the best Gunslinger out there...");
                }
            } else {
                if (advQuest < 6) {
                    cm.setQuestProgress(6330, 6331, 2);
                } else {
                    cm.setQuestProgress(6370, 6371, 2);
                }

                cm.warp(120000101);
            }

            cm.dispose();
        } else if (spawnPnpc) {
            if (mode > 0) {
                if (cm.getMeso() < spawnPnpcFee) {
                    cm.sendOk("Sorry, you don't have enough mesos to purchase your place on the Hall of Fame.");
                    cm.dispose();
                    return;
                }

                const PlayerNPC = Java.type('server.life.PlayerNPC');
                const GameConstants = Java.type('constants.game.GameConstants');
                if (PlayerNPC.spawnPlayerNPC(GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("There you go! Hope you will like it.");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("Sorry, the Hall of Fame is currently full...");
                }
            }

            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 && type != 1 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJobI"] && status == 1)) {
                if (mode == 0 && status == 2 && type == 1) {
                    cm.sendOk("You know there is no other choice...");
                }
                if (!(mode == 0 && type != 1)) {
                    cm.dispose();
                    return;
                }
            }
        }
    }

    if (actionx["1stJob"]) {
        if (status == 0) {
            if (cm.getLevel() >= 10 && cm.canGetFirstJob(jobType)) {
                cm.sendYesNo("Oh...! You look like someone that can definitely be a part of us... all you need is a little slang, and... yeah... so, what do you think? Wanna be the Pirate?");
            } else {
                cm.sendOk("Train a bit more until you reach the base requirements and I can show you the way of the #rPirate#k.");
                cm.dispose();
            }
        } else if (status == 1) {
            if (cm.canHold(2070000) && cm.canHoldAll([1482000, 1492000])) {
                if (cm.getJobId() == 0) {
                    cm.changeJobById(500);
                    cm.gainItem(1492000, 1);
                    cm.gainItem(1482000, 1);
                    cm.gainItem(2330000, 1000);
                    cm.resetStats();
                }
                cm.sendNext("Alright, from here out, you are a part of us! You'll be living the life of a wanderer at ..., but just be patient as soon, you'll be living the high life. Alright, it ain't much, but I'll give you some of my abilities... HAAAHHH!!!");
            } else {
                cm.sendNext("Make some room in your inventory and talk back to me.");
                cm.dispose();
            }
        } else if (status == 2) {
            cm.sendNextPrev("You've gotten much stronger now. Plus every single one of your inventories have added slots. A whole row, to be exact. Go see for it yourself. I just gave you a little bit of #bSP#k. When you open up the #bSkill#k menu on the lower left corner of the screen, there are skills you can learn by using SP's. One warning, though: You can't raise it all together all at once. There are also skills you can acquire only after having learned a couple of skills first.");
        } else if (status == 3) {
            cm.sendNextPrev("Now a reminder. Once you have chosen, you cannot change up your mind and try to pick another path. Go now, and live as a proud Pirate.");
        } else {
            cm.dispose();
        }
    } else if (actionx["2ndJob"]) {
        if (status == 0) {
            if (cm.isQuestCompleted(2191) || cm.isQuestCompleted(2192)) {
                cm.sendSimple("Alright, when you have made your decision, click on [I'll choose my occupation] at the bottom.#b\r\n#L0#Please explain to me what being the Brawler is all about.\r\n#L1#Please explain to me what being the Gunslinger is all about.\r\n#L3#I'll choose my occupation!");
            } else {
                cm.sendNext("Good decision. You look strong, but I need to see if you really are strong enough to pass the test, it's not a difficult test, so you'll do just fine.");
            }
        } else if (status == 1) {
            if (!cm.isQuestCompleted(2191) && !cm.isQuestCompleted(2192)) {
                // Pirate works differently from the other jobs. It warps you directly in.
                actionx["2ndJobT"] = true;
                cm.sendYesNo("Would you like to take the test now?");
            } else {
                if (selection < 3) {
                    if (selection == 0) {    //brawler
                        cm.sendNext("Pirates that master #rKnuckles#k.\r\n\r\n#bBrawlers#k are melee, close-ranged fist fighters who deal lots of damage and have high HP. Armed with #rCorkscrew Blow#k, one can deal massive damage to multiple targets at once. #rOak Barrel#k permits one to scout or disguise themselves in middle of difficult fights, enabling a possible escaping route in front of danger.");
                    } else if (selection == 1) {    //gunslinger
                        cm.sendNext("Pirates that master #rGuns#k.\r\n\r\n#bGunslingers#k are faster and ranged attackers. With the #rWings#k skill, Gunslingers can hover in the air, allowing for a longer, more sustained jump than a regular jump. #rBlank Shot#k allows to deal Stun status to multiple targets nearby.");
                    }

                    status -= 2;
                } else {
                    cm.sendNextPrev("You have a long road ahead of you still, but being a pirate will help you get there. Just keep that in mind and you will do fine.");
                }
            }
        } else if (status == 2) {
            if (actionx["2ndJobT"]) {
                var map = 0;
                if (cm.isQuestStarted(2191)) {
                    map = 108000502;
                } else {
                    map = 108000501;
                }
                if (cm.getPlayerCount(map) > 0) {
                    cm.sendOk("All the training maps are currently in use. Please try again later.");
                    cm.dispose();
                } else {
                    cm.warp(map, 0);
                    cm.dispose();

                }
            } else {
                if (cm.isQuestCompleted(2191) && cm.isQuestCompleted(2192)) {
                    job = (Math.random() < 0.5) ? 510 : 520;
                } else if (cm.isQuestCompleted(2191)) {
                    job = 510;
                } else if (cm.isQuestCompleted(2192)) {
                    job = 520;
                }

                cm.sendYesNo("So you want to make the second job advancement as the " + (job == 510 ? "#bBrawler#k" : "#bGunslinger#k") + "? You know you won't be able to choose a different job for the 2nd job advancement once you make your decision here, right?");
            }
        } else if (status == 3) {
            if (cm.haveItem(4031012)) {
                cm.gainItem(4031012, -1);
            }

            if (job == 510) {
                cm.sendNext("From here on out, you are a #bBrawler#k. Brawlers rule the world with the power of their bare fists...which means they need to train their body more than others. If you have any trouble training, I'll be more than happy to help.");
            } else {
                cm.sendNext("From here on out, you are a #bGunslinger#k. Gunslingers are notable for their long-range attacks with sniper-like accuracy and of course, using Guns as their primary weapon. You should continue training to truly master your skills. If you are having trouble training, I'll be here to help.");
            }

            if (cm.getJobId() != job) {
                cm.changeJobById(job);
            }
        } else if (status == 4) {
            cm.sendNextPrev("我刚刚把记载着" + (job == 310 ? "#b拳手#k" : "#b火枪手#k") + "相关技能的书交给你了。里面有许多" + (job == 310 ? "#b拳手#k" : "#b火枪手#k") + "可修行的技能。此外消耗栏的栏位数量也有增加，此外，最大HP和MP也有提升，你再一一确认看看吧！");
        } else if (status == 5) {
            cm.sendNextPrev("我有给你一些技能点数（SP），打开技能栏后确认看看吧！你可以把点数配给到二转技能上，但无法一开始就全部设完，因为有些技能需要当前置技能的等级提升到莫i哥特阶段后才能学习。");
        } else if (status == 6) {
            cm.sendNextPrev((job == 510 ? "拳手" : "火枪手") + "必须要变得很强！但若将自身的力量发泄在弱者身上，这并不是正确的方法。将自己所拥有的力量用在正确的事情上，这是比变得更强更为重要的课题。好了！相信你不断自我修炼，过不久就会再与我相见的，我期待那天的到来。");
        }
    } else if (actionx["3thJobI"]) {
        if (status == 0) {
            if (cm.getPlayer().gotPartyQuestItem("JB3")) {
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("你必须独自跟我的分身进行一对一的作战，既然是我的分身，想必他将拥有强大的力量。并且擅长使用各种高级技能。更何况，那里是跟这个世界不同的次元世界，人类逗留时间不宜过长，因此快速击倒是非常重要的。做好所有准备之后，再进行挑战吧。那我就等你平安拿回#b#t4031059##k。");
        }
    } else if (actionx["3thJobC"]) {
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}