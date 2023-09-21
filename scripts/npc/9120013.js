/*
    This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
               Matthias Butz <matze@odinms.de>
               Jan Christian Meyer <vimes@odinms.de>

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
//Boss Kitty

var status;
var questions;
var answers;
var correctAnswer;
var questionNum;

function start() {
    status = -1;
    questions = [
        "下列物品中何者不是狸猫所掉出的物品？", //独角狮硬角 
        "古代神社中，写有<香菇(きのこ)>平假名的地方有几处？", //６处 
        "古代神社的贩卖物品里，哪个是提升攻击力的？", //章鱼串
        "哪个不是实际存在的东西？", //苍蝇拍
        //"连结西门町与江户村的NPC是谁？", //鹈鹕鸟
        "连结少林寺与江户村的NPC是谁？", //导游妮妮
        "昭和蔬果店的老板叫什么名字？", //由美
        "哪个是实际存在的东西？", //雪狐的尾巴
        "昭和村卖鱼的铺子外面写着哪几个字？", //商売繁盛
        "下列武器中，何者的说明有误？", //精灵木枪-剑士专用武器
        "哪个不是古代神社的元泰卖的拉面？", //蘑菇特制拉面
        "昭和电影院门前的NPC是谁？"//绘里香
        //"下列物品中,何者不是盗贼们所掉出的道具？" //束腹
    ]
    answers = [
        ["狸猫柴新","独角狮硬角","红色砖头"],  //独角狮硬角
        ["5","6","4"], //６处                            
        ["章鱼串","日式炒面","黑轮"], //章鱼串
        ["冷冻金枪鱼","苍蝇拍","清酒"], //苍蝇拍
        //["麻雀","乌鸦","鹈鹕鸟"], //鹈鹕鸟
        ["麻雀","乌鸦","导游妮妮"], //导游妮妮
        ["莎美","卡美","由美"], //由美
        ["云狐的牙齿","花束","雪狐的尾巴"], //雪狐的尾巴
        ["商売繁盛","全场一折","欢迎光临"], //商売繁盛
        ["精灵木枪 - 剑士专用武器","橡皮榔头 - 单手剑","日本地图 - 可装备等级50级"], //精灵木枪 - 战士专用道具
        ["蛋炒面","日本炒面","蘑菇特制拉面"], //蘑菇特制拉面
        //["中华拉面","海鲜粥","香菇特制味噌拉面"], //香菇特制味噌拉面
        ["凉子","明日香","绘里香"], //绘里香
        //["五角徽章","镀金项链","束腹"] //束腹
    ];
    correctAnswer = [1, 1, 0, 1, 2, 2, 2, 0, 0, 2, 2];
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0 && mode == 1) {
            if (cm.isQuestStarted(8012) && !cm.haveItem(4031064)) { //quest in progress
                cm.sendYesNo("搜集好了吗？你要挑战我所要出的题目吗？");
            } else { //quest not started or already completed
                //cm.sendOk("喵喵喵~！");//lol what's this?
                cm.dispose();
            }
        } else if (status == 1 && mode == 1) {
            var hasChicken = true;
            if (!cm.haveItem(2020001, 300)) {
                hasChicken = false;
            }
            if (!hasChicken) {
                cm.sendOk("什么？不！我需要300个炸鸡。如果你想要物品的话，那就带300个炸鸡给我，然后准备回答我的问题，并不是所有的人都能像你一样伟大...");
                cm.dispose();
            } else {
                cm.gainItem(2020001, -300)
                cm.sendNext("好~看来你都搜集齐全了！喂~大伙儿~不要吵，乖乖分着吃啦！那...我来些题目好了...我想你应该有心理准备吧...只要中途有错一题，就到此结束喔！");
            }
        } else if (status == 7 && mode == 1) { //2-6 are the questions
            if (selection != correctAnswer.pop()) {
                //cm.sendNext("Hmmm...all humans make mistakes anyway! If you want to take another crack at it, then bring me 300 Fried Chicken.")
                cm.sendNext("这都答不出来啊！若是想要再来一次尝试的机会，那就麻烦你再拿300个炸鸡给我吧！")
                cm.dispose();
            } else {
                cm.sendNext("噗！竟然答对所有问题...我虽然讨厌人类，但更讨厌不守信用！既然这样我就把玉珠子还给你吧！")
            }
        } else if (status == 8 && mode == 1) { //gain marble
            cm.gainItem(4031064, 1);
            //cm.sendOk("Our business is concluded, thank you very much! You can leave now!");
            cm.sendOk("干啥？你应该已经没事了吧？那请你出去吧...我们可不想继续被人打扰...");
            cm.dispose();
        } else if (status >= 2 && status <= 6 && mode == 1) {//questions
            var cont = true;
            if (status > 2) {
                if (selection != correctAnswer.pop()) {
                    //cm.sendNext("Hmmm...all humans make mistakes anyway! If you want to take another crack at it, then bring me 300 Fried Chicken.")
                    cm.sendNext("这都答不出来啊！若是想要再来一次尝试的机会，那就麻烦你再拿300个炸鸡给我吧！")
                    cm.dispose();
                    cont = false;
                }
            }
            if (cont) {
                questionNum = Math.floor(Math.random() * questions.length);
                if (questionNum != (questions.length - 1)) {
                    var temp;
                    temp = questions[questionNum];
                    questions[questionNum] = questions[questions.length - 1];
                    questions[questions.length - 1] = temp;
                    temp = answers[questionNum];
                    answers[questionNum] = answers[questions.length - 1];
                    answers[questions.length - 1] = temp;
                    temp = correctAnswer[questionNum];
                    correctAnswer[questionNum] = correctAnswer[questions.length - 1];
                    correctAnswer[questions.length - 1] = temp;
                }
                var question = questions.pop();
                var answer = answers.pop();
                var prompt = "问题" + (status - 1) + "：" + question;
                for (var i = 0; i < answer.length; i++) {
                    prompt += "\r\n#b#L" + i + "#" + answer[i] + "#l#k";
                }
                cm.sendSimple(prompt);
            }
        }
    }
}