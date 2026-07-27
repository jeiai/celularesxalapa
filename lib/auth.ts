import type { Role } from "@/types/domain";

const permissions: Record<Role, string[]> = {
  CUSTOMER: ["catalog:read", "quote:create", "appointment:create"],
  ADVISOR: ["catalog:read", "quote:create", "appointment:create", "crm:read", "crm:update"],
  MANAGER: ["catalog:read", "quote:create", "crm:read", "crm:update", "analytics:read", "inventory:update"],
  ADMIN: ["*"]
};

export function can(role: Role, permission: string) {
  return permissions[role].includes("*") || permissions[role].includes(permission);
}
