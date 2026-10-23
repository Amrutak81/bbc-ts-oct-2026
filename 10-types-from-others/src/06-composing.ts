type Toast = { type: "toast"; id: string; message: string; durationMs: number };
type Modal = { type: "modal"; id: string; title: string; body: string };
type Banner = { type: "banner"; id: string; message: string; href?: string };

type Notifications = Toast | Modal | Banner;

type NotificationName = Notifications["type"];

type JustToast = Extract<Notifications, { type: "toast" }>;

type ToastProps = Omit<Toast, "type" | "id">;

export type PropsFor<T extends NotificationName> = Omit<
  Extract<Notifications, { type: T }>,
  "type" | "id"
>;

type ModalProps = PropsFor<"toast">;
