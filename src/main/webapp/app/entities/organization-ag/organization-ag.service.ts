import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { OrganizationAg } from './organization-ag.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<OrganizationAg>;

@Injectable()
export class OrganizationAgService {

    private resourceUrl =  SERVER_API_URL + 'api/organizations';

    constructor(private http: HttpClient) { }

    create(organization: OrganizationAg): Observable<EntityResponseType> {
        const copy = this.convert(organization);
        return this.http.post<OrganizationAg>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(organization: OrganizationAg): Observable<EntityResponseType> {
        const copy = this.convert(organization);
        return this.http.put<OrganizationAg>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OrganizationAg>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<OrganizationAg[]>> {
        const options = createRequestOption(req);
        return this.http.get<OrganizationAg[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OrganizationAg[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OrganizationAg = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OrganizationAg[]>): HttpResponse<OrganizationAg[]> {
        const jsonResponse: OrganizationAg[] = res.body;
        const body: OrganizationAg[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OrganizationAg.
     */
    private convertItemFromServer(organization: OrganizationAg): OrganizationAg {
        const copy: OrganizationAg = Object.assign({}, organization);
        return copy;
    }

    /**
     * Convert a OrganizationAg to a JSON which can be sent to the server.
     */
    private convert(organization: OrganizationAg): OrganizationAg {
        const copy: OrganizationAg = Object.assign({}, organization);
        return copy;
    }
}
