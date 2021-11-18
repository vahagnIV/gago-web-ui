import { BaseMessage } from './base-message';
import { EuclideanTransofrmation } from './euclidean-transformation'
import { MessageType } from './message-type';


export class TrackingInfo extends BaseMessage {
    constructor(view: DataView) {
        super();
        var type = view.getUint32(0, true);
        if (type != MessageType.TRACKING_INFO) {
            throw new Error('Not Tracking info');
        }
        this.type = type;
        var timestamp = view.getBigUint64(4, true);
        timestamp /= BigInt(1000000);

        this.timestamp = new Date(Number(timestamp));
        this.position = new EuclideanTransofrmation(view, 12);
        this.velocity = new EuclideanTransofrmation(view, 12 + EuclideanTransofrmation.getSize());
    }
    position: EuclideanTransofrmation;
    velocity: EuclideanTransofrmation;
    timestamp: Date;

}