//血衣制作ver2.0
//任意时装脸饰均可作为血衣的受体
//无属性时装脸饰第一次强化升级为1000HP血衣
//拥有属性时装脸饰每次可通过消耗三种等级祖母绿,黄晶增加HP,MP上限  下级+10,中级+20,上级+30  最多可强化120次
//支持将一个血衣的属性转移到另一件时装脸饰上  消耗血衣将其全部强化的属性转移至另一件脸饰上
var status;
var 一级血衣材料 = Array(4011007, 4021009, 4250800, 4250900, 4251000, 4251100);
var 升级材料 = Array(
    Array(4250600, 0, 10),
    Array(4250601, 0, 20),
    Array(4250602, 0, 30),
    Array(4250700, 1, 10),
    Array(4250701, 1, 20),
    Array(4250702, 1, 30)
);
var 当前血衣, sel1;

var 制作血衣金币 = 10000000;

var 升级血衣 = 1;

var 转移血衣金币 = 5000000;

// var InventoryManipulator = Java.type("client.inventory.manipulator.InventoryManipulator");
// var InventoryManipulator = Java.type("client.inventory.manipulator.InventoryManipulator");
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;

        if (status == 0) {
            var text = "制作一件血衣吧，它能改变你的命运。怎么样，要不要试试看？\r\n";
            text += "#b#L0#1 . 制作全新血衣(耗费#r"+制作血衣金币+"金币#b,随物价调整)#l#k\r\n";
            text += "#b#L1#2 . 升级当前血衣(耗费#r"+升级血衣+"金币#b,随物价调整)#l#k\r\n";
            text += "#b#L2#3 . 血衣属性转移(耗费#r"+转移血衣金币+"金币#b,随物价调整)#l#k\r\n";
            //text += "#r#L3#4 . 老版血衣升级(即将移除)#l\r\n"
            cm.sendSimple(text);
        } else if (status == 1) {
            sel1 = selection;
            当前血衣 = cm.getInventory(-1).getItem(-102);//选择当前装备的脸饰
            if (selection == 0) {
                if(cm.getMeso() < 制作血衣金币){
                    cm.sendOk("金币不足。");
                    cm.dispose();
                    return;
                }
                var text = "#b制作一件血衣，我需要你给我带来以下道具各#r一个#b：\r\n";
                for (var i = 0; i < 一级血衣材料.length; i++) {
                    text += "#i" + 一级血衣材料[i] + "#";
                }
                text += "\r\n另外，你需要装备一件现金道具的脸饰并提供#r500万金币。#b\r\n";
                text += "制作成功后，当前装备的#r现金脸饰HP+1000#b，要进行制作吗？"
                cm.sendYesNo(text);
            } else if (selection == 1) {
                if(cm.getMeso() < 升级血衣){
                    cm.sendOk("金币不足。");
                    cm.dispose();
                    return;
                }

                if (当前血衣 != null) {
                    if (当前血衣.getItemLevel() >= 120) {
                        cm.sendOk("已经强化到极限了。");
                        cm.dispose();
                    } else if (当前血衣.getHp() < 1000) {
                        cm.sendOk("请先进行血衣制作。");
                        status = -1;
                    } else {
                        var text = "#b当前装备的血衣为:#z" + 当前血衣.getItemId() + "#,当前属性:\r\nHP : " + 当前血衣.getHp() + "    MP : " + 当前血衣.getMp() + "\r\n";
                        text += "#b剩余强化次数 : " + (121 - 当前血衣.getItemLevel()) + "\r\n请选择一种宝石进行强化:\r\n";
                        for (var i = 0; i < 升级材料.length; i++) {
                            text += "#L" + i + "##z" + 升级材料[i][0] + "#("
                            if (升级材料[i][1] == 0) {
                                text += "HP+" + 升级材料[i][2] + ")\r\n"
                            } else {
                                text += "MP+" + 升级材料[i][2] + ")\r\n"
                            }
                        }
                        cm.sendSimple(text);
                    }
                } else {
                    cm.sendOk("请先装备一件现金脸饰，可在商城购买任意脸饰！");
                    status = -1;
                }
            } else if (selection == 2) {//转移属性
                if(cm.getMeso() < 转移血衣金币){
                    cm.sendOk("金币不足。");
                    cm.dispose();
                    return;
                }
                if (当前血衣 != null) {
                    if (当前血衣.getHp() < 1000) {
                        cm.sendOk("请先进行血衣制作。");
                        status = -1;
                    } else {
                        var text = "#b当前装备的血衣为:#z" + 当前血衣.getItemId() + "#,当前属性:\r\nHP : " + 当前血衣.getHp() + "    MP : " + 当前血衣.getMp() + "\r\n";
                        text += "#b剩余强化次数 : " + (121 - 当前血衣.getItemLevel()) + "\r\n请选择用于继承血衣属性的现金脸饰:\r\n";
                        var inv = cm.getInventory(1);
                        var ok = false;
                        for (var i = 1; i < 97; i++) {
                            var item = inv.getItem(i);
                            if (item != null && Java.type("server.ItemInformationProvider").getInstance().isCash(item.getItemId()) && item.getItemId() >= 1010000 && item.getItemId() < 1020000) {
                                text += "#L" + i + "##i" + item.getItemId() + "##l";
                                ok = true;
                            }
                        }
                        if (ok)
                            cm.sendSimple(text);
                        else {
                            cm.sendOk("装备栏没有可用来继承血衣属性的任何现金脸饰！");
                            status = -1;
                        }
                    }
                } else {
                    cm.sendOk("请先装备一件现金脸饰,可在商城购买任意脸饰！");
                    status = -1;
                }
            } else {
                cm.openNpc(9010000, "血衣制作")
            }
        } else if (status == 2) {
            if (sel1 == 0) {
                if (当前血衣 == null) {
                    cm.sendOk("请先装备一件现金脸饰！")
                } else {
                    var 材料齐 = true;
                    for (var i = 0; i < 一级血衣材料.length; i++) {
                        if (!cm.haveItem(一级血衣材料[i])) {
                            材料齐 = false;
                            break;
                        }
                    }
                    if (材料齐) {

                        if (cm.getPlayer().getMeso() >= 制作血衣金币) {
                            cm.gainMeso(-制作血衣金币);
                            for (var i = 0; i < 一级血衣材料.length; i++) {
                                cm.gainItem(一级血衣材料[i], -1)
                            }
                            当前血衣.setHp(1000);
                            当前血衣.setMp(1000);
                            当前血衣.setStr(15);
                            当前血衣.setDex(15);
                            当前血衣.setInt(15);
                            当前血衣.setLuk(15);
                            当前血衣.setSpeed(15);
                            当前血衣.setJump(15);
                            当前血衣.setItemLevel(1);
                            当前血衣.setExpiration(-1);
                            cm.getPlayer().forceUpdateItem(当前血衣)
                            cm.getPlayer().equipChanged();
                            cm.sendOk("制作成功");
                        } else {
                            cm.sendOk("你没有足够的金币。");
                        }
                    } else {
                        cm.sendOk("你没有我需要的全部材料。");
                    }
                }
                status = -1;
            } else if (sel1 == 1) {
                if (cm.haveItem(升级材料[selection][0])) {

                    if(cm.getMeso() < 升级血衣){
                        cm.sendOk("金币不足。");
                        cm.dispose();
                        return;
                    }
                    cm.gainMeso(-升级血衣)

                    cm.gainItem(升级材料[selection][0], -1);
                    if (升级材料[selection][1] == 0) {
                        当前血衣.setHp(当前血衣.getHp() + 升级材料[selection][2]);
                    } else {
                        当前血衣.setMp(当前血衣.getMp() + 升级材料[selection][2]);
                    }
                    当前血衣.setItemLevel(当前血衣.getItemLevel() + 1);
                    当前血衣.setExpiration(-1);
                    cm.getPlayer().forceUpdateItem(当前血衣)
                    cm.getPlayer().equipChanged();
                    cm.sendOk("升级成功");
                } else {
                    cm.sendOk("你没有#z" + 升级材料[selection][0] + "#");
                }
                status = -1;
            } else {
                if(cm.getMeso() < 转移血衣金币){
                    cm.sendOk("金币不足。");
                    cm.dispose();
                    return;
                }
                cm.gainMeso(-转移血衣金币);
                // cm.getPlayer().dropMessage(5,"aaaa");
                var 继承对象 = cm.getInventory(1).getItem(selection);
                继承对象.setHp(当前血衣.getHp())
                继承对象.setMp(当前血衣.getMp())
                继承对象.setItemLevel(当前血衣.getItemLevel())
                继承对象.setStr(当前血衣.getStr());
                继承对象.setDex(当前血衣.getDex());
                继承对象.setInt(当前血衣.getInt());
                继承对象.setLuk(当前血衣.getLuk());
                继承对象.setSpeed(当前血衣.getSpeed());
                继承对象.setJump(当前血衣.getJump());
                继承对象.setWatk(当前血衣.getWatk());
                继承对象.setMatk(当前血衣.getMatk());
                继承对象.setExpiration(-1);
                const InventoryManipulator = Java.type('client.inventory.manipulator.InventoryManipulator');
                const InventoryType = Java.type('client.inventory.InventoryType');
                var i = InventoryManipulator.removeFromSlot(cm.getClient(), InventoryType.EQUIPPED, -102, 1, false);
                cm.getPlayer().forceUpdateItem(继承对象)
                cm.getPlayer().equipChanged();
                cm.sendOk("转移成功。");
            }
        }
    }
}

function generateSelectionMenu(array) {     // nice tool for generating a string for the sendSimple functionality
    var menu = "";
    for (var i = 0; i < array.length; i++) {
        menu += "#L" + i + "#" + array[i] + "#l\r\n";
    }
    return menu;
}