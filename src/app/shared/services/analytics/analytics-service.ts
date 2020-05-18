import { Injectable } from "@angular/core";
declare var ga: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  public emitEvent(eventCategory: string,
    eventAction: string,
    eventLabel: string = null,
    eventValue: number = null) {
    ga('send', 'event', { eventCategory, eventLabel, eventAction, eventValue });
  }
}  