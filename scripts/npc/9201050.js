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
/* Icebyrd Slimm
	Masteria: New Leaf City (600000000)
	Handles the quiz quest. (4900)
 */

var minlevel = 10;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 0 && type > 0) {
            cm.dispose();
            return;
        }
        
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0 && mode == 1) {
            if (cm.isQuestCompleted(4911)) {
                cm.sendNext("干得好！你已经解决了我所有关于新叶城的问题。祝你旅途愉快！");
                cm.dispose();
            } else if (cm.isQuestCompleted(4900) || cm.isQuestStarted(4900)) {  // thanks imbee for pointing out the quiz leak
                cm.sendNext("嘿，注意，我想问你另一个问题，伙计！");
                cm.dispose();
            } else {
                var selStr = "很高清见到你喔！请问你来找我有什么事情呢？#b"
                var info = new Array("这里是什么地方？","福斯魏德教授是谁？","福斯魏德之门是什么？","内部齿轮装置在哪里呢？","克兰卡丛林是什么","齿轮之门是什么？","路上的表示代表什么呢？","蒙面杰克是什么样的人？","莉塔罗莉丝看起来很粗鲁，他是怎样的一个人呢？","这都市的新自治区会在什么时候开启？","我想解迷题！");
                for (var i = 0; i < info.length; i++)
                    selStr += "\r\n#L" + i + "# " + info[i] + "#l";
                cm.sendSimple(selStr);
            }
        } else if(status == 1) {
            switch (selection) {
                case 0:
                    cm.sendNext("我一直都梦想着能够建立一座城市，一座没有强权，没有歧视的城市，你明白么？在这个过程中我认识了许多一生中的挚友。狐智教授就是其中一个，我把他从一群食人植物口下救出来后，他就来这里定居了。虽然听起来不可思议，但事情真的就是这样。至于假面杰克，他是我在神兵领地的狩猎伙伴，特别喜欢吹嘘自己。哈，丽塔和我在废弃都市的时候就是死党了，她用手上那把武器救了我很多次，我那个时候就已经把警长的位置在心里定给她了。说到我们的探险家，巴里凯德，他是来寻宝的，并且答应把找到的东西都捐给博物馆。我还在废弃都市的时候就听说过他和他兄弟的故事。还有埃尔帕姆……我只能确定他来自远方。我们之前也聊过，他不是那种惹事的类型，所以我让他留下来了。哈哈，伙计，我怎么觉得我像个嚼舌的老太太！你还想知道点什么？");
                    status -= 2;
                    break;
                case 1:
                    cm.sendNext("他是个我在城市外面碰到的时空旅行者，今年都97岁了，但是依然安静不下来。我遇到他的时候他差点被某些丛林中的野兽吃了！因为我救了他，所以他同意来这里建造一座时间博物馆。我总感觉他来到这里还有其他目的，因为他好几次不经意说起新叶都市在未来有着很重要的作用。我就知道这么多了…… ");
                    status -= 2;
                    break;
                case 2:
                    cm.sendNext("嘿嘿，我第一次看到博士在建造这些东西的时候也问了相同的问题。这些都是传送点，按向上的箭头就可以把你传送到其他地方。我建议你最好赶快熟悉一下怎么用，因为我们交通主要就靠它。");
                    status -= 2;
                    break;
                case 3:
                    cm.sendNext("秘宝齿轮就在大大本钟下面。是巴里凯德最先发现了这个充满了怪物的区域。这个区域好像是钟塔中隔离出来的单独空间——你别说，还真奇怪。我听说他需要人帮忙一起探索，所以你可以去找他聊聊。但是一定要小心，里面的狼蜘蛛可都是些狠角色。");
                    status -= 2;
                    break;
                case 4:
                    cm.sendNext("呃……克拉奇安森林就在新叶都市郊外。里面有许多强大且陌生的生物，如果你要去那里，就做好战斗的准备吧。只要从城市左边出去就到了。传说中穿过森林就能到达一个失落的都市，但是我们至今为止都没有找到。");
                    status -= 2;
                    break;
                case 5:
                    cm.sendNext("呃，约翰发现自己进入了大大本钟的秘宝齿轮区域的时候，他就站到了一枚齿轮上，并换了个方向前进。但是，他并没有办法穿过这个区域，只能在里面兜圈子，虽然看起来差不多，但是狐智的门是可以通行的。");
                    status -= 2;
                    break;
                case 6:
                    cm.sendNext("呃，城里面到处都是这样的地方，其实就是些建筑工地。红灯表示还在建造中，绿灯表示正常营业。你可以经常回来看看，我们的建设效率很高的。");
                    status -= 2;
                    break;
                case 7:
                    cm.sendNext("啊，杰克……他就是那种不论惹上什么麻烦都能顺利脱身的人。你问女人？杰克唯一的失败就在女人上了。他失败了，从那以后就开始带上面具隐藏自己身份了。除了能告诉你他来自神兵领地，我不能再多说了。不过如果你去问他，他会告诉你的。");
                    status -= 2;
                    break;
                case 8:
                    cm.sendNext("我认识丽塔已经很久了，虽然直到最近都没怎么交流过。我很久没见过她了，但是我能理解。她一直以接受的都是盗贼训练。实际上，我们第一次相遇也是因为这个。我当时被一群疯蘑菇包围了，是她突然出现，救了我。所以我想找治安官的时候，自然而然就想到了她。她曾发誓要保护这座城市，并且帮助他人完成训练，如果如果你比较喜欢行侠仗义的话，那就找她聊聊吧。");
                    status -= 2;
                    break;
                case 9:
                    cm.sendNext("很快就可以了，朋友。虽然你无法看到他们，但是城市的建造者们都在很努力地工作。这些区域完工的之后就会开放，我知道你很期待，我也一样！");
                    status -= 2;
                    break;
                case 10:
                    if (cm.getLevel() >= minlevel) {
                        cm.sendNext("你已经回答过我的问题了。祝你在新叶都市玩的开心。");
                        cm.startQuest(4900);
                    } else {
                        cm.sendNext("渴望，是吗？在我让你参加测验之前，你再多探索一下怎么样？");
                    }
                    
                    cm.dispose();
                    break;
            }
        }
    }
}