import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PieChartComponent } from './pie-chart/pie-chart.component';
// @ts-ignore
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PieChartComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  chartId: any = 'myPieChart'; // Set the chart ID in the parent component
  title = 'chart';
  dataToPass = 'Hello from ParentComponent!';
  labels1: any;
  labels2: any;
  labels3: any;
  labels4: any;
  labels5: any;
  labels6: any;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.labels1 = [
      {
        text: ' text1 text1 text1 text1 text1',
        color: 'rgba(54, 162, 235, 0.8)',
      },
      {
        text: 'text2 text2 text2 text2 ',
        color: 'rgba(255, 99, 132, 0.8)',
      },
      {
        text: 'text3 text3 text3 text3 text3 ',
        color: 'rgba(255, 206, 86, 0.8)',
      },
    ];
    this.labels2 = [
      {
        text: ' text1 text1 text1 text1 text1',
        color: 'red',
      },
      {
        text: 'text2 text2 text2 text2 ',
        color: '#fff',
      },
      {
        text: 'text3 text3 text3 text3 text3 ',
        color: '#000',
      },
    ];
    this.labels3 = [
      {
        text: ' text1 text1 text1 text1 text1',
        color: 'rgba(54, 162, 235, 0.8)',
      },
      {
        text: 'text2 text2 text2 text2 ',
        color: 'rgba(255, 99, 132, 0.8)',
      },
      {
        text: 'text3 text3 text3 text3 text3 ',
        color: 'rgba(255, 206, 86, 0.8)',
      },
    ];
    this.labels4 = [
      {
        text: ' text1 text1 text1 text1 text1',
        color: 'red',
      },
      {
        text: 'text2 text2 text2 text2 ',
        color: '#fff',
      },
      {
        text: 'text3 text3 text3 text3 text3 ',
        color: '#000',
      },
    ];
    this.labels5 = [
      {
        text: ' text1 text1 text1 text1 text1',
        color: 'red',
      },
      {
        text: 'text2 text2 text2 text2 ',
        color: '#fff',
      },
      {
        text: 'text3 text3 text3 text3 text3 ',
        color: '#000',
      },
    ];
    this.labels6 = [
      {
        text: ' text1 text1 text1 text1 text1',
        color: 'red',
      },
      {
        text: 'text2 text2 text2 text2 ',
        color: '#fff',
      },
      {
        text: 'text3 text3 text3 text3 text3 ',
        color: '#000',
      },
    ];
  }

  @ViewChild('pdfContent') pdfContent: ElementRef | undefined;

  handleExport() {
    const invoiceContentElement = document.getElementById(
      'invoice_container'
    ) as HTMLElement;
    html2canvas(invoiceContentElement, {}).then((canvas) => {
      // is convert the canvas into base64 string url
      const imgData = canvas.toDataURL('image/png');
      console.log(imgData);
      // window.open(imgData);
      // page width
      const pageWidth = 210;
      const height = (canvas.height * pageWidth) / canvas.width;
      console.log(height);
      // initialize the PDF

      console.log(canvas.height, canvas.width, '**');
      const pdf = new jsPDF('p', 'px', [canvas.width, canvas.height]);
      // const pdf = new jsPDF('p', 'mm', 'a4');
      // add the image into pdf
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      // pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, height);

      pdf.save('invoice.pdf');
    });
  }

  // generatePDF() {
  //   const elements = document.querySelectorAll('.page-to-export');
  //   // Loop through each element with the specified class
  //   elements.forEach((element: any, index) => {
  //     html2canvas(element).then((canvas) => {
  //       const contentDataURL = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF('p', 'mm', 'a4');
  //       pdf.addImage(contentDataURL, 'PNG', 0, 0, 210, 297);

  //       // Save each PDF with a unique name
  //       pdf.save(`generated-document-page-${index + 1}.pdf`);
  //     });
  //   });
  // }

  async generatePDF() {
    const elements = document.querySelectorAll('.page-to-export');
    const pdf = new jsPDF('p', 'mm', 'a4');

    for (let i = 0; i < elements.length; i++) {
      const element: any = elements[i];
      const canvas = await html2canvas(element);

      // Convert canvas to an image
      const imageData = canvas.toDataURL('image/png');

      // Add image to the PDF
      pdf.addImage(
        imageData,
        'PNG',
        pdf.internal.pageSize.getWidth() * 0.01,
        pdf.internal.pageSize.getHeight() * 0.01,
        pdf.internal.pageSize.getWidth() * 0.98,
        (canvas.height * pdf.internal.pageSize.getWidth() * 0.98) / canvas.width
      );
      // pdf.addImage(imageData, 'PNG', 0, 0, canvas.width, canvas.height);

      // pdf.addImage(
      //   imageData,
      //   'PNG',
      //   0,
      //   0,
      //   pdf.internal.pageSize.getWidth(),
      //   pdf.internal.pageSize.getHeight()
      // );

      // console.log(
      //   pdf.internal.pageSize.getWidth(),
      //   pdf.internal.pageSize.getHeight(),
      //   '888888888888'
      // );
      // Add a new page for the next element (except for the last one)
      if (i < elements.length - 1) {
        pdf.addPage();
      }
    }

    // Save the combined PDF
    pdf.save('generated-document.pdf');
  }
}
