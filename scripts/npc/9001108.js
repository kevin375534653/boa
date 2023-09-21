var status = 0;
var selected = 0;
function start() {
    if (cm.getPlayer().getMapId() == 100000000) {
        cm.sendNext('那里！你看到了吗？ 你没有？ 一个UFO刚刚经过...那里！看，有人被拖进UFO里...arrrrrgh，是Gaga！#rGaga刚刚被UFO绑架了！#k');
    } else {
        if (cm.getPlayer().getMapId() == 922240200) {
            cm.askMenu('你有话要说吗...？ #b\r\n#L0#我要救Gaga。#l\r\n#L1#我想去太空矿井。#l');
        } else {
            if (cm.getPlayer().getMapId() >= 922240000 && cm.getPlayer().getMapId() <= 922240019) {
                cm.askYesNo('如果你失败了，别担心。 您将有 3 次机会。 你还想放弃吗？');
            } else {
                if (cm.getPlayer().getMapId() >= 922240100 && cm.getPlayer().getMapId() <= 922240119) {
                    var b = '为了营救 Gaga，你经历了很多麻烦，但看起来我们又回到了原点。';
                    var a = cm.getPlayer().getEvents().getGagaRescue();
                    if (a.getCompleted() == 10 || a.getCompleted() == 20) {
                        b += '在 Gaga 获救之前请不要放弃。 为了表达我对你迄今为止所取得的成就的赞赏，我给了你一艘宇宙飞船。 它相当破旧，但应该仍然可以使用。 检查你的#b技能窗口#k。';
                        a.giveSkill(cm.getPlayer());
                    } else {
                        b += '我们现在回去吧。';
                    }
                    cm.sendNext(b);
                }
            }
        }
    }
}
function action(a, d, e) {
    if (a > 0) {
        status++;
        if (cm.getPlayer().getMapId() == 100000000) {
            if (status == 1) {
                if (cm.getPlayer().getLevel() >= 12) {
                    cm.askYesNo('我们现在干什么？ 这还只是谣言，但是……我听说如果你被外星人绑架，可怕的事情就会发生在你身上……也许这就是现在发生在Gaga身上的事情！拜托，拜托救援 Gaga！\r\n #bGaga可能有点犹豫不决#k，但他有一颗善良的心。 我不能让可怕的事情发生在他身上。 对了！来自月球的爷爷可能知道怎么救他！我会送你去月球，所以你去见爷爷并救出Gaga...');
                } else {
                    cm.sendOk('哦！看来你还没有达到拯救Gaga的等级要求。 当你达到12级或以上时请回来。');
                }
            } else {
                if (status == 2) {
                    cm.sendNext('太感谢了。 请救救Gaga！月球爷爷会帮助你的。');
                } else {
                    if (status == 3) {
                        cm.warp(922240200);
                        cm.dispose();
                    }
                }
            }
        } else {
            if (cm.getPlayer().getMapId() == 922240200) {
                if (status == 1) {
                    if (e == 0) {
                        selected = 1;
                        cm.sendNext('欢迎！我从月亮兔宝宝那里听说了发生的事情，我很高兴你能来，因为我正计划寻求帮助。 Gaga是我的一个朋友，他以前帮助过我，经常过来打招呼。 不幸的是，他被外星人绑架了。');
                    } else {
                        selected = 2;
                        cm.askYesNo('在太空矿井中，您可以找到名为#b氪水晶#k 的特殊矿石，其中蕴含着神秘的太空力量。 #b氪水晶#l 通常呈翠绿色，但如果被宇宙飞船的#b氪水晶#k 击中，则会变成棕色。 请记住，为了挫败这个外星人的阴谋，需要#b10 棕色氪水晶和 10 颗翡翠氪水晶。 但既然 #b1颗 氪水晶#k 也能有所帮助，请尽可能多地给我带来。 哦，还有一件事！太空地雷受到太空伙伴的保护。 由于 #氪水晶#k 的力量，它们非常强大，所以不要试图击败它们。 只需集中精力快速收集晶体即可。');
                    }
                } else {
                    if (status == 2) {
                        if (selected == 1) {
                            cm.askYesNo('如果我们把Gaga留在外星人那里，他会发生可怕的事情！我会让你借月亮兔子用来旅行的宇宙飞船，这样你就可以营救Gaga。#b虽然他可能看起来有点不诚实，但速度很慢 ，有时不成熟#k，他确实是一个不错的年轻人。 你现在要去救他吗？');
                        } else {
                            if (selected == 2) {
                                cm.sendOk('尚未编码, f4.');
                                cm.dispose();
                            }
                        }
                    } else {
                        if (status == 3) {
                            var f = -1;
                            for (var c = 0; c < 20; c++) {
                                var b = cm.getClient().getChannelServer().getMapFactory();
                                if (b.getMap(922240000 + c).getCharacters().isEmpty()) {
                                    f = c;
                                    break;
                                }
                            }
                            if (f > -1) {
                                cm.warp(922240000 + f);
                            } else {
                                cm.sendOk('目前没有空地图，请稍后重试。');
                            }
                            cm.dispose();
                        }
                    }
                }
            } else {
                if (cm.getPlayer().getMapId() >= 922240000 && cm.getPlayer().getMapId() <= 922240019 || cm.getPlayer().getMapId() >= 922240100 && cm.getPlayer().getMapId() <= 922240119) {
                    cm.warp(922240200);
                    cm.dispose();
                }
            }
        }
    } else {
        if (a < 1) {
            if (a == 0) {
                if (cm.getPlayer().getMapId() == 922240200) {
                    cm.sendOk('太可惜了，等你准备好了再回来。');
                }
            }
            cm.dispose();
        }
    }
}