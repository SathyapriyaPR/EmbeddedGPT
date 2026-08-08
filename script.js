// ==========================================
// EmbeddedGPT - JavaScript
// ==========================================


// 1. Get HTML elements

const button = document.getElementById("askButton");

const questionInput = document.getElementById("question");

const answerBox = document.getElementById("answer");

const pdfFile = document.getElementById("pdfFile");


// 2. Check that JavaScript loaded

console.log("EmbeddedGPT JavaScript Loaded");


// 3.

a


// 4. Ask button

button.addEventListener("click", async function () {

    // Get question

    let question = questionInput.value.trim();


    // Check question

    if (question === "") {

        answerBox.value = "Please enter a question.";

        return;
    }


    // Check PDF

    if (pdfFile.files.length === 0) {

        answerBox.value = "Please upload a datasheet PDF first.";

        return;
    }


    // Get PDF

    const selectedFile = pdfFile.files[0];


    // Check PDF type

    if (selectedFile.type !== "application/pdf") {

        answerBox.value = "Please select a valid PDF datasheet.";

        return;
    }


    // Start reading

    answerBox.value = "Reading datasheet... Please wait.";


    try {

        // Read PDF

        const extractedText = await readPDF(selectedFile);


        // Display extracted text

        answerBox.value =
            "Datasheet read successfully!\n\n" +
            "Your question:\n" +
            question +
            "\n\n" +
            "Extracted text:\n\n" +
            extractedText.substring(0, 5000);


    } catch (error) {

        console.error(error);

        answerBox.value =
            "Sorry, I could not read this PDF.\n\n" +
            "Error: " +
            error.message;

    }

});


// ==========================================
// PDF TEXT EXTRACTION
// ==========================================

async function readPDF(file) {

    // Convert PDF into data

    const arrayBuffer = await file.arrayBuffer();


    // Open PDF using PDF.js

    const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer
    }).promise;


    // Create empty text

    let text = "";


    // Read every page

    for (
        let pageNumber = 1;
        pageNumber <= pdf.numPages;
        pageNumber++
    ) {

        // Get current page

        const page = await pdf.getPage(pageNumber);


        // Get text from current page

        const textContent = await page.getTextContent();


        // Convert text pieces into normal text

        const pageText = textContent.items
            .map(item => item.str)
            .join(" ");


        // Add page text

        text += pageText + "\n";
    }


    // Return extracted text

    return text;
}
