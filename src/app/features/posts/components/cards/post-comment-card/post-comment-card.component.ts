import { Component, inject, input } from '@angular/core';
import { IPostComment } from '../../../model/post-comment.model';
import { TitleCapitalizePipe } from '../../../../../shared/pipes/title-capitalize.pipe';
import { SimpleCapitalizePipe } from '../../../../../shared/pipes/simple-capitalize.pipe';
import { ThemeService } from '../../../../../core/services/theme-service/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-comment-card',
  standalone: true,
  imports: [CommonModule, TitleCapitalizePipe, SimpleCapitalizePipe],
  templateUrl: './post-comment-card.component.html',
  styleUrl: './post-comment-card.component.css',
})
export class PostCommentCardComponent {
  comment = input.required<IPostComment>();

  private readonly theme = inject(ThemeService);
  currentClass = this.theme.currentClass;
}
