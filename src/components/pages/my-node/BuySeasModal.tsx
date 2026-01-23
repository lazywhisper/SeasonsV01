import { JupiterSwapWidget } from '../../dashboard/JupiterSwapWidget';

interface BuySeasModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BuySeasModal({ isOpen, onClose }: BuySeasModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <div
        className="relative max-w-[480px] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <JupiterSwapWidget onClose={onClose} />
      </div>
    </div>
  );
}
