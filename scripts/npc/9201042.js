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
/* Mr. Sandman
	Amoria - Amoria (680000000)
	AmoriaPQ Extras (get wish tickets in AmoriaPQ bonus stage)

        Yellow Wish Ticket - Lv1 ~ 49
         Green Wish Ticket - Lv50 ~ 119
          Blue Wish Ticket - Lv120+
 */

var wishPrizes = [2000000, 2010004, 2020011, 2000004, 2000006, 2022015, 2000005, 1082174, 1002579, 1032039, 1002578, 1002580, 1002577, 1102078];
var wishPrizesQty = [10, 10, 5, 5, 5, 5, 10, 1, 1, 1, 1, 1, 1, 1];
var wishPrizesCst = [10, 15, 20, 30, 30, 50, 100, 400, 450, 500, 500, 530, 550, 600];

var slctTicket;
var amntTicket;

var sel;
var advance = true;

var status;

function getTierTicket(level) {
        if(level < 50) {
                return 4031543;
        } else if(level < 120) {
                return 4031544;
        } else {
                return 4031545;
        }
}

function start() {
        slctTicket = getTierTicket(cm.getPlayer().getLevel());
        amntTicket = cm.getItemQuantity(slctTicket);
    
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
                if (mode == 1 && advance)
                        status++;
                else
                        status--;
                    
                advance = true;
    
                if(status == 0) {
                        cm.sendNext("嗨，怎么样？既然你路过阿莫利亚,你听说过我哥哥阿摩司主持的那个案子吗?这是#b阿莫利亚的挑战.在那里,你可以找到\r\n#i4031543# #i4031544# #i4031545##b 愿望票#k,可以拿来兑换奖品的.");
                } else if(status == 1) {
                        var listStr = "";
                        for(var i = 0; i < wishPrizes.length; i++) {
                                listStr += "#b#L" + i + "#" + wishPrizesQty[i] + " #z" + wishPrizes[i] + "##k";
                                listStr += " - " + wishPrizesCst[i] + " wish tickets";
                                listStr += "#l\r\n";
                        }
                    
                        cm.sendSimple("你现在有 #b" + amntTicket + " #i" + slctTicket + "# #t" + slctTicket + "##k.\r\n\r\n买奖品:\r\n\r\n" + listStr);
                } else if(status == 2) {
                        sel = selection;
                        
                        if(amntTicket < wishPrizesCst[selection]) {
                                cm.sendPrev("你需要 #b" + wishPrizesCst[selection] + " #t" + slctTicket + "##k 去买那个！如果你想要这个，等你拿到所有的票再回来。");
                                advance = false;
                        } else {
                                cm.sendYesNo("您已选择 #b" + wishPrizesQty[selection] + " #z" + wishPrizes[selection] + "##k, 那就需要 #b" + wishPrizesCst[selection] + " #t" + slctTicket + "##k. 你会买吗？");
                        }
                } else {
                        if(cm.canHold(wishPrizes[sel], wishPrizesQty[sel])) {
                                cm.gainItem(wishPrizes[sel], wishPrizesQty[sel]);
                                cm.gainItem(slctTicket, -wishPrizesCst[sel]);
                                
                                cm.sendOk("好了，祝你愉快!");
                        } else {
                                cm.sendOk("在领取物品之前，请在您的库存上留一个空位.");
                        }
                    
                        cm.dispose();
                }
        }
}