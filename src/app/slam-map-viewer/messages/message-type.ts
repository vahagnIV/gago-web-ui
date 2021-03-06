
export enum MessageType {
    MAP_CREATED = 1,
    TRACKING_INFO = 2,
    KEYFRAME_CREATED = 8,
    MAP_POINT_CREATED = 16,
    KEYFRAME_DELETED = 32,
    MAP_POINT_DELETED = 64,
    OBSERVATION_ADDED = 128,
    OBSERVATION_DELETED = 256,
    KEYFRAME_POSITION_UPDATED = 512,
    KEYFRAME_COVISIBILITY_UPDATED = 1024,
    MAP_POINT_GEOMETRY_UPDATED = 2048
  };
  