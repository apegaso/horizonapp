import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrganizationAg } from './organization-ag.model';
import { OrganizationAgPopupService } from './organization-ag-popup.service';
import { OrganizationAgService } from './organization-ag.service';

@Component({
    selector: 'jhi-organization-ag-dialog',
    templateUrl: './organization-ag-dialog.component.html'
})
export class OrganizationAgDialogComponent implements OnInit {

    organization: OrganizationAg;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private organizationService: OrganizationAgService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.organization.id !== undefined) {
            this.subscribeToSaveResponse(
                this.organizationService.update(this.organization));
        } else {
            this.subscribeToSaveResponse(
                this.organizationService.create(this.organization));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OrganizationAg>>) {
        result.subscribe((res: HttpResponse<OrganizationAg>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OrganizationAg) {
        this.eventManager.broadcast({ name: 'organizationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-organization-ag-popup',
    template: ''
})
export class OrganizationAgPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private organizationPopupService: OrganizationAgPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.organizationPopupService
                    .open(OrganizationAgDialogComponent as Component, params['id']);
            } else {
                this.organizationPopupService
                    .open(OrganizationAgDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
