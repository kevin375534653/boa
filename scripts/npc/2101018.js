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
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  
    See the GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
	NPC NAME: Cesar (1)
	NPC ID: 2101018
	Author: Vcoc
	Function: AriantPQ
*/

status = -1;
function start() {
    if((cm.getPlayer().getLevel() < 19 || cm.getPlayer().getLevel() > 30) && !cm.getPlayer().isGM()){
        cm.sendNext("级别在20~30的斗士才能参加竞技赛。");
        cm.dispose();
        return;
    }
    action(1,0,0);
}

function action(mode, type, selection){
    status++;
    if (status == 4){
        cm.getPlayer().saveLocation("MIRROR");
        cm.warp(980010000, 3);
        cm.dispose();
    }
    if(mode != 1){
        if(mode == 0 && type == 0)
            status -= 2;
        else{
            cm.dispose();
            return;
        }
    }
    if (status == 0)
        cm.sendNext("这次阿里安特为了冒险岛的勇士们准备了一个大的庆祝活动。这就是#b阿里安特竞技赛#k。");
    else if (status == 1)
        cm.sendNextPrev("阿里安特竞技赛是较量与怪兽的打斗能力的大会。不仅仅是简单的打猎，还需#b减少一定体力，吸收宝石#k才行。#b获得最多宝石的斗士可以获得胜利#k。");
    else if (status == 2)
        cm.sendSimple("希望你是一个坚强而勇敢的#b斗士#k，你想参加这个#b竞技赛#k吗？！\r\n#b#L0#我很愿意参加这个伟大的竞技赛#l");
    else if (status == 3)
        cm.sendNext("好吧，现在我要送你去竞技场。我想看到你的胜利。");
}