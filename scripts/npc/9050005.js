var status = 0;
var itemList =   
Array(   
Array(1402014, 100, 1, 1), //温度计,概率，数量，发不发喇叭
Array(1302063, 100, 1, 1), //火焰刀
Array(1302106, 100, 1, 1), //燃烧的冰焰刀
Array(1432013, 100, 1, 1), //南瓜枪
Array(1402044, 100, 1, 1), //南瓜灯笼
Array(1002699, 100, 1, 1), //南瓜帽子
Array(1322051, 100, 1, 1), //七夕
Array(1402013, 100, 1, 1), //白日剑
Array(1332053, 100, 1, 1), //烧烤串
Array(1332021, 100, 1, 1), //乌龙茶
Array(1050100, 100, 1, 1), //蓝浴巾
Array(1051098, 100, 1, 1), //红浴巾
Array(1050127, 100, 1, 1), //浴巾
Array(1702199, 800, 1, 1), //彩色雨伞

Array(1032004, 800, 1, 1), //垃圾
Array(1032005, 800, 1, 1), //绿雨伞
Array(1032006, 800, 1, 1), //黑雨伞
Array(1032007, 800, 1, 1), //褐雨伞
Array(1032008, 800, 1, 1), //紫雨伞
Array(1032009, 800, 1, 1), //红雨伞
Array(1032012, 800, 1, 1), //红色鞭子
Array(1032017, 800, 1, 1), //光线鞭子
Array(1032018, 800, 1, 1), //蔓藤鞭子
Array(1032019, 800, 1, 1), //领路灯
Array(1032022, 800, 1, 1), //圣贤短杖
Array(1032023, 800, 1, 1), //圣诞树手杖
Array(1032025, 800, 1, 1), //圣诞树
Array(1032026, 800, 1, 1), //黄色雨伞

Array(1102000, 800, 1, 1), //蔓藤鞭子
Array(1102001, 800, 1, 1), //领路灯

Array(1462007, 800, 1, 1), //圣诞树
Array(1462008, 800, 1, 1), //弓手

Array(1302016, 800, 1, 1), //黄色雨伞
Array(1302027, 800, 1, 1), //绿雨伞
Array(1302026, 800, 1, 1), //黑雨伞
Array(1302029, 800, 1, 1), //褐雨伞
Array(1302028, 800, 1, 1), //紫雨伞
Array(1302025, 800, 1, 1), //红雨伞
Array(1302013, 800, 1, 1), //红色鞭子
Array(1302049, 800, 1, 1), //光线鞭子
Array(1302061, 800, 1, 1), //蔓藤鞭子
Array(1372017, 800, 1, 1), //领路灯
Array(1372031, 800, 1, 1), //圣贤短杖
Array(1432046, 800, 1, 1), //圣诞树手杖
Array(1332032, 800, 1, 1), //圣诞树

Array(1402029, 800, 1, 1), //鬼刺狼牙棒
Array(1382037, 800, 1, 1), //偃月之杖
Array(1332030, 800, 1, 1), //团扇
Array(1432017, 800, 1, 1), //滑雪板
Array(1432018, 800, 1, 1), //滑雪板
Array(1432015, 800, 1, 1), //滑雪板
Array(1432016, 800, 1, 1), //滑雪板
Array(1442046, 100, 1, 1), //滑雪板
Array(1032028, 800, 1, 1), //黑水晶耳环
Array(1032027, 800, 1, 1), //黄水晶耳环
Array(1032026, 100, 1, 1), //红水晶耳环
Array(1072239, 800, 1, 1), //黄色钉鞋
Array(1072238, 800, 1, 1), //紫色钉鞋
Array(1102085, 800, 1, 1), //黄色盖亚
Array(1102084, 100, 1, 1), //紫色盖亚
Array(1102086, 100, 1, 1), //粉色盖亚
Array(1462020, 100, 1, 1), //烈焰之弩
Array(1382013, 100, 1, 1), //烈焰之杖
Array(1332028, 100, 1, 1), //烈焰之刃
Array(1302032, 100, 1, 1), //烈焰之剑
Array(1092050, 100, 1, 1), //冷艳剑盾
Array(1092049, 0, 1, 1), //热情剑盾
Array(1002939, 10, 1, 1), //安全帽
Array(1432037, 10, 1, 1), //枫叶大将棋
Array(1082150, 800, 1, 1), //工地手套
Array(1082145, 800, 1, 1), //工地手套
Array(1082146, 800, 1, 1), //工地手套
Array(1082147, 800, 1, 1), //工地手套
Array(1082148, 800, 1, 1), //工地手套
Array(1082149, 100, 1, 1), //褐色工地
Array(1122017, 10, 1, 1), //精灵吊坠
Array(1122133, 50, 1, 1), //封印的冒险之心
Array(1122134, 50, 1, 1), //封印的冒险之心
Array(1122135, 50, 1, 1), //封印的冒险之心
Array(1122136, 50, 1, 1), //封印的冒险之心

Array(1122029, 20, 1, 1), //苏醒的冒险之心
Array(1122030, 20, 1, 1), //苏醒的冒险之心
Array(1122031, 20, 1, 1), //苏醒的冒险之心
Array(1122032, 20, 1, 1), //苏醒的冒险之心

Array(1302021, 800, 1, 1), //橡皮榔头
Array(1302024, 800, 1, 1), //废报纸卷
Array(1002418, 800, 1, 1), //废报纸头盔
Array(1302019, 800, 1, 1), //无名剑
Array(1312013, 800, 1, 1), //判官笔
Array(1312014, 800, 1, 1), //阎王笔
Array(1322021, 100, 1, 1), //黑游泳圈
Array(1322023, 800, 1, 1), //蓝花纹游泳圈
Array(1322022, 800, 1, 1), //红花纹游泳圈
Array(1322024, 800, 1, 1), //紫游泳圈
Array(1322025, 800, 1, 1), //救命游泳圈
Array(1322026, 800, 1, 1), //彩虹游泳圈
Array(1322012, 800, 1, 1), //红色砖头
Array(1322031, 800, 1, 1), //葵花宝典
Array(1322027, 100, 1, 1), //平底锅



Array(3015304, 5, 1, 1), //大水车
Array(1902055, 1, 1, 1), //海盗船
Array(1912048, 1, 1, 1), //海盗船鞍子 
Array(1902063, 1, 1, 1), //御剑飞行
Array(1912056, 1, 1, 1), //御剑飞行 

Array(1402037, 10, 1, 1), //龙背
Array(1372040, 50, 1, 1), //剧毒
Array(1372041, 50, 1, 1), //寒冰之杖
Array(1372042, 50, 1, 1), //狂雷之杖
Array(1372039, 50, 1, 1), //爆炎之杖
Array(1372042, 80, 1, 1), //雷灵珠短杖
Array(1372042, 80, 1, 1), //火灵珠短杖
Array(1372042, 80, 1, 1), //冰灵珠短杖
Array(1372042, 80, 1, 1), //毒灵珠短杖

Array(1382045, 80, 1, 1), //火灵珠长杖
Array(1382047, 80, 1, 1), //冰灵珠长杖
Array(1382046, 80, 1, 1), //毒灵珠长杖
Array(1382048, 80, 1, 1), //雷灵珠长杖

Array(1132242, 30, 1, 1), //革命腰带
Array(1003946, 30, 1, 1), //革命帽子
Array(1102612, 30, 1, 1), //革命披风
Array(1082540, 30, 1, 1), //革命手套
Array(1052647, 30, 1, 1), //革命战斗服
Array(1012170, 20, 1, 1), //恐怖鬼娃的伤口----90级
Array(1012171, 10, 1, 1), //恐怖鬼娃的伤口----100级
Array(1012172, 5, 1, 1), //恐怖鬼娃的伤口----130级
Array(1012173, 1, 1, 1), //恐怖鬼娃的伤口----150级
Array(1132040, 50, 1, 1), //至尊不速之客腰带
Array(1112439, 50, 1, 1), //至尊不速之客戒指
Array(1032084, 50, 1, 1), //至尊不速之客耳环
Array(1122085, 50, 1, 1), //至尊不速之客项链

Array(4251402, 20, 1, 1), //高等黑暗水晶
Array(4251102, 20, 1, 1), //高等敏捷水晶
Array(4251002, 20, 1, 1), //高等幸运水晶
Array(4250902, 20, 1, 1), //高等智慧水晶
Array(4250802, 20, 1, 1), //高等力量水晶
Array(2070011, 30, 1, 1), //水晶标
Array(2070013, 10, 1, 1), //黄金标

Array(2044003, 5, 1, 1), //	双手剑攻击必成卷
Array(2044103, 5, 1, 1), //2044103	双手斧攻击必成卷
Array(2044303, 5, 1, 1), //枪攻击必成卷
Array(2044203, 5, 1, 1), //双手钝器攻击必成卷
Array(2043003, 5, 1, 1), //单手剑攻击必成卷
Array(2043303, 5, 1, 1), //短剑攻击必成卷
Array(2043203, 5, 1, 1), //单手钝器攻击必成卷
Array(2043103, 5, 1, 1), //单手斧攻击必成卷
Array(2043803, 5, 1, 1), //长杖攻击必成卷
Array(2044503, 5, 1, 1), //弓攻击必成卷
Array(2044403, 5, 1, 1), //矛攻击必成卷
Array(2043703, 5, 1, 1), //短杖攻击必成卷
Array(2044703, 5, 1, 1), //拳套攻击必成卷
Array(2044603, 5, 1, 1), //弩攻击必成卷

Array(1102280, 50, 1, 1), //阿加雷斯血色披风
Array(1082300, 50, 1, 1), //阿加雷斯血色手套
Array(1052319, 50, 1, 1), //阿加雷斯血色锁子甲
Array(1003177, 50, 1, 1), //阿加雷斯血色头箍
Array(1072490, 50, 1, 1), //阿加雷斯血色鞋
	
Array(1102281, 50, 1, 1), //艾里格斯血色披风	
Array(1082301, 50, 1, 1), //艾里格斯血色手套	
Array(1052320, 50, 1, 1), //艾里格斯血色锁子甲
Array(1003178, 50, 1, 1), //艾里格斯血色头箍	
Array(1072491, 50, 1, 1), //艾里格斯血色鞋

Array(1102282, 50, 1, 1), //伊布斯血色披风	
Array(1082302, 50, 1, 1), //伊布斯血色手套	
Array(1052321, 50, 1, 1), //伊布斯血色锁子甲
Array(1003179, 50, 1, 1), //伊布斯血色头箍
Array(1072492, 50, 1, 1), //伊布斯血色鞋

Array(1102283, 50, 1, 1), //赫尔巴斯血色披风
Array(1082303, 50, 1, 1), //赫尔巴斯血色手套
Array(1052322, 50, 1, 1), //赫尔巴斯血色锁子甲	
Array(1003180, 50, 1, 1), //赫尔巴斯血色头箍	
Array(1072493, 50, 1, 1) //赫尔巴斯血色鞋	
);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendOk("不想使用吗？…我的肚子里有各类#b奇特座椅或卷轴、装备、新奇道具#k哦！");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        if (cm.haveItem(5220040)) {
            cm.sendYesNo("冒险岛转蛋机中有各类#b装备、卷轴或稀有新奇的道具#k噢！使用“#b#t5220040##k”就可以交换. 游戏商城中的“其他”－“游戏”区里有噢。 假如不买转蛋券的话，是不可以使用我的。现在要玩转蛋机么? ");
        } else {
            cm.sendOk("你背包里有#b#t5220040##k吗?");
            cm.dispose();
        }
    } else if (status == 1) {
        var chance = Math.floor(Math.random() * 800);
        var finalitem = Array();
        for (var i = 0; i < itemList.length; i++) {
            if (itemList[i][1] >= chance) {
                finalitem.push(itemList[i]);
            }
        }
        if (finalitem.length != 0) {
            var item;
            var random = new java.util.Random();
            var finalchance = random.nextInt(finalitem.length);
            var itemId = finalitem[finalchance][0];
            var quantity = finalitem[finalchance][2];
            var notice = finalitem[finalchance][3];
            item = cm.gainGachaponItem(itemId, quantity, "玩具城飞天猪", notice);
            if (item != -1) {
                cm.gainItem(5220040, -1);
                cm.sendOk("你获得了 #b#t" + item + "##k " + quantity + "个。");
            } else {
                cm.sendOk("你确实有#b#v5220040##k吗？如果是，请你确认在背包的装备，消耗，其他窗口中是否有一格以上的空间。");
            }
            cm.dispose();
        } else {
            cm.sendOk("今天的运气可真差，什么都没有拿到。");
            cm.gainItem(5220040, -1);
             cm.dispose();
        }
    }
}