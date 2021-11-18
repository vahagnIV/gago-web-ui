import { BaseMessage } from './base-message';
import { Point } from './point'
import { MessageType } from './message-type';

export class MapPointCreated extends BaseMessage {

    constructor(view: DataView) {
        super();
        var type = view.getUint32(0, true);
        if (type != MessageType.MAP_POINT_CREATED) {
            throw new Error('Not Map Point Created message');
        }
        this.type = type;

        this.id = view.getFloat64(4, true);
        this.map_id = view.getFloat64(12, true);
        this.position = new Point(view, 20);
    }
    id: number;
    map_id: number;
    position: Point;
}