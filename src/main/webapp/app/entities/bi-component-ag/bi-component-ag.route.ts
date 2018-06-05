import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BIComponentAgComponent } from './bi-component-ag.component';
import { BIComponentAgDetailComponent } from './bi-component-ag-detail.component';
import { BIComponentAgPopupComponent } from './bi-component-ag-dialog.component';
import { BIComponentAgDeletePopupComponent } from './bi-component-ag-delete-dialog.component';

export const bIComponentRoute: Routes = [
    {
        path: 'bi-component-ag',
        component: BIComponentAgComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BIComponents'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bi-component-ag/:id',
        component: BIComponentAgDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BIComponents'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bIComponentPopupRoute: Routes = [
    {
        path: 'bi-component-ag-new',
        component: BIComponentAgPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BIComponents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bi-component-ag/:id/edit',
        component: BIComponentAgPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BIComponents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bi-component-ag/:id/delete',
        component: BIComponentAgDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BIComponents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
