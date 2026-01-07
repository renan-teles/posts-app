import { Component, EventEmitter, input, Output } from '@angular/core';
import { PostCardComponent } from '../../cards/post-card/post-card.component';
import { IPost } from '../../../model/post.model';
import { LoadingComponent } from '../../../../../shared/components/loading/loading.component';
import { ErrorComponent } from '../../../../../shared/components/error/error.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostCardComponent, LoadingComponent, ErrorComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent {
  posts = input.required<IPost[]>();
  loading = input.required<boolean>();
  error = input.required<boolean>();

  @Output() delete = new EventEmitter<number>();

  onDelete(id: number): void {
    this.delete.emit(id);
  }
}
