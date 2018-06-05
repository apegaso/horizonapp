import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OrganizationAg } from './organization-ag.model';
import { OrganizationAgService } from './organization-ag.service';

@Component({
    selector: 'jhi-organization-ag-detail',
    templateUrl: './organization-ag-detail.component.html'
})
export class OrganizationAgDetailComponent implements OnInit, OnDestroy {

    organization: OrganizationAg;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private organizationService: OrganizationAgService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOrganizations();
    }

    load(id) {
        this.organizationService.find(id)
            .subscribe((organizationResponse: HttpResponse<OrganizationAg>) => {
                this.organization = organizationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOrganizations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'organizationListModification',
            (response) => this.load(this.organization.id)
        );
    }
}
