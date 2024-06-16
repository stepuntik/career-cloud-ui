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
  symbol: string = '+';

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.jobs$.subscribe((jobs) => {
      this.jobs = jobs;
    });
  }

  handleFormSubmit(): void {
    this.showForm = false;
    this.symbol = '+';
  }

  addJob(): void {
    this.showForm = !this.showForm;
    this.symbol = this.showForm ? '-' : '+';
  }
}
