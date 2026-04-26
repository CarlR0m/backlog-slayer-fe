import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameImportModal } from '../../../games/components/game-import-modal/game-import-modal';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, GameImportModal],
  templateUrl: './navbar.html',
})
export class Navbar {
  authService = inject(AuthService);
}
