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

var status;

function start() {
    if (cm.isQuestStarted(3311)) {
        cm.sendOk("德朗博士的日记。许多公式和华而不实的科学文本可以在所有的页面上找到，但值得注意的是，在最后一个条目（3周目）中，他总结了关于改进新赫罗伊德蓝图的研究，从而为向“社会”展示它做了最后的准备...在这之后什么也没说...", 2);
    }
    cm.dispose();
}