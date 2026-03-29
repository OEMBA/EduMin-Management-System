/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const NOTIFICATIONS_STORAGE_KEY = 'notifications'
const EVENTS_STORAGE_KEY = 'events'
const ONE_HOUR_MS = 60 * 60 * 1000
const ONE_DAY_MS = 24 * ONE_HOUR_MS

const NotificationsContext = createContext(null)

function loadStoredNotifications() {
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function loadEvents() {
  try {
    const raw = localStorage.getItem(EVENTS_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function toEventDateTime(event) {
  const date = String(event?.date ?? '').trim()
  const time = String(event?.time ?? '').trim()
  if (!date) return NaN

  const normalizedTime = /^\d{2}:\d{2}$/.test(time) ? `${time}:00` : '09:00:00'
  const value = new Date(`${date}T${normalizedTime}`).getTime()
  return Number.isNaN(value) ? NaN : value
}

function createNotification(payload) {
  return {
    id: `ntf_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    type: payload.type || 'general',
    title: payload.title || 'Notification',
    message: payload.message || '',
    details: payload.details || null,
    eventId: payload.eventId || null,
    reminderKey: payload.reminderKey || null,
    createdAt: new Date().toISOString(),
    read: false,
  }
}

function getReminderEventId(reminderKey) {
  if (!reminderKey || typeof reminderKey !== 'string') return ''
  const parts = reminderKey.split(':')
  if (parts.length < 3) return ''
  if (parts[0] !== 'event-reminder') return ''
  return parts[1]
}

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState(loadStoredNotifications)

  useEffect(() => {
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications))
  }, [notifications])

  const addNotification = useCallback((payload) => {
    const nextItem = createNotification(payload)
    setNotifications((prev) => [nextItem, ...prev].slice(0, 300))
  }, [])

  const syncEventReminders = useCallback(() => {
    const events = loadEvents()
    const now = Date.now()
    const activeEventIds = new Set(
      events.map((event) => String(event?.id ?? '').trim()).filter(Boolean),
    )

    setNotifications((prev) => {
      const base = prev.filter((item) => {
        if (item.type !== 'event-reminder') return true
        const reminderEventId = getReminderEventId(item.reminderKey)
        return reminderEventId ? activeEventIds.has(reminderEventId) : true
      })

      const knownReminderKeys = new Set(base.map((n) => n.reminderKey).filter(Boolean))
      const additions = []

      for (const event of events) {
        const eventAt = toEventDateTime(event)
        if (Number.isNaN(eventAt) || eventAt <= now) continue

        const diff = eventAt - now
        if (diff > 3 * ONE_DAY_MS) continue

        const title = String(event?.title ?? 'Upcoming event').trim()
        const location = String(event?.location ?? 'TBD').trim()
        const eventDate = String(event?.date ?? '')
        const eventTime = String(event?.time ?? '')
        const eventId = String(event?.id ?? `${title}-${eventDate}-${eventTime}`)

        if (diff <= ONE_DAY_MS) {
          const hoursLeft = Math.max(1, Math.ceil(diff / ONE_HOUR_MS))
          const reminderKey = `event-reminder:${eventId}:hours:${hoursLeft}`
          if (knownReminderKeys.has(reminderKey)) continue

          knownReminderKeys.add(reminderKey)
          additions.push(
            createNotification({
              type: 'event-reminder',
              title: 'Upcoming Event Reminder',
              message: `${hoursLeft} hour${hoursLeft === 1 ? '' : 's'} left until ${title}.`,
              details: `Location: ${location} | Date: ${eventDate} | Time: ${eventTime}`,
              reminderKey,
            }),
          )
        } else {
          const daysLeft = Math.max(1, Math.ceil(diff / ONE_DAY_MS))
          const reminderKey = `event-reminder:${eventId}:days:${daysLeft}`
          if (knownReminderKeys.has(reminderKey)) continue

          knownReminderKeys.add(reminderKey)
          additions.push(
            createNotification({
              type: 'event-reminder',
              title: 'Upcoming Event Reminder',
              message: `${daysLeft} day${daysLeft === 1 ? '' : 's'} left until ${title}.`,
              details: `Location: ${location} | Date: ${eventDate} | Time: ${eventTime}`,
              reminderKey,
            }),
          )
        }
      }

      if (additions.length === 0) return base
      return [...additions, ...base].slice(0, 300)
    })
  }, [])

  const removeEventNotifications = useCallback((eventId) => {
    const normalizedEventId = String(eventId ?? '').trim()
    if (!normalizedEventId) return

    setNotifications((prev) =>
      prev.filter((item) => {
        if (item.type === 'event-added' && String(item.eventId ?? '') === normalizedEventId) {
          return false
        }

        if (item.type !== 'event-reminder') return true
        const reminderEventId = getReminderEventId(item.reminderKey)
        return reminderEventId !== normalizedEventId
      }),
    )
  }, [])

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      syncEventReminders()
    }, 0)
    const timer = setInterval(() => {
      syncEventReminders()
    }, 60 * 1000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(timer)
    }
  }, [syncEventReminders])

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => (n.read ? n : { ...n, read: true })))
  }, [])

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications])

  const value = useMemo(
    () => ({
      notifications,
      unreadCount,
      addNotification,
      removeEventNotifications,
      markAllRead,
      syncEventReminders,
    }),
    [notifications, unreadCount, addNotification, removeEventNotifications, markAllRead, syncEventReminders],
  )

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext)
  if (!ctx) {
    throw new Error('useNotifications must be used within NotificationsProvider')
  }
  return ctx
}
