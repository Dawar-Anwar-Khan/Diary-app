export async function downloadMockupAsImage(
  element: HTMLElement,
  filename: string
): Promise<void> {
  // Dynamically import html2canvas only on client
  const html2canvas = (await import("html2canvas")).default;

  const canvas = await html2canvas(element, {
    scale: 3,          // 3x for high resolution
    useCORS: true,
    backgroundColor: null,
    logging: false,
  });

  const link = document.createElement("a");
  link.download = filename + ".png";
  link.href = canvas.toDataURL("image/png", 1.0);
  link.click();
}
