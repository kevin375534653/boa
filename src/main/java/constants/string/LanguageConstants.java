package constants.string;

import client.Character;

/**
 * @author Drago (Dragohe4rt)
 */
public class LanguageConstants {

    enum Language {
        LANG_PRT(0),
        LANG_ESP(1),
        LANG_ENG(2);

        int lang;

        Language(int lang) {
            this.lang = lang;
        }

        private int getValue() {
            return this.lang;
        }

    }

    public static String[] CPQBlue = new String[3];
    public static String[] CPQError = new String[3];
    public static String[] CPQEntry = new String[3];
    public static String[] CPQFindError = new String[3];
    public static String[] CPQRed = new String[3];
    public static String[] CPQPlayerExit = new String[3];
    public static String[] CPQEntryLobby = new String[3];
    public static String[] CPQPickRoom = new String[3];
    public static String[] CPQExtendTime = new String[3];
    public static String[] CPQLeaderNotFound = new String[3];
    public static String[] CPQChallengeRoomAnswer = new String[3];
    public static String[] CPQChallengeRoomSent = new String[3];
    public static String[] CPQChallengeRoomDenied = new String[3];

    static {
        int lang;

        lang = Language.LANG_PRT.getValue();
        LanguageConstants.CPQBlue[lang] = "Maple Azul";
        LanguageConstants.CPQRed[lang] = "Maple Vermelho";
        LanguageConstants.CPQExtendTime[lang] = "O tempo foi estendido.";
        LanguageConstants.CPQPlayerExit[lang] = " deixou o Carnaval de Monstros.";
        LanguageConstants.CPQError[lang] = "Ocorreu um problema. Favor recriar a sala.";
        LanguageConstants.CPQLeaderNotFound[lang] = "Nao foi possivel encontrar o Lider.";
        LanguageConstants.CPQPickRoom[lang] = "Inscreva-se no Festival de Monstros!\r\n";
        LanguageConstants.CPQChallengeRoomAnswer[lang] = "O grupo esta respondendo um desafio no momento.";
        LanguageConstants.CPQChallengeRoomSent[lang] = "Um desafio foi enviado para o grupo na sala. Aguarde um momento.";
        LanguageConstants.CPQChallengeRoomDenied[lang] = "O grupo na sala cancelou seu desafio.";
        LanguageConstants.CPQFindError[lang] = "Nao foi possivel encontrar um grupo nesta sala.\r\nProvavelmente o grupo foi desfeito dentro da sala!";
        LanguageConstants.CPQEntryLobby[lang] = "Agora voce ira receber desafios de outros grupos. Se voce nao aceitar um desafio em 3 minutos, voce sera levado para fora.";
        LanguageConstants.CPQEntry[lang] = "Voce pode selecionar \"Invocar Monstros\", \"Habilidade\", ou \"Protetor\" como sua tatica durante o Carnaval dos Monstros. Use Tab a F1~F12 para acesso rapido!";

        lang = Language.LANG_ESP.getValue();
        LanguageConstants.CPQBlue[lang] = "Maple Azul";
        LanguageConstants.CPQRed[lang] = "Maple Rojo";
        LanguageConstants.CPQExtendTime[lang] = "El tiempo se ha ampliado.";
        LanguageConstants.CPQPlayerExit[lang] = " ha dejado el Carnaval de Monstruos.";
        LanguageConstants.CPQLeaderNotFound[lang] = "No se pudo encontrar el Lider.";
        LanguageConstants.CPQPickRoom[lang] = "!Inscribete en el Festival de Monstruos!\r\n";
        LanguageConstants.CPQError[lang] = "Se ha producido un problema. Por favor, volver a crear una sala.";
        LanguageConstants.CPQChallengeRoomAnswer[lang] = "El grupo esta respondiendo un desafio en el momento.";
        LanguageConstants.CPQChallengeRoomSent[lang] = "Un desafio fue enviado al grupo en la sala. Espera un momento.";
        LanguageConstants.CPQChallengeRoomDenied[lang] = "El grupo en la sala cancelo su desafio.";
        LanguageConstants.CPQFindError[lang] = "No se pudo encontrar un grupo en esta sala.\r\nProbablemente el grupo fue deshecho dentro de la sala!";
        LanguageConstants.CPQEntryLobby[lang] = "Ahora usted recibira los retos de otros grupos. Si usted no acepta un desafio en 3 minutos, usted sera llevado hacia fuera.";
        LanguageConstants.CPQEntry[lang] = "Usted puede seleccionar \"Invocar Monstruos\", \"Habilidad\", o \"Protector\" como su tactica durante el Carnaval de los Monstruos. Utilice Tab y F1 ~ F12 para acceso rapido!";

        lang = Language.LANG_ENG.getValue();
        LanguageConstants.CPQBlue[lang] = "蓝队";
        LanguageConstants.CPQRed[lang] = "红队";
        LanguageConstants.CPQPlayerExit[lang] = " 离开了怪物嘉年华.";
        LanguageConstants.CPQExtendTime[lang] = "时间已延长.";
        LanguageConstants.CPQLeaderNotFound[lang] = "找不到队长.";
        LanguageConstants.CPQError[lang] = "出现了问题。请重新创建一个房间.";
        LanguageConstants.CPQPickRoom[lang] = "报名参加怪物嘉年华！\r\n";
        LanguageConstants.CPQChallengeRoomAnswer[lang] = "该小组目前正面临挑战.";
        LanguageConstants.CPQChallengeRoomSent[lang] = "已向会议室中的小组发送了挑战。请稍等。";
        LanguageConstants.CPQChallengeRoomDenied[lang] = "房间里的小组取消了你的挑战。";
        LanguageConstants.CPQFindError[lang] = "我们在这个房间里找不到一个小组.\r\n可能这群人在房间里被解散了!";
        LanguageConstants.CPQEntryLobby[lang] = "您现在将收到来自其他小组的挑战。如果你在3分钟内没有接受挑战，你将被淘汰。";
        LanguageConstants.CPQEntry[lang] = "You can select \"Summon Monsters\", \"Ability\", or \"Protector\" as your tactic during the Monster Carnival. Use Tab and F1 ~ F12 for quick access!";


    }

    public static String getMessage(Character chr, String[] message) {
        return message[chr.getLanguage()];
    }
}
