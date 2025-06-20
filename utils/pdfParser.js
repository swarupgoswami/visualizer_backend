import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";

export async function extractTextFromPdf(buffer) {
  const loadingTask = pdfjsLib.default.getDocument({ data: buffer }); // 👈 fix here
  const pdf = await loadingTask.promise;
  console.log(`📄 PDF loaded: ${pdf.numPages} pages`);

  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join(" ");
    fullText += pageText + "\n";
  }

  console.log("📄 Extracted PDF Text:", fullText.slice(0, 300));
  return fullText;
}


