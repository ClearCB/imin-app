import { Component, Input } from '@angular/core';
import { UserData } from '../../../../auth/domain/model/user-token-data';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { DetailUserComponent } from '../detail-user/detail-user.component';
import { User } from '../../../../auth/domain/model/user';

@Component({
  selector: 'app-compact-item-user',
  standalone: true,
  imports: [],
  templateUrl: './compact-item-user.component.html',
  styleUrl: './compact-item-user.component.scss'
})
export class CompactItemUserComponent {

  @Input()
  userData: User | null = null;


  userRef: DynamicDialogRef | undefined;
  
  constructor(private dialogService: DialogService){

  }


  goToUserDetail() {
    this.userRef = this.dialogService.open(DetailUserComponent, {
      data: this.userData,
      header: 'Select a Product',
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
