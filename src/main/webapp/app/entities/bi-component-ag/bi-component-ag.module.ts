import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HorizonappSharedModule } from '../../shared';
import {
    BIComponentAgService,
    BIComponentAgPopupService,
    BIComponentAgComponent,
    BIComponentAgDetailComponent,
    BIComponentAgDialogComponent,
    BIComponentAgPopupComponent,
    BIComponentAgDeletePopupComponent,
    BIComponentAgDeleteDialogComponent,
    bIComponentRoute,
    bIComponentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...bIComponentRoute,
    ...bIComponentPopupRoute,
];

@NgModule({
    imports: [
        HorizonappSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BIComponentAgComponent,
        BIComponentAgDetailComponent,
        BIComponentAgDialogComponent,
        BIComponentAgDeleteDialogComponent,
        BIComponentAgPopupComponent,
        BIComponentAgDeletePopupComponent,
    ],
    entryComponents: [
        BIComponentAgComponent,
        BIComponentAgDialogComponent,
        BIComponentAgPopupComponent,
        BIComponentAgDeleteDialogComponent,
        BIComponentAgDeletePopupComponent,
    ],
    providers: [
        BIComponentAgService,
        BIComponentAgPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HorizonappBIComponentAgModule {}
