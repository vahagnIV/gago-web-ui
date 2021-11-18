import { BaseMessage } from './base-message';
import { EuclideanTransofrmation } from './euclidean-transformation'

export class KeyFrameCreated extends BaseMessage {

    constructor(view: DataView) {
        super();
        this.type = view.getInt32(0, true);
        this.id = view.getFloat64(4, true);
        this.map_id = view.getFloat64(12, true);
        this.position = new EuclideanTransofrmation(view, 20);
    }
    id: number;
    map_id: number;
    position: EuclideanTransofrmation;
}