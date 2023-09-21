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
import client.inventory.InventoryType;
import client.inventory.manipulator.InventoryManipulator;
import client.processor.action.BuybackProcessor;
import constants.id.ItemId;
import tools.PacketCreator;

public class BuyBackCommand extends Command {
    {
        setDescription("如果复活卡死了使用此复活 消耗一个原地复活术。");
    }

    @Override
    public void execute(Client c, String[] params) {
        if(c.getPlayer().getHp() < 1){
            /**是否拥有复活术*/
            if(c.getPlayer().haveItemWithId(ItemId.WHEEL_OF_FORTUNE, false)){
                c.getPlayer().updateHp(50);
                InventoryManipulator.removeById(c, InventoryType.CASH, ItemId.WHEEL_OF_FORTUNE, 1, true, false);
                c.getPlayer().sendPacket(PacketCreator.showWheelsLeft(c.getPlayer().getItemQuantity(ItemId.WHEEL_OF_FORTUNE, false)));
            } else {
                c.getPlayer().dropMessage(5,"原地复活术已经没有了！");
            }
        }
//        if (params.length < 1) {
//            c.getPlayer().yellowMessage("Syntax: @复活 <信息|现在>");
//            return;
//        }
//
//        if (params[0].contentEquals("现在")) {
//            BuybackProcessor.processBuyback(c);
//        } else {
//            c.getPlayer().showBuybackInfo();
//        }
    }
}
