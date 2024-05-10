import { Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { User } from '../../../../auth/domain/model/user';

@Component({
  selector: 'app-detail-user',
  standalone: true,
  imports: [],
  templateUrl: './detail-user.component.html',
  styleUrl: './detail-user.component.scss'
})
export class DetailUserComponent {

  user?: User;
  dataLoaded: boolean = false;

  constructor(private dialogConfig: DynamicDialogConfig,) {

  }
   ngOnInit() {

    // const eventId = this.route.snapshot.paramMap.get('eventId');
    if (this.dialogConfig.data) {
      this.user = this.dialogConfig.data;
    };
    
    this.dataLoaded = true;
  }
}
