import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OrganizationAgComponent } from './organization-ag.component';
import { OrganizationAgDetailComponent } from './organization-ag-detail.component';
import { OrganizationAgPopupComponent } from './organization-ag-dialog.component';
import { OrganizationAgDeletePopupComponent } from './organization-ag-delete-dialog.component';

export const organizationRoute: Routes = [
    {
        path: 'organization-ag',
        component: OrganizationAgComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Organizations'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'organization-ag/:id',
        component: OrganizationAgDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Organizations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const organizationPopupRoute: Routes = [
    {
        path: 'organization-ag-new',
        component: OrganizationAgPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Organizations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'organization-ag/:id/edit',
        component: OrganizationAgPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Organizations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'organization-ag/:id/delete',
        component: OrganizationAgDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Organizations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
