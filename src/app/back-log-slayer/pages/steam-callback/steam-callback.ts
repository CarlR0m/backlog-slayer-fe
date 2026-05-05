import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SteamService } from '../../../games/services/steam.service';
import { SyncStats } from '../../../games/interfaces/ImportSteam.interface';

@Component({
  selector: 'app-steam-callback',
  standalone: true,
  templateUrl: 'steam-callback.html',
})
export class SteamCallBack implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private steamService = inject(SteamService);

  status = signal<'syncing' | 'success' | 'error'>('syncing');
  stats = signal<SyncStats | null>(null);
  errorMessage = signal<string>('');
  ngOnInit() {
    const steamStatus = this.route.snapshot.queryParamMap.get('steam');
    const reason = this.route.snapshot.queryParamMap.get('reason');

    if (steamStatus === 'success') {
      this.executeSync();
    } else {
      this.errorMessage.set('La autenticación ha fallado.');
      this.status.set('error');
    }
  }
  private executeSync() {
    this.steamService.syncSteamGames().subscribe({
      next: (response) => {
        this.stats.set(response.stats);
        this.status.set('success');
      },
      error: () => {
        this.errorMessage.set('Error al sincronizar.');
        this.status.set('error');
      }
    });
  }
  goToLibrary() {
    this.router.navigateByUrl('/back-log-slayer/games-library');
  }
  goToHome() {
    this.router.navigateByUrl('/back-log-slayer/survey');
  }
}

