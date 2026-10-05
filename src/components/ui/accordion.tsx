"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

// Otwarte wartości korzenia i wartość bieżącej pozycji — potrzebne AccordionContent
// z forceMount, żeby wiedzieć, czy zamkniętą treść trzeba hydratować.
const AccordionOpenContext = React.createContext<string[] | null>(null)
const AccordionItemValueContext = React.createContext<string | null>(null)
// Ścieżka wartości pozycji (sekcja/podkategoria) i pamięć serwerowego HTML zamkniętej
// treści — gdy układ przełącza się po hydratacji (np. mobile), treść montuje się
// ponownie z tego samego HTML zamiast pełnego renderu Reacta.
const AccordionPathContext = React.createContext("")
const AccordionHtmlCacheContext = React.createContext<Map<string, string> | null>(null)
const subscribeNoop = () => () => {}

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  const { value, defaultValue, onValueChange } = props as {
    value?: string | string[]
    defaultValue?: string | string[]
    onValueChange?: (v: string | string[]) => void
  }
  const parentCache = React.useContext(AccordionHtmlCacheContext)
  const [ownCache] = React.useState(() => new Map<string, string>())
  const [innerValue, setInnerValue] = React.useState(defaultValue)
  const current = value !== undefined ? value : innerValue
  const openValues = React.useMemo(
    () => (Array.isArray(current) ? current : current ? [current] : []),
    [current]
  )
  const handleValueChange = React.useCallback(
    (v: string | string[]) => {
      setInnerValue(v)
      onValueChange?.(v)
    },
    [onValueChange]
  )
  return (
    <AccordionHtmlCacheContext.Provider value={parentCache ?? ownCache}>
      <AccordionOpenContext.Provider value={openValues}>
        <AccordionPrimitive.Root
          data-slot="accordion"
          {...props}
          {...({ onValueChange: handleValueChange } as object)}
        />
      </AccordionOpenContext.Provider>
    </AccordionHtmlCacheContext.Provider>
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  const parentPath = React.useContext(AccordionPathContext)
  return (
    <AccordionPathContext.Provider value={parentPath + "/" + props.value}>
      <AccordionItemValueContext.Provider value={props.value}>
        <AccordionPrimitive.Item
          data-slot="accordion-item"
          className={cn("border-b last:border-b-0", className)}
          {...props}
        />
      </AccordionItemValueContext.Provider>
    </AccordionPathContext.Provider>
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <div className="flex w-full min-w-0">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </div>
  )
}

function AccordionContent({
  className,
  children,
  beforeContent,
  afterContent,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content> & { beforeContent?: React.ReactNode; afterContent?: React.ReactNode }) {
  const openValues = React.useContext(AccordionOpenContext)
  const itemValue = React.useContext(AccordionItemValueContext)
  const isOpen = !openValues || itemValue === null || openValues.includes(itemValue)
  // Przy forceMount zamknięta treść jest w HTML z serwera (SEO), ale na kliencie
  // nie jest hydratowana, dopóki pozycji nie otworzy się pierwszy raz — React
  // zostawia serwerowy HTML bez zmian (pusty dangerouslySetInnerHTML), a po
  // otwarciu montuje żywą treść. Wygląd i treść pozostają takie same.
  const path = React.useContext(AccordionPathContext)
  const cache = React.useContext(AccordionHtmlCacheContext)
  // false w trakcie hydratacji, true przy zwykłym montowaniu na kliencie
  const mountedAfterHydration = React.useSyncExternalStore(subscribeNoop, () => true, () => false)
  const [live, setLive] = React.useState(
    () =>
      !props.forceMount ||
      isOpen ||
      typeof window === "undefined" ||
      (mountedAfterHydration && !cache?.has(path))
  )
  const [staticHtml] = React.useState(() =>
    mountedAfterHydration ? cache?.get(path) ?? "" : ""
  )
  // Stała referencja: React 19 przy nowym obiekcie ponownie ustawia innerHTML.
  const staticHtmlProp = React.useMemo(() => ({ __html: staticHtml }), [staticHtml])
  if (isOpen && !live) setLive(true)
  const rememberServerHtml = React.useCallback(
    (el: HTMLDivElement | null) => {
      if (el && cache && el.innerHTML) cache.set(path, el.innerHTML)
    },
    [cache, path]
  )
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      // Zamknięta treść jest ukrywana CSS-em, a nie odmontowywana: przy forceMount
      // (service-accordion) teksty cennika/FAQ są w HTML od razu (SEO), a wygląd
      // zamkniętego stanu pozostaje taki sam jak bez forceMount.
      className="overflow-hidden text-sm data-[state=closed]:!hidden"
      {...props}
    >
      {beforeContent}
      {live ? (
        <div key="live" className={cn("pt-0 pb-4", className)}>{children}</div>
      ) : (
        <div
          key="ssr"
          className={cn("pt-0 pb-4", className)}
          ref={rememberServerHtml}
          dangerouslySetInnerHTML={staticHtmlProp}
          suppressHydrationWarning
        />
      )}
      {afterContent}
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
