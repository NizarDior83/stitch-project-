# Building the Shipmart APK

The APK could not be built in the environment this project was generated in —
`dl.google.com` is blocked there, so the Android SDK and the Android Gradle
Plugin are unreachable. Everything else is done; these are the remaining steps
on a machine that has the SDK.

## What this app is

A WebView shell that loads the **exported Next.js site from the APK's own
assets**. No network is required to use it — which matters, because a parcel app
is most often opened somewhere with bad signal.

## Prerequisites

- JDK 17 or newer
- Android SDK with platform 34 and build-tools 34 (Android Studio installs both)
- Node 18+ for the web build

## Build

```bash
# 1. Export the web build. This produces shipmart/out/.
cd shipmart
npm install
npm run export

# 2. Build the APK. Gradle copies shipmart/out/ into the APK automatically.
cd ../android
./gradlew assembleDebug
```

Output: `android/app/build/outputs/apk/debug/app-debug.apk`

Install to a connected device with `adb install -r app/build/outputs/apk/debug/app-debug.apk`,
or just open `android/` in Android Studio and press Run.

If Gradle cannot find the SDK, add `android/local.properties`:

```
sdk.dir=/Users/you/Library/Android/sdk       # macOS
sdk.dir=/home/you/Android/Sdk                # Linux
```

## Release build

`assembleDebug` produces a debug-signed APK — fine for testing and sideloading,
not for distribution. For a release build you need your own keystore:

```bash
keytool -genkey -v -keystore shipmart.jks -keyalg RSA -keysize 2048 \
        -validity 10000 -alias shipmart
```

Then add a `signingConfigs` block to `app/build.gradle.kts` referencing it, and
run `./gradlew assembleRelease`. Keep the keystore and its passwords out of git.

## Pointing at a hosted site instead

The default build ships the site inside the APK. To load a live URL instead,
change `START_URL` in `MainActivity.kt` to your https address and update
`shouldOverrideUrlLoading` so your own domain is treated as internal.

## Before you submit this to Google Play — read this

Google Play's **minimum functionality** policy (Developer Program Policy,
"Repetitive Content") rejects apps that are only a webview wrapper around a
website. This APK, as it stands, is exactly that. It is genuinely useful for
sideloading, internal testing and demos, but it will very likely be rejected on
the Play Store as-is.

To pass review the app needs capability the website cannot have. For Shipmart
the honest candidates are:

- **Push notifications** for parcel status changes — the single most valuable
  thing a shipping app can do that a website cannot.
- **Camera barcode scanning** for tracking numbers and labels.
- **Offline label storage** and share-to-print.
- **Home-screen widget** showing the status of an in-flight parcel.

Any one of those, implemented natively, moves it out of wrapper territory.

## The alternative worth considering first

The web build is already an installable PWA — manifest, service worker, offline
page, install prompt. On Android, Chrome offers "Install app", it lands on the
home screen with its own icon, runs without browser chrome, and works offline.
No store review, no signing, no release process.

If the goal is "customers can get Shipmart on their phone", the PWA already does
that today. Build the APK when you need push notifications or a store listing —
not before.
