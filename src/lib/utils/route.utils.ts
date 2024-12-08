import { Route, Routes } from '@angular/router';
import { TabBarComponent } from '../components/tabs/tab-bar.component';
import { isLazyComponent, Tab, TabComponent } from '../models/tab.interface';
import { Type } from '@angular/core';

/**
 * @module RouteUtils
 *
 * @description
 * Utilities for generating Angular routes from tab configurations.
 * These utilities handle both eager and lazy loading scenarios and
 * set up proper navigation structures.
 *
 * @usageNotes
 * The route generation system creates:
 * - A main wrapper route for the tabs
 * - Individual routes for each tab
 * - Default routing to the first tab
 * - Support for lazy loading
 *
 * ### Route Structure
 * The generated routes follow this pattern:
 * ```
 * /tabs              -> Redirects to first tab
 * /tabs/[tab-path]   -> Individual tab routes
 * /                  -> Redirects to /tabs
 * ```
 */

/**
 * Generates Angular routes configuration for the dynamic tab system.
 *
 * @param {Tab[]} tabs - Array of tab configurations to generate routes for
 * @returns {Routes} Angular routes configuration with tab routing setup
 *
 * @description
 * This function creates a complete routing configuration for the tab system including:
 * - A main 'tabs' route that hosts the TabBarComponent and provides tab data
 * - Child routes for each provided tab
 * - Default routing to the first tab in the array
 * - A root redirect to the tabs route
 *
 * The tabs configuration is automatically passed to the TabBarComponent through
 * route data, so no additional setup is needed in the app component.
 *
 * @example
 * ```typescript
 * // app-tabs.config.ts
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
 * // app.routes.ts
 * import { Routes } from '@angular/router';
 * import { generateRoutes } from 'jokudevs-ionic-angular-dynamic-tabs';
 *
 * export const routes: Routes = generateRoutes(APP_TABS);
 * ```
 */
export function generateRoutes(tabs: Tab[]): Routes {
  return [
    {
      path: 'tabs',
      component: TabBarComponent,
      data: { tabs },
      children: [
        ...generateChildrenRoutes(tabs),
        {
          path: '',
          redirectTo: tabs[0].urlPath.replace('/tabs/', ''),
          pathMatch: 'full',
        },
      ],
    },
    {
      path: '',
      redirectTo: tabs[0].urlPath,
      pathMatch: 'full',
    },
  ];
}

/**
 * Generates child routes for each tab in the provided array.
 *
 * @param {Tab[]} tabs - Array of tab configurations
 * @returns {Routes} Angular child routes configuration
 *
 * @internal
 * This is an internal helper function used by generateRoutes.
 */
function generateChildrenRoutes(tabs: Tab[]): Routes {
  return tabs.map(tab => ({
    path: tab.urlPath.replace('/tabs/', ''),
    ...createComponentRoute(tab.component)
  }));
}

/**
 * Creates an Angular route configuration for a component, handling both eager and lazy loading scenarios.
 *
 * @param {TabComponent} component - The component to create a route for. Can be either:
 *                                  - An Angular component class (for eager loading)
 *                                  - A function returning Promise<Type<any>> (for lazy loading)
 * @returns {Route} An Angular route configuration object
 *
 * @example
 * ```typescript
 * // Eager loading with component class
 * @Component({...})
 * class HomePage {}
 * const eagerRoute = createComponentRoute(HomePage);
 * // Result: { component: HomePage }
 *
 * // Lazy loading with named export
 * const lazyRoute = createComponentRoute(
 *   () => import('./home.page').then(m => m.HomePage)
 * );
 * // Result: { loadComponent: () => Promise<typeof HomePage> }
 *
 * // Lazy loading with default export
 * const lazyDefaultRoute = createComponentRoute(
 *   () => import('./home.page')
 * );
 * // Result: { loadComponent: () => Promise<typeof HomePage> }
 * ```
 *
 * @remarks
 * This function detects the loading strategy by checking for Angular component metadata:
 * 1. Eager loaded components:
 *    - Directly uses the component class in the route configuration
 *    - Component must have @Component decorator
 * 2. Lazy loaded components:
 *    - Sets up a loadComponent function that handles the dynamic import
 *    - Supports both default and named exports
 *    - Returns the component class for Angular to instantiate
 *
 * @throws {Error} May throw if:
 * - The lazy loaded module fails to load
 * - The imported module doesn't contain the expected component
 * - The imported item is not a valid Angular component class
 *
 * @internal
 * This is an internal utility function used by the route generation system.
 * It should not be used directly outside of the routing setup.
 */
function createComponentRoute(component: TabComponent): Route {
  if (isLazyComponent(component)) {
    return {
      // Don't try to construct the component - just return the class
      loadComponent: () => component().then(loaded => {
        // Handle both default and named exports
        return ('default' in loaded) ? loaded.default : loaded;
      })
    };
  }

  return { component };
}
