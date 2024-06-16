// job.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Job } from '../interfaces/job.interface';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private jobsSubject = new BehaviorSubject<Job[]>([]);
  jobs$ = this.jobsSubject.asObservable();

  constructor(private firestoreService: FirestoreService) {
    this.getJobs();
  }

  getJobs(): void {
    this.firestoreService.getData('data').subscribe((jobs) => {
      this.jobsSubject.next(jobs);
    });
  }

  setJobs(jobs: Job[]): void {
    this.jobsSubject.next(jobs);
  }

  addJob(job: Job): Promise<void> {
    return this.firestoreService.addData('data', job).then(() => {
      this.getJobs();
    });
  }

  deleteJob(id: string): Promise<void> {
    return this.firestoreService.deleteData('data', id).then(() => {
      this.getJobs();
    });
  }
}
