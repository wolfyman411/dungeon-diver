export class Character {
    id: string = "";
    class: string;
    hp: number;
    magic: number;
    moxie: number;
    muscle: number;
    wins: number;
    xp: number;
    world_completion: Array<{id: string, progress: number}> = new Array()
    constructor(className: string, hp: number, magic: number, moxie: number, muscle: number, wins: number, xp: number) {
        this.class = className;
        this.hp = hp;
        this.magic = magic;
        this.moxie = moxie;
        this.muscle = muscle;
        this.wins = wins;
        this.xp = xp;
    }

    clone(id:string, world_completion: Array<{id: string, progress: number}>):Character {
        const clone = new Character(
            this.class,
            this.hp,
            this.magic,
            this.moxie,
            this.muscle,
            this.wins,
            this.xp
        )
        clone.id = id
        clone.world_completion = world_completion

        return clone
    }

    getLevel(): number {
        return this.moxie + this.muscle + this.magic
    }

    getDamage(type:string, amount:number): number {
        if (type === "muscle") {
            return Math.max(amount - this.muscle,0)
        }
        else if (type === "magic") {
            return Math.max(amount - this.magic,0)
        }
        else {
            return Math.max(amount - this.moxie,0)
        }
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