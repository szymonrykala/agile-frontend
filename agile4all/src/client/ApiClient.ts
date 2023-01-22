import { UUID } from "../models/common";
import { APIResponse, QueryParams } from "./interface";


export interface ServiceFormData {
    [index: string]: string | number | boolean | undefined | object
}


interface FetchData {
    method: string,
    endpoint: string,
    queryParams?: QueryParams,
    body?: object
}

interface ErrorData {
    type: string,
    description: string
}

export interface ResponseData {
    statusCode: number,
    data?: any,
    error?: ErrorData
}

export interface StatusMessages {
    [index: number]: string
}


abstract class BaseClient {

    private TOKEN_NAME: string = 'auth_token'; // local storage token variable name
    // BASE_URL: string = process.env.REACT_APP_API_URL as string; // api url from env
    protected BASE_URL: string = "https://virtserver.swaggerhub.com/SZYMONRYKALA_1/agile/1.0.0"


    protected get authToken(): string {
        return window.localStorage.getItem(this.TOKEN_NAME) || '';
    }

    protected set authToken(value: string) {
        window.localStorage.setItem(this.TOKEN_NAME, 'Bearer ' + value);
    }

    public clearAuthToken() {
        window.localStorage.removeItem(this.TOKEN_NAME);
    }

    private async _fetch(fetchObject: FetchData)
        // : Promise<APIResponse> 
        : Promise<object | object[]> {
        const response = await fetch(
            this.BASE_URL + fetchObject.endpoint,
            {
                method: fetchObject.method,
                cache: 'no-cache',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': this.authToken,
                },
                body: JSON.stringify(fetchObject.body)
            }
        );
        let data: ResponseData = {} as ResponseData
        try {
            data = await response.json() as ResponseData;
        } catch (error) {
            console.debug(error)
        }

        if (process.env.NODE_ENV !== 'production') console.debug(data);

        // if user is not authenticated - 
        // redirect to let sessionContext to resolve redirections
        if (response.status === 401 && !fetchObject.endpoint.match('/auth|me|activate')) {
            window.location.reload();
        }

        if (!response.ok) {
            if (process.env.NODE_ENV !== 'production')
                console.error(response);
            throw new Error(JSON.stringify(response));
        }

        return data as APIResponse;
    }

    protected _get(endpoint: string, queryParams: QueryParams = {}) {
        return this._fetch({
            method: 'GET',
            endpoint: endpoint + '?' + new URLSearchParams(queryParams as any).toString()
        });
    }

    protected _post(endpoint: string, body: object = {}) {
        return this._fetch({
            method: 'POST',
            endpoint: endpoint,
            body: body
        });
    }

    protected _patch(endpoint: string, body: object = {}) {
        if (Object.keys(body).length === 0) return;

        return this._fetch({
            method: 'PATCH',
            endpoint: endpoint,
            body: body
        });
    }

    protected _put(endpoint: string, body: object = {}) {
        if (Object.keys(body).length === 0) return;

        return this._fetch({
            method: 'PUT',
            endpoint: endpoint,
            body: body
        });
    }

    protected _delete(endpoint: string) {
        return this._fetch({
            method: 'DELETE',
            endpoint: endpoint
        });
    }
}


export default class ApiClient
    <ICreateData extends object, IUpdateData extends object>
    extends BaseClient {

    public path: string = ''

    getAll(queryParams: QueryParams = {}) {
        return this._get(this.path, queryParams)
    }

    getOne(id: UUID, queryParams: QueryParams = {}) {
        return this._get(`${this.path}/${id}`, queryParams)
    }

    create(body: ICreateData) {
        return this._post(this.path, body)
    }

    update(id: UUID, body: IUpdateData) {
        return this._patch(`${this.path}/${id}`, body)
    }

    delete(id: UUID) {
        return this._delete(`${this.path}/${id}`)
    }
}