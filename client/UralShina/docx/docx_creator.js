// FONT SIZE IS NUMBER MULTIPLE AT 2 (I DNT KNOW HOW ITS WORK)
// cell size in number 5 is 0.01 cm min count 160 - 0.29cm

import * as fs from "fs";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";

const table = new Table({
  columnWidths: [500, 2000, 800, 700, 1500, 1500],
  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 3505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("No")],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("Наименование!")],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("кл")],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("плн срок")],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("Фактический срок")],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 3505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("")],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("")],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("")],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("")],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("")],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 3505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("")],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("")],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("")],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("")],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("")],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 3505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("")],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("")],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("")],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("")],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("")],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 3505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("")],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("")],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("")],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("")],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("")],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 3505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("")],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("")],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("")],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("")],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("")],
        }),
      ],
    }),
  ],
});

const table1 = new Table({
  columnWidths: [165],
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [new TextRun({ text: "asdads", bold: true, size: 32 })],
            }),
          ],
        }),
      ],
    }),
  ],
});

const doc = new Document({
  sections: [
    {
      children: [
        new Paragraph({ text: "СЛУЖЕБНАЯ ЗАПИСКА" }),
        table,
        new Paragraph({ text: "СОГЛАСОВАНО: ________________" }),
        new Paragraph({ text: "СОГЛАСОВАНО: ________________" }),
        table1,
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("My Document.docx", buffer);
});
