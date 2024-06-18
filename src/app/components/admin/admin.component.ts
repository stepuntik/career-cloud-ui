import { Component, OnInit } from '@angular/core';

import { JobService } from 'src/app/services/job.service';

import { Job } from 'src/app/interfaces/job.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  jobs: Job[] = [];
  showForm: boolean = false;
  selectedJob: Job | null = null;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.jobs$.subscribe((jobs) => {
      this.jobs = jobs;
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  onEditJob(job: Job): void {
    this.selectedJob = job;
    this.showForm = true;
  }

  onFormSubmitted(): void {
    this.showForm = false;
    this.selectedJob = null;
    alert('Job saved!');
  }

  onFormCancelled(): void {
    this.showForm = false;
    this.selectedJob = null;
  }

  get symbol(): string {
    return this.showForm ? '-' : '+';
  }
}
