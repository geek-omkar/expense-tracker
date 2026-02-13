import { Category } from '@/types/expense';

export function getCategoryIcon(category: Category): string {
  const icons: Record<Category, string> = {
    Food: '\uD83C\uDF54',       // burger emoji
    Transport: '\uD83D\uDE97',  // car emoji
    Shopping: '\uD83D\uDECD\uFE0F',  // shopping bags emoji
    Bills: '\uD83D\uDCCB',      // clipboard emoji
    Other: '\uD83D\uDCCC',      // pushpin emoji
  };
  return icons[category];
}

export function getCategoryColor(category: Category): string {
  const colors: Record<Category, string> = {
    Food: '#FF6B35',
    Transport: '#4ECDC4',
    Shopping: '#A855F7',
    Bills: '#3B82F6',
    Other: '#8E8E93',
  };
  return colors[category];
}

export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

export function formatDateForDisplay(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
