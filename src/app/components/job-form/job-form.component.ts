import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from 'src/app/services/job.service';

import { Job } from 'src/app/interfaces/job.interface';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css'],
})
export class JobFormComponent {
  jobForm!: FormGroup;

  @Output() formSubmitted = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private jobService: JobService) {
    this.jobForm = this.fb.group({
      jobTitle: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      companyName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      location: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      jobType: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      jobDescription: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1000),
        ],
      ],
      skills: this.fb.array([], [Validators.required, Validators.minLength(1)]),
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

      this.jobService.addJob(newJob);
      this.formSubmitted.emit();
      this.jobForm.reset();
    } else {
      // Form is invalid, handle accordingly
      console.error('Form is invalid');
    }
  }

  get skills() {
    return this.jobForm.get('skills') as FormArray;
  }

  addSkill() {
    this.skills.push(
      this.fb.control('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ])
    );
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }
}
