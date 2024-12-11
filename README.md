![Tests/Build Status](https://github.com/googlemaps/angular-on-demand-rides-deliveries-samples/workflows/Test/badge.svg)
![Release](https://github.com/googlemaps/angular-on-demand-rides-deliveries-samples/workflows/Release/badge.svg)

![GitHub contributors](https://img.shields.io/github/contributors/googlemaps/angular-on-demand-rides-deliveries-samples?color=green)
[![Discord](https://img.shields.io/discord/676948200904589322?color=6A7EC2&logo=discord&logoColor=ffffff)][Discord server]
[![GitHub License](https://img.shields.io/github/license/googlemaps/angular-on-demand-rides-deliveries-samples?color=blue)][license]

# Angular On-Demand Rides and Deliveries Sample

## Description

This repository contains the source code for an Angular sample web app for on-demand rides and deliveries.

## Requirements

* [Sign up with Google Maps Platform]
* A Google Maps Platform [project] with the **Fleet Engine APIs** enabled
* An [API key] associated with the project above
* Node.js & NPM
* Angular framework

## Architecture

In order to run the full end-to-end **journey sharing** use case, you need 4 components:

- [Provider backend](https://github.com/googlemaps/java-on-demand-rides-deliveries-stub-provider)
  as it can be utilized by Android, iOS, and JavaScript client samples.
- Driver app ([Android](https://github.com/googlemaps/android-on-demand-rides-deliveries-samples/) | [iOS](https://github.com/googlemaps/ios-on-demand-rides-deliveries-samples/))
- Consumer app ([Android](https://github.com/googlemaps/android-on-demand-rides-deliveries-samples/) | [iOS](https://github.com/googlemaps/ios-on-demand-rides-deliveries-samples/))
- Web app (included in this repository)

The consumer and driver mobile apps communicate with the provider backend. The web app also communicates with the provider backend to request authentication tokens. The provider backend communicates with the Fleet Engine.

## Usage

1. Fully complete the Prerequisites section of [Getting Started with Fleet Engine](https://developers.google.com/maps/documentation/transportation-logistics/on-demand-rides-deliveries-solution/trip-order-progress/fleet-engine).
1. Make sure the [provider backend](https://github.com/googlemaps/java-on-demand-rides-deliveries-stub-provider)
   is up and running.
1. Make sure a consumer mobile app and a driver mobile app are running. Use these to create vehicles and trips to track with the Angular sample app.

## Usage

### Step 1 - Download and install dependencies

These dependencies are needed to run the sample app. If you have them installed already you can skip these steps below.

- Download & install node from https://nodejs.org/en/download/
- Download & install Angular CLI:

      npm install -g @angular/cli

### Step 2 - Populate `./node_modules`

This will install all packages declared in `package.json` of the sample project to make sure all dependencies are properly installed.

```
npm install
```

### Step 3 - Add API key and other metadata (required)

In `src/app/journey-sharing-google-map/journey-sharing-google-map.component.ts`, do the following:

- Set the `PROVIDER_URL` constant to the URL of your provider  that was set up in Prerequisite #2.

```typescript
// Replace 'YOUR_PROVIDER_URL' with the URL of your provider. See
// https://github.com/googlemaps/java-on-demand-rides-deliveries-stub-provider
// for instructions on how to set up a provider.
const PROVIDER_URL = 'YOUR_PROVIDER_URL';
```

- Add your API key to the Google Maps JavaScript API Loader initialization:

```typescript
const loader = new Loader({
  // Replace with your API key
  apiKey: 'YOUR_API_KEY',
  ...
});
```

- Add the Cloud project ID to the `FleetEngineTripLocationProvider` initialization:

```typescript
this.locationProvider =
  new google.maps.journeySharing.FleetEngineTripLocationProvider({
    // Replace 'PROVIDER_PROJECT_ID' with the project ID of the Cloud
    // project that has Local Rides and Deliveries API enabled.
    projectId: 'PROVIDER_PROJECT_ID',
    ...
  });
```

### Step 4 - Run the sample app

From this directory, run `ng serve` to start a development server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Step 5 - Start tracking a trip

Enter a trip ID for a trip you created (Prerequisite #3) in the Trip ID input field and click "Find trip".

## Documentation

- [Installing Cloud SDK](https://cloud.google.com/sdk/docs/install)
- [Transportation SDKs - JavaScript SDK Setup](https://developers.google.com/maps/documentation/transportation-logistics/on-demand-rides-deliveries-solution/trip-order-progress/consumer-sdk/consumer_sdk_quickstart_javascript)

## Contributing

Contributions are welcome and encouraged! If you'd like to contribute, send us a [pull request] and refer to our [code of conduct] and [contributing guide].

## Terms of Service

This library uses Google Maps Platform services. Use of Google Maps Platform services through this library is subject to the Google Maps Platform [Terms of Service].

This library is not a Google Maps Platform Core Service. Therefore, the Google Maps Platform Terms of Service (e.g. Technical Support Services, Service Level Agreements, and Deprecation Policy) do not apply to the code in this library.

## Support

This library is offered via an open source [license]. It is not governed by the Google Maps Platform Support [Technical Support Services Guidelines, the SLA, or the [Deprecation Policy]. However, any Google Maps Platform services used by the library remain subject to the Google Maps Platform Terms of Service.

This library adheres to [semantic versioning] to indicate when backwards-incompatible changes are introduced. Accordingly, while the library is in version 0.x, backwards-incompatible changes may be introduced at any time.

If you find a bug, or have a feature request, please [file an issue] on GitHub. If you would like to get answers to technical questions from other Google Maps Platform developers, ask through one of our [developer community channels]. If you'd like to contribute, please check the [contributing guide].

You can also discuss this library on our [Discord server].

[API key]: https://developers.google.com/maps/documentation/javascript/get-api-key
[maps-sdk]: https://developers.google.com/maps/documentation/mobility
[documentation]: https://googlemaps.github.io/angular-on-demand-rides-deliveries-samples

[code of conduct]: CODE_OF_CONDUCT.md
[contributing guide]: CONTRIBUTING.md
[Deprecation Policy]: https://cloud.google.com/maps-platform/terms
[developer community channels]: https://developers.google.com/maps/developer-community
[Discord server]: https://discord.gg/jRteCzP
[file an issue]: https://github.com/googlemaps/angular-on-demand-rides-deliveries-samples/issues/new/choose
[license]: LICENSE
[project]: https://developers.google.com/maps/documentation/mobility/fleet-engine/essentials/set-up-fleet/create-project
[pull request]: https://github.com/googlemaps/angular-on-demand-rides-deliveries-samples/compare
[semantic versioning]: https://semver.org
[Sign up with Google Maps Platform]: https://console.cloud.google.com/google/maps-apis/start
[similar inquiry]: https://github.com/googlemaps/angular-on-demand-rides-deliveries-samples/issues
[SLA]: https://cloud.google.com/maps-platform/terms/sla
[Technical Support Services Guidelines]: https://cloud.google.com/maps-platform/terms/tssg
[Terms of Service]: https://cloud.google.com/maps-platform/terms
