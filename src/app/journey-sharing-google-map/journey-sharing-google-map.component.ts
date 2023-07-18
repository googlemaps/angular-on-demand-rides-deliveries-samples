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

import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { DEFAULT_POLLING_INTERVAL_MS, ICON_OPTIONS } from "../shared/const";
import { JourneySharingUserOptions } from "../shared/journey-sharing-user-options";
import { Loader } from "@googlemaps/js-api-loader";

// Replace 'YOUR_PROVIDER_URL' with the URL of your provider. See
// https://github.com/googlemaps/java-on-demand-rides-deliveries-stub-provider
// for instructions on how to set up a provider.
const PROVIDER_URL = "YOUR_PROVIDER_URL";

@Component({
  selector: "app-journey-sharing-google-map",
  templateUrl: "./journey-sharing-google-map.component.html",
  styleUrls: ["./journey-sharing-google-map.component.css"],
})
export class JourneySharingGoogleMapComponent implements OnChanges, OnInit {
  @Input() public tripId!: string;

  // Options that are fed to the JourneySharingMapView.
  @Input() public options!: JourneySharingUserOptions;

  @Output() public tripChange =
    new EventEmitter<google.maps.journeySharing.Trip | null>();
  @Output() public tripErrorChange = new EventEmitter<google.maps.ErrorEvent>();

  // The location provider tracks the locations of objects and feeds them into
  // the JourneySharingMapView. Trip update and error events are emitted on the
  // location provider.
  private locationProvider?: google.maps.journeySharing.FleetEngineTripLocationProvider;

  constructor(private readonly _elementRef: ElementRef) {}

  public ngOnInit() {
    // The HTML Element to place the map in. Gets set to the template element
    // `<div class="map-container"></div>`.
    const mapElement =
      this._elementRef.nativeElement.querySelector(".map-container");

    /**
     * Returns an authentication token for accessing trip data. See
     * https://developers.google.com/maps/documentation/transportation-logistics/on-demand-rides-deliveries-solution/trip-order-progress/consumer-sdk/consumer_sdk_quickstart_javascript#authentication_token_fetcher
     *
     * @param options Contains details about the auth token to be minted.
     * @returns An AuthToken containing the token and its expiry time
     */
    const authTokenFetcher = async () => {
      const response = await fetch(
        `${PROVIDER_URL}/token/consumer/${this.tripId}`
      );
      const responseJson = await response.json();

      return {
        token: responseJson.jwt,
        expiresInSeconds: 3300,
      };
    };

    const loader = new Loader({
      // Replace with your API key
      apiKey: "YOUR_API_KEY",
      version: "beta",
      // @ts-ignore
      libraries: ["journeySharing"],
    });

    loader
      .load()
      .then((google) => {
        this.locationProvider =
          new google.maps.journeySharing.FleetEngineTripLocationProvider({
            // Replace 'PROVIDER_PROJECT_ID' with your Cloud project ID.
            projectId: "PROVIDER_PROJECT_ID",
            authTokenFetcher,
            tripId: this.tripId,
            pollingIntervalMillis: DEFAULT_POLLING_INTERVAL_MS,
            destinationMarkerCustomization: (
                params: google.maps.journeySharing.TripMarkerCustomizationFunctionParams
            ) => {
              if (this.options.destinationIcon !== ICON_OPTIONS.USE_DEFAULT) {
                params.marker.setIcon(this.options.destinationIcon.icon);
              }
            },
            vehicleMarkerCustomization: (
                params: google.maps.journeySharing.TripMarkerCustomizationFunctionParams
            ) => {
              if (this.options.vehicleIcon !== ICON_OPTIONS.USE_DEFAULT) {
                params.marker.setIcon(this.options.vehicleIcon.icon);
              }
            },
          });

        this.locationProvider.addListener(
          "update",
          (
            e: google.maps.journeySharing.FleetEngineTripLocationProviderUpdateEvent
          ) => {
            // Communicate trip updates to the parent component.
            this.tripChange.emit(e.trip);
          }
        );

        this.locationProvider.addListener(
          "error",
          (e: google.maps.ErrorEvent) => {
            this.tripChange.emit(null);
            // Communicate errors to the parent component.
            this.tripErrorChange.emit(e);
          }
        );

        if (mapElement) {
          const mapViewOptions: google.maps.journeySharing.JourneySharingMapViewOptions =
            {
              element: mapElement,
              locationProvider: this.locationProvider,
              anticipatedRoutePolylineSetup: ({ defaultPolylineOptions }) => {
                return {
                  polylineOptions: defaultPolylineOptions,
                  visible: this.options.showAnticipatedRoutePolyline,
                };
              },
              takenRoutePolylineSetup: ({ defaultPolylineOptions }) => {
                return {
                  polylineOptions: defaultPolylineOptions,
                  visible: this.options.showTakenRoutePolyline,
                };
              },
            };

          const journeySharingMapView =
            new google.maps.journeySharing.JourneySharingMapView(
              mapViewOptions
            );

          const googleMap = journeySharingMapView.map;

          // Provide default zoom & center so the map loads even if trip ID is bad
          // or stale.
          googleMap.setCenter({ lat: 37.7749, lng: -122.4194 });
          googleMap.setZoom(11);
        }
      })
      .catch((e) => {
        console.log("failed to load google maps", e);
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes["tripId"] && this.locationProvider) {
      const tripId = changes["tripId"].currentValue;
      google.maps.Settings.getInstance().experienceIds = tripId ? [tripId] : [];
      this.locationProvider.tripId = tripId;
    }
  }

  public refresh() {
    if (this.locationProvider) {
      const tripId = this.locationProvider.tripId;
      this.locationProvider.tripId = tripId;
    }
  }
}
