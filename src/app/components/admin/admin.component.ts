import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { JobService } from 'src/app/services/job.service';

import { Job } from 'src/app/interfaces/job.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  jobs: Job[] = [];
  jobForm!: FormGroup;

  constructor(private fb: FormBuilder, private jobService: JobService) {
    this.jobForm = this.fb.group({
      jobTitle: ['', Validators.required],
      companyName: ['', Validators.required],
      location: ['', Validators.required],
      jobType: ['', Validators.required],
      jobDescription: ['', Validators.required],
      skills: this.fb.array([], Validators.required),
    });
  }

  ngOnInit(): void {
    this.jobService.jobs$.subscribe((jobs) => {
      this.jobs = jobs;
    });
  }

  submitForm(): void {
    if (this.jobForm.valid) {
      const newJob: Job = {
        companyName: this.jobForm.value.companyName,
        jobDescription: this.jobForm.value.jobDescription,
        jobTitle: this.jobForm.value.jobTitle,
        location: this.jobForm.value.location,
        skills: this.jobForm.value.skills,
        jobType: this.jobForm.value.jobType,
      };
      // You can send newJob to FirestoreService or JobService to add to the database
      console.log('New Job:', newJob);
      // Example: this.firestoreService.addData('jobs', newJob);
      // Clear the form after submission
      this.jobForm.reset();
    } else {
      // Form is invalid, handle accordingly
      console.error('Form is invalid');
    }
  }

  // Getter for skills form array
  get skills() {
    return this.jobForm.get('skills') as FormArray;
  }

  // Function to add skills dynamically
  addSkill() {
    this.skills.push(this.fb.control('', Validators.required));
  }

  // Function to remove a skill
  removeSkill(index: number) {
    this.skills.removeAt(index);
  }
}
