import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/interfaces/job.interface';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  jobTypes: string[] = ['Front-end', 'Back-end', 'Full stack'];

  selectedJobType: string = 'All';

  constructor(private jobService: JobService) {}
  ngOnInit(): void {
    this.jobService.jobs$.subscribe((jobs) => {
      this.jobs = jobs;
      this.filterJobs();
    });
  }

  onJobTypeChange(): void {
    this.filterJobs();
  }

  filterJobs(): void {
    if (this.selectedJobType === 'All') {
      this.filteredJobs = this.jobs;
    } else {
      this.filteredJobs = this.jobs.filter(
        (job) => job.jobType === this.selectedJobType
      );
    }
  }
}
