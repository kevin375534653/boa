/*
 脚本：结婚殿堂
 */

var status = 0
var victim;
var  ring = 1112001; 
     

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {

            //cm.sendOk("感谢你的光临！");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
    if (status == 1) {
        cm.sendSimple("这里结婚的红鸾宫门口。你想做什么？\r\n#b" +
                "#L1#进入红鸾宫#l\r\n" +
	"#L2#我想离婚#l\r\n" +
                "#L3#我想回家了#l");
    } else if (status == 2) {
        if (selection == 1) {
            if (cm.getParty() == null) {
                cm.sendNext("请与你的另一半组队后找我。");
                cm.dispose();
                return;
            }
            if (!cm.isLeader()) {
                cm.sendNext("请让队长与我对话。");
                cm.dispose();
                return;
            }

            var gender = cm.getPlayer().getGender();
            var mapId = cm.getPlayer().getMapId();
            var next = true;
            var party = cm.getPlayer().getParty().getMembers();
            var it = party.iterator();
            while (it.hasNext()) {
                var cPlayer = it.next();
                victim = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
				if (victim == null) {
				cm.sendNext("请确认您跟您的的另外一半在这一张地图");
                cm.dispose();
                return;
				}
                if (victim.getId() != cm.getPlayer().getId() && (party.size() > 2 || victim == null || victim.getMapId() != mapId || victim.getGender() == gender)) {
                    next = false;
                    break;
                }
            }

            if (!next) {
                cm.sendNext("请确认您跟您的的另一半在这一张地图、不同性別、并且都在线以及队伍中沒有其他人");
                cm.dispose();
                return;
            }
			
            if (!victim.hasEquipped(ring) || !cm.getPlayer().hasEquipped(ring)) {
                cm.sendNext("您或您的另一半沒有装备#v" + ring + "##z" + ring + "#哦");
                cm.dispose();
                return;
            }
            cm.sendYesNo("确定要与" + victim.getName() + "结婚吗?");
        } else if (selection == 2) {
            var map = cm.getSavedLocation("WORLDTOUR");
            cm.warp(map, 0);
			cm.clearSavedLocation("WORLDTOUR");
            cm.dispose();
				return;
        } else if (selection == 3) {
           if (cm.isMarried()) {
			cm.sendEngageProposal();//离婚
		   }
						//cm.breakMarriage();//
			//cm.sendEngageProposal(victim.getName(),1112001);
           cm.dispose();
				return;

        }
	} else if (status == 3) {
			var gender = cm.getPlayer().getGender();
            var mapId = cm.getPlayer().getMapId();
            var next = true;
            var party = cm.getPlayer().getParty().getMembers();
            var it = party.iterator();
            while (it.hasNext()) {
                var cPlayer = it.next();
                victim = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
                if (victim.getId() != cm.getPlayer().getId() && (party.size() > 2 || victim == null || victim.getMapId() != mapId || victim.getGender() == gender)) {
                    next = false;
                    break;
                }
            }
	if (cm.sendEngageProposal(victim.getName(),1112804)) {	
		 em = cm.getEventManager("Kingjiehuns");
		  var eli = em.getEligibleParty(cm.getParty());
                if(eli.size() > 0) {
                    if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                        cm.sendOk("目前正在举办婚礼.你可以参加他们的婚礼或者等他们结束在继续");
						 cm.dispose();
				return;
                        } else {
                        cm.setPartnerId(victim.getName(),1112804);
                    } 
				}else {
                 cm.sendOk("请确保你的队伍中只有你与你的伴侣在队伍中.");
				  cm.dispose();
				return;
                     } 
	}
	cm.dispose();
	}
}
}