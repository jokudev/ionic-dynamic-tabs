import { Type } from '@angular/core';

/**
 * Configuration interface for a single tab in the dynamic tab system.
 *
 * @interface Tab
 * @property {string} name - Unique identifier for the tab. Should be URL-friendly (no spaces or special characters).
 * @property {string} label - Human-readable text shown in the tab UI.
 * @property {string} iconName - Name of the Ionicon to display. Must match an available Ionicon name.
 * @property {string} urlPath - The URL path for this tab. Must start with '/tabs/'.
 * @property {TabComponent} component - The component to render when this tab is active.
 *                                     Can be either eagerly or lazy loaded.
 *
 * @example
 * ```typescript
 * // Eager loading example
 * const homeTab: Tab = {
 *   name: 'home',
 *   label: 'Home',
 *   iconName: 'home-outline',
 *   urlPath: '/tabs/home',
 *   component: HomePage
 * };
 *
 * // Lazy loading example
 * const settingsTab: Tab = {
 *   name: 'settings',
 *   label: 'Settings',
 *   iconName: 'settings-outline',
 *   urlPath: '/tabs/settings',
 *   component: () => import('./settings.page').then(m => m.SettingsPage)
 * };
 * ```
 *
 * @remarks
 * - The `name` should be unique across all tabs
 * - The `urlPath` must start with '/tabs/' for proper routing
 * - The `iconName` must match an icon from the Ionicons library
 * - The `component` can use either eager or lazy loading
 *
 * @see TabComponent for component loading options
 * @see {@link https://ionic.io/ionicons Ionicons documentation}
 */
export interface Tab {
  name: string;
  label: string;
  iconName: string;
  urlPath: string;
  component: TabComponent;
}

/**
 * Represents either a directly imported component or a function that lazily loads a component.
 * This type allows for both eager and lazy loading strategies in tab configurations.
 *
 * @typedef {Type<any> | LazyComponent} TabComponent
 *
 * @example
 * ```typescript
 * // Eager loading
 * const eagerTab: TabComponent = HomePage;
 *
 * // Lazy loading
 * const lazyTab: TabComponent = () => import('./home.page').then(m => m.HomePage);
 * ```
 *
 * @see LazyComponent for the lazy loading function signature
 * @see {@link https://angular.io/guide/lazy-loading-ngmodules Angular Lazy Loading Guide}
 */
export type TabComponent = Type<any> | LazyComponent;

/**
 * Represents a function that lazily loads a component.
 *
 * @typedef {Function} LazyComponent
 * @returns {Promise<Type<any> | { default: Type<any> }>} A promise that resolves to either:
 *   - A direct component type
 *   - An object with a default export containing the component type
 *
 * @example
 * ```typescript
 * // With named export
 * const lazyHome: LazyComponent = () => import('./home.page').then(m => m.HomePage);
 *
 * // With default export
 * const lazyProfile: LazyComponent = () => import('./profile.page');
 * ```
 */
export type LazyComponent = () => Promise<Type<any> | { default: Type<any> }>;

/**
 * Type guard to determine if a component is configured for lazy loading by checking if it's
 * a function without Angular component metadata.
 *
 * @param {TabComponent} component - The component to check
 * @returns {boolean} True if the component is a lazy loading function, false if it's an Angular component class
 *
 * @example
 * ```typescript
 * // Eager loaded component
 * @Component({...})
 * class HomePage {}
 * isLazyComponent(HomePage) // false
 *
 * // Lazy loaded component
 * const lazyComponent = () => import('./home.page').then(m => m.HomePage);
 * isLazyComponent(lazyComponent) // true
 *
 * // Usage in condition
 * if (isLazyComponent(component)) {
 *   // TypeScript knows component is a lazy loading function
 *   const loadedComponent = await component();
 * } else {
 *   // TypeScript knows component is an Angular component class
 *   return { component };
 * }
 * ```
 */
export function isLazyComponent(component: TabComponent): component is LazyComponent {
  return typeof component === 'function' && !('ɵcmp' in component);
}
