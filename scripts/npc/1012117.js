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
/* 	
	NPC Name: 		Big Headward
        Map(s): 		Victoria Road : Henesys Hair Salon (100000104)
	Description: 		Random haircut

        GMS-like revised by Ronan -- contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/

var status = 0;

var mhair_r = Array(
30010,30690,33000,33050,33040,30920,
30880,30860,30820,30800,30070,30080, 
30090,30100,30110,30120,30130,30140, 
30150,30160,30170,30180,30190,30460,
30210,30240,30250,30260,30610,30440,
30270,30290,30300,30410,30832,30600,
30330,30350,30560,30200,30400,30220,
30410,30420,30450,30370,30470,30490,
30510,30520,30540,30550,43890,43820,
30650,30660,30670,30680,30700,30710, 
30720,30730,30740,30750,30760,30770, 
30780,30790,30810,30830,30840,30850, 
30870,30890,30900,30910,30930,30940,
30950,30990,33030,30040,30150,30530,
30640,30630,30620,30310,33157,35297,
30340,30320,30230,33247,33437,33007,
30280,30360,35187,40517,43747,40067,
40530,40540,40560,40597,40680,40730,
40740,40750,40790,43000,43010,43140,
43170,43180,43200,43320,43330,43580,
43740,43800,45130);//男

var fhair_r = Array(
31820,34030,31100,31120,31200,37320, 
31220,31230,31240,31250,31260,31270, 
31280,31290,31300,31430,31470,31760,
31780,31860,31870,31930,34450,34670,
34060,31020,31060,31070,31080,31090,
31110,31130,31140,31150,37930,34260,
31160,31170,31180,31190,31210,31310,
31320,31330,31340,31350,31400,31410,
31420,31440,31450,31460,31480,31490,
31510,31520,31530,31540,31550,31560,
31610,31620,31630,31640,31650,31660,
31670,31680,31690,31700,31710,31720,
31730,31740,31750,31770,31790,31800,
31810,31830,31840,31850,31860,31880,
31890,31910,31920,31940,31950,34000,
34010,34040,34050,34210,44340,44410,
44190,44290,44320,44330,44340,40010,
40310,41200,41400,41580,41610,41640,
41750,41790,41800,41830,41840,41860,
41890,41920,43630,43880,44010,44030,
44120,44180,44190,38490,38440,38420,
38410,38400,38310,38290,38280,38270,
38140,38120,38100,38070
);//女


var mhair_v = Array(
30010,30690,33000,33050,33040,30920,
30880,30860,30820,30800,30070,30080, 
30090,30100,30110,30120,30130,30140, 
30150,30160,30170,30180,30190,30460,
30210,30240,30250,30260,30610,30440,
30270,30290,30300,30410,30832,30600,
30330,30350,30560,30200,30400,30220,
30410,30420,30450,30370,30470,30490,
30510,30520,30540,30550,43890,43820,
30650,30660,30670,30680,30700,30710, 
30720,30730,30740,30750,30760,30770, 
30780,30790,30810,30830,30840,30850, 
30870,30890,30900,30910,30930,30940,
30950,30990,33030,30040,30150,30530,
30640,30630,30620,30310,33157,35297,
30340,30320,30230,33247,33437,33007,
30280,30360,35187,40517,43747,40067,
40530,40540,40560,40597,40680,40730,
40740,40750,40790,43000,43010,43140,
43170,43180,43200,43320,43330,43580,
43740,43800);//男

var fhair_v = Array(
31820,34030,31100,31120,31200,37320, 
31220,31230,31240,31250,31260,31270, 
31280,31290,31300,31430,31470,31760,
31780,31860,31870,31930,34450,34670,
34060,31020,31060,31070,31080,31090,
31110,31130,31140,31150,37930,34260,
31160,31170,31180,31190,31210,31310,
31320,31330,31340,31350,31400,31410,
31420,31440,31450,31460,31480,31490,
31510,31520,31530,31540,31550,31560,
31610,31620,31630,31640,31650,31660,
31670,31680,31690,31700,31710,31720,
31730,31740,31750,31770,31790,31800,
31810,31830,31840,31850,31860,31880,
31890,31910,31920,31940,31950,34000,
34010,34040,34050,34210,44340,44410,
44190,44290,44320,44330,44340,40010,
40310,41200,41400,41580,41610,41640,
41750,41790,41800,41830,41840,41860,41890,41920,43630,43880,44010,44030,44120,44180,44190,38490,38440,38420,38410,38400,38310,38290,38280,38270,38140,38120,38100,38070
);//女

var hairnew = Array();

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
        array.push(itemid);
    }
}

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 1) {  // disposing issue with stylishs found thanks to Vcoc
        cm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {
            cm.sendSimple("嗨，我是#p1012117#，最迷人和时尚的设计师。如果你在找最漂亮的发型，别再看了！\r\n\#L0##i5150040##t5150040##l\r\n\#L1##i5150044##t5150044##l");
        } else if (status == 1) {
            if (selection == 0) {
                beauty = 1;
                cm.sendYesNo("如果你使用这张普通的优惠券，你的头发可能会变成一个随机的新样子…你还想用#b#t5150040##k，我无论如何都会为你做的。但别忘了，这是随机的！");
            } else {
                beauty = 2;

                hairnew = Array();
                // hairnew.push(30000)
                if (cm.getPlayer().getGender() == 0) {
                    for (var i = 0; i < mhair_v.length; i++) {
                        // pushIfItemExists(hairnew, mhair_v[i] + parseInt(cm.getPlayer().getHair() % 10));
                        pushIfItemExists(hairnew, mhair_v[i]);
                    }
                } else {
                    for (var i = 0; i < fhair_v.length; i++) {
                        // pushIfItemExists(hairnew, fhair_v[i] + parseInt(cm.getPlayer().getHair() % 10));
                        pushIfItemExists(hairnew, fhair_v[i]);
                    }
                }

                cm.sendStyle("使用特殊优惠券，您可以选择您的发型将成为。选择最能给你带来愉悦的发型…", hairnew);
            }
        } else if (status == 2) {
            if (beauty == 1) {
                if (cm.haveItem(5150040) == true) {
                    hairnew = Array();
                    if (cm.getPlayer().getGender() == 0) {
                        for (var i = 0; i < mhair_r.length; i++) {
                            pushIfItemExists(hairnew, mhair_r[i] + parseInt(cm.getPlayer().getHair() % 10));
                        }
                    } else {
                        for (var i = 0; i < fhair_r.length; i++) {
                            pushIfItemExists(hairnew, fhair_r[i] + parseInt(cm.getPlayer().getHair() % 10));
                        }
                    }

                    cm.gainItem(5150040, -1);
                    cm.setHair(hairnew[Math.floor(Math.random() * hairnew.length)]);
                    cm.sendOk("Enjoy your new and improved hairstyle!");
                } else {
                    cm.sendOk("嗯……看来你没有我们指定的优惠券……恐怕没有它我不能给你理发。我很抱歉。。。");
                }
            } else if (beauty == 2) {
                if (cm.haveItem(5150044) == true) {
                    cm.gainItem(5150044, -1);
                    cm.setHair(hairnew[selection]);
                    cm.sendOk("享受你新的和改进的发型！");
                } else {
                    cm.sendOk("嗯……看来你没有我们指定的优惠券……恐怕没有它我不能给你理发。我很抱歉。。。");
                }
            }

            cm.dispose();
        }
    }
}
