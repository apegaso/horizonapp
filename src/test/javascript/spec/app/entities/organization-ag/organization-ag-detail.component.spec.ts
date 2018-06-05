/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HorizonappTestModule } from '../../../test.module';
import { OrganizationAgDetailComponent } from '../../../../../../main/webapp/app/entities/organization-ag/organization-ag-detail.component';
import { OrganizationAgService } from '../../../../../../main/webapp/app/entities/organization-ag/organization-ag.service';
import { OrganizationAg } from '../../../../../../main/webapp/app/entities/organization-ag/organization-ag.model';

describe('Component Tests', () => {

    describe('OrganizationAg Management Detail Component', () => {
        let comp: OrganizationAgDetailComponent;
        let fixture: ComponentFixture<OrganizationAgDetailComponent>;
        let service: OrganizationAgService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HorizonappTestModule],
                declarations: [OrganizationAgDetailComponent],
                providers: [
                    OrganizationAgService
                ]
            })
            .overrideTemplate(OrganizationAgDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrganizationAgDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrganizationAgService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new OrganizationAg(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.organization).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
