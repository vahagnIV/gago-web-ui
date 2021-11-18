import { NodeType } from "./node-type";


export abstract class Node {
    id: number;
    constructor(id: number){
        this.id = id;
    }
    abstract Type(): NodeType;

}