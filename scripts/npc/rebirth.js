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
/* Rebirth NPC
    @author Ronan
    @author wejrox
*/
var status;
var jobId = 0;

function start() {
    status = -1;
    const YamlConfig = Java.type('config.YamlConfig');
    if (!YamlConfig.config.server.USE_REBIRTH_SYSTEM) {
        cm.sendOk("该服务器未启用转生，你是如何到达这里的？");
        cm.dispose();
        return;
    }
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status === 0) {
        cm.sendNext("当你想转生时就来找我吧。 您目前总共有 #r" + cm.getChar().getReborns() + " #k转生。");
    } else if (status === 1) {
        cm.sendSimple("今天你想让我做什么： \r\n \r\n #L0##b我想转生！#l \r\n #L1##b 现在什么都不做...#k#l");
    } else if (status === 2) {
        if (selection === 0) {
            if (cm.getChar().getLevel() === cm.getChar().getMaxClassLevel()) {
                cm.sendSimple("我明白了...您想走哪条路？ \r\n\r\n #L0##b探索者（初级）#l \r\n #L1##b天鹅骑士（贵族）#l \r\n #L2##b阿兰（传奇）#l");
            } else {
                cm.sendOk("看起来你的旅程还没有结束...等你水平达到了" + cm.getChar().getMaxClassLevel()+"再回来吧。");
                cm.dispose();
            }
        } else if (selection === 1) {
            cm.sendOk("再见！")
            cm.dispose();
        }
    } else if (status === 3) {
        // 0 => beginner, 1000 => noblesse, 2000 => legend
        // makes this very easy :-)
        jobId = selection * 1000;

        var job = "";
        if (selection === 0) job = "初学者";
        else if (selection === 1) job = "贵族";
        else if (selection === 2) job = "传奇";
        cm.sendYesNo("你确定要转生为" + job + "?");
    }
    else if (status === 4 && type === 1) {
        cm.getChar().executeRebornAsId(jobId);
        cm.sendOk("现在你已经转生了。 总共#r" + cm.getChar().getReborns() + "#k次转生");
        cm.dispose();
    }
}