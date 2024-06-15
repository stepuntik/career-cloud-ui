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
  title = 'career-cloud';
  jobs: Job[] = [];

  constructor(
    private firestoreService: FirestoreService,
    private jobService: JobService
  ) {}
  ngOnInit(): void {
    this.getDataFromFirestore();
  }

  // Method to get data from Firebase
  getDataFromFirestore(): void {
    this.firestoreService.getData('data').subscribe((data) => {
      this.jobService.setJobs(data);
    });
  }
}
