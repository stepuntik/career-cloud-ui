import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { Router } from '@angular/router';
import { Job } from '../../interfaces/job.interface';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css'],
})
export class JobCardComponent implements OnInit {
  @Input() job!: Job;
  @Output() editJobEvent = new EventEmitter<Job>();
  isAdminView: boolean = false;

  constructor(private jobService: JobService, private router: Router) {}

  ngOnInit(): void {
    this.isAdminView = this.router.url === '/admin';
    this.router.events.subscribe(() => {
      this.isAdminView = this.router.url === '/admin';
    });
  }

  editJob(): void {
    this.editJobEvent.emit(this.job);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  }

  deleteJob(): void {
    if (this.job.id) {
      if (confirm('Are you sure you want to delete this job?')) {
        this.jobService.deleteJob(this.job.id);
        alert('Job deleted!');
      }
    }
  }
}
