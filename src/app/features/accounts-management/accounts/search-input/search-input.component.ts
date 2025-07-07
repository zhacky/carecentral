import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {
  @Output() search = new EventEmitter<string>();
  searchTerm = '';

  onSearch(): void {
    this.search.emit(this.searchTerm);
  }
}
