'use client';

import { useEffect, useRef, useCallback } from 'react';
import ContactForm from './ContactForm';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Sync open/close with <dialog> native API
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      if (dialog.open) dialog.close();
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Sync Escape key (native dialog fires 'close' event)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [onClose]);

  // Close when user clicks the backdrop (outside the dialog panel)
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      const rect = dialogRef.current?.getBoundingClientRect();
      if (!rect) return;
      const clickedOutside =
        e.clientX < rect.left || e.clientX > rect.right ||
        e.clientY < rect.top  || e.clientY > rect.bottom;
      if (clickedOutside) onClose();
    },
    [onClose]
  );

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      aria-labelledby="modal-title"
      aria-modal="true"
      className="w-full max-w-lg rounded-2xl shadow-2xl p-0 bg-notebook-paper border-0
                 backdrop:bg-black/60 backdrop:backdrop-blur-sm
                 open:animate-fade-in"
    >
      <div className="p-7">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 id="modal-title" className="font-display text-2xl font-bold text-notebook-ink">
              Let&apos;s work together
            </h2>
            <p className="font-body text-sm text-slate-500 mt-1">
              Fill out the form and I&apos;ll get back to you within 24 hours.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close contact modal"
            className="ml-4 flex-shrink-0 w-8 h-8 flex items-center justify-center text-slate-400
                       hover:text-slate-700 hover:bg-gray-100 rounded-full transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>

        <ContactForm onSuccess={onClose} />
      </div>
    </dialog>
  );
}
