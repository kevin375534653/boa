/* Mos
 Leafre : Leafre (240000000)
 
 Refining NPC: 
 * Level 110 weapons - Stimulator allowed
 */

        var status = 0;
var selectedType = -1;
var selectedItem = -1;
var stimulator = false;
var bustedDagger = false;
var item;
var mats;
var matQty;
var cost;
var stimID;

function start() {
    status = -2;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status == -1) {
        cm.sendSimple("嘿~如果想把武器合在一起还真找对人了。我是神木村最棒的武器匠人。怎样，对蕴含龙之力量的武器感兴趣吗？\r\n#L0# 制作武器。\r\n");
    } else if (status == 0) {
        if (selection == 0) {
            if (cm.haveItem(4001079)) {
                bustedDagger = true;
                cm.sendNext("这是什么？在破获匕首你似乎老了，我需要 #i" + 4011001 + "# 和 #i" + 4011002 + "#.");
            } else {
                var selStr = "好！只要给我一些费用，我就给你合成蕴含龙之力量的强有力的武器。#b";
                var options = new Array("催化剂是什么？", "制作一般战士武器", "制作一般射手武器", "制作一般法师武器", "制作一般盗贼武器", "制作一般海盗武器",
                        "催化剂制作战士武器", "催化剂制作射手武器", "催化剂制作法师武器", "催化剂制作飞侠武器", "催化剂制作海盗武器");
                for (var i = 0; i < options.length; i++) {
                    selStr += "\r\n#L" + i + "# " + options[i] + "#l";
                }
                cm.sendSimple(selStr);
            }
        } else {
            cm.sendYesNo("太好了！我会告诉你我的能力的。大家都知道，这取决于耐久性的物品的等级和数量的物品的丢失，所以服务费各不相同？您想立即修复你的装备？");
            status = 99;
        }

    } else if (status == 1) {
        if (bustedDagger) {
            if (cm.haveItem(4011001) && cm.haveItem(4011002) && cm.haveItem(4001079)) {
                cm.gainItem(4011001, -1);
                cm.gainItem(4011002, -1);
                cm.gainItem(4001079, -1);
                cm.gainItem(4001078, 1);
            } else {
                cm.sendOk("你没有足够的材料。");
            }
            cm.dispose();
        } else {
            selectedType = selection;
            if (selectedType > 5) {
                stimulator = true;
                selectedType -= 5;
            } else
                stimulator = false;
            if (selectedType == 0) { //What's a stim?
                cm.sendNext("辅助剂是一种特殊的药水，我可以加入到创建某些物品的途中。它给它统计中，就好像从一个怪物下降。然而，它可能有没有变化，而且也有可能为物品低于平均水平。还有没有得到任何物品使用刺激的时候，所以请明智的选择有10％的机会。")
                cm.dispose();
            } else if (selectedType == 1) { //warrior weapon
                var selStr = "很好，那么你想制作哪一个？#b";
                var weapon = new Array("狂龙闪电剑#k - 等级. 110 单手剑#b", "狂龙怒斩#k - 等级. 110 单手斧#b", "狂龙地锤#k - 等级. 110 单手锤#b", "飞龙巨剑#k - 等级. 110 双手剑#b", "炼狱魔龙斧#k - 等级. 110 双手斧#b", "金龙轰天锤#k - 等级. 110 双手锤#b",
                        "盘龙七冲枪#k - 等级. 110 火枪#b", "血龙神斧#k - 等级. 110 矛#b");
                for (var i = 0; i < weapon.length; i++) {
                    selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
                }
                cm.sendSimple(selStr);
            } else if (selectedType == 2) { //弓箭手 weapon
                var selStr = "很好，那么你想做哪一个？？#b";
                var weapon = new Array("金龙振翅弓#k - 等级. 110 弓#b", "黄金飞龙弩#k - 等级. 110 弩#b");
                for (var i = 0; i < weapon.length; i++) {
                    selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
                }
                cm.sendSimple(selStr);
            } else if (selectedType == 3) { //magician weapon
                var selStr = "很好，那么你想做哪一个？？#b";
                var weapon = new Array("佘太君龙杖#k - 等级. 108 短杖#b", "黑精灵王杖#k - 等级. 110 长杖#b");
                for (var i = 0; i < weapon.length; i++) {
                    selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
                }
                cm.sendSimple(selStr);
            } else if (selectedType == 4) { //thief weapon
                var selStr = "很好，那么你想做哪一个？？#b";
                var weapon = new Array("蝉翼龙牙破#k - 等级. 110 力量短刀#b", "半月龙鳞裂#k - 等级. 110 幸运短刀#b", "寒木升龙拳#k - 等级. 110 拳套#b");
                for (var i = 0; i < weapon.length; i++) {
                    selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
                }
                cm.sendSimple(selStr);
            } else if (selectedType == 5) { //pirate weapon
                var selStr = "很好，那么你想做哪一个？？#b";
                var weapon = new Array("撕裂者#k - 等级. 110 拳甲#b", "枭龙#k - 等级. 110 手枪#b");
                for (var i = 0; i < weapon.length; i++) {
                    selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
                }
                cm.sendSimple(selStr);
            }
        }
    } else if (status == 2) {
        selectedItem = selection;
        if (selectedType == 1) { //warrior weapon
            var itemSet = new Array(1302059, 1312031, 1322052, 1402036, 1412026, 1422028, 1432038, 1442045);
            var matSet = new Array(new Array(1302056, 4000244, 4000245, 4005000), new Array(1312030, 4000244, 4000245, 4005000), new Array(1322045, 4000244, 4000245, 4005000), new Array(1402035, 4000244, 4000245, 4005000),
                    new Array(1412021, 4000244, 4000245, 4005000), new Array(1422027, 4000244, 4000245, 4005000), new Array(1432030, 4000244, 4000245, 4005000), new Array(1442044, 4000244, 4000245, 4005000));
            var matQtySet = new Array(new Array(1, 20, 25, 8), new Array(1, 20, 25, 8), new Array(1, 20, 25, 8), new Array(1, 20, 25, 8), new Array(1, 20, 25, 8), new Array(1, 20, 25, 8), new Array(1, 20, 25, 8), new Array(1, 20, 25, 8));
            var costSet = new Array(120000, 120000, 120000, 120000, 120000, 120000, 120000, 120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 2) { //弓箭手 weapon
            var itemSet = new Array(1452044, 1462039);
            var matSet = new Array(new Array(1452019, 4000244, 4000245, 4005000, 4005002), new Array(1462015, 4000244, 4000245, 4005000, 4005002));
            var matQtySet = new Array(new Array(1, 20, 25, 3, 5), new Array(1, 20, 25, 5, 3));
            var costSet = new Array(120000, 120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 3) { //magician weapon
            var itemSet = new Array(1372032, 1382036);
            var matSet = new Array(new Array(1372010, 4000244, 4000245, 4005001, 4005003), new Array(1382035, 4000244, 4000245, 4005001, 4005003));
            var matQtySet = new Array(new Array(1, 20, 25, 6, 2), new Array(1, 20, 25, 6, 2));
            var costSet = new Array(120000, 120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 4) { //thief weapon
            var itemSet = new Array(1332049, 1332050, 1472051);
            var matSet = new Array(new Array(1332051, 4000244, 4000245, 4005000, 4005002), new Array(1332052, 4000244, 4000245, 4005002, 4005003), new Array(1472053, 4000244, 4000245, 4005002, 4005003));
            var matQtySet = new Array(new Array(1, 20, 25, 5, 3), new Array(1, 20, 25, 3, 5), new Array(1, 20, 25, 2, 6));
            var costSet = new Array(120000, 120000, 120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 5) { //pirate weapon
            var itemSet = new Array(1482013, 1492013);
            var matSet = new Array(new Array(1482012, 4000244, 4000245, 4005000, 4005002), new Array(1492012, 4000244, 4000245, 4005000, 4005002));
            var matQtySet = new Array(new Array(1, 20, 25, 5, 3), new Array(1, 20, 25, 3, 5));
            var costSet = new Array(120000, 120000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }

        var prompt = "你想要做一个 #t" + item + "#? 在这种情况下，为了要做出好品质的装备。请确保您有空间在您的装备栏！#b";

        if (stimulator) {
            stimID = getStimID(item);
            prompt += "\r\n#i" + stimID + "# 1 #t" + stimID + "#";
        }

        if (mats instanceof Array) {
            for (var i = 0; i < mats.length; i++) {
                prompt += "\r\n#i" + mats[i] + "# " + matQty[i] + " #t" + mats[i] + "#";
            }
        } else {
            prompt += "\r\n#i" + mats + "# " + matQty + " #t" + mats + "#";
        }

        if (cost > 0)
            prompt += "\r\n#i4031138# " + cost + " 金币";

        cm.sendYesNo(prompt);
    } else if (status == 3 && mode == 1) {
        var complete = true;

        if (cm.getMeso() < cost) {
            cm.sendOk("糟糕...你的钱好像不够哦...")
            cm.dispose();
            return;
        } else {
            if (mats instanceof Array) {

                for (var i = 0; complete && i < mats.length; i++)
                {
                    if (!cm.haveItem(mats[i], matQty[i]))
                    {
                        complete = false;
                    }
                }
            } else {
                if (!cm.haveItem(mats, matQty))
                {
                    complete = false;
                }
            }
        }

        if (stimulator) { //check for stimulator
            if (!cm.haveItem(stimID)) {
                complete = false;
            }
        }

        if (!complete)
            cm.sendOk("由于你没有足够的材料，所以我不帮忙做了。");
        else {
            if (mats instanceof Array) {
                for (var i = 0; i < mats.length; i++) {
                    cm.gainItem(mats[i], -matQty[i]);
                }
            } else
                cm.gainItem(mats, -matQty);

            cm.gainMeso(-cost);
            if (stimulator) { //check for stimulator
                cm.gainItem(stimID, -1);
                var deleted = Math.floor(Math.random() * 10);
                if (deleted != 0) {
                    cm.gainItem(item, 1, true)
                    cm.sendOk("完成。善待好你的武器，免得你使龙的愤怒.");
                } else {
                    cm.sendOk("不幸的是，龙的精髓...抵触你的武器。我很抱歉是我的疏忽.....");
                }
            } else { //just give basic item
                cm.gainItem(item, 1);
                cm.sendOk("完成。善待好你的武器，免得你使龙的愤怒.");
            }
        }
        cm.dispose();
    } else if (status == 100) {
        cm.sendRepairWindow();
        cm.dispose();
    }
}

function getStimID(equipID) {
    var cat = Math.floor(equipID / 10000);
    var stimBase = 4130002; //stim for 1h sword

    switch (cat) {
        case 130: //1h sword, do nothing
            break;
        case 131: //1h axe
            stimBase++;
            break;
        case 132: //1h bw
            stimBase += 2;
            break;
        case 140: //2h sword
            stimBase += 3;
            break;
        case 141: //2h axe
            stimBase += 4;
            break;
        case 142: //2h bw
            stimBase += 5;
            break;
        case 143: //spear
            stimBase += 6;
            break;
        case 144: //polearm
            stimBase += 7;
            break;
        case 137: //wand
            stimBase += 8;
            break;
        case 138: //staff
            stimBase += 9;
            break;
        case 145: //bow
            stimBase += 10;
            break;
        case 146: //xbow
            stimBase += 11;
            break;
        case 133: //dagger
            stimBase += 12;
            break;
        case 147: //claw
            stimBase += 13;
            break;
        case 148: //knuckle
            stimBase += 14;
            break;
        case 149: //gun
            stimBase += 15;
            break;
    }

    return stimBase;
}
