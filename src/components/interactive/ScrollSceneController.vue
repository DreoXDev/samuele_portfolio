<template>
  <div class="app-switcher" data-app-switcher aria-hidden="true">
    <div class="app-switcher-card" data-switch-card="home">
      <span class="app-switcher-icon app-switcher-icon-terminal" aria-hidden="true">&gt;_</span>
      <span>_home</span>
      <small>terminal</small>
    </div>
    <div class="app-switcher-card" data-switch-card="projects">
      <span class="app-switcher-icon app-switcher-icon-editor" aria-hidden="true">&lt;/&gt;</span>
      <span>_projects</span>
      <small>code editor</small>
    </div>
    <div class="app-switcher-card" data-switch-card="timeline">
      <span class="app-switcher-icon app-switcher-icon-timeline" aria-hidden="true">─●─</span>
      <span>_timeline</span>
      <small>canvas</small>
    </div>
    <div class="app-switcher-card" data-switch-card="contact">
      <span class="app-switcher-icon app-switcher-icon-contact" aria-hidden="true">md</span>
      <span>_contact</span>
      <small>contact.md</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { gsap } from '../../lib/animations/gsap'
import { prefersReducedMotion } from '../../lib/animations/reducedMotion'

type AppFrame = 'home' | 'projects' | 'timeline' | 'contact'

const FRAMES: AppFrame[] = ['home', 'projects', 'timeline', 'contact']
const BASE_SCROLL_THRESHOLD = 90
const TIMELINE_SCROLL_THRESHOLD = 140
const DELTA_RESET_MS = 180

let currentFrame: AppFrame = 'home'
let isTransitioning = false
let accumulatedDelta = 0
let deltaResetTimer: number | undefined
let bootTimeline: gsap.core.Timeline | null = null
let activeTransition: gsap.core.Timeline | null = null
let hasBootedProjects = false
let hasBootedTimeline = false
let hasBootedContact = false
let isFrameMode = false
let touchStartY = 0
let isDraggingTimeline = false
let touchStartedInsideContactScroll = false

const navCleanups: Array<() => void> = []
const dragCleanups: Array<() => void> = []

const isAppFrame = (value: string | undefined): value is AppFrame => {
  return value === 'home' || value === 'projects' || value === 'timeline' || value === 'contact'
}

const getFrameIndex = (frame: AppFrame) => FRAMES.indexOf(frame)

const getNextFrame = (frame: AppFrame): AppFrame | null => {
  return FRAMES[getFrameIndex(frame) + 1] ?? null
}

const getPreviousFrame = (frame: AppFrame): AppFrame | null => {
  return FRAMES[getFrameIndex(frame) - 1] ?? null
}

const getFrameEl = (frame: AppFrame) => {
  return document.querySelector<HTMLElement>(`[data-frame="${frame}"]`)
}

const getEls = () => {
  const switcher = document.querySelector<HTMLElement>('[data-app-switcher]')
  const frames = FRAMES.map((frame) => [frame, getFrameEl(frame)] as const)

  return { switcher, frames }
}

const isDesktopFrameMode = () => {
  return window.matchMedia('(min-width: 900px)').matches && !prefersReducedMotion()
}

const frameHash = (frame: AppFrame) => `#${frame}`

const hashToFrame = (hash: string): AppFrame => {
  if (hash === '#projects') return 'projects'
  if (hash === '#timeline') return 'timeline'
  if (hash === '#contact') return 'contact'
  return 'home'
}

const setSwitcherActive = (target: AppFrame) => {
  document.querySelectorAll<HTMLElement>('[data-switch-card]').forEach((card) => {
    card.classList.toggle('app-switcher-card-active', card.dataset.switchCard === target)
  })
}

const updateFrameClasses = (target: AppFrame) => {
  FRAMES.forEach((frame) => {
    getFrameEl(frame)?.classList.toggle('is-active', frame === target)
  })
}

const setActiveFrame = (target: AppFrame) => {
  updateFrameClasses(target)
  currentFrame = target

  if (isFrameMode) {
    history.replaceState(null, '', frameHash(target))
  }
}

const setFrameRestingState = (frame: AppFrame, target: AppFrame) => {
  const element = getFrameEl(frame)
  if (!element) return

  const frameIndex = getFrameIndex(frame)
  const targetIndex = getFrameIndex(target)
  const isActive = frame === target
  const offset = frameIndex < targetIndex ? -24 : 48

  gsap.set(element, {
    autoAlpha: isActive ? 1 : 0,
    scale: isActive ? 1 : 0.92,
    y: isActive ? 0 : offset,
    filter: isActive ? 'blur(0px)' : 'blur(3px)',
    pointerEvents: isActive ? 'auto' : 'none',
    zIndex: 10 + frameIndex,
  })
}

const showFrameImmediately = (target: AppFrame) => {
  const { switcher } = getEls()

  activeTransition?.kill()
  gsap.set(switcher, { autoAlpha: 0, scale: 0.96 })
  FRAMES.forEach((frame) => setFrameRestingState(frame, target))
  setActiveFrame(target)

  if (target === 'projects') bootProjectsEditor()
  if (target === 'timeline') bootTimelineCanvas()
  if (target === 'contact') bootContactNote()
}

const initStartupAnimation = () => {
  if (currentFrame !== 'home') return

  const heroWindow = document.querySelector<HTMLElement>('[data-boot="window"]')
  const controls = document.querySelector<HTMLElement>('[data-boot="controls"]')
  const titlebarLabel = document.querySelector<HTMLElement>('[data-boot="titlebar-label"]')
  const tabs = gsap.utils.toArray<HTMLElement>('[data-boot="tab"]')
  const stream = document.querySelector<HTMLElement>('[data-boot="stream"]')
  const title = document.querySelector<HTMLElement>('[data-boot="title"]')
  const subtitle = document.querySelector<HTMLElement>('[data-boot="subtitle"]')
  const description = document.querySelector<HTMLElement>('[data-boot="description"]')

  if (!heroWindow || !controls || !stream || !title || !subtitle || !description) return

  bootTimeline = gsap.timeline({ defaults: { ease: 'power2.out' } })

  bootTimeline
    .set(heroWindow, { autoAlpha: 0, y: 42, scale: 0.985, filter: 'brightness(0.55)' })
    .set([controls, titlebarLabel, tabs], { autoAlpha: 0, y: -4 })
    .set(stream, { autoAlpha: 0 })
    .set([title, subtitle, description], { autoAlpha: 0, y: 24 })
    .to(heroWindow, { autoAlpha: 1, y: 0, scale: 1, filter: 'brightness(1.12)', duration: 0.38 })
    .to(heroWindow, { filter: 'brightness(0.82)', duration: 0.06 })
    .to(heroWindow, { filter: 'brightness(1.05)', duration: 0.08 })
    .to(heroWindow, { filter: 'brightness(0.95)', duration: 0.05 })
    .to(heroWindow, { filter: 'brightness(1)', duration: 0.14 })
    .to([controls, titlebarLabel], { autoAlpha: 1, y: 0, duration: 0.24 }, 0.46)
    .to(tabs, { autoAlpha: 1, y: 0, duration: 0.28, stagger: 0.055 }, 0.58)
    .to(stream, { autoAlpha: 1, duration: 0.42 }, 0.76)
    .to(title, { autoAlpha: 1, y: 0, duration: 0.42 }, 0.92)
    .to(subtitle, { autoAlpha: 1, y: 0, duration: 0.36 }, 1.04)
    .to(description, { autoAlpha: 1, y: 0, duration: 0.34 }, 1.14)
}

const bootProjectsEditor = () => {
  if (hasBootedProjects || prefersReducedMotion()) return
  hasBootedProjects = true

  const chrome = document.querySelector<HTMLElement>('[data-editor-boot="chrome"]')
  const tabs = document.querySelector<HTMLElement>('[data-editor-boot="tabs"]')
  const tree = document.querySelector<HTMLElement>('[data-editor-boot="tree"]')
  const panel = document.querySelector<HTMLElement>('[data-editor-boot="panel"]')
  const details = gsap.utils.toArray<HTMLElement>('[data-editor-boot="detail-item"]')

  gsap
    .timeline({ defaults: { ease: 'power2.out' } })
    .fromTo(chrome, { autoAlpha: 0.4 }, { autoAlpha: 1, duration: 0.22 })
    .fromTo(tabs, { autoAlpha: 0, y: -8 }, { autoAlpha: 1, y: 0, duration: 0.24 }, '<0.06')
    .fromTo(tree, { autoAlpha: 0, x: -18 }, { autoAlpha: 1, x: 0, duration: 0.28 }, '<0.08')
    .fromTo(panel, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.34 }, '<0.08')
    .fromTo(details, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, stagger: 0.045, duration: 0.22 }, '<0.1')
}

const bootTimelineCanvas = () => {
  if (hasBootedTimeline || prefersReducedMotion()) return
  hasBootedTimeline = true

  const chrome = document.querySelector<HTMLElement>('[data-timeline-boot="chrome"]')
  const canvas = document.querySelector<HTMLElement>('[data-timeline-boot="canvas"]')
  const line = document.querySelector<HTMLElement>('[data-timeline-boot="line"]')
  const nodes = gsap.utils.toArray<HTMLElement>('[data-timeline-boot="node"]')
  const cards = gsap.utils.toArray<HTMLElement>('[data-timeline-boot="card"]')

  gsap
    .timeline({ defaults: { ease: 'power2.out' } })
    .fromTo(chrome, { autoAlpha: 0.55 }, { autoAlpha: 1, duration: 0.22 })
    .fromTo(canvas, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.24 }, '<0.04')
    .fromTo(line, { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 0.58 }, '<0.08')
    .fromTo(nodes, { autoAlpha: 0, scale: 0.5 }, { autoAlpha: 1, scale: 1, stagger: 0.055, duration: 0.2 }, '-=0.3')
    .fromTo(cards, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, stagger: 0.07, duration: 0.28 }, '-=0.14')
}

const bootContactNote = () => {
  if (hasBootedContact || prefersReducedMotion()) return
  hasBootedContact = true

  const windowEl = document.querySelector<HTMLElement>('[data-contact-boot="window"]')
  const page = document.querySelector<HTMLElement>('[data-contact-boot="page"]')
  const blocks = gsap.utils.toArray<HTMLElement>('[data-contact-boot="block"]')
  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

  if (windowEl) {
    tl.fromTo(windowEl, { autoAlpha: 0.55 }, { autoAlpha: 1, duration: 0.22 })
  }

  if (page) {
    tl.fromTo(page, { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.35 }, '<0.08')
  }

  if (blocks.length) {
    tl.fromTo(blocks, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, stagger: 0.055, duration: 0.24 }, '<0.12')
  }
}

const animateFrameSwitch = (from: AppFrame, to: AppFrame) => {
  const fromEl = getFrameEl(from)
  const toEl = getFrameEl(to)
  const { switcher } = getEls()
  if (!fromEl || !toEl || !switcher) return Promise.resolve()

  const direction = getFrameIndex(to) > getFrameIndex(from) ? 1 : -1
  setSwitcherActive(to)

  return new Promise<void>((resolve) => {
    activeTransition = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => {
        setActiveFrame(to)
        FRAMES.forEach((frame) => setFrameRestingState(frame, to))
        if (to === 'projects') bootProjectsEditor()
        if (to === 'timeline') bootTimelineCanvas()
        if (to === 'contact') bootContactNote()
        resolve()
      },
    })

    activeTransition
      .set(toEl, {
        pointerEvents: 'none',
        autoAlpha: 0,
        scale: 0.93,
        y: direction > 0 ? 56 : -34,
        filter: 'blur(3px)',
      })
      .to(fromEl, {
        scale: 0.9,
        y: direction > 0 ? -22 : 28,
        autoAlpha: 0.35,
        filter: 'blur(3px)',
        duration: 0.28,
      })
      .to(switcher, { autoAlpha: 1, scale: 1, duration: 0.18 }, '<')
      .to(toEl, { autoAlpha: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 0.42 }, '>-0.04')
      .to(switcher, { autoAlpha: 0, scale: 0.96, duration: 0.18 }, '>-0.08')
  })
}

const goToFrame = async (target: AppFrame) => {
  if (isTransitioning || target === currentFrame) return

  if (!isFrameMode) {
    document.querySelector<HTMLElement>(`#${target}`)?.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    })
    currentFrame = target
    return
  }

  isTransitioning = true
  accumulatedDelta = 0

  await animateFrameSwitch(currentFrame, target)

  isTransitioning = false
}

const shouldIgnoreWheel = (event: WheelEvent) => {
  const target = event.target as HTMLElement | null
  const isInsideTimelineCanvas = Boolean(target?.closest('[data-timeline-canvas]'))
  const absX = Math.abs(event.deltaX)
  const absY = Math.abs(event.deltaY)
  const isHorizontalIntent = event.shiftKey || absX > absY

  if (isInsideTimelineCanvas) return isHorizontalIntent || isDraggingTimeline
  if (isHorizontalIntent) return true
  if (isDraggingTimeline) return true
  return false
}

const getScrollableContactNoteTarget = (event: WheelEvent) => {
  const target = event.target as HTMLElement | null
  return target?.closest<HTMLElement>('[data-contact-scroll]') ?? null
}

const canScrollElement = (element: HTMLElement, deltaY: number) => {
  const maxScrollTop = element.scrollHeight - element.clientHeight
  if (maxScrollTop <= 1) return false

  if (deltaY > 0) return element.scrollTop < maxScrollTop - 1
  if (deltaY < 0) return element.scrollTop > 1

  return false
}

const onWheel = (event: WheelEvent) => {
  if (!isFrameMode) return

  if (isTransitioning) {
    event.preventDefault()
    return
  }

  const contactScroll = getScrollableContactNoteTarget(event)
  if (contactScroll && canScrollElement(contactScroll, event.deltaY)) {
    accumulatedDelta = 0
    return
  }

  if (shouldIgnoreWheel(event)) return

  event.preventDefault()

  accumulatedDelta += event.deltaY
  window.clearTimeout(deltaResetTimer)
  deltaResetTimer = window.setTimeout(() => {
    accumulatedDelta = 0
  }, DELTA_RESET_MS)

  const threshold = currentFrame === 'timeline' ? TIMELINE_SCROLL_THRESHOLD : BASE_SCROLL_THRESHOLD

  if (accumulatedDelta > threshold) {
    const next = getNextFrame(currentFrame)
    if (next) void goToFrame(next)
  }

  if (accumulatedDelta < -threshold) {
    const previous = getPreviousFrame(currentFrame)
    if (previous) void goToFrame(previous)
  }
}

const onTouchStart = (event: TouchEvent) => {
  touchStartY = event.touches[0]?.clientY ?? 0
  touchStartedInsideContactScroll =
    event.target instanceof HTMLElement && Boolean(event.target.closest('[data-contact-scroll]'))
}

const onTouchEnd = (event: TouchEvent) => {
  if (!isFrameMode || isTransitioning) return

  if (touchStartedInsideContactScroll) {
    touchStartedInsideContactScroll = false
    return
  }

  const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY
  const delta = touchStartY - touchEndY

  if (Math.abs(delta) < 60) return

  const target = delta > 0 ? getNextFrame(currentFrame) : getPreviousFrame(currentFrame)
  if (target) void goToFrame(target)
}

const onHashChange = () => {
  const target = hashToFrame(window.location.hash)
  if (target === currentFrame) return
  void goToFrame(target)
}

const initTabNavigation = () => {
  const links = gsap.utils.toArray<HTMLAnchorElement>('[data-nav-target]')

  links.forEach((link) => {
    const targetName = link.dataset.navTarget
    if (!targetName) return

    const handler = (event: MouseEvent) => {
      if (isAppFrame(targetName)) {
        event.preventDefault()
        void goToFrame(targetName)
        return
      }

      const target = document.querySelector<HTMLElement>(`#${targetName}`)
      if (!target) return

      if (isFrameMode) {
        document.body.classList.remove('portfolio-frame-mode')
        isFrameMode = false
      }

      event.preventDefault()
      target.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        block: 'start',
      })
      history.replaceState(null, '', `#${targetName}`)
    }

    link.addEventListener('click', handler)
    navCleanups.push(() => link.removeEventListener('click', handler))
  })
}

const initTimelineCanvasDrag = () => {
  const canvas = document.querySelector<HTMLElement>('[data-timeline-canvas]')
  if (!canvas) return

  let isDown = false
  let startX = 0
  let scrollLeft = 0

  const release = () => {
    isDown = false
    isDraggingTimeline = false
    canvas.classList.remove('is-dragging')
    document.documentElement.classList.remove('is-dragging-timeline')
  }

  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0) return
    isDown = true
    isDraggingTimeline = true
    startX = event.pageX - canvas.offsetLeft
    scrollLeft = canvas.scrollLeft
    canvas.classList.add('is-dragging')
    document.documentElement.classList.add('is-dragging-timeline')
  }

  const onPointerMove = (event: PointerEvent) => {
    if (!isDown) return
    event.preventDefault()
    const x = event.pageX - canvas.offsetLeft
    const walk = (x - startX) * 1.2
    canvas.scrollLeft = scrollLeft - walk
  }

  const onCanvasWheel = (event: WheelEvent) => {
    const absX = Math.abs(event.deltaX)
    const absY = Math.abs(event.deltaY)
    const wantsHorizontalScroll = event.shiftKey || absX > absY

    if (!wantsHorizontalScroll) return

    event.preventDefault()
    canvas.scrollLeft += event.shiftKey ? event.deltaY : event.deltaX
  }

  canvas.addEventListener('pointerdown', onPointerDown)
  canvas.addEventListener('pointermove', onPointerMove)
  canvas.addEventListener('pointerleave', release)
  canvas.addEventListener('pointerup', release)
  canvas.addEventListener('wheel', onCanvasWheel, { passive: false })
  dragCleanups.push(() => {
    canvas.removeEventListener('pointerdown', onPointerDown)
    canvas.removeEventListener('pointermove', onPointerMove)
    canvas.removeEventListener('pointerleave', release)
    canvas.removeEventListener('pointerup', release)
    canvas.removeEventListener('wheel', onCanvasWheel)
  })
}

const initFrameMode = () => {
  isFrameMode = isDesktopFrameMode()

  if (!isFrameMode) {
    currentFrame = hashToFrame(window.location.hash)
    initStartupAnimation()
    return
  }

  document.body.classList.add('portfolio-frame-mode')
  currentFrame = hashToFrame(window.location.hash)
  showFrameImmediately(currentFrame)

  if (currentFrame === 'home') {
    initStartupAnimation()
  }

  window.addEventListener('wheel', onWheel, { passive: false })
  window.addEventListener('touchstart', onTouchStart, { passive: true })
  window.addEventListener('touchend', onTouchEnd, { passive: true })
  window.addEventListener('hashchange', onHashChange)
}

onMounted(() => {
  initTabNavigation()
  initTimelineCanvasDrag()

  if (prefersReducedMotion()) {
    currentFrame = hashToFrame(window.location.hash)
    return
  }

  initFrameMode()
})

onUnmounted(() => {
  bootTimeline?.kill()
  activeTransition?.kill()
  window.clearTimeout(deltaResetTimer)
  window.removeEventListener('wheel', onWheel)
  window.removeEventListener('touchstart', onTouchStart)
  window.removeEventListener('touchend', onTouchEnd)
  window.removeEventListener('hashchange', onHashChange)
  document.body.classList.remove('portfolio-frame-mode')
  navCleanups.splice(0).forEach((cleanup) => cleanup())
  dragCleanups.splice(0).forEach((cleanup) => cleanup())
})
</script>

<style>
  body.portfolio-frame-mode {
    overflow: hidden;
  }

  body.portfolio-frame-mode [data-frame='home'],
  body.portfolio-frame-mode [data-frame='projects'],
  body.portfolio-frame-mode [data-frame='timeline'],
  body.portfolio-frame-mode [data-frame='contact'] {
    position: fixed;
    inset: 0;
    z-index: 10;
    min-height: 100svh;
    opacity: 0;
    pointer-events: none;
    transform: scale(0.96) translateY(24px);
  }

  body.portfolio-frame-mode [data-frame='home'].is-active,
  body.portfolio-frame-mode [data-frame='projects'].is-active,
  body.portfolio-frame-mode [data-frame='timeline'].is-active,
  body.portfolio-frame-mode [data-frame='contact'].is-active {
    opacity: 1;
    pointer-events: auto;
    transform: scale(1) translateY(0);
  }

  body.portfolio-frame-mode [data-frame='projects'] {
    z-index: 20;
  }

  body.portfolio-frame-mode [data-frame='timeline'] {
    z-index: 30;
  }

  body.portfolio-frame-mode [data-frame='contact'] {
    z-index: 40;
  }

  .app-switcher {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 80;
    display: flex;
    gap: 0.75rem;
    padding: 0.8rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 1rem;
    background: rgba(10, 10, 14, 0.72);
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(18px);
    pointer-events: none;
    transform: translate(-50%, -50%) scale(0.96);
    opacity: 0;
  }

  .app-switcher-card {
    display: grid;
    width: 8.25rem;
    min-height: 5.25rem;
    align-content: center;
    gap: 0.25rem;
    padding: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.75rem;
    color: #d4d4d8;
    background: rgba(255, 255, 255, 0.035);
  }

  .app-switcher-card-active {
    border-color: rgba(255, 70, 70, 0.75);
    background: rgba(239, 68, 68, 0.1);
    box-shadow: 0 0 30px rgba(255, 70, 70, 0.18);
  }

  .app-switcher-card span {
    font-size: 0.78rem;
    font-weight: 900;
  }

  .app-switcher-card small {
    color: #8b8b94;
    font-size: 0.66rem;
    font-weight: 800;
  }

  .app-switcher-icon {
    display: grid;
    place-items: center;
    width: 2.25rem;
    height: 2.25rem;
    margin-bottom: 0.25rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.7rem;
    color: #f4f4f5;
    background: rgba(255, 255, 255, 0.035);
    font-size: 0.85rem;
    font-weight: 900;
    line-height: 1;
  }

  .app-switcher-card-active .app-switcher-icon {
    border-color: rgba(255, 70, 70, 0.68);
    color: #ff6b6b;
    box-shadow: 0 0 24px rgba(255, 70, 70, 0.16);
  }

  .app-switcher-icon-timeline {
    letter-spacing: -0.12em;
  }

  .app-switcher-icon-contact {
    text-transform: uppercase;
  }

  @media (max-width: 899px), (prefers-reduced-motion: reduce) {
    .app-switcher {
      display: none;
    }
  }
</style>
