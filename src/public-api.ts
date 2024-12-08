/**
 * @packageDocumentation
 *
 * @module jokudevs-ionic-angular-dynamic-tabs
 *
 * @description
 * A dynamic tab bar system for Ionic Angular applications that provides type-safe configuration
 * and automatic route generation. This package supports both eager and lazy loading of tab components.
 *
 * @example Simple Usage
 * ```typescript
 * // Define your tabs
 * const APP_TABS: Tab[] = [
 *   {
 *     name: 'home',
 *     label: 'Home',
 *     iconName: 'home-outline',
 *     urlPath: '/tabs/home',
 *     component: HomePage
 *   }
 * ];
 *
 * // Generate routes
 * const routes = generateRoutes(APP_TABS);
 *
 * // Use in template
 * <jokudevs-ionic-angular-dynamic-tab-bar [tabs]="APP_TABS" />
 * ```
 *
 * @example Lazy Loading
 * ```typescript
 * const APP_TABS: Tab[] = [
 *   {
 *     name: 'settings',
 *     label: 'Settings',
 *     iconName: 'settings-outline',
 *     urlPath: '/tabs/settings',
 *     component: () => import('./settings.page').then(m => m.SettingsPage)
 *   }
 * ];
 * ```
 *
 * @version 1.0.0
 * @license MIT
 * @author @jokudev
 */

export * from './lib/components/tabs/tab-bar.component';
export * from './lib/models/tab.interface';
export * from './lib/utils/route.utils';
