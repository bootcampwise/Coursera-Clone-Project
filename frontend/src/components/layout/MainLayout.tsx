import React from 'react'
import { IMAGES } from '../../constants/images'

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-text-primary font-primary">
      <header className="border-b bg-white">
        <div className="container mx-auto flex items-center gap-4 py-4">
          <img src={IMAGES.LOGO} alt="logo" className="h-9" />
          <h2 className="text-lg font-semibold m-0">Coursera Clone</h2>
        </div>
      </header>
      <main className="container mx-auto py-8">{children}</main>
      <footer className="border-t">
        <div className="container mx-auto text-center py-6">© Coursera Clone</div>
      </footer>
    </div>
  )
}

export default MainLayout
















































