import { BaseMessage } from './base-message';

export class MapPointDeleted extends BaseMessage {

    constructor(view: DataView) {
        super();
        this.type = view.getInt32(0, true);
        this.id = view.getFloat64(4, true);
    }
    id: number;    
}