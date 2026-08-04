import { Enemy } from "./enemy";

export class Encounter {
    id: string = "";
    location_id: string;
    user_id: string;
    active_enemies: Enemy[];
    constructor(location_id: string, user_id: string, active_enemies: Enemy[]) {
        this.location_id = location_id;
        this.user_id = user_id;
        this.active_enemies = active_enemies;
    }
}