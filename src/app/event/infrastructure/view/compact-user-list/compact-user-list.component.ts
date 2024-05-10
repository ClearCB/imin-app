import { Component, Input } from '@angular/core';
import { ScrollerModule } from 'primeng/scroller';
import { UserData } from '../../../../auth/domain/model/user-token-data';
import { NgClass } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { CompactItemUserComponent } from '../compact-item-user/compact-item-user.component';
import { User } from '../../../../auth/domain/model/user';

@Component({
  selector: 'app-compact-user-list',
  standalone: true,
  imports: [ScrollerModule, NgClass, SkeletonModule, CompactItemUserComponent],
  templateUrl: './compact-user-list.component.html',
  styleUrl: './compact-user-list.component.scss'
})
export class CompactUserListComponent {

  @Input()
  users: User[] = [];


}
