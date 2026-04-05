import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../../../shared/footer/footer';


@Component({
  selector: 'main-layot',
  imports: [Navbar, Footer, RouterOutlet],
  templateUrl: './main-layot.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayot { }
