import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
  // Component-level providers create a separate NotificationService instance
  // scoped only to that component and its child components.
  providers: [NotificationService]
})
export class NotificationComponent {
  constructor(private notificationService: NotificationService) {}

  get messages(): string[] {
    return this.notificationService.getMessages();
  }

  addNotification(): void {
    this.notificationService.addMessage('New notification at ' + new Date().toLocaleTimeString());
  }
}
