/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HorizonappTestModule } from '../../../test.module';
import { OrganizationAgComponent } from '../../../../../../main/webapp/app/entities/organization-ag/organization-ag.component';
import { OrganizationAgService } from '../../../../../../main/webapp/app/entities/organization-ag/organization-ag.service';
import { OrganizationAg } from '../../../../../../main/webapp/app/entities/organization-ag/organization-ag.model';

describe('Component Tests', () => {

    describe('OrganizationAg Management Component', () => {
        let comp: OrganizationAgComponent;
        let fixture: ComponentFixture<OrganizationAgComponent>;
        let service: OrganizationAgService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HorizonappTestModule],
                declarations: [OrganizationAgComponent],
                providers: [
                    OrganizationAgService
                ]
            })
            .overrideTemplate(OrganizationAgComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrganizationAgComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrganizationAgService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new OrganizationAg(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.organizations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
