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

import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { JourneySharingUserOptions } from "../shared/journey-sharing-user-options";
import { ICON_OPTIONS } from "../shared/const";

@Component({
  selector: "app-options-modal",
  templateUrl: "./options-modal.component.html",
  styleUrls: ["./options-modal.component.css"],
})
export class OptionsModalComponent implements OnInit {
  @Input() public isVisible = false;
  // Options that are fed to the JourneySharingMapView.
  @Input() public options!: JourneySharingUserOptions;
  @Output() public isVisibleChange = new EventEmitter<boolean>();
  @Output() public applyOptions = new EventEmitter<JourneySharingUserOptions>();

  public iconOptions = Object.values(ICON_OPTIONS);
  public model!: JourneySharingUserOptions;

  public ngOnInit(): void {
    // Create a copy of the options fed from the parent component.
    this.model = { ...this.options };
  }

  public onSubmit() {
    this.hideModal();
    this.applyOptions.emit(this.model);
  }

  public cancel() {
    // Reset any changes.
    this.model = { ...this.options };
    this.hideModal();
  }

  private hideModal() {
    this.isVisibleChange.emit(false);
  }
}
