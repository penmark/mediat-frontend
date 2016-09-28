import { Injectable } from '@angular/core'
import { AuthService } from '../auth/auth.service'
import { RequestOptionsArgs, Request, Http, RequestMethod, RequestOptions, Response } from '@angular/http'
import { Observable } from 'rxjs'

@Injectable()
export class HttpService {

  constructor(private auth: AuthService, private http: Http) {

  }

  private mergeOptions(providedOpts: RequestOptionsArgs, defaultOpts?: RequestOptions) {
    let newOptions = defaultOpts || new RequestOptions();
    newOptions = newOptions.merge(new RequestOptions(providedOpts));
    return newOptions;
  }

  private requestHelper(requestArgs: RequestOptionsArgs, additionalOptions?: RequestOptionsArgs): Observable<Response> {
    let options = new RequestOptions(requestArgs);
    if (additionalOptions) {
      options = options.merge(additionalOptions);
    }
    return this.request(new Request(options));
  }

  private requestWithToken(req: Request, token: string): Observable<Response> {
    req.headers.set('Authorization', 'Basic ' + token);
    return this.http.request(req);
  }

  public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    if (typeof url === 'string') {
      return this.get(url, options); // Recursion: transform url from String to Request
    }
    let req: Request = url as Request;
    let token: string = this.auth.credentials;
    return this.requestWithToken(req, token);
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({body: '', method: RequestMethod.Get, url}, options);
  }

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({body, method: RequestMethod.Post, url}, options);
  }

  public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({body, method: RequestMethod.Put, url}, options);
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({body: '', method: RequestMethod.Delete, url}, options);
  }

  public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({body, method: RequestMethod.Patch, url}, options);
  }

  public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({body: '', method: RequestMethod.Head, url}, options);
  }

  public options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({body: '', method: RequestMethod.Options, url}, options);
  }
}
