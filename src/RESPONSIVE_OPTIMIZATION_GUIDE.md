# 📱 Responsive Design & Animation Optimization Guide

## ✅ Созданные компоненты и утилиты

### 1. **PageHeader** (`/components/ui/PageHeader.tsx`)
Responsive заголовок страницы с опциональным action button.

**Использование:**
```tsx
import { PageHeader } from '../ui/PageHeader';

<PageHeader 
  title="Dashboard"
  description="Real-time yield, liquid in any market."
  action={<Button>Action</Button>} // Опционально
/>
```

**Преимущества:**
- ✅ Адаптивная раскладка (vertical mobile, horizontal desktop)
- ✅ Правильные отступы для всех экранов
- ✅ Единообразный стиль заголовков

---

### 2. **ResponsiveGrid** (`/components/ui/ResponsiveGrid.tsx`)
Универсальная система сеток с пресетами.

**Использование:**
```tsx
import { ResponsiveGrid, GridPresets } from '../ui/ResponsiveGrid';

// С пресетом
<ResponsiveGrid cols={GridPresets.metrics} gap={4}>
  <MetricCard />
  <MetricCard />
  <MetricCard />
  <MetricCard />
</ResponsiveGrid>

// Кастомная конфигурация
<ResponsiveGrid 
  cols={{ default: 1, sm: 2, lg: 3, xl: 4 }}
  gap={6}
>
  {cards.map(card => <Card key={card.id} {...card} />)}
</ResponsiveGrid>
```

**Доступные пресеты:**
- `GridPresets.metrics` - 1/2/4 колонки (для метрик)
- `GridPresets.cards` - 1/2/3 колонки (для карточек)
- `GridPresets.wide` - 1/2 колонки (для широких карточек)
- `GridPresets.list` - 1 колонка (для списков)

---

### 3. **FadeIn & StaggeredFadeIn** (`/components/ui/FadeIn.tsx`)
Анимации появления элементов.

**FadeIn (single element):**
```tsx
import { FadeIn } from '../ui/FadeIn';

<FadeIn delay={100} duration={400}>
  <Card />
</FadeIn>
```

**StaggeredFadeIn (multiple elements):**
```tsx
import { StaggeredFadeIn } from '../ui/FadeIn';

<StaggeredFadeIn staggerDelay={50} duration={400}>
  {items.map(item => <Card key={item.id} {...item} />)}
</StaggeredFadeIn>
```

**Параметры:**
- `delay` - задержка перед анимацией (мс)
- `duration` - продолжительность анимации (мс)
- `staggerDelay` - задержка между элементами (мс)

---

### 4. **Animation Classes** (`/styles/animations.css`)
CSS классы для быстрых анимаций.

**Hover эффекты:**
```tsx
<div className="hover-lift">  {/* Поднимается при hover */}
<div className="hover-scale"> {/* Увеличивается при hover */}
<div className="hover-glow">  {/* Светится при hover */}
```

**Анимации появления:**
```tsx
<div className="slide-in-right">  {/* Слайд справа */}
<div className="slide-in-left">   {/* Слайд слева */}
<div className="bounce-in">       {/* Bounce эффект */}
```

**Loading состояния:**
```tsx
<div className="shimmer">         {/* Shimmer эффект */}
<div className="rotate-animate">  {/* Вращение */}
<div className="pulse-subtle">    {/* Пульсация */}
```

**Кнопки:**
```tsx
<button className="active-press focus-ring">
  {/* Нажатие + фокус кольцо */}
</button>
```

**Списки с stagger:**
```tsx
<div className="stagger-fade-in">
  <div>Item 1</div> {/* delay: 0.05s */}
  <div>Item 2</div> {/* delay: 0.1s */}
  <div>Item 3</div> {/* delay: 0.15s */}
</div>
```

---

## 🎯 Рекомендации по применению

### Dashboard Page
```tsx
// Было
<div className="mb-8">
  <h1 className="display-md mb-2">Dashboard</h1>
  <p>Real-time yield...</p>
</div>

// Стало
<PageHeader 
  title="Dashboard"
  description="Real-time yield, liquid in any market."
/>

// Метрики
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <MetricCard />
</div>

// Стало
<ResponsiveGrid cols={GridPresets.metrics} gap={4}>
  <MetricCard className="hover-lift" />
</ResponsiveGrid>
```

### FAQ Page
```tsx
<div className="space-y-4 stagger-fade-in">
  {faqs.map(faq => (
    <Accordion key={faq.id} className="hover-lift">
      ...
    </Accordion>
  ))}
</div>
```

### Holdings Page
```tsx
<div className="space-y-2">
  <StaggeredFadeIn staggerDelay={30}>
    {holdings.map(item => (
      <div key={item.id} className="hover-scale">
        ...
      </div>
    ))}
  </StaggeredFadeIn>
</div>
```

### Yield Overview
```tsx
<ResponsiveGrid cols={GridPresets.wide} gap={6}>
  <FadeIn delay={100}>
    <APYChart className="hover-lift" />
  </FadeIn>
  <FadeIn delay={200}>
    <YieldSourcesChart className="hover-lift" />
  </FadeIn>
</ResponsiveGrid>
```

---

## 📱 Mobile Optimization Checklist

### Typography
- ✅ Используйте `clamp()` для адаптивных размеров
- ✅ `display-md` уже адаптивный (28px fixed)
- ✅ `text-sm md:text-base` для описаний

### Spacing
- ✅ `mb-6 md:mb-8` - меньше отступов на мобильных
- ✅ `p-4 md:p-6` - меньше padding на мобильных
- ✅ `gap-4 md:gap-6` - меньше gap на мобильных

### Grid/Flex
- ✅ Всегда начинайте с mobile-first
- ✅ `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- ✅ `flex-col sm:flex-row` - вертикально на мобильных

### Touch Targets
- ✅ Минимум 44px × 44px для кнопок
- ✅ Класс `.touch-target` автоматически применяет это
- ✅ Увеличивайте padding для мобильных кнопок

### Hover States
- ✅ Используйте `@media (hover: hover)` для desktop-only hover
- ✅ Анимации в animations.css автоматически отключаются на touch устройствах

---

## 🎨 Animation Best Practices

### Timing
- **Быстрые действия**: 200-300ms (кнопки, hover)
- **Обычные анимации**: 400-500ms (карточки, модалы)
- **Медленные переходы**: 600-800ms (крупные изменения)

### Easing Functions
- **Плавный вход**: `cubic-bezier(0.4, 0, 0.2, 1)` ✅ Используется везде
- **Bounce**: `cubic-bezier(0.34, 1.56, 0.64, 1)` - для появления
- **Ease-out**: для выходов/закрытий

### Stagger Delays
- **Списки**: 50-100ms между элементами
- **Метрики**: 30-50ms (быстрее)
- **Большие карточки**: 100-150ms (медленнее)

### Performance
- ✅ Используйте `transform` и `opacity` (GPU-accelerated)
- ❌ Избегайте анимации `width`, `height`, `left`, `top`
- ✅ `will-change: transform` для сложных анимаций
- ✅ `@media (prefers-reduced-motion)` для доступности

---

## 🔧 Migration Guide

### Шаг 1: Обновите заголовки страниц
```tsx
// Замените все page headers на
<PageHeader title="..." description="..." />
```

### Шаг 2: Замените grid на ResponsiveGrid
```tsx
// Было
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">

// Стало  
<ResponsiveGrid cols={GridPresets.metrics} gap={4}>
```

### Шаг 3: Добавьте hover эффекты
```tsx
// Для всех карточек
className="hover-lift"

// Для кнопок
className="active-press focus-ring"
```

### Шаг 4: Добавьте анимации появления
```tsx
// Для отдельных элементов
<FadeIn delay={100}>
  <Component />
</FadeIn>

// Для списков
<StaggeredFadeIn staggerDelay={50}>
  {items.map(...)}
</StaggeredFadeIn>
```

---

## 📊 Impact

### Производительность
- ✅ GPU-accelerated animations
- ✅ Optimized for 60fps
- ✅ Minimal repaints/reflows

### UX
- ✅ Smooth, professional interactions
- ✅ Clear visual feedback
- ✅ Improved perceived performance

### Code Quality
- ✅ DRY principles (reusable components)
- ✅ Consistent animation timing
- ✅ Easy to maintain

---

## 🚀 Next Steps

1. ✅ **Применить PageHeader** во всех страницах
2. ✅ **Заменить grid** на ResponsiveGrid
3. ✅ **Добавить hover-lift** на все карточки
4. ✅ **Добавить StaggeredFadeIn** на списки
5. ✅ **Протестировать** на разных экранах

---

*Seasons Platform - Professional, polished, performant* 🎯
