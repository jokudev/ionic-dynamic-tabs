# Jokudevs Ionic Angular Dynamic Tabs

A flexible and type-safe dynamic tabs system for Ionic Angular applications. This package allows you to configure tabs through a simple configuration object, handling all the routing and icon management automatically.

## Features

- 🚀 Easy to set up and configure
- 🛣️ Automatic route generation
- 🎨 Dynamic icon loading from Ionicons
- 📱 Fully responsive
- 🔒 Type-safe configuration
- ⚡ Standalone component architecture
- 💪 Angular 18+ and Ionic 7+ support
- 🔄 Support for lazy loading
- 📚 Comprehensive JSDoc documentation

## Installation

```bash
npm install jokudevs-ionic-angular-dynamic-tabs
```

## Quick Start

1. **Define Your Tabs**

```typescript
// app-tabs.config.ts
import { Tab } from 'jokudevs-ionic-angular-dynamic-tabs';
import { HomePage } from './pages/home/home.page';

export const APP_TABS: Tab[] = [
  {
    name: 'home',
    label: 'Home',
    iconName: 'home-outline',
    urlPath: '/tabs/home',
    component: HomePage  // Eager loading
  },
  {
    name: 'settings',
    label: 'Settings',
    iconName: 'settings-outline',
    urlPath: '/tabs/settings',
    component: () => import('./pages/settings/settings.page').then(m => m.SettingsPage)  // Lazy loading
  }
];
```

2. **Set Up Routing**

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { generateRoutes } from 'jokudevs-ionic-angular-dynamic-tabs';
import { APP_TABS } from './app-tabs.config';

export const routes: Routes = generateRoutes(APP_TABS);
```

That's it! The tabs will be automatically rendered and configured based on your route configuration.

## API Reference

### Tab Interface

```typescript
interface Tab {
  name: string;      // Unique identifier for the tab
  label: string;     // Display text in the UI
  iconName: string;  // Ionicon name (e.g., 'home-outline')
  urlPath: string;   // Route path (must start with '/tabs/')
  component: TabComponent; // Component to render (eager or lazy loaded)
}

// Support for both eager and lazy loading
type TabComponent = Type<any> | LazyComponent;
type LazyComponent = () => Promise<Type<any> | { default: Type<any> }>;
```

### Route Generation

```typescript
function generateRoutes(tabs: Tab[]): Routes;
```

Generates Angular routes configuration for your tabs. The first tab in the array becomes the default route.

## Best Practices

1. **Icon Names**
   - Use outline variants for consistency (e.g., 'home-outline')
   - Check [Ionicons](https://ionic.io/ionicons) for available icons
   - Always test icons to ensure they exist

2. **URL Paths**
   - Always start with '/tabs/'
   - Use kebab-case for multi-word paths
   - Keep paths short and meaningful

3. **Component Organization**
   - Keep tab components in a dedicated directory
   - Use lazy loading for large tab components
   - Use standalone components for better tree-shaking

4. **Loading Strategies**
   - Use eager loading for critical/small components
   - Use lazy loading for larger features
   - Consider user navigation patterns

## Example Project Structure

```
src/
├── app/
│   ├── pages/
│   │   ├── home/
│   │   │   └── home.page.ts
│   │   └── settings/
│   │       └── settings.page.ts
│   ├── app-tabs.config.ts
│   ├── app.routes.ts
│   └── app.component.ts
```

## Advanced Usage

### Lazy Loading Support

```typescript
// app-tabs.config.ts
export const APP_TABS: Tab[] = [
  {
    name: 'settings',
    label: 'Settings',
    iconName: 'settings-outline',
    urlPath: '/tabs/settings',
    component: () => import('./pages/settings/settings.page').then(m => m.SettingsPage)
  }
];
```

### Custom Tab Styling

Override Ionic's built-in tab styling:

```scss
// global.scss
ion-tab-bar {
  --background: var(--ion-color-primary);
}

ion-tab-button {
  --color: var(--ion-color-light);
  --color-selected: var(--ion-color-secondary);
}
```

## Peer Dependencies

```json
{
  "@angular/common": "^18.0.0",
  "@angular/core": "^18.0.0",
  "@angular/router": "^18.0.0",
  "@angular/forms": "^18.0.0",
  "@ionic/angular": "^8.0.0",
  "ionicons": "^7.2.1",
  "change-case": "^4.1.2"
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [jokudev](https://github.com/jokudev)
