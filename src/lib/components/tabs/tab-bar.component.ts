import { NgFor } from '@angular/common';
import { Component, EnvironmentInjector, Input, inject, OnInit } from '@angular/core';
import { IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';
import { camelCase } from 'change-case';
import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';
import { Tab } from '../../models/tab.interface';
import { ActivatedRoute } from '@angular/router';

/**
 * @module TabBarComponent
 *
 * @description
 * The main component for rendering the dynamic tab bar. This component creates
 * a customizable tab bar based on tab configurations provided through route data.
 * It is responsible for:
 * - Rendering the tab bar UI
 * - Handling tab navigation
 * - Managing icon loading and automatic registration
 * - Integrating with Ionic's tab system
 * - Automatic route handling
 *
 * @component
 * @selector jokudevs-ionic-angular-dynamic-tab-bar
 *
 * @usageNotes
 * ### Basic Usage
 * ```typescript
 * // app-tabs.config.ts
 * export const APP_TABS: Tab[] = [
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
 * import { generateRoutes } from 'jokudevs-ionic-angular-dynamic-tabs';
 * export const routes: Routes = generateRoutes(APP_TABS);
 * ```
 *
 * ### Styling
 * The component uses Ionic's built-in tab styling. You can override these styles:
 * ```scss
 * ion-tab-bar {
 *   --background: var(--ion-color-primary);
 * }
 *
 * ion-tab-button {
 *   --color: var(--ion-color-light);
 * }
 * ```
 *
 * @see {@link Tab} for tab configuration options
 * @see {@link generateRoutes} for route generation
 * @see {@link https://ionicframework.com/docs/api/tabs Ionic Tabs Documentation}
 */
@Component({
  selector: 'jokudevs-ionic-angular-dynamic-tab-bar',
  templateUrl: './tab-bar.component.html',
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, NgFor],
})
export class TabBarComponent implements OnInit {
  /**
   * Configuration array for the tabs to be rendered.
   *
   * @required
   * @description
   * Each item in the array represents a tab and must conform to the Tab interface.
   * The order of tabs in this array determines their display order in the tab bar.
   *
   * @throws {Error} Will throw an error if not provided due to the required flag
   */
  @Input({ required: true }) tabs: Tab[] = [];

  /**
   * Environment injector required by Ionic for standalone component setup
   *
   * @internal
   */
  public environmentInjector = inject(EnvironmentInjector);

  constructor(private route: ActivatedRoute) {}

  /**
   * Lifecycle hook that runs after component initialization.
   * Gets the tab configurations from the route data and sets up the required icons.
   *
   * @internal
   */
  ngOnInit() {
    this.tabs = this.route.snapshot.data['tabs'] || [];
    this.initializeRequiredIcons();
  }

  /**
   * Initializes the Ionicons required by the tab configurations.
   *
   * @private
   * @description
   * This method:
   * 1. Extracts icon names from tab configurations
   * 2. Converts them to camelCase to match Ionicons format
   * 3. Loads the required icons into the application
   * 4. Warns if any requested icons are not found
   */
  private initializeRequiredIcons() {
    const requiredIcons = this.tabs.reduce((acc: { [key: string]: any; }, tab) => {
      const camelCaseName = camelCase(tab.iconName);

      if (allIcons[camelCaseName as keyof typeof allIcons]) {
        acc[tab.iconName] = allIcons[camelCaseName as keyof typeof allIcons];
      } else {
        console.warn(`Icon not found: ${tab.iconName}`);
      }

      return acc;
    }, {});

    addIcons(requiredIcons);
  }
}
