/***************************************************************************************************
 * Zone JS est requis par Angular lui-même.
 */
import 'zone.js';  // Import obligatoire (fourni par Angular)

/***************************************************************************************************
 * ⚠️ Polyfills pour que sockjs-client et stompjs fonctionnent avec Angular 15+ (Webpack 5).
 */
(window as any).global = window;  // corrige "global is not defined"

(window as any).process = {
  env: { DEBUG: undefined },
};

(window as any).Buffer = [];

/***************************************************************************************************
 * Tu peux aussi ajouter ici d’autres polyfills si besoin pour ton app.
 */
