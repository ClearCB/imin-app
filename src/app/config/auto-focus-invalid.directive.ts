import { ContentChildren, Directive, ElementRef, HostListener, Input, Optional, QueryList, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appAutoFocusInvalid]',
  standalone: true
})
export class AutoFocusInvalidDirective {
  @ContentChildren(NgControl) fields: QueryList<NgControl> | null = null;

  @HostListener('submit')
  check() {
    if (this.fields) {
      const fields = this.fields.toArray();
      for (let field of fields) {
        if (field.invalid) {
          (field.valueAccessor as any)._elementRef.nativeElement.focus();
          break;
        }
      }
    }
  }
}