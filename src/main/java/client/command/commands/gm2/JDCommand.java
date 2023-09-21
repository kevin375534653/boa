package client.command.commands.gm2;

import cache.Cache;
import client.Character;
import client.Client;
import client.command.Command;

public class JDCommand extends Command {
    {
        setDescription("给所有消耗物品重新充满.");
    }
    @Override
    public void execute(Client client, String[] params) {
        Character victim = client.getChannelServer().getPlayerStorage().getCharacterByName(params[0]);
        if(victim != null){
            Cache.hjdcj.put(victim.getId(), Integer.valueOf(params[1]));
            client.getPlayer().dropMessage(5,"设置成功");
        }

    }
}
