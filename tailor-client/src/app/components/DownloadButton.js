import { PDFDownloadLink } from "@react-pdf/renderer";
import { Document, Page, Text } from "@react-pdf/renderer";

const MyDocument = ({ content }) => (
  <Document>
    <Page>
      <Text>{content}</Text>
    </Page>
  </Document>
);

export default function DownloadButton({ content, filename }) {
  return (
    <PDFDownloadLink
      document={<MyDocument content={content} />}
      fileName={filename}
    >
      {({ loading }) => (loading ? "Preparing..." : "Download PDF")}
    </PDFDownloadLink>
  );
}