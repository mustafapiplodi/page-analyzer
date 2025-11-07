import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileDown, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ExportPDF({ data }) {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async () => {
    setIsExporting(true);

    try {
      // Create a new jsPDF instance
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      let yPosition = margin;

      // Add header
      pdf.setFillColor(99, 102, 241); // Primary color
      pdf.rect(0, 0, pageWidth, 30, 'F');

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(24);
      pdf.setFont(undefined, 'bold');
      pdf.text('Page Speed Report', margin, 20);

      // Add URL and date
      yPosition = 40;
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      pdf.text(`URL: ${data.url}`, margin, yPosition);
      yPosition += 6;
      pdf.text(`Date: ${new Date(data.timestamp).toLocaleString()}`, margin, yPosition);
      yPosition += 6;
      pdf.text(`Strategy: ${data.strategy === 'mobile' ? 'Mobile' : 'Desktop'}`, margin, yPosition);
      yPosition += 12;

      // Add scores section
      pdf.setFontSize(16);
      pdf.setFont(undefined, 'bold');
      pdf.text('Performance Scores', margin, yPosition);
      yPosition += 8;

      // Performance Score
      pdf.setFontSize(12);
      pdf.setFont(undefined, 'bold');
      pdf.text('Performance:', margin, yPosition);
      pdf.setFont(undefined, 'normal');
      const perfColor = data.performanceScore >= 90 ? [12, 206, 107] : data.performanceScore >= 50 ? [255, 164, 0] : [255, 78, 66];
      pdf.setTextColor(...perfColor);
      pdf.text(`${data.performanceScore}`, margin + 40, yPosition);
      pdf.setTextColor(0, 0, 0);
      yPosition += 7;

      // Accessibility Score
      pdf.setFont(undefined, 'bold');
      pdf.text('Accessibility:', margin, yPosition);
      pdf.setFont(undefined, 'normal');
      const a11yColor = data.accessibilityScore >= 90 ? [12, 206, 107] : data.accessibilityScore >= 50 ? [255, 164, 0] : [255, 78, 66];
      pdf.setTextColor(...a11yColor);
      pdf.text(`${data.accessibilityScore}`, margin + 40, yPosition);
      pdf.setTextColor(0, 0, 0);
      yPosition += 7;

      // Best Practices Score
      pdf.setFont(undefined, 'bold');
      pdf.text('Best Practices:', margin, yPosition);
      pdf.setFont(undefined, 'normal');
      const bpColor = data.bestPracticesScore >= 90 ? [12, 206, 107] : data.bestPracticesScore >= 50 ? [255, 164, 0] : [255, 78, 66];
      pdf.setTextColor(...bpColor);
      pdf.text(`${data.bestPracticesScore}`, margin + 40, yPosition);
      pdf.setTextColor(0, 0, 0);
      yPosition += 7;

      // SEO Score
      pdf.setFont(undefined, 'bold');
      pdf.text('SEO:', margin, yPosition);
      pdf.setFont(undefined, 'normal');
      const seoColor = data.seoScore >= 90 ? [12, 206, 107] : data.seoScore >= 50 ? [255, 164, 0] : [255, 78, 66];
      pdf.setTextColor(...seoColor);
      pdf.text(`${data.seoScore}`, margin + 40, yPosition);
      pdf.setTextColor(0, 0, 0);
      yPosition += 12;

      // Core Web Vitals
      pdf.setFontSize(16);
      pdf.setFont(undefined, 'bold');
      pdf.text('Core Web Vitals', margin, yPosition);
      yPosition += 8;

      pdf.setFontSize(11);
      pdf.setFont(undefined, 'normal');

      if (data.metrics) {
        // LCP
        pdf.text(`LCP (Largest Contentful Paint): ${data.metrics.lcp.displayValue}`, margin, yPosition);
        yPosition += 6;

        // CLS
        pdf.text(`CLS (Cumulative Layout Shift): ${data.metrics.cls.displayValue}`, margin, yPosition);
        yPosition += 6;

        // FCP
        pdf.text(`FCP (First Contentful Paint): ${data.metrics.fcp.displayValue}`, margin, yPosition);
        yPosition += 6;

        // TBT
        pdf.text(`TBT (Total Blocking Time): ${data.metrics.tbt.displayValue}`, margin, yPosition);
        yPosition += 6;

        // Speed Index
        pdf.text(`Speed Index: ${data.metrics.speedIndex.displayValue}`, margin, yPosition);
        yPosition += 12;
      }

      // Top Opportunities (if they fit on this page)
      if (yPosition < pageHeight - 60 && data.opportunities && data.opportunities.length > 0) {
        pdf.setFontSize(16);
        pdf.setFont(undefined, 'bold');
        pdf.text('Top Optimization Opportunities', margin, yPosition);
        yPosition += 8;

        pdf.setFontSize(10);
        pdf.setFont(undefined, 'normal');

        const topOpportunities = data.opportunities.slice(0, 5);
        topOpportunities.forEach((opp, index) => {
          if (yPosition > pageHeight - 30) {
            pdf.addPage();
            yPosition = margin;
          }

          pdf.setFont(undefined, 'bold');
          pdf.text(`${index + 1}. ${opp.title}`, margin, yPosition);
          yPosition += 5;

          pdf.setFont(undefined, 'normal');
          if (opp.savings.ms > 0) {
            pdf.text(`  Potential savings: ${Math.round(opp.savings.ms / 1000)}s`, margin, yPosition);
            yPosition += 5;
          }
          yPosition += 2;
        });
      }

      // Add footer
      const totalPages = pdf.internal.pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(128, 128, 128);
        pdf.text(
          `Generated by Page Speed Analyzer - ${new Date().toLocaleDateString()}`,
          margin,
          pageHeight - 10
        );
        pdf.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 20, pageHeight - 10);
      }

      // Save the PDF
      const filename = `page-speed-report-${new Date().getTime()}.pdf`;
      pdf.save(filename);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={exportToPDF}
      disabled={isExporting}
      variant="outline"
      className="gap-2"
    >
      {isExporting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <FileDown className="h-4 w-4" />
          Export PDF
        </>
      )}
    </Button>
  );
}
