/**副本活跃数据配置*/
var partyTaskList = Array(
    //等级,副本名称,次数,活跃点数,记录名字
    Array(21,"废弃都市",2,50,"p_fqds_hy_"),
    Array(30,"嘉年华",2,50,"p_jnh_hy_"),
    Array(35,"玩具副本",1,50,"p_wjc_hy_"),
    Array(45,"毒物森林",2,50,"p_dwsl_hy_"),
    Array(55,"海盗副本",5,50,"p_bcthd_hy_"),
    Array(71,"男女副本",2,50,"p_nvfb_hy_"),
    Array(85,"女神塔",2,50,"p_vst_hy_")
    // Array(85,"金字塔",2,50,"p_vst_hy_"),
    // Array(85,"竞技场",2,50,"p_vst_hy_"),
    // Array(85,"列车平台",2,50,"p_vst_hy_"),
    // Array(85,"武陵道场",2,50,"p_vst_hy_"),
    // Array(85,"强化特训",2,50,"p_vst_hy_"),
    // Array(85,"公会对抗",2,50,"p_vst_hy_"),

);


function enter(pi) {
    var eim = pi.getEventInstance();


    if (eim.isEventCleared()) {
        if (pi.isEventLeader()) {
            pi.playPortalSound();
            /**获取玩家列表*/
            var characterList = eim.getPlayers();

            eim.warpEventTeam(930000800);


            /**通用活跃点数加成奖励*/
            for(var i = 0;i<characterList.size();i++){
                var player = characterList.get(i);
                if(player.getActiveByName(partyTaskList[3][4]) < partyTaskList[3][3]){
                    var hyd = partyTaskList[3][3]/partyTaskList[3][2];
                    player.insertActive(partyTaskList[3][4],hyd,1);
                    player.dropMessage(5,"获得"+partyTaskList[3][1]+"活跃点:"+hyd);
                    player.gainExp(140000);
                }

            }
            return true;
        } else {
            pi.playerMessage(5, "等待队长进入。");
            return false;
        }
    } else {
        pi.playerMessage(5, "请消灭怪物。");
        return false;
    }
}