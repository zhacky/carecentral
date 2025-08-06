import {Component, EventEmitter, Output} from '@angular/core';
import {PatientRecord} from '../../../../core/models/patient-record.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-record-modal',
  imports: [
    FormsModule
  ],
  templateUrl: './add-record-modal.component.html',
  styleUrl: './add-record-modal.component.css'
})
export class AddRecordModalComponent {
// In add-record-modal.component.ts
  @Output() save = new EventEmitter<PatientRecord>();
  @Output() closeModal = new EventEmitter<void>();
  newRecord: PatientRecord = {
    patientRecordId: 0,
    patientId: 0,
    visitDate: '',
    diagnosis: '',
    prescription: '',
    note: '',
    doctorId: 0
  };

  onSave() {
    // Collect form data into newRecord
    this.save.emit(this.newRecord);
  }

  onClose() {
    this.closeModal.emit();
  }
}
