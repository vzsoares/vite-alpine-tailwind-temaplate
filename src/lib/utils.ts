type ClassValue = string | false | null | undefined;

/** Joins truthy class name fragments into a single space-separated string. */
export function cn(...classes: ClassValue[]): string {
    return classes.filter(Boolean).join(" ");
}
