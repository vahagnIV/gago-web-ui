function base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

function initCanvas() {
    const canvas = document.querySelector("#glCanvas");
    // Initialize the GL context
    const gl = canvas.getContext("webgl");

    // Only continue if WebGL is available and working
    if (gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }

    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
}

window.onload = initCanvas;

const MessageType = {
    MAP_CREATED: 1,
    TRACKING_INFO: 2,
    KEYFRAME_CREATED: 8,
    MAP_POINT_CREATED: 16,
    KEYFRAME_DELETED: 32,
    MAP_POINT_DELETED: 64,
    OBSERVATION_ADDED: 128,
    OBSERVATION_DELETED: 256,
    KEYFRAME_POSITION_UPDATED: 512,
    KEYFRAME_COVISIBILITY_UPDATED: 1024,
    MAP_POINT_GEOMETRY_UPDATED: 2048

};

var ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090'
});

ros.on('connection', function () {
    console.log('Connected to websocket server.');
});

ros.on('error', function (error) {
    console.log('Error connecting to websocket server: ', error);
});

ros.on('close', function () {
    console.log('Connection to websocket server closed.');
});

var listener = new ROSLIB.Topic({
    ros: ros,
    name: '/orb_slam3',
    messageType: 'std_msgs/UInt8MultiArray'
});

var graph = {};

function ParseQuaternion(view, offset) {
    return {
        x: view.getFloat64(offset, true),
        y: view.getFloat64(offset + 8, true),
        z: view.getFloat64(offset + 16, true),
        w: view.getFloat64(offset + 24, true)
    }
}

function Parse3DVector(view, offset) {
    return [
        view.getFloat64(offset, true),
        view.getFloat64(offset + 8, true),
        view.getFloat64(offset + 16, true)
    ]
}

function ParseEuclideanTransformation(view, offset) {
    return {
        quatR: ParseQuaternion(view, offset),
        T: Parse3DVector(view, offset + 32)
    }
}


listener.subscribe(function (message) {
    var arr = base64ToArrayBuffer(message.data);
    var view = new DataView(arr);
    if (arr.byteLength != message.layout.dim[0].size) {
        alert('error');
    }
    var type = view.getUint32(0, true);

    switch (type) {
        case MessageType.MAP_CREATED: {
            var msg = {
                map_id: view.getBigUint64(4, true)
            };
            break;
        }
        case MessageType.TRACKING_INFO: {
            var msg = {
                timestamp: view.getBigUint64(4, true),
                pose: ParseEuclideanTransformation(view, 12),
                velocity: ParseEuclideanTransformation(view, 68)
            };

            break;
        }
        case MessageType.KEYFRAME_CREATED: {
            var msg = {
                id: view.getBigUint64(4, true),
                map_id: view.getBigUint64(12, true),
                pose: ParseEuclideanTransformation(view, 20)

            };
            break;
        }
        case MessageType.MAP_POINT_CREATED: {
            var msg = {
                id: view.getBigUint64(4, true),
                map_id: view.getBigUint64(12, true),
                pose: Parse3DVector(view, 20)
            }
            break;
        }
        case MessageType.KEYFRAME_DELETED: {
            var msg = {
                id: view.getBigUint64(4, true),
            }
            break;
        }
        case MessageType.MAP_POINT_DELETED: {
            var msg = {
                id: view.getBigUint64(4, true),
            }
            break;
        }
        case MessageType.OBSERVATION_ADDED: {
            var msg = {
                frame_id: view.getBigUint64(4, true),
                map_point_id: view.getBigUint64(12, true),
            }
            break;
        }
        case MessageType.OBSERVATION_DELETED: {
            var msg = {
                frame_id: view.getBigUint64(4, true),
                map_point_id: view.getBigUint64(12, true),
            }
            break;
        }
        case MessageType.KEYFRAME_POSITION_UPDATED: {
            var msg = {
                id: view.getBigUint64(4, true),
                position: ParseEuclideanTransformation(view, 12)
            }
            break;

        }
        case MessageType.KEYFRAME_COVISIBILITY_UPDATED: {
            break;
        }
        case MessageType.MAP_POINT_GEOMETRY_UPDATED: {
            var msg = {
                id: view.getBigUint64(4, true),
                pose: Parse3DVector(view, 12)
            }
            break;
        }


    }


    console.log('Type = ' + type);
    if (type == 2) {

    }
    console.log(message);
    console.log(arr);
});