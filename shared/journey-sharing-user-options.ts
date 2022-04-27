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

import { ICON_OPTIONS } from './const';

/**
 * Options that the user can control. These values are plumbed through to the
 * JourneySharingMapView in JourneySharingGoogleMapComponent.
 */
export class JourneySharingUserOptions {
  public showAnticipatedRoutePolyline = true;
  public showTakenRoutePolyline = true;
  public destinationIcon = ICON_OPTIONS.USE_DEFAULT;
  public vehicleIcon = ICON_OPTIONS.USE_DEFAULT;
}
