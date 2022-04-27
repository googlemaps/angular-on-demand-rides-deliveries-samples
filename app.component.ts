/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, ViewChild } from '@angular/core';
import { JourneySharingUserOptions } from './shared/journey-sharing-user-options';
import { JourneySharingGoogleMapComponent } from './journey-sharing-google-map/journey-sharing-google-map.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(JourneySharingGoogleMapComponent)
  public journeySharingGoogleMapComponent!: JourneySharingGoogleMapComponent;

  // App options
  public isOptionsModalVisible = false;
  public options: JourneySharingUserOptions = new JourneySharingUserOptions();

  // Trip details
  public trip?: google.maps.journeySharing.Trip;
  public tripId = '';
  public tripStatus?: string;
  public tripDropoffTime?: Date;
  public tripRemainingStops?: number;
  public tripRemainingDistanceMeters?: number;
  public tripNextStopDistanceMeters?: number;
  public tripError?: Error;

  public applyOptions(options: JourneySharingUserOptions) {
    Object.assign(this.options, options);
    this.journeySharingGoogleMapComponent.refresh();
  }

  public onTripChange(trip: google.maps.journeySharing.Trip | null) {
    if (trip) {
      this.trip = trip;

      // Trip status display string
      const tripStatus = trip.status?.toLowerCase().replace(/_/g, ' ');
      this.tripStatus = tripStatus
        ? `${tripStatus.charAt(0).toUpperCase()}${tripStatus.slice(1)}`
        : undefined;

      // Trip dropoff time
      this.tripDropoffTime = trip.dropOffTime || undefined;

      const remainingWaypoints = trip.remainingWaypoints;

      // Remaining stops
      this.tripRemainingStops = remainingWaypoints?.length;

      // Remaining distance
      this.tripRemainingDistanceMeters = remainingWaypoints?.reduce(
        (sum, waypoint) => sum + (waypoint.distanceMeters || 0),
        0
      );

      // Remaining distance to next stop
      const nextStop = remainingWaypoints && remainingWaypoints[0];
      this.tripNextStopDistanceMeters = nextStop?.distanceMeters || undefined;
    } else {
      this.clearTrip();
    }

    this.tripError = undefined;
  }

  public onTripError(error: google.maps.ErrorEvent) {
    this.tripError = error.error;
    this.clearTrip();
  }

  public findTrip(tripId: string) {
    this.tripId = tripId;

    if (!tripId) {
      this.clearTrip();
    }
  }

  private clearTrip() {
    this.trip = undefined;
    this.tripStatus = undefined;
    this.tripDropoffTime = undefined;
    this.tripRemainingStops = undefined;
    this.tripRemainingDistanceMeters = undefined;
    this.tripNextStopDistanceMeters = undefined;
  }
}
