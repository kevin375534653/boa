


var status = 0;
var xx = "#fEffect/ItemEff.img/1049000/0/0#"
var 信封未拆 = "#fEffect/BasicEff.img/FindPrize/Success/0#";
var 信封已拆 = "#fEffect/BasicEff.img/FindPrize/Success/11#";
var 金币 = "#fUI/UIWindow.img/Item/BtCoin/normal/0#";
var 叹号按钮 = "#fUI/UIWindow.img/Item/BtGather/mouseOver/0#";
var maxActive = 650; //最大活跃只能是490
var nowActive = 250; //当前活跃
var encourageList = Array(80,170,270,380,500,650) //奖励档数
var encourageCharList = Array("①","②","③","④","⑤","⑥","⑦","⑧") //单个字符展示
var btstat = Array("#k[未完成]#k","#b[未领取]#k","#r[已领取]#k")
var logName = "activeValueDay_"

// var ST_QUEST = Array(
//     /**等级, 任务类型 0物品 1杀怪, 物品id(杀怪的时候物品为0), 怪物id, 任务数量, 任务文字, 徒弟经验, 师傅师徒点*/
//     Array(1,1,0,100100,50,"[师徒任务]击杀蜗牛50只",50,5),//一级：杀怪任务 50只100100 完成后徒弟经验50 师傅师徒点 5点
//     Array(1,0,4000019,0,50,"[师徒任务]收集绿色蜗牛壳50个",50,5)//一级:收集 绿色蜗牛壳 50个 完成后徒弟经验50 师傅师徒点 5点
//
// );

var ST_QUEST = Array(
    /**等级, 任务类型 0物品 1杀怪, 物品id(杀怪的时候物品为0), 怪物id, 任务数量, 任务文字, 徒弟经验, 师傅师徒点*/
    Array(1,1,0,100100,50,"[师徒任务]击杀蜗牛50只",50,5),//一级：杀怪任务 50只100100 完成后徒弟经验50 师傅师徒点 5点
    Array(1,0,4000019,0,50,"[师徒任务]收集绿色蜗牛壳50个",50,5),//一级:收集 绿色蜗牛壳 50个 完成后徒弟经验50 师傅师徒点 5点

    Array(15,1,0,1110100,35,"[师徒任务]击杀绿蘑菇35只",8000,5),//十五级：杀怪任务 35只1110100 完成后徒弟经验8000           师傅师徒点 5点
    Array(15,1,0,1210103,30,"[师徒任务]击杀蓝水灵30只",8000,5),//十五级：杀怪任务 30只1210103 完成后徒弟经验8000           师傅师徒点 5点
    Array(15,1,0,1130100,35,"[师徒任务]击杀斧木妖35只",8000,5),//十五级：杀怪任务 35只1130100 完成后徒弟经验8000           师傅师徒点 5点
    Array(15,1,0,1140100,25,"[师徒任务]击杀古木树妖25只",8000,5),//十五级：杀怪任务 25只1140100 完成后徒弟经验8000         师傅师徒点 5点
    Array(20,1,0,2220100,35,"[师徒任务]击杀蓝蘑菇35只",20000,6),//二十级：杀怪任务 35只2220100 完成后徒弟经验20000         师傅师徒点 6点
    Array(20,1,0,9420005,35,"[师徒任务]击杀白公鸡35只",20000,6),//二十级：杀怪任务 35只9420005 完成后徒弟经验20000         师傅师徒点 6点
    // Array(20,1,0,9400503,40,"[师徒任务]击杀吸血蝙蝠40只",20000,6),//二十级：杀怪任务 40只9400503 完成后徒弟经验20000       师傅师徒点 6点
    Array(21,1,0,2130103,45,"[师徒任务]击杀青蛇45只",20000,6),//21级：杀怪任务 45只2130103 完成后徒弟经验20000           师傅师徒点 6点
    Array(22,1,0,2110200,35,"[师徒任务]击杀刺蘑菇35只",21000,6),//22级：杀怪任务 35只2110200 完成后徒弟经验21000         师傅师徒点6点
    Array(22,1,0,2130100,40,"[师徒任务]击杀黑斧木妖40只",21000,6),//22级：杀怪任务 40只2130100 完成后徒弟经验21000       师傅师徒点 6点
    Array(22,1,0,2230108,40,"[师徒任务]击杀海胆40只",21000,6),//22级：杀怪任务 40只2230108 完成后徒弟经验21000           师傅师徒点 6点
    Array(22,1,0,9600002,40,"[师徒任务]击杀大头鸭40只",21000,6),//22级：杀怪任务 40只9600002 完成后徒弟经验21000           师傅师徒点 6点
    Array(23,1,0,2230103,40,"[师徒任务]击杀绿蜘蛛40只",22000,6),//23级：杀怪任务 40只2230103 完成后徒弟经验22000          师傅师徒点 6点
    Array(23,1,0,5200000,40,"[师徒任务]击杀小石球40只",23000,6),//23级：杀怪任务 40只5200000 完成后徒弟经验35000         师傅师徒点 6点
    Array(23,1,0,2230105,40,"[师徒任务]击杀小海马40只",23000,6),//23级：杀怪任务 40只2230105 完成后徒弟经验35000        师傅师徒点 6点
    Array(23,1,0,2230110,40,"[师徒任务]击杀木面怪人40只",24000,6),//23级：杀怪任务 40只2230110 完成后徒弟经验38000      师傅师徒点 6点
    Array(24,1,0,2230101,45,"[师徒任务]击杀僵尸蘑菇45只",24000,6),//24级：杀怪任务 45只2230101 完成后徒弟经验40000     师傅师徒点 6点
    Array(24,1,0,9600003,45,"[师徒任务]击杀绵羊45只",24000,6),//24级：杀怪任务 45只9600002 完成后徒弟经验40000     师傅师徒点 6点
    Array(24,1,0,2230102,45,"[师徒任务]击杀野猪40只",24000,6),//24级：杀怪任务 45只2230102 完成后徒弟经验40000           师傅师徒点 6点
    Array(24,1,0,2230107,45,"[师徒任务]击杀独角小丑鱼 45只",24000,6),//24级：杀怪任务 45只2230107 完成后徒弟经验40000  师傅师徒点 6点
    Array(24,1,0,2230111,45,"[师徒任务]击杀石面怪人45只",24000,6),//24级：杀怪任务 45只2230111 完成后徒弟经验40000      师傅师徒点 6点
    Array(25,1,0,2230100,45,"[师徒任务]击杀火独眼兽45只",40000,6),//25级：杀怪任务 45只2230100 完成后徒弟经验41000      师傅师徒点 6点
    Array(25,1,0,2230106,45,"[师徒任务]击杀大海马45只",40000,6),//25级：杀怪任务 45只2230106 完成后徒弟经验41000          师傅师徒点 6点
    Array(28,1,0,2230104,50,"[师徒任务]击杀红蜘蛛50只",70000,7),//28级：杀怪任务 50只2230104 完成后徒弟经验70000          师傅师徒点 7点
    Array(28,1,0,2230109,50,"[师徒任务]击杀蓝泡泡翻车鱼50只",70000,7),//28级：杀怪任务 50只2230109 完成后徒弟经验70000   师傅师徒点 7点
    Array(29,1,0,2230200,50,"[师徒任务]击杀花花青鲇鱼50只",75000,7),//29级：杀怪任务 50只2230200 完成后徒弟经验75000   师傅师徒点 7点
    Array(30,1,0,3000005,55,"[师徒任务]击杀玩具棕熊55只",85000,7),//30级：杀怪任务 55只3000005 完成后徒弟经验85000   师傅师徒点 7点
    Array(30,1,0,3000000,55,"[师徒任务]击杀石球55只",90000,7),//30级：杀怪任务 55只3000000 完成后徒弟经验90000        师傅师徒点 7点
    Array(30,1,0,5200001,55,"[师徒任务]击杀冰石球55只",90000,7),//30级：杀怪任务 55只5200001 完成后徒弟经验90000        师傅师徒点 7点
    Array(30,1,0,5200002,55,"[师徒任务]击杀火石球55只",90000,7),//30级：杀怪任务 55只5200002 完成后徒弟经验90000        师傅师徒点 7点
    Array(30,1,0,3000006,55,"[师徒任务]击杀大龙虾55只",90000,7),//30级：杀怪任务 55只3000006 完成后徒弟经验90000        师傅师徒点 7点
    Array(31,1,0,9400247,55,"[师徒任务]击杀打鼓兔子55只",95000,8),//31级：杀怪任务 55只9400247 完成后徒弟经验95000       师傅师徒点 8点
    Array(31,1,0,3230307,55,"[师徒任务]击杀飞行雀55只",95000,8),//31级：杀怪任务 55只3230307 完成后徒弟经验95000        师傅师徒点 8点
    Array(32,1,0,3110102,60,"[师徒任务]击杀玩具白鼠60只",110000,8),//32级：杀怪任务 60只3110102 完成后徒弟经验110000    师傅师徒点 8点
    Array(32,1,0,3210100,60,"[师徒任务]击杀火野猪60只",110000,8),//32级：杀怪任务 60只3210100 完成后徒弟经验110000    师傅师徒点 8点
    Array(32,1,0,3110100,60,"[师徒任务]击杀鳄鱼60只",110000,8),//32级：杀怪任务 60只3110100 完成后徒弟经验110000    师傅师徒点 8点
    Array(32,1,0,3230104,60,"[师徒任务]击杀胖球鱼60只",110000,8),//32级：杀怪任务 60只3230104 完成后徒弟经验110000    师傅师徒点 8点
    Array(33,1,0,3210200,60,"[师徒任务]击杀幼红独角狮60只",120000,8),//33级：杀怪任务 60只3210200 完成后徒弟经验120000    师傅师徒点 8点
    Array(33,1,0,3210202,60,"[师徒任务]击杀幼蓝独角狮60只",120000,8),//33级：杀怪任务 60只3210202 完成后徒弟经验120000    师傅师徒点 8点
    Array(34,1,0,3210204,60,"[师徒任务]击杀玩具鸭60只",140000,8),//34级：杀怪任务 60只3210204 完成后徒弟经验140000    师傅师徒点 8点
    Array(35,1,0,5400000,60,"[师徒任务]击杀小企鹅王60只",150000,8),//35级：杀怪任务 60只5400000 完成后徒弟经验150000    师傅师徒点 8点
    Array(35,1,0,3230100,60,"[师徒任务]击杀风独眼兽60只",150000,8),//35级：杀怪任务 60只3230100 完成后徒弟经验150000    师傅师徒点 8点
    Array(35,1,0,3230101,60,"[师徒任务]击杀小幽灵60只",150000,8),//35级：杀怪任务 60只3230101 完成后徒弟经验150000    师傅师徒点 8点
    Array(35,1,0,3230200,60,"[师徒任务]击杀星光精灵60只",150000,8),//35级：杀怪任务 60只3230200 完成后徒弟经验150000    师傅师徒点 8点
    Array(35,1,0,3230300,60,"[师徒任务]击杀幼魔精灵60只",150000,8),//35级：杀怪任务 60只3230300 完成后徒弟经验150000    师傅师徒点 8点
    Array(36,1,0,3210203,65,"[师徒任务]击杀玩具熊猫65只",170000,9),//36级：杀怪任务 65只3210203 完成后徒弟经验170000    师傅师徒点 9点
    Array(36,1,0,3210206,65,"[师徒任务]击杀直升机65只",170000,9),//36级：杀怪任务 65只3210206 完成后徒弟经验170000    师傅师徒点 9点
    Array(36,1,0,3210450,65,"[师徒任务]击杀潜水企鹅65只",170000,9),//36级：杀怪任务 65只3210450 完成后徒弟经验170000    师傅师徒点 9点
    Array(37,1,0,3230303,65,"[师徒任务]击杀玩具战机65只",190000,9),//37级：杀怪任务 65只3230303 完成后徒弟经验190000    师傅师徒点 9点
    Array(37,1,0,3210800,65,"[师徒任务]击杀猴子65只",190000,9),//37级：杀怪任务 65只3210800 完成后徒弟经验190000    师傅师徒点 9点
    Array(37,1,0,3230102,80,"[师徒任务]击杀红螃蟹80只",190000,9),//37级：杀怪任务 80只3230102 完成后徒弟经验190000    师傅师徒点 9点
    Array(38,1,0,3230103,80,"[师徒任务]击杀吹泡泡鱼皇80只",220000,9),//38级：杀怪任务 80只3230103 完成后徒弟经验220000    师傅师徒点 9点
    Array(38,1,0,3230304,80,"[师徒任务]击杀运输机80只",220000,9),//38级：杀怪任务 80只3230304 完成后徒弟经验220000    师傅师徒点 9点
    Array(39,1,0,3230305,80,"[师徒任务]击杀木马骑兵80只",240000,9),//39级：杀怪任务 80只3230304 完成后徒弟经验240000    师傅师徒点 9点
    Array(40,1,0,4230100,70,"[师徒任务]击杀冰独眼兽70只",260000,9),//40级：杀怪任务 70只4230100 完成后徒弟经验260000    师傅师徒点 9点
    Array(40,1,0,4230101,70,"[师徒任务]击杀僵尸猴70只",260000,9),//40级：杀怪任务 70只4230101 完成后徒弟经验260000    师傅师徒点 9点
    Array(41,1,0,4230112,70,"[师徒任务]击杀男机器人70只",300000,10),//41级：杀怪任务 70只4230112 完成后徒弟经验300000    师傅师徒点 10点
    Array(42,1,0,4130101,70,"[师徒任务]击杀乌龟70只",300000,10),//42级：杀怪任务 70只4130101 完成后徒弟经验320000    师傅师徒点 10点
    Array(42,1,0,4230124,70,"[师徒任务]击杀小海狮70只",300000,10),//42级：杀怪任务 70只4230124 完成后徒弟经验320000    师傅师徒点 10点
    Array(43,1,0,4230108,70,"[师徒任务]击杀小猎犬70只",370000,10),//43级：杀怪任务 70只4230108 完成后徒弟经验370000    师傅师徒点 10点
    Array(44,1,0,4230111,70,"[师徒任务]击杀女机器人70只",390000,10),//44级：杀怪任务 70只4230111 完成后徒弟经验390000   师傅师徒点 10点
    Array(44,1,0,4230125,70,"[师徒任务]击杀骷髅犬70只",390000,10),//44级：杀怪任务 70只4230125 完成后徒弟经验390000   师傅师徒点 10点
    Array(45,1,0,4230106,70,"[师徒任务]击杀月光精灵70只",430000,10),//45级：杀怪任务 70只4230106 完成后徒弟经验430000   师傅师徒点 10点
    Array(45,1,0,4130100,70,"[师徒任务]击杀土龙70只",430000,10),//45级：杀怪任务 70只4130100 完成后徒弟经验430000   师傅师徒点 10点
    Array(45,1,0,4230300,80,"[师徒任务]击杀月妙80只",430000,10),//45级：杀怪任务 80只4230300 完成后徒弟经验430000   师傅师徒点 10点
    Array(46,1,0,4230121,80,"[师徒任务]击杀外星章鱼激光棒80只",470000,10),//46级：杀怪任务 80只4230121 完成后徒弟经验470000 师傅师徒点 10点
    Array(47,1,0,4130102,80,"[师徒任务]击杀黑食人花80只",490000,10),//47级：杀怪任务 80只4130102 完成后徒弟经验490000 师傅师徒点 10点
    Array(47,1,0,4230126,80,"[师徒任务]击杀木乃伊犬80只",490000,10),//47级：杀怪任务 80只4230126 完成后徒弟经验490000 师傅师徒点 10点
    Array(48,1,0,4230102,80,"[师徒任务]击杀大幽灵80只",550000,10),//48级：杀怪任务 80只4130102 完成后徒弟经验550000 师傅师徒点 10点
    Array(48,1,0,4230104,85,"[师徒任务]击杀青螃蟹85只",550000,10),//48级：杀怪任务 85只4230104 完成后徒弟经验550000 师傅师徒点 10点
    Array(49,1,0,4240000,85,"[师徒任务]击杀白外星人司令85只",620000,10),//49级：杀怪任务 85只4240000 完成后徒弟经验620000 师傅师徒点 10点
    Array(50,1,0,5100000,85,"[师徒任务]击杀小白雪人85只",650000,10),//50级：杀怪任务 85只5100000 完成后徒弟经验650000 师傅师徒点 10点
    Array(50,1,0,5130100,85,"[师徒任务]击杀青龙85只",650000,10),//50级：杀怪任务 85只5130100 完成后徒弟经验650000 师傅师徒点10点
    Array(50,1,0,5100003,85,"[师徒任务]击杀小虎85只",650000,10),//50级：杀怪任务 85只5100003 完成后徒弟经验650000 师傅师徒点 10点
    Array(52,1,0,5130103,85,"[师徒任务]击杀黑鳄鱼85只",750000,11),//52级：杀怪任务 85只5130103 完成后徒弟经验750000 师傅师徒点 11点
    Array(52,1,0,5120000,85,"[师徒任务]击杀日光精灵85只",750000,11),//52级：杀怪任务 85只5120000 完成后徒弟经验750000 师傅师徒点 11点
    Array(53,1,0,5120001,85,"[师徒任务]击杀红独角狮85只",780000,11),//53级：杀怪任务 85只5120001 完成后徒弟经验780000 师傅师徒点 11点
    Array(53,1,0,5120002,85,"[师徒任务]击杀黄独角狮85只",780000,11),//53级：杀怪任务 85只5120002 完成后徒弟经验780000 师傅师徒点 11点
    Array(53,1,0,5120003,85,"[师徒任务]击杀黄独角狮85只",800000,11),//53级：杀怪任务 85只5120003 完成后徒弟经验800000 师傅师徒点 11点
    Array(53,1,0,5100005,85,"[师徒任务]击杀虎精85只",800000,11),//53级：杀怪任务 85只5100005 完成后徒弟经验800000 师傅师徒点 11点
    Array(55,1,0,5130104,85,"[师徒任务]击杀野狼85只",850000,11),//55级：杀怪任务 85只5130104 完成后徒弟经验850000 师傅师徒点 11点
    Array(55,1,0,5300100,60,"[师徒任务]击杀巫婆60只",850000,11),//55级：杀怪任务 60只5300100 完成后徒弟经验850000 师傅师徒点 11点
    Array(55,1,0,5130101,80,"[师徒任务]击杀石头人80只",850000,11),//55级：杀怪任务 80只5300101 完成后徒弟经验850000 师傅师徒点 11点
    Array(56,1,0,5100004,100,"[师徒任务]击杀三尾狐100只",900000,12),//56级：杀怪任务 100只5100004 完成后徒弟经验900000 师傅师徒点 12点
    Array(57,1,0,5130107,100,"[师徒任务]击杀僵尸100只",950000,12),//57级：杀怪任务 100只5130107 完成后徒弟经验950000 师傅师徒点 12点
    Array(58,1,0,5140000,100,"[师徒任务]击杀白狼80只",950000,12),//58级：杀怪任务 100只5140000 完成后徒弟经验950000 师傅师徒点 12点
    Array(59,1,0,5150000,80,"[师徒任务]击杀混种石头人80只",950000,12),//59级：杀怪任务 80只5150000 完成后徒弟经验970000 师傅师徒点 12点
    Array(60,1,0,6130100,80,"[师徒任务]击杀赤龙80只",950000,12),//60级：杀怪任务 80只6130100 完成后徒弟经验970000 师傅师徒点 12点
    Array(60,1,0,6130103,80,"[师徒任务]击杀企鹅王80只",970000,12),//60级：杀怪任务 80只6130103 完成后徒弟经验970000 师傅师徒点 12点
    /***/

    Array(15,0,4000012,1110100,35,"[师徒任务]收集绿蘑菇盖35个",8000,5),//十五级：收集 绿蘑菇盖35个 完成后徒弟经验8000           师傅师徒点 5点
    Array(15,0,4000037,1210103,30,"[师徒任务]收集蓝水灵大水珠30个",8000,5),//十五级：收集蓝水灵大水珠30个 完成后徒弟经验8000           师傅师徒点 5点
    Array(15,0,4000018,1130100,35,"[师徒任务]收集木块35个",8000,5),//十五级：收集木块35个 完成后徒弟经验8000           师傅师徒点 5点
    Array(15,0,4000195,1140100,25,"[师徒任务]收集苗木25个",8000,5),//十五级：收集苗木25个 完成后徒弟经验8000         师傅师徒点 5点
    Array(20,0,4000009,2220100,35,"[师徒任务]收集蓝蘑菇盖35个",20000,6),//二十级：收集蓝蘑菇盖35个 完成后徒弟经验20000         师傅师徒点 6点
    Array(20,0,4000042,9400503,40,"[师徒任务]收集蝙蝠翅膀40个",20000,6),//二十级：收集蝙蝠翅膀40个 完成后徒弟经验20000       师傅师徒点 6点
    Array(21,0,4000034,2130103,45,"[师徒任务]收集蛇皮45个",20000,6),//21级：收集蛇皮45个 完成后徒弟经验20000           师傅师徒点 6点
    Array(22,0,4000015,2110200,35,"[师徒任务]收集刺蘑菇盖35个",21000,6),//22级：收集刺蘑菇盖35个  完成后徒弟经验21000         师傅师徒点6点
    Array(22,0,4000215,2130100,40,"[师徒任务]收集斧头40个",21000,6),//22级：收集斧头40个 完成后徒弟经验21000       师傅师徒点 6点
    Array(22,0,4000160,2230108,40,"[师徒任务]收集刺针40个",21000,6),//22级：收集刺针40个 完成后徒弟经验21000           师傅师徒点 6点
    Array(23,0,4000083,5200000,40,"[师徒任务]收集小石球的石片40个",23000,6),//23级：收集小石球的石片40个 完成后徒弟经验35000         师傅师徒点 6点
    Array(23,0,4000161,2230105,40,"[师徒任务]收集海马的尾巴40个",23000,6),//23级：收集海马的尾巴40个 完成后徒弟经验35000        师傅师徒点 6点
    Array(23,0,4000196,2230110,40,"[师徒任务]收集木板40个",24000,6),//23级：收集木板40个 完成后徒弟经验38000      师傅师徒点 6点
    Array(24,0,4000008,2230101,45,"[师徒任务]收集道符45个",24000,6),//24级：收集道符45个 完成后徒弟经验40000     师傅师徒点 6点
    Array(24,0,4000020,2230102,45,"[师徒任务]收集野猪尖牙45个",24000,6),//24级：收集野猪尖牙45个 完成后徒弟经验40000           师傅师徒点 6点
    Array(24,0,4000197,2230111,45,"[师徒任务]收集石板45个",24000,6),//24级：收集石板45个 完成后徒弟经验40000      师傅师徒点 6点
    Array(25,0,4000007,2230100,45,"[师徒任务]收集火独眼兽之尾45个",40000,6),//25级：收集火独眼兽之尾45个 完成后徒弟经验41000      师傅师徒点 6点
    Array(30,0,4000063,3000000,55,"[师徒任务]收集石片55个",90000,7),//30级：收集石片55个 完成后徒弟经验90000        师傅师徒点 7点
    Array(30,0,4000084,5200001,55,"[师徒任务]收集冰石球的石片55个",90000,7),//30级：收集冰石球的石片55个 完成后徒弟经验90000        师傅师徒点 7点
    Array(30,0,4000085,5200002,55,"[师徒任务]收集火石球的石片55个",90000,7),//30级：收集火石球的石片55个完成后徒弟经验90000        师傅师徒点 7点
    Array(30,0,4000166,3000006,55,"[师徒任务]收集虾肉55个",90000,7),//30级：收集虾肉55个 完成后徒弟经验90000        师傅师徒点 7点
    Array(31,0,4000127,9400247,55,"[师徒任务]收集玩具鼓55个",95000,8),//31级：收集玩具鼓55个 完成后徒弟经验95000       师傅师徒点 8点
    Array(32,0,4000024,3210100,60,"[师徒任务]收集火野猪尖牙60个",110000,8),//32级：收集火野猪尖牙60个 完成后徒弟经验110000    师傅师徒点 8点
    Array(32,0,4000032,3110100,60,"[师徒任务]收集鳄鱼皮60个",110000,8),//32级：收集鳄鱼皮60个 完成后徒弟经验110000    师傅师徒点 8点
    Array(32,0,4000167,3230104,60,"[师徒任务]收集坚硬的鳞片60个",110000,8),//32级：收集坚硬的鳞片60个 完成后徒弟经验110000    师傅师徒点 8点
    Array(33,0,4000073,3210200,60,"[师徒任务]收集独角狮硬角60个",120000,8),//33级：收集独角狮硬角60个 完成后徒弟经验120000    师傅师徒点 8点
    Array(33,0,4000073,3210202,60,"[师徒任务]收集独角狮硬角60个",120000,8),//33级：收集独角狮硬角60个 完成后徒弟经验120000    师傅师徒点 8点
    Array(34,0,4000109,3210204,60,"[师徒任务]收集玩具小鸭60个",140000,8),//34级：收集玩具小鸭60个 完成后徒弟经验140000    师傅师徒点 8点
    Array(35,0,4000088,5400000,60,"[师徒任务]收集小企鹅王的鱼60个",150000,8),//35级：收集小企鹅王的鱼60个 完成后徒弟经验150000    师傅师徒点 8点
    Array(35,0,4000013,3230100,60,"[师徒任务]收集风独眼兽之尾60个",150000,8),//35级：收集风独眼兽之尾60个 完成后徒弟经验150000    师傅师徒点 8点
    Array(35,0,4000035,3230101,60,"[师徒任务]收集桌布60个",150000,8),//35级：收集桌布60个 完成后徒弟经验150000    师傅师徒点 8点
    Array(35,0,4000059,3230200,60,"[师徒任务]收集星光精灵的星块60个",150000,8),//35级：收集星光精灵的星块60个 完成后徒弟经验150000    师傅师徒点 8点
    Array(35,0,4000067,3230300,60,"[师徒任务]收集幼魔精灵的角60个",150000,8),//35级：收集幼魔精灵的角60个 完成后徒弟经验150000    师傅师徒点 8点
    Array(36,0,4030015,3210203,65,"[师徒任务]收集玩玩具熊猫五子棋石65个",170000,9),//36级：收集玩玩具熊猫五子棋石65个 完成后徒弟经验170000    师傅师徒点 9点
    Array(37,0,4000029,3210800,65,"[师徒任务]收集香蕉65个",190000,9),//37级：收集任务 收集香蕉65个 完成后徒弟经验190000    师傅师徒点 9点
    Array(37,0,4000043,3230102,80,"[师徒任务]收集红螃蟹钳80个",190000,9),//37级：收集红螃蟹钳80个 完成后徒弟经验190000    师傅师徒点 9点
    Array(40,0,4000023,4230100,70,"[师徒任务]收集冰独眼兽之尾70个",260000,9),//40级：收集冰独眼兽之尾70个 完成后徒弟经验260000    师傅师徒点 9点
    Array(40,0,4000031,4230101,70,"[师徒任务]收集诅咒娃娃70个",260000,9),//40级：收集诅咒娃娃70个 完成后徒弟经验260000    师傅师徒点 9点
    Array(42,0,4031209,4230124,70,"[师徒任务]收集海狮皮革70个",300000,10),//42级：收集海狮皮革70个 完成后徒弟经验320000    师傅师徒点 10点
    Array(43,0,4000078,4230108,70,"[师徒任务]收集小猎犬的尖牙70个",370000,10),//43级：收集小猎犬的尖牙70个 完成后徒弟经验370000    师傅师徒点 10点
    Array(44,0,4000204,4230125,70,"[师徒任务]收集骷髅犬骨头70个",390000,10),//44级：收集骷髅犬骨头70个 完成后徒弟经验390000   师傅师徒点 10点
    Array(45,0,4000060,4230106,70,"[师徒任务]收集月光精灵的月块70个",430000,10),//45级：收集月光精灵的月块70个 完成后徒弟经验430000   师傅师徒点 10点
    Array(45,0,4000014,4130100,70,"[师徒任务]收集龙的头骨70个",430000,10),//45级：收集龙的头骨70个 完成后徒弟经验430000   师傅师徒点 10点
    Array(45,0,4000169,4230300,80,"[师徒任务]收集捣米棒80个",430000,10),//45级：收集捣米棒80个 完成后徒弟经验430000   师傅师徒点 10点
    Array(46,0,4000122,4230121,80,"[师徒任务]收集外星章鱼的光线枪80个",470000,10),//46级：收集外星章鱼的光线枪80个 完成后徒弟经验470000 师傅师徒点 10点
    Array(47,0,4000062,4130102,80,"[师徒任务]收集黑食人花的种子80个",490000,10),//47级：收集黑食人花的种子80个 完成后徒弟经验490000 师傅师徒点 10点
    Array(47,0,4000205,4230126,80,"[师徒任务]收集绷带80个",490000,10),//47级：收集绷带80个 完成后徒弟经验490000 师傅师徒点 10点
    Array(48,0,4000036,4230102,80,"[师徒任务]收集奇妙的药80个",550000,10),//48级：收集奇妙的药80个 完成后徒弟经验550000 师傅师徒点 10点
    Array(48,0,4000044,4230104,85,"[师徒任务]收集青螃蟹钳85个",550000,10),//48级：收集青螃蟹钳85个 完成后徒弟经验550000 师傅师徒点 10点
    Array(49,0,4000125,4240000,85,"[师徒任务]收集白外星人司令的标志85个",620000,10),//49级：收集白外星人司令的标志85个 完成后徒弟经验620000 师傅师徒点 10点
    Array(50,0,4000048,5100000,85,"[师徒任务]收集小白雪人皮85个",650000,10),//50级：收集小白雪人皮85个 完成后徒弟经验650000 师傅师徒点 10点
    Array(50,0,4000014,5130100,85,"[师徒任务]收集龙的头骨85个",650000,10),//50级：收集龙的头骨85个 完成后徒弟经验650000 师傅师徒点10点
    Array(50,0,4000170,5100003,85,"[师徒任务]收集老虎脚印85个",650000,10),//50级：收集老虎脚印85个 完成后徒弟经验650000 师傅师徒点 10点
    Array(52,0,4000033,5130103,85,"[师徒任务]收集黑鳄鱼皮85个",750000,11),//52级：收集黑鳄鱼皮85个 完成后徒弟经验750000 师傅师徒点 11点
    Array(52,0,4000061,5120000,85,"[师徒任务]收集日光精灵的日块85个",750000,11),//52级：收集日光精灵的日块85个 完成后徒弟经验750000 师傅师徒点 11点
    Array(53,0,4000070,5120001,85,"[师徒任务]收集红独角狮尾85个",780000,11),//53级：收集红独角狮尾85个 完成后徒弟经验780000 师傅师徒点 11点
    Array(53,0,4000071,5120002,85,"[师徒任务]收集黄独角狮尾85个",780000,11),//53级：收集黄独角狮尾85个 完成后徒弟经验780000 师傅师徒点 11点
    Array(53,0,4000171,5120003,85,"[师徒任务]收集蓝独角狮尾85个",800000,11),//53级：收集蓝独角狮尾85个 完成后徒弟经验800000 师傅师徒点 11点
    Array(53,0,4000171,5100005,85,"[师徒任务]收集虎皮85个",800000,11),//53级：收集虎皮85个 完成后徒弟经验800000 师傅师徒点 11点
    Array(55,0,4000051,5130104,85,"[师徒任务]收集野狼之尾85个",850000,11),//55级：收集野狼之尾85个 完成后徒弟经验850000 师傅师徒点 11点
    Array(55,0,5300100,4000041,60,"[师徒任务]收集巫婆的试验用青蛙60个",850000,11),//55级：收集巫婆的试验用青蛙60个 完成后徒弟经验850000 师傅师徒点 11点
    Array(55,0,4000022,5130101,80,"[师徒任务]收集石块80个",850000,11),//55级：收集石块80个 完成后徒弟经验850000 师傅师徒点 11点
    Array(56,0,4000172,5100004,100,"[师徒任务]收集三尾狐的尾巴100个",900000,12),//56级：收集三尾狐的尾巴100个 完成后徒弟经验900000 师傅师徒点 12点
    Array(57,0,4000069,5130107,100,"[师徒任务]收集僵尸丢失的臼齿100个",950000,12),//57级：收集僵尸丢失的臼齿100个 完成后徒弟经验950000 师傅师徒点 12点
    Array(58,0,4000052,5140000,100,"[师徒任务]收集白狼之尾80个",950000,12),//58级：收集白狼之尾80个 完成后徒弟经验950000 师傅师徒点 12点
    Array(59,0,4000177,5150000,80,"[师徒任务]收集混种石块80个",950000,12),//59级：收集混种石块80个 完成后徒弟经验970000 师傅师徒点 12点
    Array(60,0,4000014,6130100,80,"[师徒任务]收集龙的头骨80个",950000,12),//60级：收集龙的头骨80个 完成后徒弟经验970000 师傅师徒点 12点
    Array(60,0,4000050,6130103,80,"[师徒任务]收集企鹅王的嘴80个",970000,12),//60级：收集企鹅王的嘴80个 完成后徒弟经验970000 师傅师徒点 12点

);

var slc = 0;
var slc_td = 0;

var control = 0;//3创建师门

var createMeso = 10000000;

var tickMeso = 1000000;

var 发布任务金币 = 500000;
var 创建等级 = 60;

var 出师等级 = 69;

var questList = null;

var tdList = null;

var partyList = null;
/**
 * 师徒系统
 * */
function start(){
    action(1,0,0);
}
function action(mode, type, selection) {

    // cm.getPlayer().dropMessage(5,mode+" "+type+" "+selection+" "+status);

    if(mode == 0 || mode == -1){
        // cm.sendOk("好的");
        cm.dispose();
        return
    }

    // cm.getPlayer().updateMasterQuestStat(18,1);
    if(status == 0){
        /**查找是否徒弟*/
        var td = cm.getPlayer().findApprenticeById(cm.getPlayer().getId());
        /**查找师门*/
        var masterinfo = cm.getPlayer().getMaster(cm.getPlayer().getId());
        /**不是徒弟*/
        if(td != null){
            // cm.sendOk("徒弟操作");

            cm.dispose();
            cm.openNpc(9330089,"徒弟界面");
            return;


        } else if(cm.getPlayer().getLevel() >= 创建等级 && masterinfo != null){
            tdList = cm.getPlayer().findApprenticeByMasterId(masterinfo.getId());
            /**师门操作*/
            var text = "\t\t\t\t\t\t\t\t\t\t\t#b#e师门:#r"+masterinfo.getName()+"#b\r\n";
            text+="------------------------------------------------------------------------------\r\n";
            text+=金币+"#n师傅名字:#e#r"+cm.getPlayer().findNameById(masterinfo.getId())+"#b\r\n";
            text+=金币+"#n师徒点:#e#r"+masterinfo.getSchoolPoints()+"\r\n";
            text+="#b------------------------------------------------------------------------------\r\n";
            /**遍历徒弟列表*/
            var tdnum = tdList.size();
            for(var i = 1;i<=5;i++){
                if(i<=tdnum){



                    var td = tdList.get(i-1);
                    /**根据角色id获取名字*/
                    var tdName = cm.getPlayer().findNameById(td.getId());
                    text += "#L"+i+"#"+叹号按钮+getName(tdName,14)+"#l\t#L"+(i*10)+"# 发布任务#l\t#r#L"+(i*100)+"#  逐出师门#l#b\r\n";
                } else {
                    text += "#L"+i+"#"+叹号按钮+getName("虚位以待",14)+"#l\t#L"+(i*10)+"# 带徒入门#l\t#L"+(i*100)+"#  邀请徒弟#l \r\n";
                }
            }

            // text += "#L"+1+"#"+叹号按钮+getName("阿瓦达啊阿瓦",14)+"#l\t#L"+1+"# 带徒入门#l\t#L"+1+"#  邀请徒弟#l \r\n";
            // text += "#L"+i+"#"+叹号按钮+"虚位以待#l\t\t\t#L"+i+"# 带徒入门#l      #L"+i+"#  邀请徒弟#l \r\n";


            text+="\r\n";
            text+="#b------------------------------------------------------------------------------\r\n";

            text+="\t\t\t\t\t\t#L9998##r带徒出师#l\r\n";
            text+="\t\t\t\t\t\t#L9999##r师徒点兑换#l\r\n";

            status++;
            control = 2;
            cm.sendSimple(text);
            // cm.dispose();
            // return;
        } else if(cm.getPlayer().getLevel() >= 创建等级 && masterinfo == null && td == null){
            /**创建师门操作*/

            cm.sendYesNo("#k是否花费#r"+createMeso+"#k创建你的宗门呢");
            status++;
            control = 3;
        } else if(cm.getPlayer().getLevel() <= 创建等级){
            /**加入师门操作*/
            if(cm.getBossLog("找师傅喇叭") > 0){
                cm.sendOk("快去找个师傅加入他的师门吧！前期会轻松很多哦！ "+创建等级+"级后才能建立师门，有丰厚奖励");
                cm.dispose();
                return;
            }
            cm.setBossLog("找师傅喇叭");
            cm.gainItem(5072000);
            cm.sendOk("没有师傅?给你一个#v5072000##z5072000#,去找师傅吧!");
            cm.dispose();
            return;


        } else {
            cm.sendOk("你可以出师了!找师傅带你出师");
            cm.dispose();
            return;
        }

    } else if(status == 1){
        if(selection == 9999){
            cm.dispose();
            cm.openNpc(9330089,"师徒兑换");
            return;
        }
        if(selection == 9998){//带徒出师
            if (cm.getParty() == null){
                cm.sendOk("跟徒儿组队后再来");
                cm.dispose();
                return;
            }

            if(cm.getParty().getMembers().size() < 2){
                cm.sendOk("跟徒儿组队后再来");
                cm.dispose();
                return;
            }

            if(tdList.size() == 0){
                cm.sendOk("你没有徒弟");
                cm.dispose();
                return;
            }

            var party = cm.getParty().getMembers();
            var text = "选择队伍中一个徒弟出师:\r\n";
            partyList = cm.getParty().getMembers();

            var hasnum = 0;
            for (var i = 0;i<party.size();i++){
                var player = party.get(i).getPlayer();
                if(player.getId() != cm.getPlayer().getId() && player.getLevel() >= 创建等级){
                    text += "#L"+i+"#名字:"+player.getName() +"----等级:"+player.getLevel()+"(选择发送收徒邀请)";
                    hasnum++;
                }
            }

            status++;
            control = 9998;
            if(hasnum == 0){
                cm.sendOk("没有合适条件的人选！");
                cm.dispose();
                return;
            }
            cm.sendSimple(text);


        }
        if(control == 3){//建立师门

                status++;
                cm.sendGetText("给师门起个名字把");

        } else if (control == 2){//宗门界面操作
            // cm.getPlayer().dropMessage(5,"走到了control2 status2 "+tdList.size());
            slc = selection;
            var player = getOne(selection);
            if(tdList.size() < player){ /**带徒入门*/
                if (cm.getParty() == null){
                    cm.sendOk("跟徒儿组队后再来");
                    cm.dispose();
                    return;
                }

                if(cm.getParty().getMembers().size() < 2){
                    cm.sendOk("跟徒儿组队后再来");
                    cm.dispose();
                    return;
                }

                var party = cm.getParty().getMembers();
                var text = "选择队伍中一个人做徒弟:\r\n";
                partyList = cm.getParty().getMembers();

                var hasnum = 0;
                for (var i = 0;i<party.size();i++){
                    var player = party.get(i).getPlayer();
                    if(player.getId() != cm.getPlayer().getId() && player.getLevel() < 创建等级){
                        text += "#L"+i+"#名字:"+player.getName() +"----等级:"+player.getLevel()+"(选择发送收徒邀请)";
                        hasnum++;
                    }
                }

                status++;
                control = 21;
                if(hasnum == 0){
                    cm.sendOk("没有合适条件的人选！");
                    cm.dispose();
                    return;
                }
                cm.sendSimple(text);
                // cm.dispose();
            } else {
                /**其他操作*/
                slc_td = player;
                var select = getY(selection);
                if(select == 1){
                    /**师傅查看徒弟信息*/
                    status++;
                    control = 221;
                    questList = cm.getPlayer().findMasterQuestList(tdList.get(slc_td-1).getId());//徒弟任务信息
                    // cm.sendOk("111");
                    tdInfoMsg();//输出徒弟信息
                    return;

                } else if(select == 2){//发布任务

                    /**查看是否有任务*/
                    questList = cm.getPlayer().findMasterQuestList(tdList.get(slc_td-1).getId());//徒弟任务信息
                    if(questList.size()>0){
                        status++;
                        control = 221;
                        tdInfoMsg();//输出徒弟信息
                        return;
                    } else {
                        var tdlevel = cm.getPlayer().findLevelById(tdList.get(slc_td-1).getId());
                        if(tdlevel >= 创建等级){
                            cm.sendOk("徒弟已经可以出师了");
                            cm.dispose();
                            return;
                        }

                        if(tdlevel < 15){
                            cm.sendOk("请徒弟到达15级再来，如果徒弟已经到达15级，请等5分钟数据更新");
                            cm.dispose();
                            return;
                        }

                        status++;
                        control = 222;
                        /**发布任务或者查看信息*/
                        cm.sendYesNo("#b是否花费#r ["+发布任务金币+"] #b发布5个师徒任务呢")

                    }

                } else if(select == 3){
                    status++;
                    control = 223;
                    cm.sendYesNo("#b是否花费#r"+tickMeso+"#b将徒弟踢出师门");
                    // cm.sendOk("选择了3");

                }

            }

        }
    } else if(status == 2){
        if(control == 9998){//带徒出师
            var player = partyList.get(selection).getPlayer();
            for (var i = 0;i<tdList.size();i++){
                if(player.getId() == tdList.get(i).getId()){
                    if(cm.canHold(2049100) && player.canHold(5130000) && player.canHold(5041000,3)){
                        cm.getPlayer().delApprenticeById(player.getId());
                        /**师傅奖励*/
                        cm.getPlayer().getCashShop().gainCash(1,8888)//给抵用券
                        cm.gainItem(2049100);

                        /**徒弟奖励*/
                        player.getCashShop().gainCash(1,5000)//给抵用券
                        player.getAbstractPlayerInteraction().gainItem(5130000,1);
                        player.getAbstractPlayerInteraction().gainItem(5041000,3);
                        cm.sendOk("出师成功");
                        cm.dispose();
                        return ;
                    } else {
                        cm.sendOk("双方检查一下背包是否够放下");
                        cm.dispose();
                        return ;
                    }

                }
            }
            cm.sendOk("老东西，浑水摸鱼呢，这个不是你徒弟！");
            cm.dispose();
            return ;

        }
        if(control == 3) {//建立师门

            if(cm.getPlayer().getMeso() >= createMeso){
                cm.gainMeso(-createMeso);
                cm.getPlayer().createMaster(cm.getPlayer().getId(),cm.getText());
                cm.sendOk("创建师门成功！");
                cm.dispose();
                return;
            } else {
                cm.sendOk("金币不足");
                cm.dispose();
                return;
            }
        } else if(control == 21){//徒弟邀请
            if(cm.getBossLog("收徒徒弟"+getOne(slc)) > 0){
                cm.sendOk("这个位置需要24小时后才能继续收徒！");
                cm.dispose();
                return;
            }
            var player = partyList.get(selection).getPlayer();


            // cm.sendOk("player:"+player.getName()+" level:"+player.getLevel());
            cm.sendOk(cm.getPlayer().sendAcceptDeclineST(player));
            /**用于限制24小时收徒*/
            cm.setBossLog("收徒徒弟"+getOne(slc));
            cm.dispose();
            return;

        } else if(control == 223){
            if(mode == -1){
                cm.dispose();
                return;
            }
            if(cm.getPlayer().getMeso() >= tickMeso){
                cm.gainMeso(-tickMeso);
                /**拿到选中的徒儿信息*/
                cm.getPlayer().delApprenticeById(tdList.get(slc_td-1).getId());
                cm.sendOk("提出徒弟成功");
            } else {
                cm.sendOk("金币不够不能踢人");
            }
            // cm.getPlayer().dropMessage(5,mode+" "+type+" "+selection+" "+status);
            cm.dispose();
            return;


        } else if(control == 222){//发布师徒任务
            if(cm.getPlayer().getMeso() >= 发布任务金币){
                cm.gainMeso(-发布任务金币);
                var tdlevel = cm.getPlayer().findLevelById(tdList.get(slc_td-1).getId());
                publishTask(tdList.get(slc_td-1).getId(),tdlevel,5);

                cm.sendOk("发布任务成功!");

                /**通用活跃点数加成奖励*/
                var p = cm.getPlayer();
                if(p.getActiveByName("fbstrw_hy") < 200){
                    var hyd = 200/5;
                    p.insertActive("fbstrw_hy",hyd,1);
                    p.dropMessage(5,"获得"+"发布师徒任务"+"活跃点:"+hyd);
                }

            } else {
                cm.sendOk("金币不够不能发布任务");
            }

            cm.dispose();
            return;

        } else if(control == 221){//查看徒弟信息
            tdInfoMsg();

        }
    }







    // cm.dispose();




}

function tdInfoMsg(){
    var text = "\t\t\t\t\t\t\t\t\t\t\t#b#e#r徒弟信息#b\r\n";
    text+="------------------------------------------------------------------------------\r\n";
    text+=金币+"#n徒儿名字:#e#r"+cm.getPlayer().findNameById(tdList.get(slc_td-1).getId())+"#b\r\n";
    text+=金币+"#n徒儿等级:#e#r"+cm.getPlayer().findLevelById(tdList.get(slc_td-1).getId())+"#b\r\n";
    text+=金币+"#n徒儿产出师徒点:#e#r"+tdList.get(slc_td-1).getSchoolPoints()+"\r\n";
    text+="#b---------------------------------任务列表#b--------------------------------#n\r\n";
    if(questList.size() == 0){
        text+="#r(你还没给徒儿发布任务呢！)";
    } else {
        for (var i = 0;i<questList.size();i++){
            var quest = questList.get(i);
            if(quest.getStat()==2){
                text += "#k[已提交]\t#n"
            } else if(quest.getStat()==1){
                text += "#b[未提交]\t#b#n"
            } else if(quest.getStat()==0){
                text += "#r[未完成]\t#b#n"
            }

            text += quest.getMsg()+"\t#k师徒点:#r"+quest.getShituPoints();
            text += "\r\n#b";
        }
    }
    cm.sendOk(text);
    cm.dispose();
    return;
}

//获得输入框中字符长度
function getLength(val) {
    var str = new String(val);
    var bytesCount = 0;
    for (var i = 0 ,n = str.length; i < n; i++) {
        var c = str.charCodeAt(i);
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
            bytesCount += 1;
        } else {
            bytesCount += 2;
        }
    }
    return bytesCount;
}

function getName(str,size){
    var l = getLength(str);

    var k = size-l;
    var d = k%2;
    var n = Math.floor(k/2);
    for (var i = 0;i<n;i++){
        str+="\t";
    }

    if(d>0){
        str+="   ";
    }

    // cm.getPlayer().dropMessage(5,"l="+l+" k="+k+" d="+d+" n="+n);

    return str;
}

/**判断位数*/
function getY(num){
    if(num >= 100){
        return 3;
    } else if(num >= 10){
        return 2;
    } else{
        return 1;
    }
}
/**拿到第一个数值*/
function getOne(num){
    if(num >= 100){
        return num/100;
    } else if(num >= 10){
        return num/10;
    } else{
        return num;
    }
}

/**发布随机任务*/
function publishTask(charId,level,num){
    var slcNum = 0;
    var i = 0;
    var 随机等级系数 = 0.1;

    while (slcNum < num){
        if(i == ST_QUEST.length){
            i = 0;
        }

        var quest = ST_QUEST[i];
        var questLevel = quest[0];

        if(questLevel <= level){
            /**随机计算公式*/
            var randNum =  Math.floor(Math.random() * (level-1-questLevel)) + 1;

            /**随机中任务*/
            if(randNum <= level*随机等级系数){
                /**等级,任务类型,怪物id(0为没),物品,任务标识,任务目标数,完成数,任务状态(0未完成，1完成),奖励经验,桃园点*/
                // cm.getPlayer().addQuestLog(charId,quest[1],quest[4],quest[2],quest[5],0,0,"",i);
                /**等级, 任务类型 0物品 1杀怪, 物品id(杀怪的时候物品为0), 怪物id, 任务数量, 任务文字, 徒弟经验, 师傅师徒点*/
                cm.getPlayer().addMasterQuest(charId,quest[1],quest[2],quest[3],quest[4],quest[5],0,quest[6],quest[7]);
                slcNum++;
            }

        }

        i++;
    }
}


