
import * as bcrypt from 'bcrypt';

export class AppUtil {
    constructor() { }

    async generatePasswordHash(password: string) {
        let saltOrRounds: number = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }

    async comparePassword(password:string, hashedPassword:string) {
        return await bcrypt.compare(password, hashedPassword);
    }



}