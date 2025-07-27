import { AppShellProps } from './types';

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="bg-[#f6f6f6] flex items-center justify-center min-h-screen p-4 font-sans">
      <div className="relative w-full max-w-sm min-w-[375px] h-[932px] flex flex-col p-4">
        {children}
      </div>
    </div>
  );
}
