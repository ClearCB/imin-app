import { Injectable } from '@angular/core';
import { EventModel } from '../../domain/model/event-model';
import { EventDTO } from '../dto/event-dto';
import { Tag } from '../../../shared/domain/model/tag';
import { Category } from '../../../shared/domain/model/category';

@Injectable({
  providedIn: 'root'
})
export class EventMapperService {

  private constructor() { }

  public static toGateway(event: EventModel): EventDTO {

    let tags: number[] = [];
    let categories: number[] = [];

    if ( event.categories){
      categories = event.categories.map(c => c.id)
    }

    if ( event.tags){
      tags = event.tags.map(t => t.id)
    }

      return {
        title: event.title,
        smallDescription: event.smallDescription,
        largeDescription: event.largeDescription,
        locationName: event.largeDescription,
        latitude: event.latitude,
        longitude: event.longitude,
        startDate: event.startDate,
        finishDate: event.finishDate,
        categories: categories,
        tags: tags,
        isOnline: event.isOnline,
      }

  }
}
