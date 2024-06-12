import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-upload',
  standalone: true,
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  imports: [CommonModule]
})
export class UploadComponent {
  csvData: any[] = [];

  constructor(private router: Router) {}

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          this.csvData = result.data;
          localStorage.setItem('csvData', JSON.stringify(this.csvData));
        }
      });
    }
  }

  goToPreview(): void {
    this.router.navigate(['/preview']);
  }
}
