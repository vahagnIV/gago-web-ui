import { Quaternion } from './quaternion';
import { Point } from './point';

export class EuclideanTransofrmation {
    constructor(view: DataView = new DataView(new ArrayBuffer(0)), offset: number = 0) {
        if (view.byteLength - offset == 0) {
            this.Q = new Quaternion();
            this.T = new Point();
            return;
        }

        if (view.byteLength - offset < 32) {
            throw new Error("Invalid view for parsing Quaternion");
        }
        this.Q = new Quaternion(view, offset);
        this.T = new Point(view, offset + Quaternion.getSize());
    }
    static getSize(){
        return Quaternion.getSize() + Point.getSize();
    }
    Q: Quaternion;
    T: Point;
}