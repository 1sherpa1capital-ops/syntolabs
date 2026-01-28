// Re-export from context for backward compatibility
// This file is deprecated - use useTryNowModal from context/TryNowModalContext instead

export { useTryNowModal } from '../context/TryNowModalContext';

// Placeholder component for any legacy imports
// The actual modal is rendered by TryNowModalProvider in App.tsx
const TryNowModal: React.FC<{ isOpen: boolean; onClose: () => void }> = () => {
    // Modal is now rendered globally via TryNowModalProvider
    // This component does nothing - modal state is managed through context
    return null;
};

import React from 'react';

export default TryNowModal;
