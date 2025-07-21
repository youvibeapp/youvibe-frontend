import { Button } from '@/components/ui/button';
import { HeaderProps } from './types';

export default function Header({ creditsRemaining = 3 }: HeaderProps) {
  return (
    <header className="flex justify-between items-center pt-4 px-4 flex-shrink-0">
      <h1 className="text-2xl font-bold text-black">youvibe</h1>
      <Button
        variant="secondary"
        className="bg-white text-gray-600 rounded-full shadow-sm h-8 px-4 text-xs font-medium"
      >
        {creditsRemaining} credits remaining
      </Button>
    </header>
  );
}
