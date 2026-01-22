export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        primary: '#0056D2',
        'primary-hover': '#00419e',
        'primary-light': '#E6F0FF',
        secondary: '#382d8b',

        background: '#FFFFFF',
        surface: '#F5F7F8',
        'surface-hover': '#F0F4F8',

        'text-primary': '#1f1f1f',
        'text-secondary': '#475569',
        'text-muted': '#94A3B8',

        border: '#E1E1E1',
        'border-light': '#F1F5F9',
        'border-dark': '#CBD5E1',

        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', '"Open Sans"', '"Source Sans Pro"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        lg: '8px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,24,40,0.05), 0 1px 3px rgba(16,24,40,0.06)',
      },
    },
  },
  plugins: [],
}
