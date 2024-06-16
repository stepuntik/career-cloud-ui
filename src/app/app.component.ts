import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

import { FirestoreService } from './services/firebase.service';
import { JobService } from './services/job.service';

import { Job } from './interfaces/job.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'career-cloud';
  jobs: Job[] = [];
  user: firebase.User | null = null;

  constructor(
    private firestoreService: FirestoreService,
    private jobService: JobService,
    public afAuth: AngularFireAuth,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.firestoreService.getData('data').subscribe((data) => {
      this.jobService.setJobs(data);
    });

    this.afAuth.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });
  }

  async loginWithGoogle(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await this.afAuth.signInWithPopup(provider);
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
}
