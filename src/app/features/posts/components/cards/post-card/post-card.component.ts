import { Component, EventEmitter, inject, input, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SimpleCapitalizePipe } from '../../../../../shared/pipes/simple-capitalize.pipe';
import { TitleCapitalizePipe } from '../../../../../shared/pipes/title-capitalize.pipe';
import { IPost } from '../../../model/post.model';
import { ThemeService } from '../../../../../core/services/theme-service/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, RouterLink, SimpleCapitalizePipe, TitleCapitalizePipe],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  post = input.required<IPost>();
  @Input() showButtonComments: boolean = true;

  private readonly theme = inject(ThemeService);
  currentClass = this.theme.currentClass;

  @Output() delete = new EventEmitter<number>();

  onDelete(): void {
    this.delete.emit(this.post().id);
  }
}
