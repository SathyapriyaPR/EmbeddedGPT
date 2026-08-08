// ==========================================
// EmbeddedGPT - JavaScript
// ==========================================


// Find HTML elements

const button = document.getElementById("askButton");

const questionInput = document.getElementById("question");

const answerBox = document.getElementById("answer");

const pdfFile = document.getElementById("pdfFile");


// Check JavaScript is loaded

console.log("EmbeddedGPT JavaScript Loaded");


// When Ask button is clicked

button.addEventListener("click", async function () {

    // Get the question

    let question = questionInput.value;

    // Remove extra spaces

    question = question.trim();


    // Check if question is empty

    if (question === "") {

        answerBox.value = "Please enter a question.";

        return;
    }


    // Check if PDF is selected

    if (pdfFile.files.length === 0) {

        answerBox.value = "Please upload a datasheet PDF first.";

        return;
    }


    // Get the selected PDF

    const selectedFile = pdfFile.files[0];


    // Check if it is a PDF

    if (selectedFile.type !== "application/pdf") {

        answerBox.value = "Please select a valid PDF datasheet.";

        return;
    }


    // Tell user that PDF is being read

    answerBox.value = "Reading datasheet... Please wait.";


    // Try to read the PDF

    try {

        const extractedText = await readPDF(selectedFile);


        // Show extracted text

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


    // Go through every page

    for (
        let pageNumber = 1;
        pageNumber <= pdf.numPages;
        pageNumber++
    ) {

        // Get current page

        const page = await pdf.getPage(pageNumber);


        // Get text from page

        const textContent = await page.getTextContent();


        // Convert text pieces into text

        const pageText = textContent.items
            .map(item => item.str)
            .join(" ");


        // Add page text

        text += pageText + "\n";
    }


    // Return extracted text

    return text;
}    // 6. Check whether the question is empty

    if (question === "") {

        answerBox.value = "Please enter a question.";

        return;
    }


    // 7. Check whether a PDF has been selected

    if (pdfFile.files.length === 0) {

        answerBox.value = "Please upload a datasheet PDF first.";

        return;
    }


    // 8. Get the uploaded PDF

    const selectedFile = pdfFile.files[0];


    // 9. Check whether the selected file is actually a PDF

    if (selectedFile.type !== "application/pdf") {

        answerBox.value = "Please select a valid PDF datasheet.";

        return;
    }


    // 10. Tell the user that PDF processing has started

    answerBox.value = "Reading datasheet... Please wait.";


    // 11. Try to read the PDF

    try {

        const extractedText = await readPDF(selectedFile);


        // 12. Display the extracted text

        answerBox.value =
            "Datasheet read successfully!\n\n" +
            "Your question:\n" +
            question +
            "\n\n" +
            "Extracted text:\n\n" +
            extractedText.substring(0, 5000);


    } catch (error) {

        // 13. Display an error if PDF reading fails

        console.error(error);

        answerBox.value =
            "Sorry, I could not read this PDF.\n\n" +
            "Error: " +
            error.message;
    }

});


// ==========================================
// PDF TEXT EXTRACTION FUNCTION
// ==========================================

async function readPDF(file) {

    // Convert PDF into data

    const arrayBuffer = await file.arrayBuffer();


    // Open the PDF using PDF.js

    const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer
    }).promise;


    // Create an empty variable for all PDF text

    let text = "";


    // Read every page

    for (
        let pageNumber = 1;
        pageNumber <= pdf.numPages;
        pageNumber++
    ) {

        // Get the current page

        const page = await pdf.getPage(pageNumber);


        // Get the text from the page

        const textContent = await page.getTextContent();


        // Convert text pieces into normal text

        const pageText = textContent.items
            .map(item => item.str)
            .join(" ");


        // Add this page's text to the total text

        text += pageText + "\n";
    }


    // Return all extracted text

    return text;
}
    }


    // 8. Get the uploaded PDF

    const selectedFile = pdfFile.files[0];


    // 9. Check whether the selected file is actually a PDF

    if (selectedFile.type !== "application/pdf") {

        answerBox.value = "Please select a valid PDF datasheet.";

        return;
    }


    // 10. Temporary response

    answerBox.value =
        "Datasheet uploaded successfully.\n\n" +
        "Your question:\n" +
        question +
        "\n\n" +
        "AI processing will be added in the next stage.";


});
// PDF reading function

async function readPDF(file) {

    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer
    }).promise;

    let text = "";

    for (
        let pageNumber = 1;
        pageNumber <= pdf.numPages;
        pageNumber++
    ) {

        const page = await pdf.getPage(pageNumber);

        const textContent = await page.getTextContent();

        const pageText = textContent.items
            .map(item => item.str)
            .join(" ");

        text += pageText + "\n";
    }

    return text;
}
