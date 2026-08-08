// ==========================================
// EmbeddedGPT
// PDF Datasheet Reader
// ==========================================


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

    console.log("Question:", question);


    // ==========================================
    // VOLTAGE QUESTION
    // ==========================================

    if (
        lowerQuestion.includes("voltage") ||
        lowerQuestion.includes("vdd") ||
        lowerQuestion.includes("supply")
    ) {

        console.log("Voltage question detected");


        // Look for the actual electrical section
        const electricalPosition =
            lowerText.indexOf(
                "5. electrical characteristics"
            );


        if (electricalPosition !== -1) {

            const electricalSection =
                text.substring(
                    electricalPosition
                );


            const lowerElectricalSection =
                electricalSection.toLowerCase();


            // Look for recommended operating conditions
            const operatingPosition =
                lowerElectricalSection.indexOf(
                    "recommended operating conditions"
                );


            if (operatingPosition !== -1) {

                const start =
                    Math.max(
                        0,
                        operatingPosition - 500
                    );


                const end =
                    Math.min(
                        electricalSection.length,
                        operatingPosition + 4000
                    );


                return electricalSection.substring(
                    start,
                    end
                );
            }


            // If the exact heading isn't found,
            // return the electrical section
            return electricalSection.substring(
                0,
                4000
            );
        }
    }


    // ==========================================
    // CURRENT QUESTION
    // ==========================================

    if (
        lowerQuestion.includes("current")
    ) {

        const position =
            lowerText.lastIndexOf(
                "operating current"
            );


        if (position !== -1) {

            const start =
                Math.max(
                    0,
                    position - 500
                );


            const end =
                Math.min(
                    text.length,
                    position + 2500
                );


            return text.substring(
                start,
                end
            );
        }
    }


    // ==========================================
    // FREQUENCY QUESTION
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

            const start =
                Math.max(
                    0,
                    position - 500
                );


            const end =
                Math.min(
                    text.length,
                    position + 2500
                );


            return text.substring(
                start,
                end
            );
        }
    }


    // ==========================================
    // TEMPERATURE QUESTION
    // ==========================================

    if (
        lowerQuestion.includes("temperature")
    ) {

        const position =
            lowerText.lastIndexOf(
                "temperature"
            );


        if (position !== -1) {

            const start =
                Math.max(
                    0,
                    position - 500
                );


            const end =
                Math.min(
                    text.length,
                    position + 2500
                );


            return text.substring(
                start,
                end
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


    const keywords =
        words.filter(
            word =>
                word.length > 3 &&
                !stopWords.includes(word)
        );


    // Search from the END of the document.
    // This helps avoid table-of-contents matches.

    for (const keyword of keywords) {

        const position =
            lowerText.lastIndexOf(
                keyword
            );


        if (position !== -1) {

            const start =
                Math.max(
                    0,
                    position - 500
                );


            const end =
                Math.min(
                    text.length,
                    position + 2500
                );


            return text.substring(
                start,
                end
            );
        }
    }


    return "No relevant information was found.";
    }

                
