import { getAllowedChildren } from "../lib/widgetRegistry";
// ... your other imports

// somewhere in your drop validation:
function canDrop(parentType: string, childType: string): boolean {
  const allowed = getAllowedChildren(parentType) || [];
  return allowed.length === 0 || allowed.includes(childType);
}

// export the rest of your handlers as before…
