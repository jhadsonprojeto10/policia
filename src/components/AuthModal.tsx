import React, { useState } from 'react';
import { User } from '../types';
import { DEMO_USERS } from '../services/storage';
import { X, Shield, User as UserIcon, Lock, Mail, ArrowRight, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [role, setRole] = useState<'aluno' | 'admin'>('aluno');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Preencha seu e-mail e senha para continuar.');
      return;
    }

    if (mode === 'signup' && !name.trim()) {
      setErrorMsg('Informe seu nome completo.');
      return;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: mode === 'signup' ? name.trim() : (role === 'admin' ? 'Delegado / Coordenador' : email.split('@')[0]),
      email: email.trim(),
      role,
      avatar: (mode === 'signup' && name ? name[0] : email[0]).toUpperCase(),
    };

    onLogin(newUser);
    onClose();
  };

  const handleUseDemo = (demoRole: 'aluno' | 'admin') => {
    const demo = DEMO_USERS[demoRole];
    onLogin(demo);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#13141e] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="px-6 pt-7 pb-4 text-center">
          <div className="w-12 h-12 mx-auto rounded-xl bg-[#E50914] text-white flex items-center justify-center font-display font-black text-xl shadow-lg shadow-[#E50914]/30 mb-3">
            CP
          </div>
          <h2 className="font-display font-black text-2xl text-white uppercase tracking-wide">
            {mode === 'login' ? 'Carreiras Policiais' : 'Criar Conta de Aluno'}
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Videoaulas preparatórias para concursos policiais
          </p>
        </div>

        {/* Quick Demo Access Buttons */}
        <div className="px-6 py-2">
          <div className="p-3 bg-neutral-900/90 border border-neutral-800 rounded-xl">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 text-center">
              Acesso Rápido de Teste (1 Clique)
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleUseDemo('aluno')}
                className="py-2 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-neutral-700/60"
              >
                <UserIcon className="w-3.5 h-3.5 text-neutral-300" />
                <span>Aluno Demo</span>
              </button>

              <button
                type="button"
                onClick={() => handleUseDemo('admin')}
                className="py-2 px-3 rounded-lg bg-[#E50914]/20 hover:bg-[#E50914] text-[#E50914] hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-[#E50914]/30"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Demo</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Selector: Aluno vs Administrador */}
        {mode === 'login' && (
          <div className="px-6 pt-3">
            <div className="grid grid-cols-2 p-1 bg-neutral-900 rounded-lg border border-neutral-800 text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setRole('aluno');
                  setEmail('aluno@policia.com');
                  setPassword('aluno123');
                }}
                className={`py-2 rounded-md transition-colors ${
                  role === 'aluno'
                    ? 'bg-neutral-800 text-white font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Área do Aluno
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole('admin');
                  setEmail('admin@policia.com');
                  setPassword('admin123');
                }}
                className={`py-2 rounded-md transition-colors flex items-center justify-center gap-1 ${
                  role === 'admin'
                    ? 'bg-[#E50914] text-white font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Shield className="w-3 h-3" />
                <span>Administrador</span>
              </button>
            </div>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-3.5">
          {errorMsg && (
            <div className="p-2.5 bg-rose-950/80 border border-rose-800 rounded-lg text-rose-300 text-xs">
              {errorMsg}
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Nome Completo
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full pl-9 pr-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#E50914]"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              E-mail
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="w-full pl-9 pr-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#E50914]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#E50914]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-2.5 rounded-lg bg-[#E50914] hover:bg-[#c90712] text-white font-bold text-sm tracking-wide shadow-md shadow-[#E50914]/30 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{mode === 'login' ? 'Entrar na Plataforma' : 'Criar Cadastro'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Modal Footer Mode Switch */}
        <div className="px-6 py-4 bg-neutral-900/60 border-t border-neutral-800 text-center text-xs text-neutral-400">
          {mode === 'login' ? (
            <p>
              Não possui uma conta?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setRole('aluno');
                }}
                className="text-[#E50914] font-semibold hover:underline"
              >
                Cadastre-se gratuitamente
              </button>
            </p>
          ) : (
            <p>
              Já possui uma conta?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-[#E50914] font-semibold hover:underline"
              >
                Fazer login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
