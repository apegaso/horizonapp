import { BaseEntity } from './../../shared';

export class BIComponentAg implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public key?: string,
        public auth?: string,
        public organizations?: BaseEntity[],
    ) {
    }
}
