export class MathHelper {
    public static roundTo(num: number, precision: number) {
        const multi = Math.pow(10, precision);
        const rounded_num = Math.round(num * multi) / multi;

        return rounded_num.toFixed(precision);
    }
}