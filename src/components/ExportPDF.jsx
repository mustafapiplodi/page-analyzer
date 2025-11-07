import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileDown, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';

export default function ExportPDF({ mobileData, desktopData }) {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async () => {
    setIsExporting(true);

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      let yPosition = margin;

      // Helper function to check if we need a new page
      const checkNewPage = (spaceNeeded = 20) => {
        if (yPosition + spaceNeeded > pageHeight - 30) {
          pdf.addPage();
          yPosition = margin;
          return true;
        }
        return false;
      };

      // Load and embed logo
      let logoDataUrl = null;
      try {
        const logoResponse = await fetch('/assets/logo.png');
        const logoBlob = await logoResponse.blob();
        logoDataUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(logoBlob);
        });
      } catch (error) {
        console.warn('Could not load logo:', error);
      }

      // Add professional header
      pdf.setFillColor(248, 250, 252); // Light gray background
      pdf.rect(0, 0, pageWidth, 45, 'F');

      // Add border to header
      pdf.setDrawColor(226, 232, 240);
      pdf.setLineWidth(0.5);
      pdf.line(0, 45, pageWidth, 45);

      // Title on the left
      pdf.setTextColor(15, 23, 42); // Slate 900
      pdf.setFontSize(26);
      pdf.setFont(undefined, 'bold');
      pdf.text('Website Performance Report', margin, 22);

      // Logo on the right
      if (logoDataUrl) {
        // Add logo - adjust size to fit nicely in header
        const logoWidth = 45; // mm
        const logoHeight = 12; // mm (maintaining aspect ratio approximately)
        pdf.addImage(logoDataUrl, 'PNG', pageWidth - margin - logoWidth, 12, logoWidth, logoHeight);
      } else {
        // Fallback to text branding if logo fails to load
        pdf.setFontSize(10);
        pdf.setFont(undefined, 'bold');
        pdf.setTextColor(99, 102, 241); // Primary color
        const brandText = 'SCALING HIGH';
        const brandWidth = pdf.getTextWidth(brandText);
        pdf.text(brandText, pageWidth - margin - brandWidth, 18);

        pdf.setFontSize(8);
        pdf.setFont(undefined, 'normal');
        pdf.setTextColor(100, 116, 139); // Slate 500
        const tagline = 'Technologies';
        const taglineWidth = pdf.getTextWidth(tagline);
        pdf.text(tagline, pageWidth - margin - taglineWidth, 23);
      }

      // Report metadata
      yPosition = 55;
      pdf.setFontSize(10);
      pdf.setTextColor(71, 85, 105); // Slate 600
      pdf.setFont(undefined, 'normal');
      pdf.text(`URL: ${mobileData?.url || desktopData?.url}`, margin, yPosition);
      yPosition += 6;
      pdf.text(`Generated: ${new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      })}`, margin, yPosition);
      yPosition += 15;

      // Section: Overview
      pdf.setFontSize(18);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(15, 23, 42);
      pdf.text('Performance Overview', margin, yPosition);
      yPosition += 10;

      // Mobile and Desktop Scores side by side
      const colWidth = (pageWidth - 2 * margin - 10) / 2;

      // Helper to draw score card
      const drawScoreCard = (x, title, data, icon) => {
        let cardY = yPosition;

        // Card background
        pdf.setFillColor(249, 250, 251);
        pdf.roundedRect(x, cardY, colWidth, 85, 3, 3, 'F');

        // Card border
        pdf.setDrawColor(226, 232, 240);
        pdf.setLineWidth(0.5);
        pdf.roundedRect(x, cardY, colWidth, 85, 3, 3, 'S');

        // Title with icon
        pdf.setFontSize(12);
        pdf.setFont(undefined, 'bold');
        pdf.setTextColor(71, 85, 105);
        pdf.text(`${icon} ${title}`, x + 5, cardY + 8);
        cardY += 15;

        // Performance Score - Large
        const perfScore = data.performanceScore;
        const perfColor = perfScore >= 90 ? [12, 206, 107] : perfScore >= 50 ? [255, 164, 0] : [255, 78, 66];
        pdf.setFontSize(32);
        pdf.setFont(undefined, 'bold');
        pdf.setTextColor(...perfColor);
        pdf.text(`${perfScore}`, x + 5, cardY + 10);

        pdf.setFontSize(9);
        pdf.setTextColor(100, 116, 139);
        pdf.setFont(undefined, 'normal');
        pdf.text('Performance', x + 5, cardY + 16);

        // Other scores
        cardY += 22;
        pdf.setFontSize(8);
        pdf.setTextColor(71, 85, 105);

        const scores = [
          { label: 'Accessibility', value: data.accessibilityScore },
          { label: 'Best Practices', value: data.bestPracticesScore },
          { label: 'SEO', value: data.seoScore }
        ];

        scores.forEach((score, idx) => {
          const scoreColor = score.value >= 90 ? [12, 206, 107] : score.value >= 50 ? [255, 164, 0] : [255, 78, 66];
          pdf.setFont(undefined, 'normal');
          pdf.setTextColor(71, 85, 105);
          pdf.text(`${score.label}:`, x + 5, cardY);
          pdf.setFont(undefined, 'bold');
          pdf.setTextColor(...scoreColor);
          pdf.text(`${score.value}`, x + 35, cardY);
          cardY += 6;
        });
      };

      if (mobileData) {
        drawScoreCard(margin, 'Mobile', mobileData, '📱');
      }

      if (desktopData) {
        drawScoreCard(margin + colWidth + 10, 'Desktop', desktopData, '🖥️');
      }

      yPosition += 95;

      // Section: Core Web Vitals
      checkNewPage(60);
      pdf.setFontSize(18);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(15, 23, 42);
      pdf.text('Core Web Vitals', margin, yPosition);
      yPosition += 10;

      // Helper to draw metrics table
      const drawMetricsTable = (x, title, metrics, icon) => {
        let tableY = yPosition;

        // Title
        pdf.setFontSize(11);
        pdf.setFont(undefined, 'bold');
        pdf.setTextColor(71, 85, 105);
        pdf.text(`${icon} ${title}`, x + 2, tableY);
        tableY += 8;

        // Metrics
        const metricsData = [
          { name: 'LCP', full: 'Largest Contentful Paint', value: metrics.lcp?.displayValue || 'N/A' },
          { name: 'CLS', full: 'Cumulative Layout Shift', value: metrics.cls?.displayValue || 'N/A' },
          { name: 'FCP', full: 'First Contentful Paint', value: metrics.fcp?.displayValue || 'N/A' },
          { name: 'TBT', full: 'Total Blocking Time', value: metrics.tbt?.displayValue || 'N/A' },
          { name: 'SI', full: 'Speed Index', value: metrics.speedIndex?.displayValue || 'N/A' }
        ];

        pdf.setFontSize(9);
        metricsData.forEach((metric) => {
          // Metric name
          pdf.setFont(undefined, 'bold');
          pdf.setTextColor(71, 85, 105);
          pdf.text(metric.name, x + 2, tableY);

          // Full name
          pdf.setFont(undefined, 'normal');
          pdf.setTextColor(100, 116, 139);
          pdf.text(metric.full, x + 12, tableY);

          // Value
          pdf.setFont(undefined, 'bold');
          pdf.setTextColor(15, 23, 42);
          const valueWidth = pdf.getTextWidth(metric.value);
          pdf.text(metric.value, x + colWidth - valueWidth - 2, tableY);

          tableY += 6;
        });

        return tableY - yPosition + 8;
      };

      if (mobileData?.metrics) {
        const height = drawMetricsTable(margin, 'Mobile Metrics', mobileData.metrics, '📱');
        if (desktopData?.metrics) {
          // Draw desktop on same level if on same page, otherwise below
          if (yPosition + height < pageHeight - 40) {
            drawMetricsTable(margin + colWidth + 10, 'Desktop Metrics', desktopData.metrics, '🖥️');
          }
        }
      }

      yPosition += 40;

      // Section: Top Optimization Opportunities
      checkNewPage(40);
      pdf.setFontSize(18);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(15, 23, 42);
      pdf.text('Top Optimization Opportunities', margin, yPosition);
      yPosition += 10;

      // Combine and deduplicate opportunities from both mobile and desktop
      const allOpportunities = [];
      const seenTitles = new Set();

      [mobileData, desktopData].forEach(data => {
        if (data?.opportunities) {
          data.opportunities.forEach(opp => {
            if (!seenTitles.has(opp.title) && opp.priority === 'high') {
              allOpportunities.push(opp);
              seenTitles.add(opp.title);
            }
          });
        }
      });

      // Show top 8 high-priority opportunities
      const topOpportunities = allOpportunities.slice(0, 8);

      topOpportunities.forEach((opp, index) => {
        checkNewPage(20);

        // Background for each opportunity
        pdf.setFillColor(254, 252, 232); // Amber 50
        pdf.roundedRect(margin, yPosition - 3, pageWidth - 2 * margin, 14, 2, 2, 'F');

        // Number badge
        pdf.setFillColor(251, 191, 36); // Amber 400
        pdf.circle(margin + 4, yPosition + 2, 3, 'F');
        pdf.setFontSize(8);
        pdf.setFont(undefined, 'bold');
        pdf.setTextColor(255, 255, 255);
        pdf.text(`${index + 1}`, margin + 4 - pdf.getTextWidth(`${index + 1}`) / 2, yPosition + 3);

        // Title
        pdf.setFontSize(10);
        pdf.setFont(undefined, 'bold');
        pdf.setTextColor(15, 23, 42);
        pdf.text(opp.title, margin + 10, yPosition + 2);

        // Savings
        pdf.setFontSize(8);
        pdf.setFont(undefined, 'normal');
        pdf.setTextColor(100, 116, 139);
        let savingsText = '';
        if (opp.savings.ms > 0) {
          savingsText = `Save: ${(opp.savings.ms / 1000).toFixed(2)}s`;
        }
        if (opp.savings.bytes > 0) {
          savingsText += savingsText ? ' | ' : 'Save: ';
          savingsText += `${Math.round(opp.savings.bytes / 1024)}KB`;
        }
        if (savingsText) {
          pdf.text(savingsText, margin + 10, yPosition + 8);
        }

        yPosition += 18;
      });

      // Add SEO Issues if available
      if ((mobileData?.seoIssues?.length > 0 || desktopData?.seoIssues?.length > 0)) {
        checkNewPage(40);
        pdf.setFontSize(18);
        pdf.setFont(undefined, 'bold');
        pdf.setTextColor(15, 23, 42);
        pdf.text('SEO Analysis', margin, yPosition);
        yPosition += 10;

        const seoIssues = mobileData?.seoIssues || desktopData?.seoIssues || [];
        const highPriorityIssues = seoIssues.filter(issue => issue.priority === 'high').slice(0, 5);

        highPriorityIssues.forEach((issue, index) => {
          checkNewPage(15);

          pdf.setFontSize(9);
          pdf.setFont(undefined, 'bold');
          pdf.setTextColor(220, 38, 38); // Red 600
          pdf.text(`⚠ ${issue.title}`, margin, yPosition);
          yPosition += 6;

          pdf.setFont(undefined, 'normal');
          pdf.setFontSize(8);
          pdf.setTextColor(71, 85, 105);
          const descLines = pdf.splitTextToSize(issue.description, pageWidth - 2 * margin - 5);
          pdf.text(descLines, margin + 3, yPosition);
          yPosition += descLines.length * 4 + 4;
        });
      }

      // Resource Breakdown
      if (mobileData?.resourceBreakdown || desktopData?.resourceBreakdown) {
        checkNewPage(50);
        pdf.setFontSize(18);
        pdf.setFont(undefined, 'bold');
        pdf.setTextColor(15, 23, 42);
        pdf.text('Resource Breakdown', margin, yPosition);
        yPosition += 10;

        const drawResourceTable = (x, title, breakdown, icon) => {
          let tableY = yPosition;

          pdf.setFontSize(11);
          pdf.setFont(undefined, 'bold');
          pdf.setTextColor(71, 85, 105);
          pdf.text(`${icon} ${title}`, x + 2, tableY);
          tableY += 8;

          pdf.setFontSize(8);
          Object.entries(breakdown).forEach(([type, data]) => {
            const displayType = type.charAt(0).toUpperCase() + type.slice(1);
            const sizeKB = Math.round(data.size / 1024);

            pdf.setFont(undefined, 'normal');
            pdf.setTextColor(71, 85, 105);
            pdf.text(displayType, x + 2, tableY);

            pdf.setFont(undefined, 'bold');
            pdf.setTextColor(15, 23, 42);
            pdf.text(`${sizeKB} KB`, x + 30, tableY);

            pdf.setFont(undefined, 'normal');
            pdf.setTextColor(100, 116, 139);
            pdf.text(`(${data.count} files)`, x + 50, tableY);

            tableY += 5;
          });
        };

        if (mobileData?.resourceBreakdown) {
          drawResourceTable(margin, 'Mobile', mobileData.resourceBreakdown, '📱');
        }

        if (desktopData?.resourceBreakdown) {
          drawResourceTable(margin + colWidth + 10, 'Desktop', desktopData.resourceBreakdown, '🖥️');
        }
      }

      // Add footer to all pages
      const totalPages = pdf.internal.pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);

        // Footer line
        pdf.setDrawColor(226, 232, 240);
        pdf.setLineWidth(0.5);
        pdf.line(margin, pageHeight - 20, pageWidth - margin, pageHeight - 20);

        // Footer text
        pdf.setFontSize(8);
        pdf.setTextColor(100, 116, 139);
        pdf.setFont(undefined, 'normal');
        pdf.text(
          'Powered by Scaling High Technologies | https://www.scalinghigh.com',
          margin,
          pageHeight - 13
        );

        pdf.setFont(undefined, 'bold');
        pdf.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 20, pageHeight - 13);

        pdf.setFont(undefined, 'normal');
        pdf.setFontSize(7);
        pdf.text(
          `Generated: ${new Date().toLocaleDateString()}`,
          pageWidth - margin - 35,
          pageHeight - 8
        );
      }

      // Save the PDF
      const filename = `website-performance-report-${new Date().getTime()}.pdf`;
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
      disabled={isExporting || (!mobileData && !desktopData)}
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
