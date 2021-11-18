import { BaseMessage } from './base-message';
import { Point } from './point';

export class MapPointGeometryUpdated extends BaseMessage {

    constructor(view: DataView) {
        super();
        this.type = view.getInt32(0, true);
        this.id = view.getFloat64(4, true);
        this.position = new Point(view, 12);
    }
    id: number;    
    position: Point;
}