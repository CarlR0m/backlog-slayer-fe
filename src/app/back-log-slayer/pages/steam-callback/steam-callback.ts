import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from '../../../games/service/games.service';
import { SyncStats } from '../../../games/interface/ImportSteam.interface';

@Component({
  selector: 'app-steam-callback',
  standalone: true,
  templateUrl: 'steam-callback.html',
})
export class SteamCallBack implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private gamesService = inject(GamesService);

  status = signal<'syncing' | 'success' | 'error'>('syncing');
  stats = signal<SyncStats | null>(null);
  errorMessage = signal<string>('');
  ngOnInit() {
    const steamStatus = this.route.snapshot.queryParamMap.get('steam');
    const reason = this.route.snapshot.queryParamMap.get('reason');

    if (steamStatus === 'success') {
      this.executeSync();
    } else {
      this.handleReason(reason!);
    }
  }
  private executeSync() {
    this.gamesService.syncSteamGames().subscribe({
      next: (response) => {
        this.stats.set(response.stats);
        this.status.set('success');
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || 'Error en la sincronización con Steam.');
        this.status.set('error');
      }
    });
  }
  handleReason(reason: string){
      switch (reason) {
        case 'already_linked':
          this.errorMessage.set('La cuenta de Steam ya está vinculada a otra cuenta de Backlog Slayer.');
          break;
        case 'invalid_signature':
          this.errorMessage.set('La solicitud no es válida.');
          break;
        case 'access_denied':
          this.errorMessage.set('No se ha concedido acceso a Steam.');
          break;
        case 'server_error':
          this.errorMessage.set('Error del servidor.');
          break;
        default:
          this.errorMessage.set('La autenticación falló.');
          break;
      }
      this.status.set('error');
  }
  goToLibrary() {
    this.router.navigateByUrl('/back-log-slayer/games-library');
  }
  goToHome() {
    this.router.navigateByUrl('/back-log-slayer/prueba');
  }
}

