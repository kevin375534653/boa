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
import net.server.Server;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import tools.PacketCreator;
import tools.Randomizer;

public class GmCommand extends Command {
    {
        setDescription("向管理员发送消息.");
    }

    private static final Logger log = LoggerFactory.getLogger(GmCommand.class);

    @Override
    public void execute(Client c, String[] params) {
        String[] tips = {
                "请仅在紧急情况下或报告某人时使用@gm.",
                "要报告错误或提出建议，请使用论坛。",
                "请不要使用@gm询问gm是否在线",
                "不要问你是否能得到帮助，只需陈述你的问题.",
                "不要说“我有一个bug要报告”，只需说明即可.",
        };
        Character player = c.getPlayer();
        if (params.length < 1 || params[0].length() < 3) { // #goodbye 'hi'
            player.dropMessage(5, "你的信息太短了。请提供尽可能多的细节.");
            return;
        }
        String message = player.getLastCommandMessage();
        Server.getInstance().broadcastGMMessage(c.getWorld(), PacketCreator.sendYellowTip("[GM 消息]:" + Character.makeMapleReadable(player.getName()) + ": " + message));
        Server.getInstance().broadcastGMMessage(c.getWorld(), PacketCreator.serverNotice(1, message));
        log.info("{}: {}", Character.makeMapleReadable(player.getName()), message);
        player.dropMessage(5, "你有一个消息 '" + message + "' 已发送给GM.");
        player.dropMessage(5, tips[Randomizer.nextInt(tips.length)]);
    }
}
