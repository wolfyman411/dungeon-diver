export class User {
    id: string = "";
    password: string;
    username: string;
    character_id: string;

    constructor(password: string, username: string, character_id: string) {
        this.password = password;
        this.username = username;
        this.character_id = character_id;
    }
}