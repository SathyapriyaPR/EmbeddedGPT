// ==========================================
// EmbeddedGPT
// PDF Datasheet Reader
// ==========================================


// Get HTML elements
const button = document.getElementById("askButton");
const questionInput = document.getElementById("question");
const answerBox = document.getElementById("answer");
const pdfFile = document.getElementById("pdfFile");


// Check that JavaScript is loaded
console.log("EmbeddedGPT JavaScript Loaded");


// PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";


// ==========================================
// ASK BUTTON
// ==========================================

button.addEventListener("click", async function () {

    // Get question
    const question = questionInput.value.trim();


    // Check question
    if (question === "") {

        answerBox.value = "Please enter a question.";

        return;
    }


    // Check PDF
    if (pdfFile.files.length === 0) {

        answerBox.value =
            "Please upload a datasheet PDF first.";

        return;
    }


    // Get selected file
    const selectedFile = pdfFile.files[0];


    // Check file type
    if (selectedFile.type !== "application/pdf") {

        answerBox.value =
            "Please select a valid PDF datasheet.";

        return;
    }


    // Show loading message
    answerBox.value =
        "📖 Reading datasheet...\n\nPlease wait.";


    try {

        // Extract text from PDF
        const extractedText =
            await readPDF(selectedFile);


        // Check whether text was extracted
        if (extractedText.trim() === "") {

            answerBox.value =
                "The PDF was opened, but no text could be extracted.\n\n" +
                "This may be a scanned/image-based PDF.";

            return;
        }


        // Find relevant information
        const relevantText =
            findRelevantText(
                extractedText,
                question
            );


        // Display result
        answerBox.value =
            "🔎 EmbeddedGPT Result\n\n" +
            "Question:\n" +
            question +
            "\n\n" +
            "Relevant datasheet information:\n\n" +
            relevantText;


    } catch (error) {

        console.error(error);

        answerBox.value =
            "❌ PDF reading failed.\n\n" +
            "Error:\n" +
            error.message;
    }

});


// ==========================================
// READ PDF
// ==========================================

async function readPDF(file) {

    // Convert uploaded PDF into data
    const arrayBuffer =
        await file.arrayBuffer();


    // Open PDF using PDF.js
    const pdf =
        await pdfjsLib.getDocument({
            data: arrayBuffer
        }).promise;


    // Store all extracted text
    let text = "";


    // Read every page
    for (
        let pageNumber = 1;
        pageNumber <= pdf.numPages;
        pageNumber++
    ) {

        console.log(
            "Reading page:",
            pageNumber,
            "of",
            pdf.numPages
        );


        // Get page
        const page =
            await pdf.getPage(pageNumber);


        // Get page text
        const textContent =
            await page.getTextContent();


        // Convert PDF text pieces into normal text
        const pageText =
            textContent.items
                .map(item => item.str)
                .join(" ");


        // Add page text
        text +=
            "\nPAGE " +
            pageNumber +
            "\n" +
            pageText +
            "\n";
    }


    // Return complete PDF text
    return text;
}


// ==========================================
// FIND RELEVANT TEXT
// ==========================================

function findRelevantText(text, question) {

    const lowerText =
        text.toLowerCase();

    const lowerQuestion =
        question.toLowerCase();


    // Important words to ignore
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


    // Convert question into words
    const words =
        lowerQuestion
            .replace(/[?.,!]/g, "")
            .split(/\s+/);


    // Keep useful words
    const keywords =
        words.filter(word =>
            word.length > 2 &&
            !stopWords.includes(word)
        );


    console.log(
        "Question keywords:",
        keywords
    );


    // Search for keywords
    for (const keyword of keywords) {

        const position =
            lowerText.indexOf(keyword);


        if (position !== -1) {

            const start =
                Math.max(0, position - 800);


            const end =
                Math.min(
                    text.length,
                    position + 2000
                );


            return text.substring(
                start,
                end
            );
        }
    }


    // Nothing found
    return (
        "No directly matching information was found.\n\n" +
        "Try asking using a technical term from the datasheet."
    );
                }
