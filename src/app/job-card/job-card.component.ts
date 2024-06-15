import { Component, Input, OnInit } from '@angular/core';
import { Job } from '../interfaces/job.interface';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css'],
})
export class JobCardComponent {
  @Input() job!: Job;
}
