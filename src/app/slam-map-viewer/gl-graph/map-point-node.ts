import { Node } from "./node";
import { NodeType } from "./node-type";
import { MapPointCreated } from "../messages/map-point-created";
import { Point } from "../messages/point";

export class MapPointNode extends Node {
    Type(): NodeType {
        return NodeType.MAP_POINT;
    }

    mapId: number;
    position: Point;
    bufferId: number = 0;
    updated: boolean = true;

    constructor(message: MapPointCreated) {
        super(message.id);
        this.mapId = message.map_id;
        this.position = message.position;
    }

    setBufferId(bufferId: number): void {
        this.bufferId = bufferId;                
    }

    updatePosition(position: Point): void {
        this.position = position;
        this.updated = true;
    }
}