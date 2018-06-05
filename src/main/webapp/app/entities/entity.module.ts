import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HorizonappBIComponentAgModule } from './bi-component-ag/bi-component-ag.module';
import { HorizonappOrganizationAgModule } from './organization-ag/organization-ag.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        HorizonappBIComponentAgModule,
        HorizonappOrganizationAgModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HorizonappEntityModule {}
