import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from 'src/app/services/job.service';

import { Job } from 'src/app/interfaces/job.interface';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css'],
})
export class JobFormComponent {
  @Input() jobToEdit: Job | null = null;
  @Output() formSubmitted = new EventEmitter<void>();
  @Output() formCancelled = new EventEmitter<void>();
  jobForm!: FormGroup;
  jobTypes: string[] = ['Full stack', 'Front-end', 'Back-end'];

  constructor(private fb: FormBuilder, private jobService: JobService) {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['jobToEdit'] && changes['jobToEdit'].currentValue) {
      this.populateForm(changes['jobToEdit'].currentValue);
    }
  }

  createForm(): void {
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
      jobType: ['Full stack', [Validators.required]],
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

  populateForm(job: Job): void {
    this.jobForm.patchValue({
      jobTitle: job.jobTitle,
      companyName: job.companyName,
      location: job.location,
      jobType: job.jobType,
      jobDescription: job.jobDescription,
    });

    this.skills.clear();

    job.skills.forEach((skill) => {
      this.skills.push(
        this.fb.control(skill, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ])
      );
    });
  }

  cancelForm(): void {
    this.jobToEdit = null;
    this.jobForm.reset();
    this.skills.clear();
    this.formCancelled.emit();
  }

  submitForm(): void {
    if (this.jobForm.valid) {
      const jobData: Omit<Job, 'id'> = {
        companyName: this.jobForm.value.companyName,
        jobDescription: this.jobForm.value.jobDescription,
        jobTitle: this.jobForm.value.jobTitle,
        location: this.jobForm.value.location,
        skills: this.jobForm.value.skills,
        jobType: this.jobForm.value.jobType,
      };

      if (this.jobToEdit) {
        const updatedJob: Job = { ...jobData, id: this.jobToEdit.id };
        this.jobService.updateJob(updatedJob);
      } else {
        this.jobService.addJob(jobData);
      }

      this.formSubmitted.emit();
      this.jobForm.reset();
    } else {
      alert('Form is invalid');
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
