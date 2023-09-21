var status = 0;
var imaps = [104000000, 102000000, 101000000, 100000000, 103000000, 120000000, 105040300];
var maps = [102000000, 100000000, 101000000, 103000000, 120000000];
var cost = [1000, 1000, 800, 1000, 800];
var townText = [["我介绍介绍#b明珠港#k吧。从彩虹岛乘坐维多利亚号到达的就是这里...也就是说，这里就是明珠港村落。来自彩虹岛的很多新手就从这里开始他们的冒险生涯的。", "这是一个安静的小镇，因为港口位于岛的西端，所以它的背后有广阔的水域。这里的大多数人都是渔夫，所以他们可能看起来很吓人，但如果你和他们攀谈，他们会对你很友好。", "村落周围有一片美丽的草原。这里的怪物大多是比较弱小的，可以说这个地方是新手练习的好地方。如果你还没转职，不如先在这里提高你的等级。"],

["好的，我会给你们解释更多#b勇士部落#k。这是一个坐落在维多利亚岛最北端，被落基山脉环绕的勇士之城。在不友好的气氛中，只有强者才能生存。", "听说在高原的周围有木妖、野猪、猴子等怪物，而且在幽深的山沟里还有可怕的龙，很危险的，劝你还是不要匆忙行动。", "如果你想转职成为#b战士#k，就去找勇士部落的长老#r武术教练#k吧。如果你的等级在10级以上，而且备了较高体力的话，它说不定会让你转职成为战士。但你的能力还不够的话，只好继续努力锻炼。"],

 ["给你介绍介绍#b魔法密林#k吧。它是位于金银岛最东边森林里的魔法师村落。村落四周都是神秘而郁郁葱葱的森林。在那个村落里有不喜欢人类的妖精，所以到了那，要特别小心，千万不要惹是生非啊。", "森林周围里的绿水灵,会走的蘑菇,猴子和僵尸猴等怪物。在森林的深处，甚至有会飞的巫婆，如果你还不是很强大，最好不要接近它们。", "如果你想当#b魔法师#k，就去魔法密林找大魔法师#r汉斯#k吧，如果你的等级在8级以上，而且具备一定的智力，说不定他会让你当魔法师。但你的能力还不够的话，只好自己继续努力了。"], 

["给你介绍介绍#b射手村#k吧。它是位于金银岛南部草原的弓箭手村落，村落的周围是美丽的草原和郁郁葱葱的树林，气候也不错，非常富饶，如果你还没去过，一定要去看看啊。", "在草原的周边有蜗牛,蘑菇,猪等比较弱的怪物。但是听说村落周围有个叫猪之乐园的地方，在那里有时会出现非常强悍的叫蘑菇王的怪物....", "如果你想当#b弓箭手#k，就去射手村找一个像守护神一样的#r赫丽娜#k。要是你的等级在10级以上还有一定的敏捷度，她可能会让你当弓箭手。但如果你的能力还不够的话，只好自己继续努力了。"], 

["我给你介绍介绍#b废弃都市#k吧。它是位于金银岛西北方盗贼之城，城里有些大楼给人的感觉有点奇怪，而且城市上空常常被黑云笼罩着。但在那里的高处有时候可以看到日落黄昏，非常漂亮。", "在废弃都市里有通往多个迷宫的通道，可以去鳄鱼和蛇出没的沼泽地，还有幽灵和蝙蝠出没的地铁，在地下数百米的地方出现的幽灵，是和恐龙一样强悍的危险的怪物。", "如果你想成为#b飞侠#k，就去废弃都市找所谓的黑暗君主的#r达鲁克#k，要是你的等级在10级以上还有一定的敏捷度，它说不定会让你当飞侠，但是你的能力还不够的话，只好自己继续努力了。"], 

["这里有一些信息是关于#b#m120000000##k的。这里有一艘潜水艇，目前停泊在维多利亚岛的附近。那艘潜水艇是许多海盗的家。在那里你可以看到和在明珠港一样美丽的海景。", "#m120000000#就停在射手村和魔法密林之间，所以如果你从这里走出去，就能欣赏到两个村落的景色。你在那里遇到的所有海盗都很友好。", "如果你真的想要成为#b海盗#k，那你最好到#m120000000#见见#r#p1090000##k。要是你的等级在10级以上还有一定的敏捷度，它说不定会让你当海盗，但是你的能力还不够的话，只好自己继续努力了。"], 

["我给你介绍介绍#b林中之城#k吧。这是位于金银岛东南方的浓密的树林之村。那里的位置大概是射手村和蚂蚁洞中间。那里有个宾馆，如果你在迷宫中冒险觉得累了就可以去那个清净之地休息。", "据说在宾馆的前面有一位神秘的老者，叫#r可利斯拉玛#k。它好像专门适用冒险者收集的原料给他们做些东西，具体情况我也不太清楚。如果你有机会去那里，替我好好打探打探吧。", "从林中之城往东走下去，是蚂蚁洞迷宫。那里连接到金银岛的最深的地下。听说那里有很多凶猛而强悍的怪物，闯入者都有去无回，所以好自为之吧，如果你一定要去那里，你得好好准备准备。", "还有，这些是我听说的…在林中之城有一个到某个地方的神秘入口。进去后，可以看见黑色石头。我想有机会进去看看，确认这是不是真的。"]];
var selectedMap = -1;
var town = false;

function start() {
    cm.sendNext("你想去别的村落吗？只要花点钱，我就可以送你到别的地方。也许你会觉得有点贵，不过对新手会打#b9折#k优惠。");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if ((mode == 0 && !town) || mode == -1) {
            if (type == 1 && mode != -1) {
                cm.sendNext("这个小镇也有很多值得一看的东西。如果你想去别的地方，请告诉我。");
            }
            cm.dispose();
            return;
        } else {
            status -= 2;

            if (status < 1) {
                cm.dispose();
                return;
            }
        }

    }
    if (status == 1) {
        cm.sendSimple("如果你是第一次到这里来，你可能会对这个地方感到困惑。你可以问我有关这里的信息。\r\n#L0##b金银岛上有哪些城镇?#l\r\n#L1#请带我去别的地方。#k#l");
    } else if (status == 2) {
        if (selection == 0) {
            town = true;
            var text = "在金银岛内有7个村落，你想了解哪个？#b";
            for (var i = 0; i < imaps.length; i++) {
                text += "\r\n#L" + i + "##m" + imaps[i] + "##l";
            }
            cm.sendSimple(text);
        } else if (selection == 1) {
            var selStr = cm.getJobId() == 0 ? "新手玩家可以获得#b90%#k的折扣。请选择目的地。#b" : "请选择你的目的地。按照目的地不同，车费也有所不同。#b";
            for (var i = 0; i < maps.length; i++) {
                selStr += "\r\n#L" + i + "##m" + maps[i] + "# (" + (cost[i] / (cm.getJobId() == 0 ? 10 : 1)) + " 金币)#l";
            }
            cm.sendSimple(selStr);
        }
    } else if (town) {
        if (selectedMap == -1) {
            selectedMap = selection;
        }
        if (status == 3) {
            cm.sendNext(townText[selectedMap][status - 3]);
        } else {
            townText[selectedMap][status - 3] == undefined ? cm.dispose() : cm.sendNextPrev(townText[selectedMap][status - 3]);
        }
    } else if (status == 3) {
        selectedMap = selection;
        cm.sendYesNo("我想你不需要在这里。你真的想移动到#b#m" + maps[selection] + "##k吗？将会花费的#b" + (cost[selection] / (cm.getJobId() == 0 ? 10 : 1)) + " 金币#k，你觉得怎么样？");
    } else if (status == 4) {
        if (cm.getMeso() < (cost[selectedMap] / (cm.getJobId() == 0 ? 10 : 1))) {
            cm.sendNext("你没有足够的金币。凭借你的能力，你应该拥有更多！");
        } else {
            cm.gainMeso(-(cost[selectedMap] / (cm.getJobId() == 0 ? 10 : 1)));
            cm.warp(maps[selectedMap]);
        }
        cm.dispose();
    }
}