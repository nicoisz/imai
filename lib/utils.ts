export type ClassValue = string | number | null | undefined | false;

export function cn(...values: Array<ClassValue | ClassValue[]>): string {
  return values.flat().filter(Boolean).join(" ");
}
