import { Component, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EventModel } from '../../../../domain/model/event-model';
import { EventService } from '../../../service/event.service';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss'
})
export class EventDetailComponent {

  @Input({ required: false })
  eventId: string = "";

  eventFormError: string = "";

  event: EventModel | undefined = undefined;

  // Forms
  eventForm: FormGroup = this.formBuilder.group({
    title: [this.event?.title, [Validators.required]],
    smallDescription: [this.event?.smallDescription, Validators.required],
    largeDescription: [this.event?.largeDescription, Validators.required]
  });

  // Getters 
  get title() { return this.eventForm?.controls['title'] }
  get smallDescription() { return this.eventForm?.controls['smallDescription'] }
  get largeDescription() { return this.eventForm?.controls['largeDescription'] }

  constructor(private formBuilder: FormBuilder,
    private eventService: EventService,
    private router: Router) { }


  async ngOnInit(): Promise<void> {
    this.getEvent();
  }

  private async getEvent() {

    this.event = await this.eventService.getEvent(this.eventId);

    this.eventForm = this.formBuilder.group({
      title: [this.event?.title, [Validators.required]],
      smallDescription: [this.event?.smallDescription, Validators.required],
      largeDescription: [this.event?.largeDescription, Validators.required]
    })

  }

  async handleSubmit() {

    if (this.eventForm?.valid) {

      const event = this.eventForm.value as EventModel;
      const eventCreated = await this.eventService.updateEvent(this.eventId, event);

      if (eventCreated) {
        this.eventForm.reset();
        this.getEvent();
      }

    } else {

      this.eventForm?.markAllAsTouched();
    }

  }

  async updateEvent(event: EventModel) {
    if (event.id && event) {

      await this.eventService.updateEvent(event.id, event);
      await this.getEvent();

    }


  }



}
