import { registerSectionWidget } from "./section";
import { registerColumnWidget } from "./column";
import { registerHeadingWidget } from "./heading";
import { registerTextWidget } from "./text";
import { registerButtonWidget } from "./button";
import { registerImageWidget } from "./image";
import { registerDividerWidget } from "./divider";
import { registerSpacerWidget } from "./spacer";
export * from "./registry";

/**
 * Call this once on app start (editor boot) to register the default widgets.
 */
export function registerDefaultWidgets() {
  registerSectionWidget();
  registerColumnWidget();
  registerHeadingWidget();
  registerTextWidget();
  registerButtonWidget();
  registerImageWidget();
  registerDividerWidget();
  registerSpacerWidget();
}
