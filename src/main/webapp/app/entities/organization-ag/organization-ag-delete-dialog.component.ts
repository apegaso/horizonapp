import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrganizationAg } from './organization-ag.model';
import { OrganizationAgPopupService } from './organization-ag-popup.service';
import { OrganizationAgService } from './organization-ag.service';

@Component({
    selector: 'jhi-organization-ag-delete-dialog',
    templateUrl: './organization-ag-delete-dialog.component.html'
})
export class OrganizationAgDeleteDialogComponent {

    organization: OrganizationAg;

    constructor(
        private organizationService: OrganizationAgService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.organizationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'organizationListModification',
                content: 'Deleted an organization'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-organization-ag-delete-popup',
    template: ''
})
export class OrganizationAgDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private organizationPopupService: OrganizationAgPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.organizationPopupService
                .open(OrganizationAgDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
