export class Enemy {
    id: string = "";
    death_note: string;
    enemy_icon: string;
    enemy_name: string;
    hp: number;
    currentHP: number = 0;
    magic: number;
    moxie: number;
    muscle: number;
    reward: number;
    constructor(death_note: string, enemy_icon: string, enemy_name: string, hp: number, magic: number, moxie: number, muscle: number, reward: number) {
        this.death_note = death_note;
        this.enemy_icon = enemy_icon;
        this.enemy_name = enemy_name;
        this.hp = hp;
        this.magic = magic;
        this.moxie = moxie;
        this.muscle = muscle;
        this.reward = reward;
        this.currentHP = hp;
    }
}

export const EnemyConverter = {
    toFirebase: (enemy: Enemy) => {
        return {
            death_note: enemy.death_note,
            enemy_icon: enemy.enemy_icon,
            enemy_name: enemy.enemy_name,
            hp: enemy.hp,
            currentHP: enemy.currentHP,
            magic: enemy.magic,
            moxie: enemy.moxie,
            muscle: enemy.muscle,
            reward: enemy.reward
        }
    },
    fromFirebase: (snapshot: any, options: any) => {
        const data = snapshot.data(options);
        return new Enemy(
            data.death_note,
            data.enemy_icon,
            data.enemy_name,
            data.hp,
            data.magic,
            data.moxie,
            data.muscle,
            data.reward
        );
    }
}