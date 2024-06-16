// job.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FirestoreService } from './firestore.service';
import { Job } from '../interfaces/job.interface';

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

  async addJob(job: Job): Promise<void> {
    await this.firestoreService.addData('data', job);
    this.getJobs();
  }

  async updateJob(job: Job): Promise<void> {
    if (!job.id) {
      return Promise.reject('Job ID is required for updating');
    }
    await this.firestoreService.updateData('data', job.id, job);
    this.getJobs();
  }

  async deleteJob(id: string): Promise<void> {
    await this.firestoreService.deleteData('data', id);
    this.getJobs();
  }
}
