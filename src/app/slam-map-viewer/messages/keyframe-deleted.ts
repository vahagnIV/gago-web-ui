import { BaseMessage } from './base-message';

export class KeyFrameDeleted extends BaseMessage {

    constructor(view: DataView) {
        super();
        this.type = view.getInt32(0, true);
        this.id = view.getFloat64(4, true);
    }
    id: number;    
}