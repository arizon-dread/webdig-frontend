import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { take } from 'rxjs/operators';
import { Version } from '../models/version';
import { VersionService } from '../services/version.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTerminal } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  frontendVersion = signal<string | undefined>(undefined);
  backendVersion = signal<string | undefined>(undefined);
  faTerminal = faTerminal;
  constructor(private versionSvc: VersionService) { }
  ngOnInit(): void {
    this.versionSvc.getFrontendVersion().pipe(take(1)).subscribe({
      next: (data: Version) => {
        if (data) {
          this.frontendVersion.set(data.version);
        } else {
          console.error("Could not get frontend version")
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error("Could not get frontend version")
      }
    });
    this.versionSvc.getBackendVersion().pipe(take(1)).subscribe({
      next: (data: Version) => {
        if (data) {
          this.backendVersion.set(data.version);
        } else {
          console.error("Could not get backend version")
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error("Could not get backend version")
      }
    })
  }

}
