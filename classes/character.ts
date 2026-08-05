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

    getLevel(): number {
        return this.moxie + this.muscle + this.magic
    }

    getRank(): string {
        const level = this.getLevel()
        if(this.class === "Warrior") {
            if (level >= 50) {
                return "The Legendary Warrior"
            }
            else if (level >= 41) {
                return "Warrior of Legend"
            } 
            else if (level >= 31) {
                return "Elite Warrior"
            } 
            if (level >= 21) {
                return "Warrior Veteran"
            } 
            if (level >= 11) {
                return "Skilled Warrior"
            }
            if (level >= 6) {
                return "Warrior"
            }
            else {
                return "Novice Warrior"
            }
        }
        else if(this.class === "Mage") {
            if (level >= 50) {
                return "The Legendary Mage"
            }
            else if (level >= 41) {
                return "Mage of Legend"
            } 
            else if (level >= 31) {
                return "Head Archmage"
            } 
            if (level >= 21) {
                return "Archmage"
            } 
            if (level >= 11) {
                return "Novice Mage"
            }
            if (level >= 6) {
                return "Mage"
            }
            else {
                return "Mage Trainee"
            }
        }
        else {
            if (level >= 50) {
                return "The Legendary Ranger"
            }
            else if (level >= 41) {
                return "Ranger of Legend"
            } 
            else if (level >= 31) {
                return "Elite Ranger"
            } 
            if (level >= 21) {
                return "Veteran Ranger"
            } 
            if (level >= 11) {
                return "Trained Ranger"
            }
            if (level >= 6) {
                return "Ranger"
            }
            else {
                return "Ranger Recruit"
            }
        }
    }
}