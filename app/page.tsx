import { Code2, Sparkles, Zap, Star, GitPullRequest, Palette, Globe, Trophy, Github } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-background relative overflow-hidden">
      {/* Pixel Grid Background */}
      <div className="absolute inset-0 pixel-grid pointer-events-none" />
      
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>
      
      <div className="max-w-4xl w-full space-y-6 md:space-y-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-8">
          <div className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 border-4 border-foreground brutalist-shadow-sm">
            <Github className="w-6 h-6" />
            <span className="font-black text-sm uppercase tracking-wider">GitHub Stats Generator</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tight">
            <span className="inline-block bg-accent text-accent-foreground px-4 py-2 border-4 border-foreground brutalist-shadow transform -rotate-1">
              SVG
            </span>
            <br />
            <span className="inline-block bg-secondary text-secondary-foreground px-4 py-2 border-4 border-foreground brutalist-shadow mt-4 transform rotate-1">
              Stats Cards
            </span>
          </h1>
          
          <p className="text-lg md:text-xl font-bold max-w-2xl mx-auto">
            Generate <span className="bg-success text-success-foreground px-2 py-1 border-2 border-foreground">PIXEL-PERFECT</span> stats cards for your GitHub profile
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-card border-4 border-foreground brutalist-shadow p-4 flex items-center gap-3">
            <div className="bg-primary text-primary-foreground p-2 border-2 border-foreground">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="font-black text-sm">100+ THEMES</div>
              <div className="text-xs text-muted-foreground font-bold">Customizable colors</div>
            </div>
          </div>
          <div className="bg-card border-4 border-foreground brutalist-shadow p-4 flex items-center gap-3">
            <div className="bg-accent text-accent-foreground p-2 border-2 border-foreground">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="font-black text-sm">12+ LANGUAGES</div>
              <div className="text-xs text-muted-foreground font-bold">i18n support</div>
            </div>
          </div>
          <div className="bg-card border-4 border-foreground brutalist-shadow p-4 flex items-center gap-3">
            <div className="bg-success text-success-foreground p-2 border-2 border-foreground">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="font-black text-sm">RANK SYSTEM</div>
              <div className="text-xs text-muted-foreground font-bold">S+ to C grades</div>
            </div>
          </div>
        </div>

        {/* Usage Card */}
        <div className="bg-card border-4 border-foreground brutalist-shadow-lg p-6 md:p-8 space-y-4 pixel-block">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary text-primary-foreground p-3 border-4 border-foreground">
              <Code2 className="w-6 h-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black uppercase">Basic Usage</h2>
          </div>
          
          <p className="font-bold text-muted-foreground">Add this to your README.md:</p>
          
          <div className="bg-foreground text-background p-4 md:p-6 border-4 border-foreground font-mono text-xs md:text-sm overflow-x-auto brutalist-shadow-sm">
            <code className="whitespace-pre">
              {`![GitHub Stats](https://v0-serverless-svg-generation.vercel.app/api?username=YOUR_USERNAME)`}
            </code>
          </div>
          
          <div className="flex flex-wrap gap-3 pt-2">
            <span className="inline-flex items-center gap-2 bg-warning text-warning-foreground px-3 py-1 border-2 border-foreground text-sm font-bold">
              <Sparkles className="w-4 h-4" />
              NO CONFIG
            </span>
            <span className="inline-flex items-center gap-2 bg-success text-success-foreground px-3 py-1 border-2 border-foreground text-sm font-bold">
              <Zap className="w-4 h-4" />
              INSTANT
            </span>
          </div>
        </div>

        {/* Advanced Usage */}
        <div className="bg-card border-4 border-foreground brutalist-shadow-lg p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-accent text-accent-foreground p-3 border-4 border-foreground">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black uppercase">Customization</h2>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="font-bold text-sm mb-2">🎨 Choose a theme:</p>
              <div className="bg-foreground text-background p-3 border-4 border-foreground font-mono text-xs overflow-x-auto">
                <code>{`?username=YOUR_USERNAME&theme=radical`}</code>
              </div>
            </div>
            
            <div>
              <p className="font-bold text-sm mb-2">🌍 Set language:</p>
              <div className="bg-foreground text-background p-3 border-4 border-foreground font-mono text-xs overflow-x-auto">
                <code>{`?username=YOUR_USERNAME&locale=cn`}</code>
              </div>
            </div>
            
            <div>
              <p className="font-bold text-sm mb-2">🎯 Custom colors:</p>
              <div className="bg-foreground text-background p-3 border-4 border-foreground font-mono text-xs overflow-x-auto">
                <code>{`?username=YOUR_USERNAME&bg_color=000000&title_color=00FF88`}</code>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-4">
            {['default', 'dark', 'radical', 'tokyonight', 'dracula', 'monokai', 'gruvbox', 'nord'].map((theme) => (
              <div key={theme} className="bg-muted border-2 border-foreground px-3 py-2 text-center">
                <span className="font-black text-xs uppercase">{theme}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Example Card */}
        <div className="bg-card border-4 border-foreground brutalist-shadow-lg p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-secondary text-secondary-foreground p-3 border-4 border-foreground">
              <Star className="w-6 h-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black uppercase">Live Example</h2>
          </div>
          
          <div className="border-4 border-foreground p-4 md:p-6 bg-muted brutalist-shadow-sm">
            <img 
              src="/api?username=vercel" 
              alt="Example Stats" 
              className="w-full border-2 border-foreground" 
            />
          </div>
          
          <p className="text-sm font-bold text-muted-foreground flex items-center gap-2">
            <GitPullRequest className="w-4 h-4" />
            Updates automatically every 4 hours • Cached on CDN for 24 hours
          </p>
        </div>

        {/* Setup Card */}
        <div className="bg-card border-4 border-foreground brutalist-shadow-lg p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-success text-success-foreground p-3 border-4 border-foreground">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black uppercase">Quick Setup</h2>
          </div>
          
          <div className="space-y-3">
            {[
              { num: '01', text: 'Add GITHUB_TOKEN to your environment variables', color: 'bg-primary' },
              { num: '02', text: 'Deploy to Vercel or your favorite platform', color: 'bg-accent' },
              { num: '03', text: 'Use the API endpoint in your README', color: 'bg-success' }
            ].map((step) => (
              <div key={step.num} className="flex items-start gap-4 group">
                <div className={`${step.color} text-white px-4 py-2 border-4 border-foreground font-black text-lg brutalist-shadow-sm shrink-0`}>
                  {step.num}
                </div>
                <p className="font-bold pt-2 group-hover:translate-x-1 transition-transform">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 pb-4">
          <div className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground">
            <span className="w-3 h-3 bg-success border-2 border-foreground animate-pulse" />
            Built with Neo-Brutalism + Pixel Art • Production-Ready
            <span className="w-3 h-3 bg-accent border-2 border-foreground animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  )
}
