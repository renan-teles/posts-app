import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ThemeService } from '../../../../core/services/theme-service/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css',
})
export class ConfirmModalComponent {
  activeModal = inject(NgbActiveModal);
  @Input() bodyMessage: string = 'Deseja continuar?';
  @Input() title: string = 'Confirmar';
  @Input() btnConfirmClass: string = 'btn-danger';

  private readonly theme = inject(ThemeService);
  currentClass = this.theme.currentClass;
  isDark = this.theme.isDark;
}
