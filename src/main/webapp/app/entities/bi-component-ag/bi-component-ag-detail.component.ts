import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BIComponentAg } from './bi-component-ag.model';
import { BIComponentAgService } from './bi-component-ag.service';

@Component({
    selector: 'jhi-bi-component-ag-detail',
    templateUrl: './bi-component-ag-detail.component.html'
})
export class BIComponentAgDetailComponent implements OnInit, OnDestroy {

    bIComponent: BIComponentAg;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bIComponentService: BIComponentAgService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBIComponents();
    }

    load(id) {
        this.bIComponentService.find(id)
            .subscribe((bIComponentResponse: HttpResponse<BIComponentAg>) => {
                this.bIComponent = bIComponentResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBIComponents() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bIComponentListModification',
            (response) => this.load(this.bIComponent.id)
        );
    }
}
