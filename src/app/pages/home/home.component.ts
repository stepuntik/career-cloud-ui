import { Component, Input, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';

interface Job {
  jobTitle: string;
  companyName: string;
  jobDescription: string;
  location: string;
  jobType: string;
  skills: string[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  jobs: Job[] = [];

  constructor(private jobService: JobService) {}
  ngOnInit(): void {
    this.jobService.jobs$.subscribe((jobs) => {
      this.jobs = jobs;
      console.log(jobs);
    });
  }
}
