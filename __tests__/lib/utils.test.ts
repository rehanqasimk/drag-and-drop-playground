import { cn } from '@/lib/utils';

describe('cn utility function', () => {
  it('combines class names correctly', () => {
    const result = cn('text-red-500', 'bg-blue-200', 'p-4');
    expect(result).toBe('text-red-500 bg-blue-200 p-4');
  });

  it('handles conditional class names', () => {
    const isActive = true;
    const isDisabled = false;
    
    const result = cn(
      'base-class',
      isActive && 'active-class',
      isDisabled && 'disabled-class'
    );
    
    expect(result).toBe('base-class active-class');
  });

  it('handles null and undefined values', () => {
    const result = cn('base-class', null, undefined, 'valid-class');
    expect(result).toBe('base-class valid-class');
  });

  it('merges Tailwind utility classes correctly', () => {
    const result = cn('p-2', 'p-4');
    // tailwind-merge should keep the last conflicting utility
    expect(result).toBe('p-4');
  });

  it('handles complex class combinations', () => {
    const result = cn(
      'fixed inset-0', 
      'flex items-center justify-center',
      { 'bg-black/50': true, 'hidden': false }
    );
    
    expect(result).toContain('fixed');
    expect(result).toContain('inset-0');
    expect(result).toContain('flex');
    expect(result).toContain('items-center');
    expect(result).toContain('justify-center');
    expect(result).toContain('bg-black/50');
    expect(result).not.toContain('hidden');
  });
});