# Frontend – Referencia para desarrollo

## Stack
- Angular 19, Bootstrap 5.3.8, ng2-charts, RxJS signals
- Fuentes: Baskervville SC / Baskervville (Google Fonts)
- Iconos: Bootstrap Icons 1.11.3
- API base: `http://localhost:8000/api` (env.api.url)

## Estructura de módulos
```
src/app/
├── auth/           → login, register, guards, interceptor, AuthService
├── back-log-slayer/→ páginas principales, navbar, layout
├── games/          → GamesService, SteamService, interfaces de juegos
└── shared/         → utilidades
```

## Routing actual (`/back-log-slayer`)
| Ruta | Componente | Guard |
|------|-----------|-------|
| survey | Survey | — |
| game-recommendation | GameRecommendation | — |
| other-games | OtherGames | — |
| steam-sync | SteamCallBack | — (pendiente authGuard) |
| games-library | **VACÍO** (.gitkeep) | — |
| profile | **VACÍO** (.gitkeep) | — |

## Auth (signals)
```typescript
authService.authStatus()  // 'checking' | 'authenticated' | 'not-authenticated'
authService.user()        // User | null  → .id, .username, .email, .steam_id
authService.token()       // string | null
```

## GamesService – métodos disponibles
```typescript
getUserGames(): Observable<UserGame[]>          // GET /api/user/games
getGame(id): Observable<Game>                   // GET /api/game/:id
getUserTags(userId): Observable<Tag[]>          // GET /api/:id/user-tags
getGameSummary(userId): Observable<GameSummary> // GET /api/:id/game-summary
```

## SteamService
```typescript
getSteamAuthUrl(): Observable<SteamAuthResponse>   // GET /api/auth/steam/redirect
syncSteamGames(): Observable<SteamSyncResponse>    // POST /api/steam/sync
```

## Interfaz UserGame (lo que devuelve getUserGames)
```typescript
interface UserGame {
  id: number;
  steam_app_id: number;
  title: string;
  cover_image_url: string;
  short_description?: string | null;
  estimated_duration?: number | null;
  pivot: {
    status: 'backlog' | 'playing' | 'completed' | 'dropped';
    playtime_forever: number;  // minutos
    priority_score: number;
    user_rating: number | null;
  }
}
```

## Navbar actual
- Componente: `back-log-slayer/components/navbar/`
- Usa `authService.authStatus()` y `authService.user()` para mostrar/ocultar
- Link "Juegos" → `href="#"` (no funcional, candidato a → games-library)
- Incluye `<app-game-import-modal />`

## Convenciones del proyecto
- Componentes standalone (sin NgModule)
- Signals para estado reactivo
- Interceptor `authInterceptor` añade `Authorization: Bearer` automáticamente
- Bootstrap clases para layout; CSS propio solo para detalles visuales
- bg: `#252525` / `#212529`, texto: `#fff`, acento: `#0d6efd`, fuente: Baskervville SC

## Páginas a crear (nueva feature: biblioteca)
- `back-log-slayer/pages/games-library/games-library.ts` (página principal)
- `back-log-slayer/components/game-card/game-card.ts` (tarjeta de juego reutilizable)
- Ruta: `/back-log-slayer/games-library` con `authGuard`
- Navbar: cambiar link "Juegos" → `/back-log-slayer/games-library` (si auth + tiene juegos) o abre modal (si no tiene)

## Regla principal
**Crear nuevo, no modificar existente.** Solo tocar navbar.html para el link y back-log-slayer.routes.ts para la nueva ruta.
