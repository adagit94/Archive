import { isString } from "assert";
import type { SP } from "types";

/**
 * action: (key: string) => void - action is fired in case all registered handlers are in positive state - i.e. in case keyboard and/or mouse are in pressed state with returned true value for a last call.
 * 
 * keyboard?: (e: KeyboardEvent) => boolean - true value should be returned in case pressed key (keydown event) is relevant for a key shortcut/binding. E.g. based on e.code.
 * 
 * mouse?: (e: MouseEvent) => boolean - true value should be returned in case pressed button (mousedown event) is relevant for a key shortcut/binding. E.g. based on e.button.
 */
type Binding = {
  action: (key: string) => void;
  keyboard?: (e: KeyboardEvent) => boolean;
  mouse?: (e: MouseEvent) => boolean;
};

type Bindings = Record<string, Binding>;

/**
 *  register: (bindings: Bindings) => void - attach handlers for passed bindings. In case there already exist some binding under the respective key, original one will be removed and replaced by the new one.
 *
 *  unregister: (keys?: SP\<string>) => void - remove handler(s) for a binding(s) if registered for a passed key(s). In case keys won't be passed, all present bindings will be removed.
 */
interface IShortcutsManager {
  register: (bindings: Bindings) => void;
  unregister: (keys?: SP<string>) => void;
}

class ShortcutsManager implements IShortcutsManager {
  constructor(bindings: Bindings) {
    this.toRemove = {};
    this.register(bindings);
  }

  private toRemove: Record<string, (() => void)[]>;

  public register(bindings: Bindings) {
    this.unregister(Object.keys(bindings));
    Object.entries(bindings).forEach(([key, { action, keyboard, mouse }]) => {
      const toRemove: (() => void)[] = (this.toRemove[key] = []);
      
      let kb = !keyboard,
        m = !mouse;

      if (keyboard) {
        const onKeyDown = (e: KeyboardEvent) => {
          if (e.repeat) return
          
          if (keyboard(e)) {
            kb = true;

            if (kb && m) {
              action(key);
            }
          }
        };

        const onKeyUp = (e: KeyboardEvent) => {
          if (keyboard(e)) {
            kb = false;
          }
        };

        addEventListener("keydown", onKeyDown);
        addEventListener("keyup", onKeyUp);

        toRemove.push(() => {
          removeEventListener("keydown", onKeyDown);
          removeEventListener("keyup", onKeyUp);
        });
      }

      if (mouse) {
        const onMouseDown = (e: MouseEvent) => {
          if (mouse(e)) {
            m = true;

            if (kb && m) {
              action(key);
            }
          }
        };

        const onMouseUp = (e: MouseEvent) => {
          if (mouse(e)) {
            m = false;
          }
        };

        addEventListener("mousedown", onMouseDown);
        addEventListener("mouseup", onMouseUp);

        toRemove.push(() => {
          removeEventListener("mousedown", onMouseDown);
          removeEventListener("mouseup", onMouseUp);
        });
      }
    });
  }

  public unregister(keys?: SP<string>) {
    const ks = isString(keys) ? [keys] : (keys ?? Object.keys(this.toRemove));

    ks.forEach((k) => {
      this.toRemove[k]?.forEach((f) => f());
      delete this.toRemove[k];
    });
  }
}

export default ShortcutsManager