import React from 'react';

const SagalaPage: React.FC = () => {
  return (
    // The parent <main> tag in the layout has p-6 (1.5rem) padding.
    // We use a negative margin (-m-6) to counteract this padding.
    // We then adjust the height to fill the newly available space (100% + 3rem for top/bottom padding).
    // This allows the iframe to have a "full-bleed" effect within the main content area.
    <div className="-m-6 h-[calc(100%+3rem)]">
      <iframe
        title="Sagala Dashboard - Looker Studio"
        src="https://lookerstudio.google.com/embed/reporting/fe7230d7-5028-4682-bc15-b99859ceb2aa"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-forms allow-popups"
      ></iframe>
    </div>
  );
};

export default SagalaPage;
