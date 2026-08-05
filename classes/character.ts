export class Character {
    id: string = "";
    class: string;
    hp: number;
    magic: number;
    moxie: number;
    muscle: number;
    wins: number;
    xp: number;
    world_completion: Map<string, number> = new Map();
    constructor(className: string, hp: number, magic: number, moxie: number, muscle: number, wins: number, xp: number) {
        this.class = className;
        this.hp = hp;
        this.magic = magic;
        this.moxie = moxie;
        this.muscle = muscle;
        this.wins = wins;
        this.xp = xp;
    }
}