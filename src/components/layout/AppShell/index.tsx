import { AppShellProps } from './types';

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="bg-[#f6f6f6] flex items-center justify-center min-h-screen p-4 font-sans">
      <div className="relative w-full max-w-sm min-w-[375px] h-auto min-h-[812px] flex flex-col bg-white/80 rounded-[48px] shadow-2xl p-4 border-4 border-gray-200">
        {children}
      </div>
    </div>
  );
}
