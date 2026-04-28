export type Location = {
    ID: string,
    Longitude: Coordinate,
    Latitude: Coordinate
    Time: Date
}

export type Coordinate = {
    Degrees: number,
    Minutes: number,
    Seconds: number
}