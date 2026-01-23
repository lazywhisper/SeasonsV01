# 🎬 ANIMATION GUIDE - Seasons Dashboard
## Руководство по использованию анимаций и transitions

---

## 📚 TABLE OF CONTENTS

1. [Keyframe Animations](#keyframe-animations)
2. [Utility Classes](#utility-classes)
3. [Stagger Animations](#stagger-animations)
4. [Transition Best Practices](#transition-best-practices)
5. [Examples](#examples)
6. [Performance Tips](#performance-tips)

---

## 🎨 KEYFRAME ANIMATIONS

### 1. fadeIn
**Описание:** Плавное появление от прозрачности 0 до 1  
**Длительность:** 0.3s  
**Использование:** Модальные окна, tooltips, notifications

```tsx
// CSS
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

// React Component
<div className="animate-fadeIn">
  Content appears smoothly
</div>
```

**Пример:**
```tsx
// Modal появление
{isOpen && (
  <div className="animate-fadeIn fixed inset-0 bg-black/50">
    <div className="modal-content">
      Modal content
    </div>
  </div>
)}
```

---

### 2. slideUp
**Описание:** Слайд снизу вверх с fade-in  
**Длительность:** 0.4s  
**Использование:** Cards, list items, notifications

```tsx
// CSS
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// React Component
<div className="animate-slideUp">
  Content slides up
</div>
```

**Пример:**
```tsx
// Card появление
<div className="p-6 rounded-xl animate-slideUp">
  <h3>Project Metrics</h3>
  <p>Content...</p>
</div>
```

---

### 3. slideDown
**Описание:** Слайд сверху вниз с fade-in  
**Длительность:** 0.4s  
**Использование:** Dropdown menus, notifications from top

```tsx
// CSS
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// React Component
<div className="animate-slideDown">
  Dropdown content
</div>
```

**Пример:**
```tsx
// Top notification
{showNotification && (
  <div className="animate-slideDown fixed top-4 right-4 p-4 bg-card">
    Notification message
  </div>
)}
```

---

### 4. scaleIn
**Описание:** Масштабирование от 95% до 100% с fade-in  
**Длительность:** 0.3s  
**Использование:** Modals, popups, tooltips

```tsx
// CSS
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

// React Component
<div className="animate-scaleIn">
  Popup content
</div>
```

**Пример:**
```tsx
// Modal with scale animation
{isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="animate-scaleIn bg-card p-6 rounded-xl">
      Modal content
    </div>
  </div>
)}
```

---

### 5. pulse
**Описание:** Пульсация opacity (1 → 0.7 → 1)  
**Длительность:** 2s infinite  
**Использование:** Loading indicators, live status badges

```tsx
// CSS
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

// React Component
<div className="animate-pulse">
  Pulsing content
</div>
```

**Пример:**
```tsx
// Live status indicator
<div className="flex items-center gap-2">
  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
  <span>259 nodes earning now</span>
</div>
```

---

### 6. shimmer
**Описание:** Shimmer эффект для loading states  
**Длительность:** 2s infinite  
**Использование:** Skeleton loaders

```tsx
// CSS
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

// React Component (Custom implementation)
<div className="shimmer-effect">
  Loading...
</div>
```

**Пример:**
```tsx
// Skeleton loader
<div className="space-y-4">
  {[...Array(3)].map((_, i) => (
    <div
      key={i}
      className="h-20 rounded-lg animate-pulse bg-white/5"
    />
  ))}
</div>
```

---

## 🎯 UTILITY CLASSES

### Pre-built Animation Classes

```css
/* Готовые классы для применения */
.animate-fadeIn     /* fadeIn 0.3s ease-out */
.animate-slideUp    /* slideUp 0.4s cubic-bezier */
.animate-slideDown  /* slideDown 0.4s cubic-bezier */
.animate-scaleIn    /* scaleIn 0.3s cubic-bezier */
.animate-pulse      /* pulse 2s infinite */
```

### Usage Examples:

```tsx
// Simple fade in
<div className="animate-fadeIn">Content</div>

// Slide up with delay (custom)
<div className="animate-slideUp" style={{ animationDelay: '0.2s' }}>
  Delayed content
</div>

// Multiple animations (chain)
<div className="animate-fadeIn hover:animate-pulse">
  Interactive content
</div>
```

---

## 📊 STAGGER ANIMATIONS

### Автоматический cascade эффект для списков

**Описание:** Элементы появляются последовательно с задержкой 50ms

```css
/* CSS (уже в globals.css) */
.stagger-item {
  animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) backwards;
}

.stagger-item:nth-child(1) { animation-delay: 0.05s; }
.stagger-item:nth-child(2) { animation-delay: 0.1s; }
.stagger-item:nth-child(3) { animation-delay: 0.15s; }
.stagger-item:nth-child(4) { animation-delay: 0.2s; }
.stagger-item:nth-child(5) { animation-delay: 0.25s; }
.stagger-item:nth-child(6) { animation-delay: 0.3s; }
.stagger-item:nth-child(7) { animation-delay: 0.35s; }
.stagger-item:nth-child(8) { animation-delay: 0.4s; }
```

### Usage in React:

```tsx
// Простой список с stagger animation
function RewardsList({ items }: { items: Reward[] }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="stagger-item p-4 bg-card rounded-lg">
          <span>{item.user}</span>
          <span>{item.amount}</span>
        </div>
      ))}
    </div>
  );
}
```

### Визуальный эффект:
```
Time:  0ms   50ms  100ms  150ms  200ms  250ms  300ms  350ms  400ms
       │     │     │      │      │      │      │      │      │
Item 1 ▓▓▓▓▓
Item 2       ▓▓▓▓▓
Item 3             ▓▓▓▓▓
Item 4                   ▓▓▓▓▓
Item 5                         ▓▓▓▓▓
Item 6                               ▓▓▓▓▓
Item 7                                     ▓▓▓▓▓
Item 8                                           ▓▓▓▓▓
```

### Кастомизация задержки:

```tsx
// Если нужна другая задержка
{items.map((item, i) => (
  <div
    key={i}
    className="animate-slideUp"
    style={{
      animationDelay: `${i * 0.1}s`, // 100ms delay
      animationFillMode: 'backwards'
    }}
  >
    {item.content}
  </div>
))}
```

---

## ⚡ TRANSITION BEST PRACTICES

### 1. Interactive Elements (Buttons, Links)

```tsx
// ✅ Good - fast, responsive
<button className="transition-all duration-200">
  Click me
</button>

// ❌ Bad - too slow
<button className="transition-all duration-1000">
  Click me
</button>
```

**Timing Guidelines:**
- **Buttons/Links:** 150-200ms
- **Cards/Containers:** 250-300ms
- **Modals/Overlays:** 300-400ms
- **Page transitions:** 400-500ms

---

### 2. Easing Functions

```css
/* Professional easing curves */

/* Default (iOS-like) */
cubic-bezier(0.4, 0, 0.2, 1)  /* Material Design Standard */

/* Snappy */
cubic-bezier(0.4, 0, 0.6, 1)  /* Fast entry, slow exit */

/* Smooth */
cubic-bezier(0.25, 0.1, 0.25, 1)  /* Ease-in-out */

/* Bouncy */
cubic-bezier(0.68, -0.55, 0.265, 1.55)  /* Back easing */
```

**Использование:**
```tsx
<div className="transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
  Content
</div>
```

---

### 3. GPU-Accelerated Properties

**✅ Fast (GPU-accelerated):**
- `transform: translate()`, `scale()`, `rotate()`
- `opacity`

**❌ Slow (CPU-bound):**
- `width`, `height`
- `margin`, `padding`
- `top`, `left`, `right`, `bottom`

**Example:**
```tsx
// ✅ Good - GPU accelerated
<div className="transition-transform duration-300 hover:scale-105">
  Fast animation
</div>

// ❌ Bad - CPU bound
<div className="transition-all duration-300 hover:w-[200px]">
  Slow animation
</div>
```

---

## 💡 EXAMPLES

### Example 1: Animated Card Grid

```tsx
function CardGrid({ items }: { items: Item[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, i) => (
        <div
          key={item.id}
          className="stagger-item p-6 bg-card rounded-xl border 
                     transition-all duration-300
                     hover:scale-105 hover:shadow-lg"
        >
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
```

---

### Example 2: Modal with Backdrop

```tsx
function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with fadeIn */}
      <div
        className="animate-fadeIn fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal with scaleIn */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div
          className="animate-scaleIn relative max-w-lg w-full 
                     bg-card p-6 rounded-xl border shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
}
```

---

### Example 3: Live Status Badge

```tsx
function LiveBadge({ activeNodes }: { activeNodes: number }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 
                    rounded-full bg-success/10 border border-success/20">
      {/* Pulsing dot */}
      <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
      
      {/* Text */}
      <span className="text-sm font-medium text-success">
        {activeNodes} nodes earning now
      </span>
    </div>
  );
}
```

---

### Example 4: Skeleton Loader

```tsx
function SkeletonCard() {
  return (
    <div className="p-6 bg-card rounded-xl border">
      {/* Title skeleton */}
      <div className="h-6 w-1/3 bg-white/5 rounded animate-pulse mb-4" />
      
      {/* Content skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-white/5 rounded animate-pulse" />
        <div className="h-4 w-4/6 bg-white/5 rounded animate-pulse" />
      </div>
    </div>
  );
}
```

---

### Example 5: Notification Toast

```tsx
function Toast({ message, type }: ToastProps) {
  return (
    <div
      className="animate-slideDown fixed top-4 right-4 
                 p-4 bg-card rounded-lg border shadow-lg
                 transition-all duration-300"
    >
      <div className="flex items-center gap-3">
        {/* Icon */}
        {type === 'success' && (
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
        )}
        
        {/* Message */}
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}
```

---

### Example 6: Button with Active State

```tsx
function ActionButton({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 rounded-lg
                 bg-primary text-white
                 transition-all duration-200
                 hover:bg-primary/90 hover:shadow-md
                 active:scale-[0.98]
                 focus-visible:outline-2 
                 focus-visible:outline-offset-2
                 focus-visible:outline-[rgba(233,199,116,0.6)]"
    >
      {children}
    </button>
  );
}
```

---

## 🚀 PERFORMANCE TIPS

### 1. Используйте `will-change` с осторожностью

```tsx
// ✅ Good - только для элементов с анимациями
<div className="will-change-transform hover:scale-105">
  Animated content
</div>

// ❌ Bad - на все элементы
<div className="will-change-auto">
  Static content
</div>
```

---

### 2. Batch animations

```tsx
// ✅ Good - одна анимация для контейнера
<div className="animate-fadeIn">
  <div>Child 1</div>
  <div>Child 2</div>
  <div>Child 3</div>
</div>

// ❌ Bad - отдельная анимация для каждого
<div>
  <div className="animate-fadeIn">Child 1</div>
  <div className="animate-fadeIn">Child 2</div>
  <div className="animate-fadeIn">Child 3</div>
</div>
```

---

### 3. Используйте `transform` вместо `position`

```tsx
// ✅ Good - GPU accelerated
<div className="transition-transform hover:translate-y-[-4px]">
  Content
</div>

// ❌ Bad - CPU bound
<div className="transition-all hover:top-[-4px]">
  Content
</div>
```

---

### 4. Ограничивайте количество одновременных анимаций

```tsx
// ✅ Good - stagger для последовательности
<div className="space-y-2">
  {items.slice(0, 8).map((item, i) => (
    <div key={i} className="stagger-item">
      {item.content}
    </div>
  ))}
</div>

// ❌ Bad - все сразу
<div className="space-y-2">
  {items.map((item, i) => (
    <div key={i} className="animate-slideUp">
      {item.content}
    </div>
  ))}
</div>
```

---

### 5. Используйте CSS вместо JavaScript

```tsx
// ✅ Good - CSS transitions
<div className="transition-transform duration-300 hover:scale-105">
  Content
</div>

// ❌ Bad - JavaScript animation
<div
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'scale(1.05)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'scale(1)';
  }}
>
  Content
</div>
```

---

## 📋 QUICK REFERENCE

| Use Case | Animation | Duration | Easing |
|----------|-----------|----------|--------|
| Modal appear | `animate-scaleIn` | 0.3s | cubic-bezier |
| Notification | `animate-slideDown` | 0.4s | cubic-bezier |
| Card entrance | `animate-slideUp` | 0.4s | cubic-bezier |
| Fade overlay | `animate-fadeIn` | 0.3s | ease-out |
| List items | `stagger-item` | 0.4s | cubic-bezier |
| Loading | `animate-pulse` | 2s | - |
| Button hover | `transition-all` | 0.2s | cubic-bezier |
| Card hover | `transition-all` | 0.3s | cubic-bezier |

---

## ✅ CHECKLIST

При добавлении новых анимаций проверьте:

- [ ] Длительность не больше 500ms
- [ ] Используется GPU-accelerated свойства
- [ ] Easing функция appropriate для action
- [ ] Анимация работает на мобильных
- [ ] Нет jank/stuttering
- [ ] Accessibility не нарушена
- [ ] Поддержка `prefers-reduced-motion`

---

**Дата создания:** 23 января 2026  
**Версия:** Animation Guide v1.0  
**Проект:** Seasons Dashboard
