import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BIComponentAg } from './bi-component-ag.model';
import { BIComponentAgPopupService } from './bi-component-ag-popup.service';
import { BIComponentAgService } from './bi-component-ag.service';

@Component({
    selector: 'jhi-bi-component-ag-delete-dialog',
    templateUrl: './bi-component-ag-delete-dialog.component.html'
})
export class BIComponentAgDeleteDialogComponent {

    bIComponent: BIComponentAg;

    constructor(
        private bIComponentService: BIComponentAgService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bIComponentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bIComponentListModification',
                content: 'Deleted an bIComponent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bi-component-ag-delete-popup',
    template: ''
})
export class BIComponentAgDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bIComponentPopupService: BIComponentAgPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bIComponentPopupService
                .open(BIComponentAgDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
