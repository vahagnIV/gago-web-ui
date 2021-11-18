import { BaseMessage } from './base-message';
import { Point } from './point'
import { MessageType } from './message-type';

export class KeyFramePositionUpdated extends BaseMessage {

    constructor(view: DataView) {
        super();
        var type = view.getUint32(0, true);
        if (type != MessageType.KEYFRAME_POSITION_UPDATED) {
            throw new Error('Not Kf updated message');
        }
        this.type = type;
        this.id = view.getFloat64(4, true);        
        this.position = new Point(view, 12);
    }
    id: number;    
    position: Point;
}