/*
    This file is part of the HeavenMS MapleStory Server, commands OdinMS-based
    Copyleft (L) 2016 - 2019 RonanLana

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
   @Author: Arthur L - Refactored command content into modules
*/
package client.command.commands.gm2;

import client.Character;
import client.Client;
import client.command.Command;
import constants.id.MobId;
import net.server.Server;
import server.life.LifeFactory;
import tools.PacketCreator;

public class BombCommand extends Command {
    {
        setDescription("轰炸玩家，造成伤害.");
    }

    @Override
    public void execute(Client c, String[] params) {
        Character player = c.getPlayer();
        if (params.length > 0) {
            Character victim = c.getWorldServer().getPlayerStorage().getCharacterByName(params[0]);
            if (victim != null) {
                victim.getMap().spawnMonsterOnGroundBelow(LifeFactory.getMonster(MobId.ARPQ_BOMB), victim.getPosition());
                Server.getInstance().broadcastGMMessage(c.getWorld(), PacketCreator.serverNotice(5, player.getName() + " 使用 !轰炸 对 " + victim.getName()));
            } else {
                player.message("玩家 '" + params[0] + "' 不在这个世界.");
            }
        } else {
            player.getMap().spawnMonsterOnGroundBelow(LifeFactory.getMonster(MobId.ARPQ_BOMB), player.getPosition());
        }
    }
}
