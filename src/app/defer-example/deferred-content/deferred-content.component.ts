import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deferred-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deferred-content.component.html',
  styleUrls: ['./deferred-content.component.scss']
})
export class DeferredContentComponent implements OnInit {
  mockData: string[] = [];
  isLoading = true;

  ngOnInit(): void {
    // Simulate a network request with a delay
    setTimeout(() => {
      this.mockData = [
        'Mock Item 1: Loaded dynamically!',
        'Mock Item 2: This content was fetched.',
        'Mock Item 3: More data here.',
        'Mock Item 4: And even more!'
      ];
      this.isLoading = false;
    }, 2000); // 2-second delay
  }
}
