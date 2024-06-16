import { Component, Input, OnInit } from '@angular/core';
import { Job } from 'src/app/interfaces/job.interface';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
})
export class JobListComponent implements OnInit {
  @Input() jobs: Job[] = [];
  @Input() isAdminView: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
