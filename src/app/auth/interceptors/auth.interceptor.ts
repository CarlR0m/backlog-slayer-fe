import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { environment } from "../../../environments/environment";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authToken = inject(AuthService).token();
  const urlApi = environment.api.url;

  if(!req.url.startsWith(urlApi)){
    return next(req);
  }

  const noTokenUrls = [
    '/login',
    '/register',
  ]

  const isPublicUrl = noTokenUrls.some(url => req.url.includes(url));
  if (isPublicUrl || !authToken) {
    return next(req);
  }

  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${authToken}`),
  });
  return next(newReq);
}
