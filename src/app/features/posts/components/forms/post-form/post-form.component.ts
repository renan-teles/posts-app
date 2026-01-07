import { CommonModule } from '@angular/common';
import { Component, effect, EventEmitter, inject, input, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPostFormData } from '../../../model/posts-form-data.model';
import { IPost } from '../../../model/post.model';
import { ThemeService } from '../../../../../core/services/theme-service/theme.service';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
})
export class PostFormComponent {
  post = input<IPost | null>(null);
  @Output() submitForm = new EventEmitter<IPostFormData>();

  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
  });

  private readonly theme = inject(ThemeService);
  currentClass = this.theme.currentClass;
  isDark = this.theme.isDark;

  disabledButton = signal(false);

  constructor() {
    effect(() => {
      const post = this.post();
      if (!post) return;

      this.form.patchValue({
        title: post.title,
        body: post.body,
      });
      this.disabledButton.set(false);
    });
  }

  getInput(name: keyof IPostFormData) {
    return this.form.get(name);
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.disabledButton.set(true);
    this.submitForm.emit(this.form.getRawValue());
  }
}
