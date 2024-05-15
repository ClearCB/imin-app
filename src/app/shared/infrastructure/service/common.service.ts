import { Injectable } from '@angular/core';
import { CommonRepositoryPort } from '../../domain/port/out/common-repository-port';
import { NotificationService } from './notification.service';
import { Category } from '../../domain/model/category';
import { getAllCategories } from '../../application/get-all-categories/get-all-categories';
import { getAllTags } from '../../application/get-all-tags/get-all-tags';
import { Tag } from '../../domain/model/tag';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  // constructor(private commonRespository: CommonRepositoryPort, private notificationService: NotificationService) {
  constructor() {

  }

  async getAllCategories(): Promise<Category[] | undefined> {

    try {




      const categoriesResponse = [{
        id:1,
        name:"Sport",
        icon:"sport",
      },
      {
        id:2,
        name:"Unknown",
        icon:"unknown",
      },{
        id:3,
        name:"Information",
        icon:"information",
      },{
        id:4,
        name:"Cafe",
        icon:"cafe",
      },{
        id:5,
        name:"Restaurant",
        icon:"food",
      },{
        id:6,
        name:"Travel",
        icon:"travel",
      },{
        id:7,
        name:"Business",
        icon:"business",
      },{
        id:8,
        name:"Study",
        icon:"study",
      }];
      // const categoriesResponse = await getAllCategories(this.commonRespository);

      // if (!categoriesResponse) {
      //   this.notificationService.showError(EVENT_CONSTANTS.MESSAGES.EVENT_CANT_ADD_USER);
      //   return;
      // }

      return categoriesResponse;

    } catch (e: any) {

      console.error(e.message);
      // this.notificationService.showError(EVENT_CONSTANTS.MESSAGES.EVENT_NOT_FOUND);
      return;
    }
  }

  async getAllTags(): Promise<Tag[] | undefined> {

    try {

      // const tagsResponse = await getAllTags();

      // if (!categoriesResponse) {
      //   this.notificationService.showError(EVENT_CONSTANTS.MESSAGES.EVENT_CANT_ADD_USER);
      //   return;
      // }

      // return tagsResponse;
      return [];

    } catch (e: any) {

      console.error(e.message);
      // this.notificationService.showError(EVENT_CONSTANTS.MESSAGES.EVENT_NOT_FOUND);
      return;
    }
  }
}
