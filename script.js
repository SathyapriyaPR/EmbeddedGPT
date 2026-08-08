// ==========================================
// EmbeddedGPT
// PDF Datasheet Reader
// ====================================

// Get HTML elements

const button = document.getElementById("askButton");
const questionInput = document.getElementById("question");
const answerBox = document.getElementById("answer");
const pdfFile = document.getElementById("pdfFile");


// Check JavaScript

console.log("EmbeddedGPT JavaScript Loaded");


// ==========================================
// CHECK PDF.JS
// ==========================================

if (typeof pdfjsLib === "undefined") {

    answerBox.value =
        "❌ PDF.js failed to load.\n\n" +
        "Please refresh the page.";

    console.error("PDF.js is not loaded.");

} else {

    console.log("PDF.js loaded successfully.");

    pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
}


// ==========================================
// ASK BUTTON
// ==========================================

button.addEventListener("click", async function () {

    console.log("Ask button clicked");


    // Get question

    const question =
        questionInput.value.trim();


    // Check question

    if (question === "") {

        answerBox.value =
            "Please enter a question.";

        return;
    }


    // Check PDF

    if (pdfFile.files.length === 0) {

        answerBox.value =
            "Please upload a datasheet PDF first.";

        return;
    }


    // Get selected PDF

    const selectedFile =
        pdfFile.files[0];


    console.log(
        "Selected file:",
        selectedFile.name
    );


    // Check file

    if (selectedFile.type !== "application/pdf") {

        answerBox.value =
            "Please select a valid PDF datasheet.";

        return;
    }


    // Show loading

    answerBox.value =
        "📖 Reading datasheet...\n\n" +
        "Please wait...";


    try {

        // Read PDF

        const extractedText =
            await readPDF(selectedFile);


        console.log(
            "Characters extracted:",
            extractedText.length
        );


        // Check extraction

        if (extractedText.trim() === "") {

            answerBox.value =
                "The PDF was opened, but no text was found.";

            return;
        }


        // Find relevant information

        const result =
            findRelevantText(
                extractedText,
                question
            );


        // Display result

        answerBox.value =
            "🔎 EmbeddedGPT\n\n" +
            "Question:\n" +
            question +
            "\n\n" +
            "Relevant information:\n\n" +
            result;


    } catch (error) {

        console.error(
            "PDF ERROR:",
            error
        );


        answerBox.value =
            "❌ Something went wrong.\n\n" +
            "Error:\n" +
            error.message;
    }

});


// ==========================================
// READ PDF
// ==========================================

async function readPDF(file) {


    // Convert PDF into data

    const arrayBuffer =
        await file.arrayBuffer();


    // Open PDF

    const pdf =
        await pdfjsLib.getDocument({
            data: arrayBuffer
        }).promise;


    console.log(
        "PDF pages:",
        pdf.numPages
    );


    // Store text

    let text = "";


    // Read every page

    for (
        let pageNumber = 1;
        pageNumber <= pdf.numPages;
        pageNumber++
    ) {


        console.log(
            "Reading page",
            pageNumber
        );


        // Get page

        const page =
            await pdf.getPage(pageNumber);


        // Get text

        const textContent =
            await page.getTextContent();


        // Convert pieces into text

        const pageText =
            textContent.items
                .map(item => item.str)
                .join(" ");


        // Add text

        text +=
            "\nPAGE " +
            pageNumber +
            "\n" +
            pageText +
            "\n";
    }


    return text;
}


// ==========================================
// FIND RELEVANT INFORMATION
// ==========================================

        // ==========================================
// SMART DATASHEET SEARCH - VERSION 2
// ==========================================
function findRelevantText(text, question) {

    const lowerText = text.toLowerCase();
    const lowerQuestion = question.toLowerCase();

    // ==========================================
    // VOLTAGE SEARCH
    // ==========================================

    if (
        lowerQuestion.includes("voltage") ||
        lowerQuestion.includes("vdd") ||
        lowerQuestion.includes("supply")
    ) {

        console.log("Voltage question detected");

        // Find ALL occurrences of "recommended operating conditions"
        let positions = [];

        let searchStart = 0;

        while (true) {

            const position =
                lowerText.indexOf(
                    "recommended operating conditions",
                    searchStart
                );

            if (position === -1) {
                break;
            }

            positions.push(position);

            searchStart =
                position + 1;
        }

        console.log(
            "Operating-condition matches:",
            positions
        );


        // Use the LAST occurrence.
        // The first one is normally in the contents/table of contents.

        if (positions.length > 0) {

            const position =
                positions[positions.length - 1];


            const start =
                Math.max(
                    0,
                    position - 500
                );


            const end =
                Math.min(
                    text.length,
                    position + 4000
                );


            return text.substring(
                start,
                end
            );
        }


        // Fallback: search for VDD33

        const vddPosition =
            lowerText.lastIndexOf("vdd33");


        if (vddPosition !== -1) {

            const start =
                Math.max(
                    0,
                    vddPosition - 500
                );


            const end =
                Math.min(
                    text.length,
                    vddPosition + 3000
                );


            return text.substring(
                start,
                end
            );
        }
    }


    // ==========================================
    // CURRENT SEARCH
    // ==========================================

    if (
        lowerQuestion.includes("current")
    ) {

        const position =
            lowerText.lastIndexOf(
                "current"
            );


        if (position !== -1) {

            return text.substring(
                Math.max(0, position - 500),
                Math.min(
                    text.length,
                    position + 3000
                )
            );
        }
    }


    // ==========================================
    // FREQUENCY SEARCH
    // ==========================================

    if (
        lowerQuestion.includes("frequency") ||
        lowerQuestion.includes("clock")
    ) {

        const position =
            lowerText.lastIndexOf(
                "frequency"
            );


        if (position !== -1) {

            return text.substring(
                Math.max(0, position - 500),
                Math.min(
                    text.length,
                    position + 3000
                )
            );
        }
    }


    // ==========================================
    // TEMPERATURE SEARCH
    // ==========================================

    if (
        lowerQuestion.includes("temperature")
    ) {

        const position =
            lowerText.lastIndexOf(
                "temperature"
            );


        if (position !== -1) {

            return text.substring(
                Math.max(0, position - 500),
                Math.min(
                    text.length,
                    position + 3000
                )
            );
        }
    }


    // ==========================================
    // GENERAL SEARCH
    // ==========================================

    const words =
        lowerQuestion
            .replace(/[?.,!]/g, "")
            .split(/\s+/);


    const stopWords = [
        "what",
        "is",
        "the",
        "of",
        "a",
        "an",
        "for",
        "to",
        "in",
        "on",
        "and",
        "or",
        "does",
        "how",
        "where",
        "which"
    ];


    for (const word of words) {

        if (
            word.length <= 3 ||
            stopWords.includes(word)
        ) {
            continue;
        }


        const position =
            lowerText.lastIndexOf(word);


        if (position !== -1) {

            return text.substring(
                Math.max(0, position - 500),
                Math.min(
                    text.length,
                    position + 3000
                )
            );
        }
    }


    return "No relevant information was found.";
}
                                
