import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  @Input({ required: true }) role!: string;
  @Input({ required: true }) message!: string;
  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }
}
