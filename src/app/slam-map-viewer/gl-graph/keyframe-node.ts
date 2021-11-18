import { Node } from "./node";
import { NodeType } from "./node-type";
import { KeyFrameCreated } from "../messages/keyframe-created";
import { KeyFramePositionUpdated } from "../messages/keyframe-position-updated";

export class KeyFrameNode extends Node {
    Type(): NodeType {
        return NodeType.KEYFRAME;
    }

    constructor(message: KeyFrameCreated) {
        super(message.id);
    }

    updatePosition(message: KeyFramePositionUpdated): void{
        
    }
}