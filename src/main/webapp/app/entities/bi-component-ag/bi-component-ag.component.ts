import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BIComponentAg } from './bi-component-ag.model';
import { BIComponentAgService } from './bi-component-ag.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-bi-component-ag',
    templateUrl: './bi-component-ag.component.html'
})
export class BIComponentAgComponent implements OnInit, OnDestroy {
bIComponents: BIComponentAg[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private bIComponentService: BIComponentAgService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.bIComponentService.query().subscribe(
            (res: HttpResponse<BIComponentAg[]>) => {
                this.bIComponents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBIComponents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: BIComponentAg) {
        return item.id;
    }
    registerChangeInBIComponents() {
        this.eventSubscriber = this.eventManager.subscribe('bIComponentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
