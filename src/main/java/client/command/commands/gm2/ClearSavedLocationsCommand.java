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
import server.maps.SavedLocationType;

public class ClearSavedLocationsCommand extends Command {
    {
        setDescription("清除玩家保存的位置.");
    }

    @Override
    public void execute(Client c, String[] params) {
        Character player = c.getPlayer(), victim;

        if (params.length > 0) {
            victim = c.getWorldServer().getPlayerStorage().getCharacterByName(params[0]);
            if (victim == null) {
                player.message("玩家 '" + params[0] + "' 找不到他.");
                return;
            }
        } else {
            victim = c.getPlayer();
        }

        for (SavedLocationType type : SavedLocationType.values()) {
            victim.clearSavedLocation(type);
        }

        player.message("Cleared " + params[0] + "'s saved locations.");
    }
}