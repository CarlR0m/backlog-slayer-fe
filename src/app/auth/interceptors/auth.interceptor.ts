import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { environment } from "../../../environments/environment";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authService = inject(AuthService);
  const authToken = authService.token();
  const urlApi = environment.api.url;

  if (!req.url.startsWith(urlApi)) {
    return next(req);
  }

  const noTokenUrls = [
    '/login',
    '/register',
  ];

  const pathname = new URL(req.url).pathname;
  const isPublicUrl = noTokenUrls.some(publicPath => pathname.endsWith(publicPath));

  if (isPublicUrl || !authToken) {
    return next(req);
  }

  const newReq = req.clone({
    headers: req.headers
      .set('Authorization', `Bearer ${authToken}`)
      .set('Accept', 'application/json'),
  });

  return next(newReq);
}
