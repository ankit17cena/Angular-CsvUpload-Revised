import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as Papa from 'papaparse';
import { DataService } from '../data.service'; 

@Component({
  selector: 'app-upload',
  standalone: true,
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'], 
})
export class UploadComponent {
  constructor(private router: Router, private dataService: DataService) {}

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const metadata = result.meta.fields || [];
          const csvData = result.data;
          this.dataService.setCsvData(csvData, metadata);
        }
      });
    }
  }

  goToPreview(): void {
    this.router.navigate(['/preview']);
  }
}


