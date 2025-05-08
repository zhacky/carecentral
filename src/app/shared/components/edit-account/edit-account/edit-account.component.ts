import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-account',
  imports: [FormsModule],
  templateUrl: './edit-account.component.html',
  styleUrl: './edit-account.component.css'
})
export class EditAccountComponent {
  selectedRole = 'viewer';
  accountStatus = 'active';

  onCancel() {
    console.log('Cancel clicked');
    // Add your logic here, like resetting the form
  }

  onSave() {
    console.log('Saved:', {
      role: this.selectedRole,
      status: this.accountStatus
    });
    // Add save logic here
  }
}
