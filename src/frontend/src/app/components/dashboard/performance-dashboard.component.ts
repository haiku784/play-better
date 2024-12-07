import { Component } from '@angular/core';

@Component({
  selector: 'app-performance-dashboard',
  templateUrl: './performance-dashboard.component.html',
  styleUrls: ['./performance-dashboard.component.css']
})
export class PerformanceDashboardComponent {
  insights: any[];

  constructor() {
    this.loadInsights();
  }

  loadInsights() {
    // Logic to fetch and display insights from the gameplay analyzer
  }
}