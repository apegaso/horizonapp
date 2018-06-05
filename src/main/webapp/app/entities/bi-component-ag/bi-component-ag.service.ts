import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { BIComponentAg } from './bi-component-ag.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BIComponentAg>;

@Injectable()
export class BIComponentAgService {

    private resourceUrl =  SERVER_API_URL + 'api/bi-components';

    constructor(private http: HttpClient) { }

    create(bIComponent: BIComponentAg): Observable<EntityResponseType> {
        const copy = this.convert(bIComponent);
        return this.http.post<BIComponentAg>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(bIComponent: BIComponentAg): Observable<EntityResponseType> {
        const copy = this.convert(bIComponent);
        return this.http.put<BIComponentAg>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BIComponentAg>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BIComponentAg[]>> {
        const options = createRequestOption(req);
        return this.http.get<BIComponentAg[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BIComponentAg[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BIComponentAg = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BIComponentAg[]>): HttpResponse<BIComponentAg[]> {
        const jsonResponse: BIComponentAg[] = res.body;
        const body: BIComponentAg[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BIComponentAg.
     */
    private convertItemFromServer(bIComponent: BIComponentAg): BIComponentAg {
        const copy: BIComponentAg = Object.assign({}, bIComponent);
        return copy;
    }

    /**
     * Convert a BIComponentAg to a JSON which can be sent to the server.
     */
    private convert(bIComponent: BIComponentAg): BIComponentAg {
        const copy: BIComponentAg = Object.assign({}, bIComponent);
        return copy;
    }
}
