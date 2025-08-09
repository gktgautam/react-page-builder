
import { create } from 'zustand'
import { v4 as uuid } from 'uuid'
import type { AppData, Section, Column, Widget, WidgetType, ResponsiveStyles, Breakpoint } from './types'
import { defaultSectionStyles } from './types'

interface BuilderState {
  data: AppData
  currentBreakpoint: Breakpoint
  selected: { widgetId?: string; sectionId?: string } | null
  // actions
  load: (data: AppData) => void
  setBreakpoint: (bp: BuilderState['currentBreakpoint']) => void
  selectWidget: (id: string | null) => void
  selectSection: (id: string | null) => void
  addSection: () => void
  deleteSection: (sectionId: string) => void
  addColumn: (sectionId: string) => void
  addWidget: (sectionId: string, columnId: string, type: WidgetType, defaults: ResponsiveStyles, content: string) => void
  updateWidgetContent: (widgetId: string, content: string) => void
  updateWidgetStyles: (widgetId: string, styles: Partial<ResponsiveStyles['desktop']>) => void
  deleteWidget: (widgetId: string) => void
  updateSectionLayout: (sectionId: string, isGrid: boolean) => void
  updateSectionGap: (sectionId: string, gap: string) => void
  trackConversion: () => void
}

const createEmptyPage = (): AppData => ({
  page: { id: uuid(), sections: [], views: 0, conversions: 0 },
})

export const useBuilderStore = create<BuilderState>((set, get) => ({
  data: createEmptyPage(),
  currentBreakpoint: 'desktop',
  selected: null,
  load: (data) => set({ data }),
  setBreakpoint: (bp) => set({ currentBreakpoint: bp }),
  selectWidget: (id) => set({ selected: id ? { widgetId: id } : null }),
  selectSection: (id) => set({ selected: id ? { sectionId: id } : null }),
  addSection: () => set((s) => ({
    data: {
      ...s.data,
      page: {
        ...s.data.page,
        sections: [
          ...s.data.page.sections,
          { id: uuid(), columns: [{ id: uuid(), widgets: [] }], styles: defaultSectionStyles } as Section,
        ],
      },
    },
  })),
  deleteSection: (sectionId) => set((s) => ({
    data: {
      ...s.data,
      page: { ...s.data.page, sections: s.data.page.sections.filter(sec => sec.id !== sectionId) },
    },
    selected: null,
  })),
  addColumn: (sectionId) => set((s) => ({
    data: {
      ...s.data,
      page: {
        ...s.data.page,
        sections: s.data.page.sections.map(sec =>
          sec.id === sectionId ? { ...sec, columns: [...sec.columns, { id: uuid(), widgets: [] } as Column] } : sec
        ),
      },
    },
  })),
  addWidget: (sectionId, columnId, type, defaults, content) => set((s) => ({
    data: {
      ...s.data,
      page: {
        ...s.data.page,
        sections: s.data.page.sections.map(sec =>
          sec.id !== sectionId ? sec : {
            ...sec,
            columns: sec.columns.map(col =>
              col.id !== columnId ? col : { ...col, widgets: [...col.widgets, { id: uuid(), type, content, styles: defaults } as Widget] }
            ),
          }
        ),
      },
    },
  })),
  updateWidgetContent: (widgetId, content) => set((s) => ({
    data: {
      ...s.data,
      page: {
        ...s.data.page,
        sections: s.data.page.sections.map(sec => ({
          ...sec,
          columns: sec.columns.map(col => ({
            ...col,
            widgets: col.widgets.map(w => (w.id === widgetId ? { ...w, content } : w)),
          })),
        })),
      },
    },
  })),
  updateWidgetStyles: (widgetId, patch) => set((s) => ({
    data: {
      ...s.data,
      page: {
        ...s.data.page,
        sections: s.data.page.sections.map(sec => ({
          ...sec,
          columns: sec.columns.map(col => ({
            ...col,
            widgets: col.widgets.map(w =>
              w.id !== widgetId ? w : {
                ...w,
                styles: {
                  ...w.styles,
                  [get().currentBreakpoint]: {
                    ...w.styles[get().currentBreakpoint],
                    ...patch,
                  },
                },
              }
            ),
          })),
        })),
      },
    },
  })),
  deleteWidget: (widgetId) => set((s) => ({
    data: {
      ...s.data,
      page: {
        ...s.data.page,
        sections: s.data.page.sections.map(sec => ({
          ...sec,
          columns: sec.columns.map(col => ({
            ...col,
            widgets: col.widgets.filter(w => w.id !== widgetId),
          })),
        })),
      },
    },
    selected: null,
  })),
  updateSectionLayout: (sectionId, isGrid) => set((s) => ({
    data: {
      ...s.data,
      page: {
        ...s.data.page,
        sections: s.data.page.sections.map(sec =>
          sec.id === sectionId ? { ...sec, styles: { ...sec.styles, [get().currentBreakpoint]: { ...sec.styles[get().currentBreakpoint], isGrid } } } : sec
        ),
      },
    },
  })),
  updateSectionGap: (sectionId, gap) => set((s) => ({
    data: {
      ...s.data,
      page: {
        ...s.data.page,
        sections: s.data.page.sections.map(sec =>
          sec.id === sectionId ? { ...sec, styles: { ...sec.styles, [get().currentBreakpoint]: { ...sec.styles[get().currentBreakpoint], gap } } } : sec
        ),
      },
    },
  })),
  trackConversion: () => set((s) => ({
    data: { ...s.data, page: { ...s.data.page, conversions: (s.data.page.conversions || 0) + 1 } },
  })),
}))
