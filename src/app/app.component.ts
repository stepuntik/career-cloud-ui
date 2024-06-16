import { Component, OnInit } from '@angular/core';

import { FirestoreService } from './services/firestore.service';
import { JobService } from './services/job.service';

import { Job } from './interfaces/job.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  jobs: Job[] = [];

  constructor(
    private firestoreService: FirestoreService,
    private jobService: JobService
  ) {}
  ngOnInit(): void {
    this.jobService.jobs$.subscribe((jobs) => {
      this.jobs = jobs;
    });
  }
}
