import { Injectable } from '@angular/core';
import { EventModel } from '../../domain/model/event-model';
import { EventDTO } from '../dto/event-dto';

@Injectable({
  providedIn: 'root'
})
export class EventMapperService {

  private constructor() { }

  public static toGateway(event: EventModel): EventDTO {

    return {
      title: event.title,
      smallDescription: event.smallDescription,
      largeDescription: event.largeDescription,
      locationName: event.largeDescription,
      latitude: event.latitude,
      longitude: event.longitude,
      startDate: event.startDate,
      finishDate: event.finishDate,
      categories: event.categories.map(c => c.id),
      tags: event.tags.map(t => t.id),
      isOnline: event.isOnline,
    }

  }
}
