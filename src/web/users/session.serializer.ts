import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

/**
 * 직렬화, 역직렬화 
 */
@Injectable()
export class SessionSerializer extends PassportSerializer {
    serializeUser(user: any, done: Function) {
        done(null, user);
    }

    deserializeUser(payload: any, done: Function) {
        done(null, payload);
    }
}