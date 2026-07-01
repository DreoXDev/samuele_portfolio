<template>
  <div v-if="isConfigured">
    <section v-if="isBannerVisible" class="analytics-consent" aria-label="Analytics consent">
      <div class="analytics-consent-content">
        <p class="analytics-consent-kicker">Privacy</p>
        <h2>Optional analytics</h2>
        <p>
          I use Google Analytics only if you accept it, to understand anonymous visitor trends and
          improve the portfolio. No analytics script is loaded before consent.
        </p>
      </div>

      <div class="analytics-consent-actions">
        <button type="button" class="analytics-consent-button analytics-consent-button-primary" @click="acceptAnalytics">
          Accept analytics
        </button>
        <button type="button" class="analytics-consent-button" @click="rejectAnalytics">
          Reject
        </button>
      </div>
    </section>

    <button
      v-else
      type="button"
      class="analytics-consent-manage"
      aria-label="Manage analytics consent"
      @click="openBanner"
    >
      Privacy
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

type ConsentChoice = 'granted' | 'denied'

const props = defineProps<{
  measurementId?: string
}>()

const CONSENT_STORAGE_KEY = 'dreox.analyticsConsent.v1'
const GTAG_SCRIPT_ID = 'google-analytics-gtag'

const consentChoice = ref<ConsentChoice | null>(null)
const isBannerOpen = ref(false)

const isConfigured = computed(() => Boolean(props.measurementId))
const isBannerVisible = computed(() => isConfigured.value && (isBannerOpen.value || consentChoice.value === null))

const getWindow = () => window as Window & {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
}

const initDataLayer = () => {
  const win = getWindow()
  win.dataLayer = win.dataLayer || []
  win.gtag = win.gtag || function gtag(...args: unknown[]) {
    win.dataLayer?.push(args)
  }

  win.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500,
  })
}

const configureAnalytics = () => {
  if (!props.measurementId) return

  const win = getWindow()
  win.gtag?.('js', new Date())
  win.gtag?.('config', props.measurementId, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  })
}

const loadAnalytics = () => {
  if (!props.measurementId || document.getElementById(GTAG_SCRIPT_ID)) {
    configureAnalytics()
    return
  }

  initDataLayer()
  const script = document.createElement('script')
  script.id = GTAG_SCRIPT_ID
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(props.measurementId)}`
  script.onload = configureAnalytics
  document.head.appendChild(script)
}

const updateGoogleConsent = (choice: ConsentChoice) => {
  initDataLayer()
  getWindow().gtag?.('consent', 'update', {
    analytics_storage: choice,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}

const deleteCookie = (name: string, domain?: string) => {
  const domainPart = domain ? `; domain=${domain}` : ''
  document.cookie = `${name}=; Max-Age=0; path=/${domainPart}; SameSite=Lax`
}

const clearAnalyticsCookies = () => {
  const hostParts = window.location.hostname.split('.')
  const rootDomain = hostParts.length > 1 ? `.${hostParts.slice(-2).join('.')}` : undefined
  const cookieNames = document.cookie
    .split(';')
    .map((cookie) => cookie.trim().split('=')[0])
    .filter((name) => name === '_ga' || name.startsWith('_ga_') || name === '_gid' || name === '_gat')

  cookieNames.forEach((name) => {
    deleteCookie(name)
    if (rootDomain) deleteCookie(name, rootDomain)
  })
}

const persistChoice = (choice: ConsentChoice) => {
  consentChoice.value = choice
  localStorage.setItem(CONSENT_STORAGE_KEY, choice)
  isBannerOpen.value = false
}

const acceptAnalytics = () => {
  persistChoice('granted')
  updateGoogleConsent('granted')
  loadAnalytics()
}

const rejectAnalytics = () => {
  persistChoice('denied')
  updateGoogleConsent('denied')
  clearAnalyticsCookies()
}

const openBanner = () => {
  isBannerOpen.value = true
}

onMounted(() => {
  if (!isConfigured.value) return

  initDataLayer()
  const storedChoice = localStorage.getItem(CONSENT_STORAGE_KEY)

  if (storedChoice === 'granted' || storedChoice === 'denied') {
    consentChoice.value = storedChoice
  }

  if (consentChoice.value === 'granted') {
    updateGoogleConsent('granted')
    loadAnalytics()
  }
})
</script>

<style scoped>
  .analytics-consent {
    position: fixed;
    right: clamp(1rem, 3vw, 1.6rem);
    bottom: clamp(1rem, 3vw, 1.6rem);
    z-index: 120;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 1rem;
    width: min(calc(100vw - 2rem), 44rem);
    padding: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 0.8rem;
    color: #f4f4f5;
    background: rgba(10, 10, 14, 0.88);
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(18px);
  }

  .analytics-consent-kicker {
    margin: 0 0 0.3rem;
    color: #ff6b6b;
    font-size: 0.68rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .analytics-consent h2 {
    margin: 0;
    font-size: 1rem;
    font-weight: 900;
  }

  .analytics-consent p {
    margin: 0.45rem 0 0;
    color: #c4c4ca;
    font-size: 0.78rem;
    line-height: 1.6;
  }

  .analytics-consent-actions {
    display: flex;
    align-items: end;
    gap: 0.55rem;
  }

  .analytics-consent-button,
  .analytics-consent-manage {
    min-height: 2.35rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 0.45rem;
    color: #f4f4f5;
    background: rgba(255, 255, 255, 0.04);
    font: inherit;
    font-size: 0.75rem;
    font-weight: 850;
    cursor: pointer;
  }

  .analytics-consent-button {
    padding: 0 0.8rem;
  }

  .analytics-consent-button-primary {
    border-color: #ef4444;
    background: #ef4444;
  }

  .analytics-consent-button:hover,
  .analytics-consent-button:focus-visible,
  .analytics-consent-manage:hover,
  .analytics-consent-manage:focus-visible {
    border-color: rgba(255, 75, 75, 0.58);
    background: rgba(255, 75, 75, 0.12);
  }

  .analytics-consent-button-primary:hover,
  .analytics-consent-button-primary:focus-visible {
    background: #dc2626;
  }

  .analytics-consent-manage {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    z-index: 110;
    padding: 0 0.75rem;
    color: #a1a1aa;
    background: rgba(10, 10, 14, 0.72);
    backdrop-filter: blur(14px);
  }

  @media (max-width: 640px) {
    .analytics-consent {
      right: 0.75rem;
      bottom: 0.75rem;
      left: 0.75rem;
      grid-template-columns: 1fr;
      width: auto;
    }

    .analytics-consent-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
