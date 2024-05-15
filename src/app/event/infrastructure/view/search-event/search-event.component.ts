import { CommonModule, NgStyle } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
import { searchEventFormCriteria, searchOnlineEvent } from '../../../application/search-event/search-event-precon-searchs';
import { FileService } from '../../../../shared/infrastructure/service/file-service.service';
import { CustomFileComponent } from '../../../../shared/infrastructure/view/custom-file/custom-file.component';
import { SHARED_CONSTANTS } from '../../../../shared/shared-constants';
import { SearchEventFormCriteriaOptions } from './search-event-criteria-form';

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
export class SearchEventComponent implements OnInit {

  @Output() searchEventEmiter: EventEmitter<Promise<EventModel[] | undefined>> = new EventEmitter<Promise<EventModel[] | undefined>>();

  private userLatLang: { lat: number, lang: number } = { lat: 39, lang: 2.96666 };


  get dis() { return this.searchForm.controls.distance }
 
  searchForm = this.formBuilder.group({
    content: [""],
    startDate: [null],
    distance: [25],
  });

  constructor(private eventService: EventService, private formBuilder: FormBuilder, private fileService: FileService) {

  }
  ngOnInit(): void {
    this.getUserLocation();
  }

  private getUserLocation() {

    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {

        // this.userLatLang.lat = position.coords.latitude;
        // this.userLatLang.lang = position.coords.longitude;

      }, function (error) {
        console.error("Error getting user location:", error);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  private calculateBounds(userLat: number, userLng: number, distance: number) {
    var earthRadius = 6371; // Earth radius in kilometers
    var angularDistance = distance / earthRadius; // Convert distance to angular distance

    // Convert latitude and longitude to radians
    var userLatRad = userLat * Math.PI / 180;
    var userLngRad = userLng * Math.PI / 180;

    // Calculate maximum and minimum latitude
    var maxLat = userLat + (angularDistance * (180 / Math.PI));
    var minLat = userLat - (angularDistance * (180 / Math.PI));

    // Calculate the change in longitude for the given latitude
    var deltaLng = Math.asin(Math.sin(angularDistance) / Math.cos(userLatRad));

    // Calculate maximum and minimum longitude
    var maxLng = userLng + (deltaLng * (180 / Math.PI));
    var minLng = userLng - (deltaLng * (180 / Math.PI));

    return { latMin: minLat, longMin: minLng, latMax: maxLat, longMax: maxLng };
}

  async searchEvent() {

    if (this.searchForm.valid) {

      const eventSearchFormOptions = this.searchForm.value as SearchEventFormCriteriaOptions;

      if (this.userLatLang && eventSearchFormOptions.distance !== 0){
        eventSearchFormOptions.distanceBounds = this.calculateBounds(this.userLatLang.lat, this.userLatLang.lang, eventSearchFormOptions.distance); 
      }

      const eventOptionCriteria = searchEventFormCriteria(eventSearchFormOptions);

      const eventsResponse = this.eventService.searchEvents(eventOptionCriteria);

      if (eventsResponse) {
        this.searchEventEmiter.emit(eventsResponse);
      }

    }

  }

}
