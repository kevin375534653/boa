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
package client.command.commands.gm0;

import client.Character;
import client.Client;
import client.command.Command;
import constants.id.MapId;
import server.events.gm.Event;
import server.maps.FieldLimit;

public class JoinEventCommand extends Command {
    {
        setDescription("加入活动事件");
    }

    @Override
    public void execute(Client c, String[] params) {
        Character player = c.getPlayer();
        if (!FieldLimit.CANNOTMIGRATE.check(player.getMap().getFieldLimit())) {
            Event event = c.getChannelServer().getEvent();
            if (event != null) {
                if (event.getMapId() != player.getMapId()) {
                    if (event.getLimit() > 0) {
                        player.saveLocation("EVENT");

                        if (event.getMapId() == MapId.EVENT_COCONUT_HARVEST || event.getMapId() == MapId.EVENT_SNOWBALL_ENTRANCE) {
                            player.setTeam(event.getLimit() % 2);
                        }

                        event.minusLimit();

                        player.saveLocationOnWarp();
                        player.changeMap(event.getMapId());
                    } else {
                        player.dropMessage(5, "该事件的人数已达到上限");
                    }
                } else {
                    player.dropMessage(5, "您已参加事件.");
                }
            } else {
                player.dropMessage(5, "当前没有正在进行的事件.");
            }
        } else {
            player.dropMessage(5, "您当前所在的地图中无法加入活动.");
        }
    }
}
