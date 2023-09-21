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

import client.Client;
import client.command.Command;
import net.server.Server;

import static java.util.concurrent.TimeUnit.*;

public class UptimeCommand extends Command {
    {
        setDescription("显示服务器在线时间.");
    }

    @Override
    public void execute(Client c, String[] params) {
        long milliseconds = System.currentTimeMillis() - Server.uptime;
        int seconds = (int) (milliseconds / SECONDS.toMillis(1)) % 60;
        int minutes = (int) ((milliseconds / MINUTES.toMillis(1)) % 60);
        int hours = (int) ((milliseconds / HOURS.toMillis(1)) % 24);
        int days = (int) ((milliseconds / DAYS.toMillis(1)));
        c.getPlayer().yellowMessage("服务器已联机 " + days + " 日 " + hours + " 时 " + minutes + " 分 " + seconds + " 秒.");
    }
}
