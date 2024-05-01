import * as fs from "fs";
import { base64Str } from "../src/assets/imgInBase64";
import { staticApi } from "../src/static/static";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  ImageRun,
  WidthType,
  PageOrientation,
  PageMargin,
  convertInchesToTwip,
  AlignmentType,
} from "docx";
import { saveAs } from "file-saver";

const defaultFont = "Times New Roman";
const defaultSize = 24;

export const docxCreator = (data) => {
  const headerImg = async () => {
    (await fetch(img)).blob();
  };
  const tableCreator = (
    state,
    { columnWidths, cellWidth, headers, content }
  ) => {
    const _cellCreator = (object) => {
      if (object instanceof Date) object = object.toLocaleDateString();
      return new TableCell({
        width: cellWidth,
        children: [
          new Paragraph({ alignment: AlignmentType.CENTER, text: `${object}` }),
        ],
      });
    };

    const _headerCreator = () => {
      let listOfHeders = [];
      headers.map((el) => listOfHeders.push(_cellCreator(el)));
      return new TableRow({
        children: listOfHeders,
      });
    };

    const _forckCellCreator = () => {
      const ob = [];
      let contentOfCurrentRow;
      for (const [key, value] of Object.entries(state)) {
        (contentOfCurrentRow = content.reduce((accumulator, currentValue) => {
          accumulator.push(_cellCreator(value[currentValue]));
          return accumulator;
        }, [])),
          ob.push(
            new TableRow({
              children: [_cellCreator(key), ...contentOfCurrentRow],
            })
          );
      }
      return ob;
    };

    const table = new Table({
      columnWidths: columnWidths,
      rows: [_headerCreator(), ..._forckCellCreator()],
    });

    return table;
  };

  const table = tableCreator(data, {
    columnWidths: [444, 4500, 1407, 1407, 2420],
    cellWidth: {
      size: 3505,
      type: WidthType.AUTO,
    },
    headers: [
      "\u2116",
      "Наименование",
      "Ед",
      "Колл",
      "Планируемый срок приобретения",
      // "Фактический срок приобретения",
    ],
    content: ["title", "units", "quantity", "deadline"],
  });

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            size: defaultSize,
            font: defaultFont,
          },
        },
      },
    },
    sections: [
      {
        // properties: {
        //   size: {
        //     orientation: PageOrientation.PORTRAIT,
        //     width: 11906,
        //     height: 16838,
        //     margins: {
        //       top: 200,
        //       right: 200,
        //       bottom: 200,
        //       left: 200,
        //     },
        //     page: {
        //       size: {
        //         width: 11906,
        //         height: 16838,
        //       },
        //       margin: {
        //         top: 425,
        //         bottom: 283,
        //         left: convertInchesToTwip(0.2),
        //         right: convertInchesToTwip(0.2),
        //       },
        //     },
        //   },
        // },
        properties: {
          page: {
            size: {
              width: 11906,
              height: 16838,
            },
            margin: {
              top: 432,
              right: 864,
              bottom: 288,
              left: 864,
            },
          },
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new ImageRun({
                data: base64Str,
                transformation: {
                  width: 672,
                  height: 120,
                },
              }),
            ],
          }),
          new Paragraph("             __________        _______________ "),
          new Paragraph({
            children: [
              new TextRun({
                text: "                        (дата)                      (стр. подразделение)",
                size: 18,
              }),
              new TextRun({
                text: "		     В РАБОТУ ",
                bold: true,
                italics: true,
              }),

              new TextRun({
                text: "_________________/___________/",
              }),
            ],
          }),

          new Paragraph({
            indent: {
              left: 7605,
            },
            children: [
              new TextRun({
                size: 18,
                text: "(кому)",
              }),
            ],
          }),
          new Paragraph(""),
          new Paragraph({
            indent: {
              left: 6205,
            },
            children: [
              new TextRun({
                break: 1,
                text: "Генеральному директору",
              }),
              new TextRun({
                break: 1,
                text: "ООО «Уралшина»",
              }),
              new TextRun({
                break: 1,
                text: "Мустаеву М.Г. ",
              }),
            ],
          }),
          new Paragraph(""),
          new Paragraph(""),
          new Paragraph(""),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: 100,
            children: [new TextRun({ text: "СЛУЖЕБНАЯ ЗАПИСКА", bold: true })],
          }),
          new Paragraph(""),
          new Paragraph(""),
          table,
          new Paragraph(""),

          // new Paragraph({
          //   alignment: AlignmentType.LEFT,
          //   text: "",
          // }),

          new Paragraph({
            text: ":                                                       ____________________________",
          }),
          new Paragraph(""),
          new Paragraph(""),
          new Paragraph(""),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            text: "_______________________ ",
          }),
          new Paragraph(""),
          new Paragraph(""),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            text: "СОГЛАСОВАНО: ",
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            text: "________________________",
          }),
          new Paragraph(""),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            text: "СОГЛАСОВАНО: ",
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            text: "________________________",
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    console.log(blob);
    saveAs(blob, "example.docx");
    console.log("Document created successfully");
  });
};
