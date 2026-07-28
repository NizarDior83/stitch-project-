plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.shipmart.app"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.shipmart.app"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions { jvmTarget = "17" }
}

dependencies {
    implementation("androidx.core:core-ktx:1.13.1")
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("androidx.webkit:webkit:1.11.0")
    implementation("androidx.activity:activity-ktx:1.9.2")
}

/**
 * Copies the exported Next.js site into the APK's assets before every build,
 * so `assembleDebug` always ships the current web build.
 * Run `npm run export` in ../shipmart first.
 */
val webOut = rootProject.file("../shipmart/out")

tasks.register<Copy>("copyWebAssets") {
    from(webOut)
    into(layout.projectDirectory.dir("src/main/assets/www"))
    doFirst {
        if (!webOut.exists()) {
            throw GradleException(
                "shipmart/out not found. Run `npm run export` in the shipmart directory first."
            )
        }
    }
}

tasks.named("preBuild") { dependsOn("copyWebAssets") }
