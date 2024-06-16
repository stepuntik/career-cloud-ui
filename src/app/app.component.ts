import { Component, OnInit } from '@angular/core';

import { FirestoreService } from './services/firebase.service';
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
    this.firestoreService.getData('data').subscribe((data) => {
      this.jobService.setJobs(data);
    });
  }
}
