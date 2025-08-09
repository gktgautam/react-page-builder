
import type { ResponsiveStyles } from '../../types'

export const defaultTextStyles: ResponsiveStyles = {
  desktop: {
    padding: '8px',
    color: '#333333',
    fontSize: '16px',
    backgroundColor: 'transparent',
    textAlign: 'left',
    fontWeight: '400',
    fontFamily: 'Inter, sans-serif',
    lineHeight: '1.5em',
  },
  tablet: {},
  mobile: {},
}

export const defaultButtonStyles: ResponsiveStyles = {
  desktop: {
    padding: '12px 24px',
    color: '#ffffff',
    fontSize: '16px',
    backgroundColor: '#3b82f6',
    borderRadius: '8px',
    fontWeight: '700',
    fontFamily: 'Inter, sans-serif',
  },
  tablet: {},
  mobile: {},
}

export const defaultConversionButtonStyles: ResponsiveStyles = {
  desktop: {
    padding: '16px 32px',
    color: '#ffffff',
    fontSize: '18px',
    backgroundColor: '#f97316',
    borderRadius: '9999px',
    fontWeight: '700',
    fontFamily: 'Inter, sans-serif',
  },
  tablet: {},
  mobile: {},
}

export const defaultImageStyles: ResponsiveStyles = {
  desktop: {
    padding: '0px',
    borderRadius: '8px',
    objectFit: 'cover',
  },
  tablet: {},
  mobile: {},
}
