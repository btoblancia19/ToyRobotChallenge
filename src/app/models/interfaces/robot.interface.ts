import { EnumDirections } from "../enums/commands.enum";
import { EnumCoordinateLimit, EnumCoordinateType } from "../enums/coordinate.enum";

export interface Coordinate {
        x: number;
        y: number;
        type?: EnumCoordinateType;
        limit?: EnumCoordinateLimit;
}

export interface CurrentCoordinates {
        coordinates: Coordinate;
        direction: EnumDirections;
} 