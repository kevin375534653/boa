/*
	Crysta; - Kamuma (Neo Tokyo Teleporter)
*/

function start() {
    switch (cm.getMapId()) {
	case 802000211:
	    if (cm.getQuestStatus(4686) == 2) {
		cm.gainItem(4032181, 100);
	    } else {
		cm.showEffect(false, "quest/party/clear");
		cm.playSound(false, "Party1/Clear");
		cm.gainItem(4032181, 100);
		cm.forceCompleteQuest(4686);
	    }
		cm.warp(802000212, 0);
	    cm.dispose();
	    break;
	case 802000313:
	    if (cm.getQuestStatus(4689) == 2) {
		cm.gainItem(4032181, 50);
	    } else {
		cm.showEffect(false, "quest/party/clear");
		cm.playSound(false, "Party1/Clear");
		cm.gainItem(4032181, 50);
		cm.forceCompleteQuest(4689);
	    }
		cm.warp(802000312, 0);
	    cm.dispose();
	    break;
	case 802000411:
	    if (cm.getQuestStatus(4693) == 2) {
		cm.gainItem(4032181, 100);
	    } else {
		cm.showEffect(false, "quest/party/clear");
		cm.playSound(false, "Party1/Clear");
		cm.gainItem(4032181, 100);
		cm.forceCompleteQuest(4693);
	    }
		cm.warp(802000412, 0);
	    cm.dispose();
	    break;
	case 802000611:
	    if (cm.getQuestStatus(4696) == 2) {
		cm.gainItem(4032181, 100);
	    } else {
		cm.showEffect(false, "quest/party/clear");
		cm.playSound(false, "Party1/Clear");
		cm.gainItem(4032181, 100);
		cm.forceCompleteQuest(4696);
	    }
		cm.warp(802000612, 0);
	    cm.dispose();
	    break;
	case 802000111:
	    if (cm.getQuestStatus(4698) == 2) {
		cm.gainItem(4032181, 100);
	    } else {
		cm.showEffect(false, "quest/party/clear");
		cm.playSound(false, "Party1/Clear");
		cm.gainItem(4032181, 100);
		cm.forceCompleteQuest(4698);
	    }
		cm.warp(802000112, 0);
	    cm.dispose();
	    break;
	case 802000711:
	    if (cm.getQuestStatus(50003) == 2) {
		cm.gainItem(4032181, 100);
		if (!cm.haveItem(4032361)) {
		    cm.gainItem(4032361,1);
		}
	    } else {
		cm.showEffect(false, "quest/party/clear");
		cm.playSound(false, "Party1/Clear");
		cm.gainItem(4032181, 100);
		if (!cm.haveItem(4032361)) {
		    cm.gainItem(4032361,1);
		}
		cm.forceCompleteQuest(50003);
	    }
		cm.warp(802000712, 0);
	    cm.dispose();
	    break;
	case 802000803:
	    if (cm.getQuestStatus(50016) == 2) {
		cm.gainItem(4032181, 100);

	    } else {
		cm.showEffect(false, "quest/party/clear");
		cm.playSound(false, "Party1/Clear");
		cm.gainItem(4032181, 100);
		cm.forceCompleteQuest(50016);
	    }
		cm.warp(802000804, 0);
	    cm.dispose();
	    break;
	default:
        cm.sendSimple("我负责扩大亚洲的巨大优势。 如果你得到了时空扭曲亚洲的许可，那么我就会把你送到紫盘古的过去或未来。 \r #b#L0#未来 - 东京台场，2100#l \r #L1#未来 - 东京公园，2095#l \r #L2#未来 - 东京秋叶原，2102#l \r #L3#未来 - 东京天空，2102#l \r #L4#未来 - 涩谷，东京，2102#l \r #L5#未来 - 六本木购物中心顶层，东京，2102#l \r #L7#未来 - 2102 六本木购物中心 - 顶部 楼层#l \r #L6#过去 - 忍者城堡#l");
	    break;
    }
}

function action(mode, type, selection) {
    if (selection != 6) {

	var questid = true, mapid = 0, portal = 0;

	switch (selection) {
	    case 0:
		questid = cm.getQuestStatus(4682) == 2;
		mapid = 802000200;
		portal = 2;
		break;
	    case 1:
		questid = cm.getQuestStatus(4687) == 2;
		mapid = 802000300;
		portal = 0;
		break;
	    case 2:
		questid = cm.getQuestStatus(4690) == 2;
		mapid = 802000500;
		portal = 0;
		break;
	    case 3:
		questid = cm.getQuestStatus(4694) == 2;
		mapid = 802000600;
		portal = 0;
		break;
	    case 4:
		questid = cm.getQuestStatus(50001) == 2;
		mapid = 802000700;
		portal = 0;
		break;
	    case 5:
		questid = cm.getQuestStatus(50015) == 2;
		mapid = 802000800;
		portal = 0;
		break;
	    case 7:
		questid = cm.getQuestStatus(50017) == 2;
		mapid = 802000820;
		portal = 0;
		break;
	}
	if (questid && mapid > 0) {
	    cm.warp(mapid, portal);
	} else {
	    cm.sendOk("我认为亚洲还没有允许你使用时间扭曲。 先完成你的任务再向亚洲报到");
	}
    } else {
	cm.warp(800040000,0);
    }
    cm.dispose();
}