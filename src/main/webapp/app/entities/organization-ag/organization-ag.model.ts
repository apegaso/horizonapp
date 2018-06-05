import { BaseEntity, User } from './../../shared';

export class OrganizationAg implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public bIComponents?: BaseEntity[],
        public users?: User[],
    ) {
    }
}
