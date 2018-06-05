/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HorizonappTestModule } from '../../../test.module';
import { BIComponentAgDetailComponent } from '../../../../../../main/webapp/app/entities/bi-component-ag/bi-component-ag-detail.component';
import { BIComponentAgService } from '../../../../../../main/webapp/app/entities/bi-component-ag/bi-component-ag.service';
import { BIComponentAg } from '../../../../../../main/webapp/app/entities/bi-component-ag/bi-component-ag.model';

describe('Component Tests', () => {

    describe('BIComponentAg Management Detail Component', () => {
        let comp: BIComponentAgDetailComponent;
        let fixture: ComponentFixture<BIComponentAgDetailComponent>;
        let service: BIComponentAgService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HorizonappTestModule],
                declarations: [BIComponentAgDetailComponent],
                providers: [
                    BIComponentAgService
                ]
            })
            .overrideTemplate(BIComponentAgDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BIComponentAgDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BIComponentAgService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BIComponentAg(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bIComponent).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
