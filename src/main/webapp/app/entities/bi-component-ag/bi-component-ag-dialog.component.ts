import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BIComponentAg } from './bi-component-ag.model';
import { BIComponentAgPopupService } from './bi-component-ag-popup.service';
import { BIComponentAgService } from './bi-component-ag.service';
import { OrganizationAg, OrganizationAgService } from '../organization-ag';

@Component({
    selector: 'jhi-bi-component-ag-dialog',
    templateUrl: './bi-component-ag-dialog.component.html'
})
export class BIComponentAgDialogComponent implements OnInit {

    bIComponent: BIComponentAg;
    isSaving: boolean;

    organizations: OrganizationAg[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private bIComponentService: BIComponentAgService,
        private organizationService: OrganizationAgService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.organizationService.query()
            .subscribe((res: HttpResponse<OrganizationAg[]>) => { this.organizations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bIComponent.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bIComponentService.update(this.bIComponent));
        } else {
            this.subscribeToSaveResponse(
                this.bIComponentService.create(this.bIComponent));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BIComponentAg>>) {
        result.subscribe((res: HttpResponse<BIComponentAg>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BIComponentAg) {
        this.eventManager.broadcast({ name: 'bIComponentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackOrganizationById(index: number, item: OrganizationAg) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-bi-component-ag-popup',
    template: ''
})
export class BIComponentAgPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bIComponentPopupService: BIComponentAgPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bIComponentPopupService
                    .open(BIComponentAgDialogComponent as Component, params['id']);
            } else {
                this.bIComponentPopupService
                    .open(BIComponentAgDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
