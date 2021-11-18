export class Point {
    constructor(view: DataView = new DataView(new ArrayBuffer(0)), offset: number = 0) {
        if (view.byteLength - offset == 0) {
            return;
        }

        if (view.byteLength - offset < 24) {
            throw new Error("Invalid view for parsing 3D Point");
        }

        this.x = view.getFloat64(offset, true);
        this.y = view.getFloat64(offset + 8, true);
        this.z = view.getFloat64(offset + 16, true);


    }

    static getSize(): number {
        return 24;
    }

    asFloat32Array():Float32Array {
        return new Float32Array([this.x, this.y, this.z]);
    }

    x: number = 0;
    y: number = 0;
    z: number = 0;
}