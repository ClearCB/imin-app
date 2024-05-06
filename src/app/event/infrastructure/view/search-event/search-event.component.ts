import { CommonModule, NgStyle } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { CustomMapComponent } from '../../../../map/infrastructure/view/custom-map/custom-map.component';
import { CustomCardEventComponent } from '../custom-card-event/custom-card-event.component';
import { EventModel } from '../../../domain/model/event-model';
import { EventService } from '../../service/event.service';
import { SearchOperation } from '../../../../shared/domain/model/search-operation';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AutoCompleteModule } from "primeng/autocomplete";
import { ChipsModule } from "primeng/chips";
import { InputMaskModule } from "primeng/inputmask";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SliderModule } from 'primeng/slider';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { searchOnlineEvent } from '../../../application/search-event/search-event-precon-searchs';
import { FileService } from '../../../../shared/infrastructure/service/file-service.service';
import { CustomFileComponent } from '../../../../shared/infrastructure/view/custom-file/custom-file.component';

@Component({
  selector: 'app-search-event',
  standalone: true,
  imports: [
    ReactiveFormsModule, CustomCardEventComponent,
    ButtonModule, ChipModule, FormsModule, RippleModule,
    NgStyle, MenuModule, InputTextModule, CustomMapComponent, DropdownModule,
    MultiSelectModule, RatingModule, SearchEventComponent,
    CommonModule, AutoCompleteModule, CalendarModule, ChipsModule, DropdownModule,
    InputMaskModule, InputNumberModule, ColorPickerModule, CascadeSelectModule,
    MultiSelectModule, ToggleButtonModule, SliderModule,
    InputTextareaModule, RadioButtonModule, InputTextModule,
    RatingModule, ChipModule, KnobModule,
    InputSwitchModule, ListboxModule, SelectButtonModule,
    CheckboxModule, ButtonModule, InputGroupModule, InputGroupAddonModule,
    CustomFileComponent
  ],
  templateUrl: './search-event.component.html',
  styleUrl: './search-event.component.scss'
})
export class SearchEventComponent {

  @Output() searchEventEmiter: EventEmitter<Promise<EventModel[] | undefined>> = new EventEmitter<Promise<EventModel[] | undefined>>();

  searchForm = this.formBuilder.group({

  });

  constructor(private eventService: EventService, private formBuilder: FormBuilder, private fileService: FileService) {

  }

  async searchEvent() {

    const onlineEventsOptions = searchOnlineEvent(false);

    const res = this.eventService.searchEvents(onlineEventsOptions);
    this.searchEventEmiter.emit(res);

  }

  uploadImage() {


  }

}
