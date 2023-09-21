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

package client.autoban;

import client.Character;
import config.YamlConfig;
import net.server.Server;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import tools.PacketCreator;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import static java.util.concurrent.TimeUnit.MINUTES;
import static java.util.concurrent.TimeUnit.SECONDS;

/**
 * @author kevintjuh93
 */
public enum AutobanFactory {


    怪物数量,
    GENERAL,
    固定伤害,
    攻击外挂(15, MINUTES.toMillis(1)),
    距离外挂(10, MINUTES.toMillis(2)),
    传送门距离(5, SECONDS.toMillis(30)),
    PACKET_EDIT,
    ACC_HACK,
    CREATION_GENERATOR,
    高血量治疗,
    快速治疗(15),
    快速MP愈合(20, SECONDS.toMillis(30)),
    百宝箱经验,
    TUBI(20, SECONDS.toMillis(15)),
    SHORT_ITEM_VAC,
    ITEM_VAC,
    FAST_ITEM_PICKUP(5, SECONDS.toMillis(30)),
    快速进攻(10, SECONDS.toMillis(30)),
    锁MP(25, SECONDS.toMillis(30));

    private static final Logger log = LoggerFactory.getLogger(AutobanFactory.class);
    private static final Set<Integer> ignoredChrIds = new HashSet<>();

    private final int points;
    private final long expiretime;

    AutobanFactory() {
        this(1, -1);
    }

    AutobanFactory(int points) {
        this.points = points;
        this.expiretime = -1;
    }

    AutobanFactory(int points, long expire) {
        this.points = points;
        this.expiretime = expire;
    }

    public int getMaximum() {
        return points;
    }

    public long getExpire() {
        return expiretime;
    }

    public void addPoint(AutobanManager ban, String reason) {
        ban.addPoint(this, reason);
    }

    public void alert(Character chr, String reason) {
        if (YamlConfig.config.server.USE_AUTOBAN) {
            if (chr != null && isIgnored(chr.getId())) {
                return;
            }
            Server.getInstance().broadcastGMMessage((chr != null ? chr.getWorld() : 0), PacketCreator.sendYellowTip((chr != null ? Character.makeMapleReadable(chr.getName()) : "") + " 疑似 " + this.name() + " " + reason));
        }
        if (YamlConfig.config.server.USE_AUTOBAN_LOG) {
            final String chrName = chr != null ? Character.makeMapleReadable(chr.getName()) : "";
            log.info("可疑玩家 - 角色 {} 原因 {}-{}", chrName, this.name(), reason);
//            Server.getInstance().broadcastGMMessage(chr.getWorld(), PacketCreator.sendYellowTip("可疑玩家 - 角色 "+chrName+" 原因 "+this.name()+"-"+reason));
        }
    }

    public void autoban(Character chr, String value) {
        if (YamlConfig.config.server.USE_AUTOBAN) {
            Server.getInstance().broadcastGMMessage(chr.getWorld(), PacketCreator.sendYellowTip("自动封号 (" + this.name() + ": " + value + ")"));
            chr.autoban("自动封号 (" + this.name() + ": " + value + ")");
            //chr.sendPolice("You will be disconnected for (" + this.name() + ": " + value + ")");
        }
    }

    /**
     * Toggle ignored status for a character id.
     * An ignored character will not trigger GM alerts.
     *
     * @return new status. true if the chrId is now ignored, otherwise false.
     */
    public static boolean toggleIgnored(int chrId) {
        if (ignoredChrIds.contains(chrId)) {
            ignoredChrIds.remove(chrId);
            return false;
        } else {
            ignoredChrIds.add(chrId);
            return true;
        }
    }

    private static boolean isIgnored(int chrId) {
        return ignoredChrIds.contains(chrId);
    }

    public static Collection<Integer> getIgnoredChrIds() {
        return ignoredChrIds;
    }
}
