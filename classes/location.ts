import { Enemy } from "./enemy";

export class Location {
    id: string = "";
    challenge: number;
    challenges:number;
    enemies: string[];
    location_name: string;
    max_enemies: number;
    required_locations: string[];
    constructor(challenge: number, challenges:number, enemies: string[], location_name: string, max_enemies: number, required_locations: string[]) {
        this.challenge = challenge;
        this.challenges = challenges;
        this.enemies = enemies;
        this.location_name = location_name;
        this.max_enemies = max_enemies;
        this.required_locations = required_locations;
    }
}

export const LocationConverter = {
    toFirebase: (location: Location) => {
        return {
            challenge: location.challenge,
            challenges: location.challenges,
            enemies: location.enemies,
            location_name: location.location_name,
            max_enemies: location.max_enemies,
            required_locations: location.required_locations
        }
    },
    fromFirebase: (snapshot: any, options: any) => {
        const data = snapshot.data(options);
        return new Location(
            data.challenge,
            data.challenges,
            data.enemies,
            data.location_name,
            data.max_enemies,
            data.required_locations
        );
    }
}