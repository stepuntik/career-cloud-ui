import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Job } from 'src/app/interfaces/job.interface';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
})
export class JobListComponent {
  @Input() jobs: Job[] = [];
  @Input() isAdminView: boolean = false;
  @Output() editJobEvent = new EventEmitter<Job>();

  onEditJob(job: Job): void {
    this.editJobEvent.emit(job);
  }
}
