import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NgClass, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, NgIf } from '@angular/common';
import { HighlightDirective } from '../../directives/highlight.directive';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';

@Component({
  selector: 'app-course-card',
  imports: [NgClass, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, NgIf, HighlightDirective, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges {
  @Input() course: {
    id: number;
    name: string;
    code: string;
    credits: number;
    gradeStatus: string;
  } | undefined;

  @Input() enrolled = false;
  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;

  get cardClasses() {
    return {
      'card--enrolled': this.enrolled,
      'card--full': (this.course?.credits ?? 0) >= 4,
      expanded: this.isExpanded,
    };
  }

  get borderColor(): string {
    switch (this.course?.gradeStatus) {
      case 'passed': return 'green';
      case 'failed': return 'red';
      case 'pending': return 'gray';
      default: return 'gray';
    }
  }

  toggleDetails() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['course']) {
      console.log('Previous value:', changes['course'].previousValue);
      console.log('Current value:', changes['course'].currentValue);
    }
  }

  onEnroll() {
    if (this.course) {
      this.enrollRequested.emit(this.course.id);
    }
  }
}
