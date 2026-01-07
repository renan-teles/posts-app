import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertState } from '../../types/alert-state.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent implements OnInit {
  @Input({ required: true }) alertState!: AlertState;
  @Output() closed = new EventEmitter<void>();

  componentClass!: string;
  icon!: string;
  message!: string;

  ngOnInit(): void {
    this.componentClass = this.alertState.alertClass;
    this.icon = this.alertState.alertIcon;
    this.message = this.alertState.message;
  }

  close(): void {
    this.closed.emit();
  }
}
