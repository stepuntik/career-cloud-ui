// job.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Job } from '../interfaces/job.interface';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private jobsSubject = new BehaviorSubject<Job[]>([]);
  jobs$ = this.jobsSubject.asObservable();

  setJobs(jobs: Job[]): void {
    this.jobsSubject.next(jobs);
  }
}
