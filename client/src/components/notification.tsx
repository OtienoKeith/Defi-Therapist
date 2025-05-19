import { useState, useEffect, createContext, useContext } from "react";
import { X, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

export type NotificationType = "success" | "warning" | "error";

export interface NotificationItem {
  id: string;
  message: string;
  type: NotificationType;
}

interface NotificationContextType {
  notifications: NotificationItem[];
  addNotification: (message: string, type: NotificationType) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  addNotification: () => {},
  removeNotification: () => {},
});

export function useNotification() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const addNotification = (message: string, type: NotificationType = "success") => {
    const id = Date.now().toString();
    setNotifications((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return { notifications, addNotification, removeNotification };
}

interface NotificationProps {
  notifications: NotificationItem[];
  removeNotification: (id: string) => void;
}

export function Notification({ notifications, removeNotification }: NotificationProps) {
  return (
    <div className="fixed top-4 right-4 z-50 notification-container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`mb-3 p-4 rounded-lg shadow-lg animate-fade-in flex items-center justify-between ${
            notification.type === "success"
              ? "bg-success/20 text-success"
              : notification.type === "error"
              ? "bg-destructive/20 text-destructive"
              : "bg-warning/20 text-warning"
          }`}
        >
          <div className="flex items-center">
            {notification.type === "success" ? (
              <CheckCircle className="h-5 w-5 mr-3" />
            ) : notification.type === "error" ? (
              <XCircle className="h-5 w-5 mr-3" />
            ) : (
              <AlertTriangle className="h-5 w-5 mr-3" />
            )}
            <span>{notification.message}</span>
          </div>
          <button
            className="text-current hover:opacity-75"
            onClick={() => removeNotification(notification.id)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
