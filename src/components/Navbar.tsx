import React, { useState } from 'react';
import { User } from '../types';
import { Shield, Film, UserCircle, LogOut, Settings, BookOpen } from 'lucide-react';

interface NavbarProps {
  currentUser: User;
  activeTab: 'catalog' | 'progress' | 'admin';
  onSelectTab: (tab: 'catalog' | 'progress' | 'admin') => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  onQuickRoleSwitch: (role: 'aluno' | 'admin') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeTab,
  onSelectTab,
  onOpenAuth,
  onLogout,
  onQuickRoleSwitch,
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0c0d12]/95 backdrop-blur-md border-b border-neutral-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element wordmark with police crimson logo) */}
        <div 
          onClick={() => onSelectTab('catalog')}
          className="flex items-center gap-2 cursor-pointer select-none group shrink-0"
        >
          <div className="w-8 h-8 rounded bg-[#E50914] flex items-center justify-center font-display font-black text-white text-sm tracking-tighter shadow-md shadow-[#E50914]/30 group-hover:scale-105 transition-transform">
            CP
          </div>
          <span className="font-display font-black text-xl tracking-wider uppercase text-white whitespace-nowrap">
            CARREIRAS <span className="text-[#E50914]">POLICIAIS</span>
          </span>
        </div>

        {/* Zone 2: 4 Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold tracking-wide">
          <button
            onClick={() => onSelectTab('catalog')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer border-b-2 ${
              activeTab === 'catalog'
                ? 'text-white border-[#E50914]'
                : 'text-neutral-400 border-transparent hover:text-white'
            }`}
          >
            Início
          </button>

          <button
            onClick={() => onSelectTab('catalog')}
            className="text-neutral-400 hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer border-b-2 border-transparent"
          >
            Todas as Matérias
          </button>

          <button
            onClick={() => onSelectTab('progress')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer border-b-2 ${
              activeTab === 'progress'
                ? 'text-white border-[#E50914]'
                : 'text-neutral-400 border-transparent hover:text-white'
            }`}
          >
            Meus Estudos
          </button>

          {currentUser.role === 'admin' && (
            <button
              onClick={() => onSelectTab('admin')}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer border-b-2 ${
                activeTab === 'admin'
                  ? 'text-white border-[#E50914]'
                  : 'text-neutral-400 border-transparent hover:text-white'
              }`}
            >
              <Settings className="w-3.5 h-3.5 text-[#E50914]" />
              <span>Painel Admin</span>
            </button>
          )}
        </nav>

        {/* Zone 3: 1 Primary Action & Profile Menu */}
        <div className="flex items-center gap-3 shrink-0 relative">

          {/* User Profile Button */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-neutral-800/80 transition-colors cursor-pointer border border-neutral-800/60"
            >
              <div className="w-7 h-7 rounded bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-xs text-neutral-200">
                {currentUser.avatar || currentUser.name[0]}
              </div>
              <div className="hidden lg:block text-left text-xs">
                <p className="font-semibold text-white truncate max-w-[110px] leading-tight">
                  {currentUser.name}
                </p>
                <p className="text-[10px] text-neutral-400 capitalize">
                  {currentUser.role === 'admin' ? 'Coordenador' : 'Concurseiro'}
                </p>
              </div>
            </button>

            {/* Dropdown Menu */}
            {userMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setUserMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-2xl bg-[#14151e] border border-neutral-800 z-50 py-1.5 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-2 border-b border-neutral-800">
                    <p className="text-xs font-semibold text-white">{currentUser.name}</p>
                    <p className="text-[11px] text-neutral-400 truncate">{currentUser.email}</p>
                    <div className="mt-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-300">
                      Modo: <span className={currentUser.role === 'admin' ? 'text-[#E50914]' : 'text-emerald-400'}>{currentUser.role}</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        onSelectTab('catalog');
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-neutral-300 hover:bg-neutral-800 flex items-center gap-2 cursor-pointer"
                    >
                      <Film className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Catálogo de Videoaulas</span>
                    </button>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        onSelectTab('progress');
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-neutral-300 hover:bg-neutral-800 flex items-center gap-2 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Meu Histórico de Aulas</span>
                    </button>
                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          onSelectTab('admin');
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-neutral-300 hover:bg-neutral-800 flex items-center gap-2 cursor-pointer font-semibold"
                      >
                        <Settings className="w-3.5 h-3.5 text-[#E50914]" />
                        <span>Gerenciar Plataforma (Admin)</span>
                      </button>
                    )}
                  </div>

                  <div className="border-t border-neutral-800 pt-1">
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        onOpenAuth();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-neutral-300 hover:bg-neutral-800 flex items-center gap-2 cursor-pointer"
                    >
                      <UserCircle className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Trocar de Conta / Login</span>
                    </button>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-neutral-800 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sair</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
