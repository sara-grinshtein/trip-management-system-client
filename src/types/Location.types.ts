export type Location = {
    ID: string,
    longitude: Coordinate,
    latitude: Coordinate
    Time: Date
}

export type Coordinate = {
    degrees: number,
    minutes: number,
    seconds: number
}