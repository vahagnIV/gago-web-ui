
const vertexShaderSource: string = "#version 300 es\n\n" +
    "layout(location = 0) in vec3 vertexPosition_modelspace;\n\n" +
    "uniform mat4 MVP;\n\n" +
    "void main(){\n" +
    "\tgl_Position =  MVP * vec4(vertexPosition_modelspace,1);\n" +
    "}";

const fragmentShaderSource = "#version 300 es\n" +
    "precision mediump float;\n" + 
    "out vec3 color;\n" +
    "\nuniform vec3 col;\n" +
    "void main()\n" +
    "{\n" +
    "\tcolor = col;\n" +
    "}";

export class ShaderRepository {
    constructor() { }

    fragmentShaderId: number = 0;
    programId: number = 0;
    colorId: number = 0;
    vertexShaderId: number = 0;

    loadShader(gl: any, type: number, source: any): any {
        const shader = gl.createShader(type);

        // Send the source to the shader object

        gl.shaderSource(shader, source);

        // Compile the shader program

        gl.compileShader(shader);

        // See if it compiled successfully

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    initShaderProgram(gl: any, vertexShaderId: number, fragmentShaderId: number): any {


        // Create the shader program

        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShaderId);
        gl.attachShader(shaderProgram, fragmentShaderId);
        gl.linkProgram(shaderProgram);

        // If creating the shader program failed, alert

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
            return null;
        }

        return shaderProgram;
    }

    initializeShaders(gl: any): void {
        this.vertexShaderId = this.loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        this.fragmentShaderId = this.loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        this.programId = this.initShaderProgram(gl, this.vertexShaderId, this.fragmentShaderId);
        this.colorId = gl.getUniformLocation(this.programId, "col");
    }


}