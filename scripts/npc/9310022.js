/*
 便捷功能
 */
var fbmc = "[冒险岛]-(删除道具)";//副本名称
var status;
var text;
var selstatus = -1;
var itemList = new Array();
var inventoryType;
var deleteSlot;
var deleteQuantity;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode <= 0) {
        cm.dispose();
        return;
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {
            //这里可以添加判断
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";
            }
	    var fbmv = "["+cm.getServerName()+"]";//副本名称
        text = "#k\t\t\t   #r#v4030001#" + fbmv + "#v4030001##d#l\r\n";
        text += "\t\t\t#L1##v4030001#       装备栏      #v4030001##l\r\n";
        text += "\t\t\t#L2##v4030001#       消耗栏      #v4030001##l\r\n";
        text += "\t\t\t#L4##v4030001#       其它栏      #v4030001##l\r\n";
        text += "\t\t\t#L3##v4030001#       设置栏      #v4030001##l\r\n";
        text += "\t\t\t#L5##v4030001#       特殊栏      #v4030001##l\r\n";
		text += "\t\t\t#L6##v4030001#       批量删除    #v4030001##l\r\n";
		text += "\t\t\t#L7##v4030001#     删除异常道具  #v4030001##l\r\n";
        cm.sendSimple(text);
		
    } else if (status == 1) {
		if (selection == 6) {
			cm.dispose();
            cm.openNpc(9010000, "48");
			return;
		}
		if (selection == 7) {
			cm.dispose();
            cm.openNpc(9010000, "16");
			return;
		}
        inventoryType = selection;
        itemList = cm.getInventory(inventoryType).list().iterator();
		var fbmb = "["+cm.getServerName()+"]-(选择道具)";//副本名称
        text = "#k\t\t\t   #r#v4030001#" + fbmb + "#v4030001##l\r\n\r\n#e- 请选择要回收的道具 -#n\r\n\r\n#b";
        var indexof = 1;
        while (itemList.hasNext()) {
            var item = itemList.next();
            text += "#L" + item.getPosition() + "##v" + item.getItemId() + "#";
            if (indexof > 1 && indexof % 5 == 0) {
                text += "\r\n";
            }
            indexof++;
        }
		if (indexof > 1) {
        cm.sendSimple(text);
		} else {
		cm.sendOk("没有需要删除的道具");	
		}
    } else if (status == 2) {
        var item = cm.getInventory(inventoryType).getItem(selection);
        deleteSlot = selection;
        deleteQuantity = item.getQuantity();
		var fbmn = "["+cm.getServerName()+"]-(请确认)";//副本名称
        text = "#k\t\t\t   #r#v4030001#" + fbmn + "#v4030001##l\r\n\r\n#e确定要回收#r#v" + item.getItemId() + "##z" + item.getItemId() + "# " + deleteQuantity + "个 #k吗？";
        cm.sendNextPrev(text);
    } else if (status == 3) {
        cm.removeSlot(inventoryType, deleteSlot, deleteQuantity);
        cm.sendOk("回收成功，祝你游戏愉快~");
		//cm.喇叭(1, "玩家：[" + cm.getPlayer().getName() + "]道具清理成功~~~！");
        status = 0;
		cm.dispose();
		
		   
	   }
    }
}
