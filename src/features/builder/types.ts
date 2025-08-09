
export type Breakpoint = 'desktop' | 'tablet' | 'mobile';

export type Style = Record<string, any>;

export interface ResponsiveStyles {
  desktop: Style;
  tablet: Style;
  mobile: Style;
}

export type WidgetType = 'text' | 'button' | 'image' | 'conversion-button';

export interface Widget {
  id: string;
  type: WidgetType;
  content: string;
  styles: ResponsiveStyles;
}

export interface Column {
  id: string;
  widgets: Widget[];
}

export interface SectionStyles {
  desktop: { isGrid: boolean; gap: string };
  tablet: { isGrid: boolean; gap: string };
  mobile: { isGrid: boolean; gap: string };
}

export interface Section {
  id: string;
  columns: Column[];
  styles: SectionStyles;
}

export interface Page {
  id: string;
  sections: Section[];
  views: number;
  conversions: number;
}

export interface AppData {
  page: Page;
}

export const defaultSectionStyles: SectionStyles = {
  desktop: { isGrid: true, gap: '16px' },
  tablet: { isGrid: false, gap: '8px' },
  mobile: { isGrid: false, gap: '8px' },
};
