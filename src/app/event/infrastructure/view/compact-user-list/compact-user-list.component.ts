import { Component, Input } from '@angular/core';
import { ScrollerModule } from 'primeng/scroller';
import { UserData } from '../../../../auth/domain/model/user-token-data';
import { NgClass } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { User } from '../../../../auth/domain/model/user';
import { TableModule } from 'primeng/table';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { DetailUserComponent } from '../detail-user/detail-user.component';

@Component({
  selector: 'app-compact-user-list',
  standalone: true,
  imports: [ScrollerModule, NgClass, SkeletonModule, TableModule],
  templateUrl: './compact-user-list.component.html',
  styleUrl: './compact-user-list.component.scss'
})
export class CompactUserListComponent {

  @Input()
  users: User[] = [];
  
  userRef: DynamicDialogRef | undefined;
  
  constructor(private dialogService: DialogService){

  }

  goToUserDetail(userData:User) {
    this.userRef = this.dialogService.open(DetailUserComponent, {
      data: userData,
      header: 'User data',
      width: '85vw',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      baseZIndex: 10000,
      maximizable: true
    });


    // this.router.navigateByUrl(`/${SHARED_CONSTANTS.ENDPOINTS.EVENT.NAME}/${SHARED_CONSTANTS.ENDPOINTS.EVENT.CHILDREN.DETAIL}/${eventId}`);
  }

}
