package com.shipmart.app

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity
import androidx.webkit.ServiceWorkerClientCompat
import androidx.webkit.ServiceWorkerControllerCompat
import androidx.webkit.WebViewAssetLoader
import androidx.webkit.WebViewFeature

/**
 * Shipmart Android shell.
 *
 * Serves the exported Next.js site through [WebViewAssetLoader] on a virtual
 * https origin rather than loading it over `file://`.
 *
 * This matters. The Next.js export references its assets with absolute paths
 * (`/_next/static/...`). Under `file:///android_asset/...` those resolve to
 * `file:///_next/...`, which does not exist, and the page renders as unstyled
 * HTML with no JavaScript. Serving from an origin makes absolute paths resolve,
 * and gives the page a real origin so localStorage works.
 *
 * The site is still entirely local — no network is used.
 */
class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView
    private lateinit var assetLoader: WebViewAssetLoader

    private companion object {
        const val HOST = "appassets.androidplatform.net"
        const val START_URL = "https://$HOST/index.html"
    }

    /**
     * The export is built with `trailingSlash: true`, so routes are directories:
     * `/legal/terms/` must serve `legal/terms/index.html`. AssetsPathHandler does
     * not resolve directory indexes, so that is handled here.
     */
    private class IndexAwarePathHandler(context: Context) : WebViewAssetLoader.PathHandler {
        private val delegate = WebViewAssetLoader.AssetsPathHandler(context)

        override fun handle(path: String): WebResourceResponse? {
            val resolved = when {
                path.isEmpty() -> "index.html"
                path.endsWith("/") -> path + "index.html"
                // Extension-less route such as /about — try its directory index.
                !path.substringAfterLast('/').contains('.') -> "$path/index.html"
                else -> path
            }
            return delegate.handle(resolved) ?: delegate.handle(path)
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        assetLoader = WebViewAssetLoader.Builder()
            .setDomain(HOST)
            .addPathHandler("/", IndexAwarePathHandler(this))
            .build()

        // The site registers a service worker. Route its fetches through the same
        // loader, otherwise it intercepts requests it cannot fulfil.
        if (WebViewFeature.isFeatureSupported(WebViewFeature.SERVICE_WORKER_BASIC_USAGE)) {
            ServiceWorkerControllerCompat.getInstance().setServiceWorkerClient(
                object : ServiceWorkerClientCompat() {
                    override fun shouldInterceptRequest(
                        request: WebResourceRequest
                    ): WebResourceResponse? = assetLoader.shouldInterceptRequest(request.url)
                }
            )
        }

        webView = WebView(this).apply {
            settings.apply {
                javaScriptEnabled = true
                domStorageEnabled = true
                loadWithOverviewMode = true
                useWideViewPort = true
                builtInZoomControls = false
                displayZoomControls = false
                textZoom = 100
                // Assets go through the loader, so the WebView needs no file access.
                allowFileAccess = false
                allowContentAccess = false
            }

            webViewClient = object : WebViewClient() {
                override fun shouldInterceptRequest(
                    view: WebView,
                    request: WebResourceRequest
                ): WebResourceResponse? = assetLoader.shouldInterceptRequest(request.url)

                override fun shouldOverrideUrlLoading(
                    view: WebView,
                    request: WebResourceRequest
                ): Boolean {
                    // Anything on our virtual origin stays in the app.
                    if (request.url.host == HOST) return false
                    // Social links and external docs hand off to the browser.
                    startActivity(Intent(Intent.ACTION_VIEW, request.url))
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
