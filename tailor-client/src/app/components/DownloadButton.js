"use client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
  }
});

const MyDocument = ({ content }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Professional Resume</Text>
        <Text style={styles.text}>{content}</Text>
      </View>
    </Page>
  </Document>
);

export default function DownloadButton({ content, filename }) {
  return (
    <PDFDownloadLink
      document={<MyDocument content={content} />}
      fileName={filename}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium text-white transition-colors duration-200"
    >
      {({ loading }) => (loading ? 'Preparing PDF...' : 'Download PDF')}
    </PDFDownloadLink>
  );
}