export function formatBytes(bytes: number) {
    if (!bytes && bytes !== 0) return "";
    const units = ["B", "KB", "MB", "GB"];
    let n = bytes;
    let i = 0;
    while (n >= 1024 && i < units.length - 1) {
      n = n / 1024;
      i++;
    }
    return `${n.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
  }
  
  export function normalizeAccept(accept?: string | string[]) {
    if (!accept) return undefined;
    return Array.isArray(accept) ? accept.join(",") : accept;
  }
  
  export function getFileName(file?: File | null) {
    return file?.name ?? "";
  }
  