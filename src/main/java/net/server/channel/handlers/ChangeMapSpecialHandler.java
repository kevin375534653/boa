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
package net.server.channel.handlers;

import client.Character;
import client.Client;
import net.AbstractPacketHandler;
import net.packet.InPacket;
import server.Trade;
import server.Trade.TradeResult;
import server.maps.Portal;
import tools.PacketCreator;

public final class ChangeMapSpecialHandler extends AbstractPacketHandler {
    @Override
    public final void handlePacket(InPacket p, Client c) {

        short s = p.readByte();
        String startwp = p.readString();
        short t = p.readShort();
        Portal portal = c.getPlayer().getMap().getPortal(startwp);
//        c.sendPacket(PacketCreator.enableActions());

        /**发送传送门信息*/
        if(c.getPlayer().isGM()){
            c.getPlayer().dropMessage(5,"script:"+portal.getScriptName()+" name:"+portal.getName());
        }
        if (portal == null || c.getPlayer().portalDelay() > currentServerTime() || c.getPlayer().getBlockedPortals().contains(portal.getScriptName())) {
            c.sendPacket(PacketCreator.enableActions());
            return;
        }
        if (c.getPlayer().isChangingMaps() || c.getPlayer().isBanned()) {
            c.sendPacket(PacketCreator.enableActions());
            return;
        }
        if (c.getPlayer().getTrade() != null) {
            Trade.cancelTrade(c.getPlayer(), TradeResult.UNSUCCESSFUL_ANOTHER_MAP);
        }
        portal.enterPortal(c);
    }
}
