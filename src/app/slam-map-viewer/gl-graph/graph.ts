import { KeyFrameNode } from "./keyframe-node";
import { MapPointNode } from "./map-point-node";
import { NodeType } from "./node-type";
import { ShaderRepository } from "./shader-repository"


type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};



export class Graph {

    keyframes: EnumDictionary<number, KeyFrameNode> = {};
    map_points: EnumDictionary<number, MapPointNode> = {};

    shader_repository: ShaderRepository = new ShaderRepository();
    gl: any;
    pointBuffers: number[] = [];


    constructor() {

    }

    draw(): void {

        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        // Set the view port
        this.gl.viewport(0, 0, 640, 480);
        if (this.gl == undefined) {
            return;
        }
        this.gl.useProgram(this.shader_repository.programId);

        this.gl.uniform3fv(this.shader_repository.colorId, new Float32Array([0, 1, 0]));

        for (let key in this.map_points) {
            this.gl.enableVertexAttribArray(0);
            let mp = this.map_points[key];
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, mp.bufferId);
            if (mp.updated) {
                // Pass the vertex data to the buffer
                this.gl.bufferData(this.gl.ARRAY_BUFFER, mp.position.asFloat32Array(), this.gl.STATIC_DRAW);
            }

            this.gl.vertexAttribPointer(
                0,                  // attribute. No particular reason for 0, but must match the layout in the shader.
                3,                  // size
                this.gl.FLOAT,           // type
                false,           // normalized?
                0,                  // stride
                0            // array buffer offset
            );

            this.gl.drawArrays(this.gl.GL_POINTS, 0, 1);
            this.gl.disableVertexAttribArray(0);
        }
    }

    addKeyFrame(node: KeyFrameNode): void {
        this.keyframes[node.id] = node;
    }

    addMapPoint(node: MapPointNode): void {
        this.map_points[node.id] = node;
        let bufferId: number;
        if (this.pointBuffers.length == 0) {
            bufferId = this.gl.createBuffer();

            /*this.gl.genBuffers()*/
        }
        else {
            bufferId = this.pointBuffers.pop() || 0;
        }
        node.setBufferId(bufferId);
    }

    deleteKeyFrame(id: number): void {
        delete this.keyframes[id];
    }

    deleteMapPoint(id: number): void {
        this.pointBuffers.push(this.map_points[id].bufferId);
        delete this.map_points[id];
    }

    getKeyFrame(id: number): KeyFrameNode {
        return this.keyframes[id];
    }

    getMapPoint(id: number): MapPointNode {
        return this.map_points[id];
    }

    setGlContext(gl: any) {
        this.shader_repository.initializeShaders(gl);
        this.gl = gl;
    }

}