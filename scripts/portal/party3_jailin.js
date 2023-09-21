var leverSequenceExit = false;

function enterLeverSequence(pi) {
    var map = pi.getMap();

    var jailn = (pi.getMap().getId() / 10) % 10;
    var maxToggles = (jailn == 1) ? 7 : 6;

    var mapProp = pi.getEventInstance().getProperty("jail" + jailn);

    if (mapProp == null) {
        var seq = 0;

        for (var i = 1; i <= maxToggles; i++) {
            if (Math.random() < 0.5) {
                seq += (1 << i);
            }
        }

        pi.getEventInstance().setProperty("jail" + jailn, seq);
        mapProp = seq;
    }

    mapProp = Number(mapProp);
    if (mapProp != 0) {
        var countMiss = 0;
        for (var i = 1; i <= maxToggles; i++) {
            if (!(pi.getMap().getReactorByName("lever" + i).getState() == (mapProp >> i) % 2)) {
                countMiss++;
            }
        }

        const PacketCreator = Java.type('tools.PacketCreator');
        if (countMiss > 0) {
            map.broadcastMessage(PacketCreator.showEffect("quest/party/wrong_kor"));
            map.broadcastMessage(PacketCreator.playSound("Party1/Failed"));

            pi.playerMessage(5, "需要攻击正确的控制杆顺序才能通过。" + countMiss + "放错地方了。");
            return false;
        }

        map.broadcastMessage(PacketCreator.showEffect("quest/party/clear"));
        map.broadcastMessage(PacketCreator.playSound("Party1/Clear"));
        pi.getEventInstance().setProperty("jail" + jailn, "0");
    }

    pi.playPortalSound();
    pi.warp(pi.getMapId() + 2, 0);
    return true;
}

function enterNoMobs(pi) {
    var map = pi.getMap();
    var mobcount = map.countMonster(9300044);

    if (mobcount > 0) {
        pi.playerMessage(5, "在继续之前，请使用控制杆来击败所有的威胁。");
        return false;
    } else {
        pi.playPortalSound();
        pi.warp(pi.getMapId() + 2, 0);
        return true;
    }
}

function enter(pi) {
    var ret;
    if (leverSequenceExit) {
        ret = enterLeverSequence(pi);
    } else {
        ret = enterNoMobs(pi);
    }

    return ret;
}