import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Version } from '../models/version';
import { VersionService } from '../services/version.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  frontendVersion: string | undefined;
  backendVersion: string | undefined;

  constructor(private versionSvc: VersionService) {}
  ngOnInit(): void {
    this.versionSvc.getFrontendVersion().pipe(take(1)).subscribe({
      next: (data: Version) => {
        if (data) {
          this.frontendVersion = data.version;
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
          this.backendVersion = data.version;
        } else {
          console.error("Could not get backend version")
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error("Could not get backend version")
      }
    })}

}
