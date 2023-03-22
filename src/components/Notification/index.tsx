import * as React from 'react';
import { useContext, useEffect } from 'react';
import { appContext } from '../../AppContext';
import { sanitize } from 'dompurify';

export const Notification = () => {
  const { _notification, dismissNotification } = useContext(appContext);

  /**
   * Hide notification after 3 seconds of it appearing
   */
  useEffect(() => {
    if (_notification) {
      const timer = setTimeout(() => {
        dismissNotification();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [_notification, dismissNotification]);

  return (
    <div className={`notification ${_notification.display ? 'notification__show' : ''}`}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.6 14.6L15.65 7.55L14.25 6.15L8.6 11.8L5.75 8.95L4.35 10.35L8.6 14.6ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z"
          fill="white"
        />
      </svg>
      <span className="ml-3" dangerouslySetInnerHTML={{ __html: sanitize(_notification.message) }}></span>
    </div>
  );
};

export default Notification;
