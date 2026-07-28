package com.shipmart.app

import android.annotation.SuppressLint
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity

/**
 * Shipmart Android shell.
 *
 * Loads the exported Next.js site from the APK's own assets, so the app works
 * with no network at all — which matters for a parcel app, since tracking is
 * most often opened somewhere with bad signal.
 *
 * To point at a hosted site instead, replace START_URL with the https URL and
 * set android:usesCleartextTraffic accordingly in the manifest.
 */
class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView

    private companion object {
        const val START_URL = "file:///android_asset/www/index.html"
        const val ASSET_PREFIX = "file:///android_asset/www/"
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        webView = WebView(this).apply {
            settings.apply {
                javaScriptEnabled = true
                // The site stores cookie preferences in localStorage.
                domStorageEnabled = true
                loadWithOverviewMode = true
                useWideViewPort = true
                // The site is already responsive; let it control its own layout.
                builtInZoomControls = false
                displayZoomControls = false
                textZoom = 100
                allowFileAccess = false
                allowContentAccess = false
            }

            webViewClient = object : WebViewClient() {
                override fun shouldOverrideUrlLoading(
                    view: WebView,
                    request: WebResourceRequest
                ): Boolean {
                    val url = request.url.toString()
                    // Internal navigation stays in the app.
                    if (url.startsWith(ASSET_PREFIX)) return false
                    // Anything else — social links, external docs — goes to the browser.
                    startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)))
                    return true
                }
            }
        }

        setContentView(webView)

        if (savedInstanceState == null) {
            webView.loadUrl(START_URL)
        } else {
            webView.restoreState(savedInstanceState)
        }

        // Hardware back navigates the site's history before leaving the app.
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (webView.canGoBack()) webView.goBack() else finish()
            }
        })
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        webView.saveState(outState)
    }
}
