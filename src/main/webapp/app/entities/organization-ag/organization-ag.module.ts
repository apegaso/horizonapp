import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HorizonappSharedModule } from '../../shared';
import { HorizonappAdminModule } from '../../admin/admin.module';
import {
    OrganizationAgService,
    OrganizationAgPopupService,
    OrganizationAgComponent,
    OrganizationAgDetailComponent,
    OrganizationAgDialogComponent,
    OrganizationAgPopupComponent,
    OrganizationAgDeletePopupComponent,
    OrganizationAgDeleteDialogComponent,
    organizationRoute,
    organizationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...organizationRoute,
    ...organizationPopupRoute,
];

@NgModule({
    imports: [
        HorizonappSharedModule,
        HorizonappAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OrganizationAgComponent,
        OrganizationAgDetailComponent,
        OrganizationAgDialogComponent,
        OrganizationAgDeleteDialogComponent,
        OrganizationAgPopupComponent,
        OrganizationAgDeletePopupComponent,
    ],
    entryComponents: [
        OrganizationAgComponent,
        OrganizationAgDialogComponent,
        OrganizationAgPopupComponent,
        OrganizationAgDeleteDialogComponent,
        OrganizationAgDeletePopupComponent,
    ],
    providers: [
        OrganizationAgService,
        OrganizationAgPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HorizonappOrganizationAgModule {}
