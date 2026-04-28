import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GameImportModal } from '../../../games/components/game-import-modal/game-import-modal';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, GameImportModal],
  templateUrl: './navbar.html',
})
export class Navbar {
  authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
