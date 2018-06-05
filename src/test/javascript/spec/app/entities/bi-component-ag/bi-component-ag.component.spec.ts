/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HorizonappTestModule } from '../../../test.module';
import { BIComponentAgComponent } from '../../../../../../main/webapp/app/entities/bi-component-ag/bi-component-ag.component';
import { BIComponentAgService } from '../../../../../../main/webapp/app/entities/bi-component-ag/bi-component-ag.service';
import { BIComponentAg } from '../../../../../../main/webapp/app/entities/bi-component-ag/bi-component-ag.model';

describe('Component Tests', () => {

    describe('BIComponentAg Management Component', () => {
        let comp: BIComponentAgComponent;
        let fixture: ComponentFixture<BIComponentAgComponent>;
        let service: BIComponentAgService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HorizonappTestModule],
                declarations: [BIComponentAgComponent],
                providers: [
                    BIComponentAgService
                ]
            })
            .overrideTemplate(BIComponentAgComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BIComponentAgComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BIComponentAgService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BIComponentAg(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.bIComponents[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
