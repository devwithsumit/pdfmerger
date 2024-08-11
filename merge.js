import PDFMerger from 'pdf-merger-js';

var merger = new PDFMerger();

const mergePDfs = async (filePath1, filePath2, outputPath) => {
    try {
        // Add PDFs to the merger instance
        merger.add(filePath1); // Add the first PDF
        merger.add(filePath2); // Add the second PDF

        // Save the merged PDF to the output path
        await merger.save(outputPath);
    } catch (error) {
        console.error('Error merging PDFs:', error);
        throw error;
    }
};

export { mergePDfs };