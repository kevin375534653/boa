/*
    This file is part of the HeavenMS MapleStory Server
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
/* Holy Stone
	Holy Ground at the Snowfield (211040401)
	3rd job advancement - Question trial.
 */

var questionTree = [
        //与角色相关的问题
        ["在MapleStory中，从1级升级到2级需要多少经验？", ["20", "15", "4", "12", "16"], 1],                                                                    				//15
        ["在第一次转职中，以下哪项是错误的要求？", ["魔法师 - 8级", "海盗 - 20敏捷", "弓箭手 - 25敏捷", "飞侠 - 20运气", "战士 - 35力量"], 3],            	          //飞侠 - 20运气

        //与怪物相关的问题
        ["以下的怪物中：绿蘑菇, 树妖, 绿水灵, 斧木妖, 三眼章鱼，哪个等级最高？", ["树妖", "绿水灵", "斧木妖", "三眼章鱼", "绿蘑菇"], 2],                              	 //斧木妖
        ["魔法密林到天空之城的大船上能看到的怪物是？", ["狼人", "蓝蜗牛", "蝙蝠怪", "扎昆", "星精灵"], 2],                                                                       	 //蝙蝠怪
        ["在彩虹岛看不到的的怪物是？", ["蘑菇仔", "蓝蜗牛", "蜗牛", "红蜗牛", "猪猪"], 4],                                                                                                  	 //猪猪
        ["在林中之城不存在的怪物是？", ["风独眼龙", "牛魔王", "蝙蝠怪", "树妖王", "蜗牛"], 1],                                                                                           	 //蜗牛
        ["在冰封雪域看不到的怪物是？", ["黑雪人", "黑鳄鱼", "企鹅王与白雪人", "白雪人", "僵尸"], 1],                                                                                  	 //黑鳄鱼
        ["在神秘岛看不到的怪物是？", ["月精灵", "幼黄独角狮", "幼红独角狮", "黑鳄鱼", "灰狼"], 3],                                                                                     	 //黑鳄鱼
        ["在彩虹岛看不到的的怪物是？", ["蜗牛", "蘑菇仔", "风独眼龙", "花蘑菇", "蓝蜗牛"], 2],                                                                                            	 //风独眼龙
        ["绿蘑菇，木妖，蓝水灵，斧木妖，三眼章鱼中级别最高的怪物是哪一个？", ["蓝水灵", "三眼章鱼", "木妖", "斧木妖", "我不知道"], 3],                            	 //斧木妖

        //与任务相关的问题
        ["下面哪个职业不是二转职业？", ["牧师", "射手", "刺客", "火枪手", "剑客"], 1], 								                                 	//射手
        ["怪与所掉落战利品是正确对应的一组？", ["易德", "蝙蝠-蝙蝠翅膀", "斯坦长老", "弓箭手25敏捷", "英雄证书"], 1],                            				//蝙蝠-蝙蝠翅膀

        //与道具相关的问题
        ["冒险岛中，下列药品中，哪组药品与机能是错误对应关系的？", ["清晨之露-3000MP恢复", "圣水-解除封印", "汉堡-400HP恢复", "沙拉-200MP恢复", "蓝色药水-100MP恢复"], 0],  //清晨之露-3000MP恢复

        //与技能相关的问题
        ["怪物攻击时特别的异常状态没有被正确说明的是哪一个？", ["虚弱-移动速度降低", "索非亚", "阿尔卡斯特和黑暗水晶", "赛恩", "披萨-HP400恢复"], 0],    	//虚弱-移动速度减少

        //与村落或npc相关问题
        ["彩虹岛你第一个见到的NPC是谁？", ["莎丽", "希娜", "路卡斯", "罗杰", "桑克斯"], 1],                                                                                                     //希娜
        ["在神秘岛的冰峰雪域里看不见的NPC是哪个？", ["斯卡德", "格里巴", "杰夫", "神圣的石头", "保姆珥玛"], 4],                                                                     //保姆珥玛
        ["在勇士部落没有的NPC是谁？", ["伊安", "索非亚", "斯密斯", "易德", "麦吉"], 3],                                                                                                            //易德
        ["射手村看不到的NPC是谁？", ["特奥", "比休斯", "米雅", "科尔", "凯茜"], 0],                                                                                                                  //特奥
        ["在金银岛的魔法密林没有哪个NPC？", ["帕克", "妖精玛丽", "露尔", "瑞雅", "丽雅"], 2],                                                                                                  //露尔
        ["废弃都市看不到的NPC是谁？", ["铭仁", "马龙", "阿勒斯", "鲁克", "内拉"], 3],                                                                                                               //鲁克
        ["下面中在废弃都市会见的离家出走的阿勒斯的父亲是谁？", ["长老斯坦", "后街吉姆", "铭仁", "比休斯", "鲁克"], 0],                                                            //长老斯坦
        ["第二次转职让收集30个黑珍珠后NPC会给你什么？", ["旧戒指", "记忆粉末", "妖精的粉尘", "英雄证明", "秘密卷轴"], 3],                                                     //英雄证明
        ["射手村的玛雅需要下面哪个物品来治疗她的病？", ["苹果", "活力神水", "奇怪的药", "菊花", "橙汁"], 2],                                                                            //奇怪的药
        ["彩虹岛看不到的NPC是谁？", ["白瑞德", "特奥", "皮奥", "赛德", "玛丽亚"], 1],					                                                                   //特奥
        ["勇士部落的武术教官头上有多少根羽毛？", ["7", "8", "3", "13", "16"], 3],									                                      //13
        ["不是阿尔法队员的是谁？", ["妖精之翼", "鲁克", "食人花-食人花的叶子", "巫婆", "比特中士"], 4],                                                                                    //比特中士
        ["冒险岛最初遇见的NPC是谁？", ["15", "希娜", "保姆", "巫师", "艾温的玻璃鞋"], 1],                                                                                                        //希娜
        ["唤醒麦吉不需要的材料是什么呀！", ["冰块", "星石", "火焰之羽", "妖精之翼", "忘记了"], 3],                                                                                            //妖精之翼
        ["下面中跟合成或冶炼工作没有关系的人是谁？", ["奈巴", "辛德", "赛恩", "易德", "伯坚"], 2],                                                                                            //赛恩
        ["魔法密林的汉斯手中的魔法球是什么颜色的？", ["白色", "橙色", "蓝色", "紫色", "绿色"], 2]                                                                                             //蓝色
    ];

var status;
var question;

var questionPool;
var questionPoolCursor;

var questionAnswer;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {
            if (cm.getPlayer().gotPartyQuestItem("JBQ") && !cm.haveItem(4031058, 1)) {
                if (cm.haveItem(4005004, 1)) {
                    if (!cm.canHold(4031058)) {
                        cm.sendNext("嗯，你确定你的背包其他栏有1个以上的空位？");
                        cm.dispose();
                    } else {
                        cm.sendNext("好...现在开始进行智慧的考验...如果能够正确回答所有问题，就可以通过考验...但是如果途中回答了不正确的答案，就需要重新接受挑战...那就开始吧...");
                    }
                } else {
                    cm.sendNext("先给我一个#b#t4005004##k才有资格来挑战我的问题。你怕了？");
                    cm.dispose();
                }
            } else {
                cm.dispose();
            }
        } else if (status == 1) {
            cm.gainItem(4005004, -1);
            instantiateQuestionPool();

            question = fetchNextQuestion();
            var questionHead = generateQuestionHeading();
            var questionEntry = questionTree[question][0];

            var questionData = generateSelectionMenu(questionTree[question][1], questionTree[question][2]);
            var questionOptions = questionData[0];
            questionAnswer = questionData[1];

            cm.sendSimple(questionHead + questionEntry + "\r\n\r\n#b" + questionOptions + "#k");
        } else if (status >= 2 && status <= 5) {
            if (!evaluateAnswer(selection)) {
                cm.sendNext("挑战失败了，请重新尝试！");
                cm.dispose();
                return;
            }

            question = fetchNextQuestion();
            var questionHead = generateQuestionHeading();
            var questionEntry = questionTree[question][0];

            var questionData = generateSelectionMenu(questionTree[question][1], questionTree[question][2]);
            var questionOptions = questionData[0];
            questionAnswer = questionData[1];

            cm.sendSimple(questionHead + questionEntry + "\r\n\r\n#b" + questionOptions + "#k");
        } else if (status == 6) {
            if (!evaluateAnswer(selection)) {
                cm.sendNext("挑战失败了，请重新尝试！");
                cm.dispose();
                return;
            }

            cm.sendOk("你的回答中并没有愚蠢的答案，证明了你是一个有智慧的人，拿着这条项链回去吧。");
            cm.gainItem(4031058, 1);
            cm.dispose();
        } else {
            cm.sendOk("脚本出错了，请联系GM修复。");
            cm.dispose();
        }
    }
}

function evaluateAnswer(selection) {
    return selection == questionAnswer;
}

function generateQuestionHeading() {
    //return "Here's the " + (status) + (status == 1 ? "st" : status == 2 ? "nd" : status == 3 ? "rd" : "th") + " question. ";
    return "第" + (status) + "个问题：";
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function instantiateQuestionPool() {
    questionPool = [];

    for (var i = 0; i < questionTree.length; i++) {
        questionPool.push(i);
    }

    shuffleArray(questionPool);
    questionPoolCursor = 0;
}

function fetchNextQuestion() {
    var next = questionPool[questionPoolCursor];
    questionPoolCursor++;

    return next;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function generateSelectionMenu(array, answer) {
    var answerStr = array[answer], answerPos = -1;

    shuffle(array);

    var menu = "";
    for (var i = 0; i < array.length; i++) {
        menu += "#L" + i + "#" + array[i] + "#l\r\n";
        if (answerStr == array[i]) {
            answerPos = i;
        }
    }
    return [menu, answerPos];
}