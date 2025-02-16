import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedbackForm!: FormGroup

  constructor (private fb: FormBuilder) {}

  ngOnInit (): void {
    this.feedbackForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      feedback: ['', Validators.required]
    })
  }

  onSubmit (): void {
    if (this.feedbackForm.valid) {
      // Handle form submission
      console.log('Feedback submitted', this.feedbackForm.value)
      this.feedbackForm.reset()
    }
  }
}
