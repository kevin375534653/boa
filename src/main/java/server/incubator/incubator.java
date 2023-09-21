package server.incubator;

public abstract class incubator {

    public abstract int[] getCommonItems();

    public abstract int[] getUncommonItems();

    public abstract int[] getRareItems();

    private final int[] getCommonItems;

    private final int[] getUncommonItems;

    private final int[] getRareItems;

    public incubator() {
        this.getCommonItems = getCommonItems();
        this.getUncommonItems = getUncommonItems();
        this.getRareItems = getRareItems();
    }

    public final int[] getItems(int tier) {
        if (tier == 0) {
            return getCommonItems;
        } else if (tier == 1) {
            return getUncommonItems;
        } else if (tier == 2) {
            return getRareItems;
        }
        return null;
    }
}
