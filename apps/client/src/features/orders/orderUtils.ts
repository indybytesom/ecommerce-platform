import { OrderStatus } from "./orderTypes";

export const getStatusVariant = (
  status: OrderStatus,
): "default" | "success" | "warning" | "danger" | "info" => {
  switch (status) {
    case "pending":
      return "warning";

    case "processing":
      return "info";

    case "paid":
      return "success";

    case "shipped":
      return "success";

    case "delivered":
      return "success";

    case "cancelled":
      return "danger";

    default:
      return "default";
  }
};
