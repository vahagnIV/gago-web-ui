export class Quaternion {
    constructor(view: DataView = new DataView(new ArrayBuffer(0)), offset: number = 0) {
        if (view.byteLength - offset == 0) {
            return;
        }

        if (view.byteLength - offset < 32) {
            throw new Error("Invalid view for parsing Quaternion");
        }
        this.x = view.getFloat64(offset, true);
        this.y = view.getFloat64(offset + 8, true);
        this.z = view.getFloat64(offset + 16, true);
        this.w = view.getFloat64(offset + 24, true);
    }
    static getSize(): number {
        return 32;
    }

    x: number = 0;
    y: number = 0;
    z: number = 0;
    w: number = 1;
}