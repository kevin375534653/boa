package cache;

import client.Character;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 师徒缓存
 * */
public class MasterCache {
    /**师徒邀请缓存*/
    public static Map<Integer, Character> ST_INVITE = new ConcurrentHashMap<>();

    /**师徒申请缓存*/
    public static Map<Integer,Character> ST_APPLY_FOR = new ConcurrentHashMap<>();

}
