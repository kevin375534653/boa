package server.fishing;

import java.util.List;
import java.util.Random;
import java.util.Timer;
import java.util.TimerTask;
import tools.PacketCreator;
import constants.game.ExpTable;
import java.math.BigDecimal;

import client.Character;

public class Fishing {

    private int fishBait = 2300000; //鱼饵
    //private int fishPond = 741000201; //定制钓鱼地图
    private String[] fishPond = {
        "741000200",
        "749050502"
    }; //定制钓鱼地图
    private int fishChair = 3011000; //椅子
    private int fishMinTime = 10; //最短耗时
    private int fishMaxTime = 360; //最长耗时
    private int success = 0; //钓鱼成功基数
    private int raise = 0; //钓鱼成功随机数
    private int tRaise = 1; //奖励类型随机数
    private int rRaise = 1; //奖励概率随机数
    private int lRaise = 1; //奖励随机数

    Timer timer = new Timer();

    public void doFishing(Character player, int itemId) {

        //if(player.getMapId()==fishPond) { //钓鱼场地图ID
        if (player.getMapId() == Integer.parseInt(fishPond[0]) || player.getMapId() == Integer.parseInt(fishPond[1])) { //钓鱼场地图ID
            if (itemId == fishChair) { //椅子ID
                if (player.getAbstractPlayerInteraction().hasItem(fishBait)) { //鱼饵ID
                    player.dropMessage(5, "钓鱼中。");
                    player.setFishing(true);

                    timer.schedule(new TimerTask() {
                        public void run() {
                            toFishing(player);
                            //System.out.println("6666666");
                        }
                    }, 5000, 1000); //5秒后开始执行，每1秒执行1次
                } else {
                    player.dropMessage(5, "鱼饵不足，请及时补充。");
                }
            } else {
                player.dropMessage(5, "你必须使用专用椅子才能钓鱼。");
            }
        } else if (itemId == fishChair) {
            player.dropMessage(5, "你不在钓鱼场。");
        }
    }

    public void toFishing(Character player) {
        if (player.isFishing()) {
            if (player.getAbstractPlayerInteraction().hasItem(fishBait)) {
                if (raise == 0) {
                    raise = (fishMinTime + new Random().nextInt(fishMaxTime - 9));
                }
                if (success == raise) {
                    player.getAbstractPlayerInteraction().gainItem(fishBait, (short) - 1);

                    tRaise = (1 + new Random().nextInt(1000));

                    if(tRaise < 2){
                        tRaise = 10;//传说道具
                    } else if(tRaise < 100){
                        tRaise = 11;//稀有道具
                    } else if(tRaise < 400){
                        tRaise = 12;//普通道具
                    } else {
                        tRaise = 13;//垃圾道具百分之60
                    }

//                    if (tRaise < 10) { //百分之10几率出点券
//                        tRaise = 2;
//                    } else if (tRaise < 30) { //百分之20几率出金币
//                        tRaise = 3;
//                    } else if (tRaise < 50) { //百分之20几率出经验
//                        tRaise = 4;
//                    } else {
//                        tRaise = 1; //百分之50几率出道具
//                    }

                    rRaise = (1 + new Random().nextInt(70));

                    List< List< Integer>> fr = player.getFishingRewards(tRaise, rRaise);
                    if (fr.size() == 0) {
                        player.dropMessage(5, "奖励设置有误，请联系管理员。");
                        return;
                    } else {
                        lRaise = new Random().nextInt(fr.size());
                    }

                    /*
                    System.out.println("------------------");
                    System.out.println(tRaise);
                    System.out.println(rRaise);
                    System.out.println(lRaise);
                    System.out.println(fr.size());
                    System.out.println("------------------");
                     */
                    switch (tRaise) {

                        case 1: //道具类奖励
                            //System.out.println(fr.get(lRaise).get(0));
                            player.getAbstractPlayerInteraction().gainItem(fr.get(lRaise).get(0), fr.get(lRaise).get(1).shortValue());
                            break;
                        case 2: //点券类奖励
                            player.getCashShop().gainCash(1, fr.get(lRaise).get(1));
                            player.dropMessage(5, "恭喜你！在鱼池中获得了" + fr.get(lRaise).get(1) + "点券。");
                            break;
                        case 3: //金币类奖励
                            player.gainMeso(fr.get(lRaise).get(1));
                            break;
                        /*case 4://旧的经验值奖励
                        player.gainExp(fr.get(lRaise).get(1));
                        break;
                        }*/
                        case 4: //经验值奖励
                            BigDecimal needExp = new BigDecimal(ExpTable.getExpNeededForLevel(player.getLevel()));
                            BigDecimal Percentage = BigDecimal.valueOf((float) fr.get(lRaise).get(1) / 100);
                            int exp = (int) needExp.multiply(Percentage).doubleValue();

                            player.gainExp(exp);
                            break;
                        case 10: //道具类奖励
                            player.getAbstractPlayerInteraction().gainItem(fr.get(lRaise).get(0), fr.get(lRaise).get(1).shortValue());
                            break;
                        case 11: //道具类奖励
                            player.getAbstractPlayerInteraction().gainItem(fr.get(lRaise).get(0), fr.get(lRaise).get(1).shortValue());
                            break;
                        case 12: //道具类奖励
                            player.getAbstractPlayerInteraction().gainItem(fr.get(lRaise).get(0), fr.get(lRaise).get(1).shortValue());
                            break;
                        case 13: //道具类奖励
                            //System.out.println(fr.get(lRaise).get(0));

                            player.getAbstractPlayerInteraction().gainItem(fr.get(lRaise).get(0), fr.get(lRaise).get(1).shortValue());
                            break;

                    }
                    String fishingEffect = "Effect/BasicEff.img/Catch/Success";
                    player.sendPacket(PacketCreator.showInfo(fishingEffect)); //钓鱼特效
                    player.dropMessage(5, "本次钓鱼耗时 " + success + " 秒。");
                    /**钓鱼活跃*/
                    int dyHy = player.getActiveByName("m_dy_hy_");/**获取当前杀怪活跃*/
                    if (dyHy < 100){
                        /**给钓鱼活跃*/
                        player.insertActive("m_dy_hy_",10,0);
                        player.dropMessage(5,"获得钓鱼活跃10点");
                    }

                    raise = 0;
                    success = 10;
                } else {
                    success++;
                }
            } else {
                player.dropMessage(5, "鱼饵不足，请及时补充。");
                stopFishing();
            }
        } else {
            stopFishing();
        }
    }

    public void stopFishing() {
        timer.cancel();
    }
}
