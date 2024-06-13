import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private csvData: any[] = [];
  private metadata: string[] = [];

  setCsvData(data: any[], metadata: string[]): void {
    this.csvData = data;
    this.metadata = metadata;
  }

  getCsvData(): any[] {
    return this.csvData;
  }

  getMetadata(): string[] {
    return this.metadata;
  }
}
