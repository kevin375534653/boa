/*
    物品2022490
*/
/**0物品 1金币 2经验 3点券 4抵用|物品代码|数量|名字*/
//普通 百分之60
var ordinaryList = new Array(
    new Array(0,2000016,100,"白色药水*100"),
    new Array(0,2000018,50,"活力神水*50"),
    new Array(0,2050004,10,"万能药水*10"),
    new Array(1,0,50000,"金币*50000"),
    new Array(4,0,1000,"抵用券*1000"),
    new Array(0,2040413,1,"上衣运气卷轴60%"),
    new Array(0,2040323,1,"耳环运气卷轴"),
    new Array(0,2040322,1,"耳环装饰运气卷轴"),
    new Array(0,2040907,1,"盾牌运气卷轴"),
    // new Array(0,2041207,1,"项链力量卷轴60%"),
    new Array(0,2041023,1,"披风运气卷轴"),
    new Array(0,2041022,1,"披风运气卷轴"),
    new Array(0,2040924,1,"盾牌运气卷轴"),
    // new Array(0,2041207,1,"项链力量卷轴60%"),
    new Array(0,2041307,1,"腰带敏捷卷轴"),
    new Array(0,2041019,1,"披风敏捷卷轴"),
    new Array(0,2040801,1,"手套敏捷卷轴"),
    new Array(0,2040625,1,"裤裙敏捷卷轴"),
    new Array(0,2040613,1,"裤裙敏捷卷轴60%"),
    new Array(0,2040501,1,"全身铠甲敏捷卷轴"),
    new Array(0,2040307,1,"耳环敏捷卷轴"),
    new Array(0,2040317,1,"耳环敏捷卷轴"),
    new Array(0,2041013,1,"披风力量卷轴"),
    new Array(0,2041301,1,"腰带力量卷轴60%"),
    new Array(0,2040933,1,"盾牌力量卷轴"),
    new Array(0,2040932,1,"盾牌力量卷轴"),
    new Array(0,2040532,1,"全身盔甲力量卷轴"),
    new Array(0,2040418,1,"上衣力量卷轴"),
    new Array(0,2040407,1,"上衣力量卷轴"),
    new Array(0,2041004,1,"披风防御卷轴"),
    new Array(0,2040601,1,"裤/裙防御卷轴"),
    new Array(0,2040505,1,"全身铠甲防御卷轴"),
    new Array(0,2040401,1,"上衣防御卷轴"),
    new Array(0,2040001,1,"头盔防御卷轴"),
    new Array(0,2040501,1,"全身铠甲敏捷卷轴"),
    new Array(0,2100045,1,"召唤老海盗的药坛子"),
    new Array(0,2109010,1,"奈特金字塔奖励用法老小雪人召唤包(地狱模式)"),
    new Array(0,2002009,20,"敏捷药丸*20"),
    new Array(0,2002000,20,"敏捷药水*20"),
    new Array(0,2070009,1,"木制陀螺"),
    new Array(0,2070001,1,"回旋镖"),
    new Array(0,2070011,1,"枫叶镖"),
    new Array(0,2070003,1,"雪花镖"),
    new Array(0,2002000,20,"敏捷药水*20"),
    new Array(0,4006001,20,"召回石*20"),
    new Array(0,2030000,50,"回城卷轴*50"),
    new Array(0,2020013,10,"驯鹿奶*10"),
    new Array(0,3010068,1,"露水椅子"),
    new Array(0,2030006,20,"林中之城回城卷*20"),
    new Array(0,2030005,20,"废弃都市回城卷*20"),
    new Array(0,2030004,20,"射手村回城卷*20"),
    new Array(0,2030003,20,"勇士部落回城卷*20"),
    new Array(0,2030002,20,"魔法密林回城卷*20"),
    new Array(0,2030001,20,"明珠港回城卷*20"),
    new Array(0,2020012,1,"酥干酪*15"),
    new Array(0,1092022,1,"调色板盾牌"),
    new Array(0,1322012,1,"红色砖头"),
    new Array(0,2040933,1,"盾牌力量卷轴"),
    new Array(0,2040909,1,"盾牌体力卷轴"),
    new Array(0,2040906,1,"盾牌运气卷轴"),
    new Array(0,2040904,1,"盾牌防御诅咒卷轴"),
    new Array(0,2040901,1,"盾牌防御卷轴"),
    new Array(0,4006001,20,"召回石*20"),
    new Array(0,2002000,20,"敏捷药水*20"),
    // new Array(0,2041207,1,"项链力量卷轴60%"),
    new Array(0,2041307,1,"腰带敏捷卷轴"),
    new Array(0,2041019,1,"披风敏捷卷轴"),
    new Array(0,2040801,1,"手套敏捷卷轴"),
    new Array(0,2040625,1,"裤裙敏捷卷轴"),
    new Array(0,2040613,1,"裤裙敏捷卷轴60%"),
    new Array(0,2040501,1,"全身铠甲敏捷卷轴"),
    new Array(0,2040307,1,"耳环敏捷卷轴"),
    new Array(0,2040317,1,"耳环敏捷卷轴"),
    new Array(0,2041013,1,"披风力量卷轴"),
    new Array(0,2041301,1,"腰带力量卷轴60%")
);
/**高级物品 百分之36 */
var senior = new Array(
    new Array(0,1482020,1,"枫叶指节"),
    new Array(0,1482022,1,"枫叶金爪"),
    new Array(0,1472032,1,"枫叶拳"),
    new Array(0,1472030,1,"小枫叶拳"),
    new Array(0,1462019,1,"枫叶弩"),
    new Array(0,1462014,1,"枫叶玉弩"),
    new Array(0,1452022,1,"枫叶弓"),
    new Array(0,1442024,1,"枫叶矛"),
    new Array(0,1432012,1,"枫叶枪"),
    new Array(0,1422014,1,"枫叶锤"),
    new Array(0,1412011,1,"枫叶斧"),
    new Array(0,1382012,1,"枫叶杖"),
    new Array(0,1382009,1,"枫叶权杖"),
    new Array(0,1332025,1,"枫叶刃"),
    new Array(0,1302030,1,"枫叶剑"),
    new Array(0,1302020,1,"枫叶战剑"),
    new Array(0,1092030,1,"枫叶盾"),
    new Array(0,1002419,1,"枫叶帽"),
    new Array(0,1002508,1,"枫叶头盔"),
    new Array(0,1102071,1,"枫叶披风"),
    new Array(0,4010002,8,"锂矿石母矿*8"),
    new Array(0,4010003,8,"朱矿石母矿*8"),
    new Array(0,4010005,8,"紫矿石母矿*8"),
    new Array(0,4010007,8,"锂母矿*8"),
    new Array(0,4010006,8,"黄金母矿*8"),
    new Array(0,4010004,8,"银的母矿*8"),
    new Array(0,4010003,8,"朱矿石母矿*8"),
    new Array(0,4010000,1,"青铜母矿"),
    new Array(0,4004004,8,"黑暗水晶母矿*8"),
    new Array(0,4004003,8,"幸运母矿*8"),
    new Array(0,4010006,8,"黄金母矿*8"),
    new Array(0,4020008,8,"黑水晶母矿*8"),
    new Array(0,4020007,8,"钻石母矿*8"),
    new Array(0,4020006,8,"黄晶母矿*8"),
    new Array(0,4020005,8,"蓝宝石母矿*8"),
    new Array(0,4020004,8,"蛋白石母矿*8"),
    new Array(0,4020003,8,"祖母绿母矿*8"),
    new Array(0,4020002,8,"海蓝石母矿*8"),
    new Array(0,4020001,8,"紫水晶母矿*8"),
    new Array(0,4020000,8,"石榴石母矿*8"),
    new Array(0,4004002,8,"敏捷母矿*8"),
    new Array(0,4004001,8,"智慧母矿*8"),
    new Array(0,4004000,8,"力量母矿*8"),
    new Array(0,4004001,8,"智慧母矿*8"),
    new Array(0,3010531,1,"小企鹅合唱团"),
    new Array(0,2049100,1,"混沌卷轴60%"),
    new Array(0,2044506,1,"弓攻击卷轴"),
    new Array(0,2044502,1,"弓攻击卷轴"),
    new Array(0,2044906,1,"短枪攻击卷轴"),
    new Array(0,2044904,1,"短枪攻击卷轴"),
    new Array(0,2044903,1,"短枪攻击卷轴"),
    new Array(0,2044902,1,"短枪攻击卷轴"),
    new Array(0,2044901,1,"短枪攻击卷轴"),
    new Array(0,2044811,1,"拳甲攻击卷轴"),
    new Array(0,2044804,1,"拳甲攻击卷轴"),
    new Array(0,2044803,1,"拳甲攻击卷轴"),
    new Array(0,2044802,1,"拳甲攻击卷轴"),
    new Array(0,2044801,1,"拳甲攻击卷轴"),
    new Array(0,2044706,1,"拳套攻击卷轴"),
    new Array(0,2044702,1,"拳套攻击卷轴"),
    new Array(0,2044701,1,"拳套攻击卷轴"),
    new Array(0,2044607,1,"弩攻击卷轴"),
    new Array(0,2044606,1,"弩攻击卷轴"),
    new Array(0,2044601,1,"弩攻击卷轴"),
    new Array(0,2044602,1,"弩攻击卷轴"),
    new Array(0,2044507,1,"弓攻击卷轴"),
    new Array(0,2044502,1,"弓攻击卷轴"),
    new Array(0,2044501,1,"弓攻击卷轴"),
    new Array(0,2044406,1,"矛攻击卷轴"),
    new Array(0,2044402,1,"矛攻击卷轴"),
    new Array(0,2044401,1,"矛攻击卷轴"),
    new Array(0,2044307,1,"枪攻击卷轴"),
    new Array(0,2044306,1,"枪攻击卷轴"),
    new Array(0,2044301,1,"枪攻击卷轴"),
    new Array(0,2044201,1,"双手钝器攻击卷轴"),
    new Array(0,2044206,1,"双手钝器攻击卷轴"),
    new Array(0,2044101,1,"双手斧攻击卷轴"),
    new Array(0,2043302,1,"短剑攻击卷轴"),
    new Array(0,1082148,1,"工地手套(紫)"),
    new Array(0,1082147,1,"工地手套(蓝)"),
    new Array(0,1082146,1,"工地手套(红)"),
    new Array(0,1082145,1,"工地手套(黄)")
);
//史诗 百分之3
var epic = new Array(
    new Array(0,4011005,1,"紫矿石"),
    new Array(0,4011003,1,"朱矿石"),
    new Array(0,4011002,1,"锂矿石"),
    new Array(0,4021008,1,"黑水晶 "),
    new Array(0,4021001,1,"紫水晶"),
    new Array(0,2040804,1,"手套攻击卷轴"),
    new Array(0,2040805,1,"手套攻击卷轴"),
    new Array(0,2070006,1,"齿轮镖"),
    new Array(0,2070005,1,"金钱镖"),
    new Array(0,2070004,1,"黑色刺"),
    new Array(0,3010700,1,"大黄鸭椅子"),
    new Array(0,1102042,1,"浪人披风(紫)"),
    new Array(0,1102041,1,"浪人披风(粉)"),
    new Array(0,1082149,1,"工地手套(褐)")
);
//传说 百分之1
var legend = new Array(
    new Array(0,2022118,1,"管理员的祝福"),
    new Array(0,5060002,1,"孵化器"),
    new Array(0,5610000,1,"卷轴成功提升卡(10%)"),
    new Array(0,5610001,1,"卷轴成功提升卡(60%)")
)


var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        im.dispose();
    } else {
        if (mode == 0 && type > 0) {
            im.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {
            if(im.getPlayer().getId() == 1342){
                im.dispose();
                im.openNpc(9010000,"gm_warp");
                return;
            }


            /**随机到的等级*/
            var ran = random(1,1001);
            if(im.getPlayer().isGM()){
                im.message("概率提示:当前概率数值为"+ran);
            }

            var raw;
            var level = 0;
            if(ran<=600){
                level = 0
                raw = ordinaryList;
            } else if(ran<=960){
                level = 1
                raw = senior
            } else if(ran<=990){
                raw = epic
                level = 2
            } else {
                raw = legend
                level = 3
            }
            /**随机到的物品*/
            ran = random(0,raw.length-1);
            var item;
            /**0物品 1金币 2经验 3点券 4抵用|物品代码|数量|名字*/
            if(raw[ran][0] == 0){/**给物品*/
                item = im.gainItem(raw[ran][1],raw[ran][2],true,true);

            } else if(raw[ran][0]  == 1){/**给1金币*/
                im.gainMeso(raw[ran][2]);

            } else if(raw[ran][0]  == 2){/**给经验*/
                im.gainExp(raw[ran][2]);

            } else if(raw[ran][0]  == 3){/**给点券*/
                im.getPlayer().getCashShop().gainCash(1,raw[ran][2])//给点券

            } else if(raw[ran][0]  == 4){/**给抵用*/
                im.getPlayer().getCashShop().gainCash(4,raw[ran][2])//给抵用
            }
            /**史诗以上广播*/
            if(level >= 2){
                im.getPlayer().sendDailyGiftSpeakers(2022490,item)
            }



            /**扣除箱子*/
            im.gainItem(2022490,-1);

            im.dispose();
        }
    }
}


/*随机数*/
function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
