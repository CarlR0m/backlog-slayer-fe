import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of, catchError, startWith } from 'rxjs';

import { ProfileService, UserProfile } from '../../../games/services/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  private profileService = inject(ProfileService);
  
  profile$ = this.profileService.getProfile().pipe(
    catchError(() => of(null as UserProfile | null)),
    startWith(null as UserProfile | null)
  );
}