/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HorizonappTestModule } from '../../../test.module';
import { BIComponentAgDialogComponent } from '../../../../../../main/webapp/app/entities/bi-component-ag/bi-component-ag-dialog.component';
import { BIComponentAgService } from '../../../../../../main/webapp/app/entities/bi-component-ag/bi-component-ag.service';
import { BIComponentAg } from '../../../../../../main/webapp/app/entities/bi-component-ag/bi-component-ag.model';

describe('Component Tests', () => {

    describe('BIComponentAg Management Dialog Component', () => {
        let comp: BIComponentAgDialogComponent;
        let fixture: ComponentFixture<BIComponentAgDialogComponent>;
        let service: BIComponentAgService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HorizonappTestModule],
                declarations: [BIComponentAgDialogComponent],
                providers: [
                    BIComponentAgService
                ]
            })
            .overrideTemplate(BIComponentAgDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BIComponentAgDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BIComponentAgService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BIComponentAg(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.bIComponent = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bIComponentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BIComponentAg();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.bIComponent = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bIComponentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
