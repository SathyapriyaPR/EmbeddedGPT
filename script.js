// ==========================================
// EmbeddedGPT - JavaScript
// ==========================================


// 1. Get HTML elements

const button = document.getElementById("askButton");

const questionInput = document.getElementById("question");

const answerBox = document.getElementById("answer");

const pdfFile = document.getElementById("pdfFile");
answerBox.value = "NEW JAVASCRIPT LOADED";

// 2. Check that JavaScript loaded

console.log("EmbeddedGPT JavaScript Loaded");


// 3. Ask button

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


        // Find relevant information

        const relevantText = findRelevantText(
            extractedText,
            question
        );


        // Display relevant information

        answerBox.value =
            "Relevant datasheet information:\n\n" +
            relevantText;


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


// ==========================================
// FIND RELEVANT TEXT
// ==========================================

function findRelevantText(text, question) {

    // Convert everything to lowercase

    const lowerText = text.toLowerCase();

    const lowerQuestion = question.toLowerCase();


    // Split question into individual words

    const words = lowerQuestion.split(" ");


    // Store useful keywords

    let keywords = [];


    // Keep useful words

    for (let word of words) {

        if (word.length > 3) {

            keywords.push(word);
        }
    }


    // Search for keywords

    for (let keyword of keywords) {

        const position = lowerText.indexOf(keyword);


        if (position !== -1) {

            // Get text around the keyword

            const start = Math.max(
                0,
                position - 500
            );


            const end = Math.min(
                text.length,
                position + 1500
            );


            return text.substring(start, end);
        }
    }


    // Nothing found

    return "No relevant information found in the datasheet.";
}
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


        // Find relevant information

        const relevantText = findRelevantText(
            extractedText,
            question
        );


        // Display relevant information

        answerBox.value =
            "Relevant datasheet information:\n\n" +
            relevantText;


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


// ==========================================
// FIND RELEVANT TEXT
// ==========================================

function findRelevantText(text, question) {

    // Convert everything to lowercase

    const lowerText = text.toLowerCase();

    const lowerQuestion = question.toLowerCase();


    // Split question into individual words

    const words = lowerQuestion.split(" ");


    // Store useful keywords

    let keywords = [];


    // Keep useful words

    for (let word of words) {

        if (word.length > 3) {

            keywords.push(word);
        }
    }


    // Search for keywords

    for (let keyword of keywords) {

        const position = lowerText.indexOf(keyword);


        if (position !== -1) {

            // Get text around the keyword

            const start = Math.max(
                0,
                position - 500
            );


            const end = Math.min(
                text.length,
                position + 1500
            );


            return text.substring(start, end);
        }
    }


    // Nothing found

    return "No relevant information found in the datasheet.";
}
        answerBox.value = "Please select a valid PDF datasheet.";

        return;
    }


    // Start reading

    answerBox.value = "Reading datasheet... Please wait.";


    try {

        // Read PDF

        const extractedText = await readPDF(selectedFile);


        // Display extracted text

        const relevantText = findRelevantText(
    extractedText,
    question
);

answerBox.value =
    "Relevant datasheet information:\n\n" +
    relevantText;


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
// ==========================================
// FIND RELEVANT TEXT
// ==========================================

function findRelevantText(text, question) {

    // Convert everything to lowercase

    const lowerText = text.toLowerCase();

    const lowerQuestion = question.toLowerCase();


    // Split question into individual words

    const words = lowerQuestion.split(" ");


    // Store useful keywords

    let keywords = [];


    // Keep important words

    for (let word of words) {

        if (word.length > 3) {

            keywords.push(word);
        }
    }


    // Find the first useful keyword

    for (let keyword of keywords) {

        const position = lowerText.indexOf(keyword);


        if (position !== -1) {

            // Get text around the keyword

            const start = Math.max(0, position - 500);

            const end = Math.min(
                text.length,
                position + 1500
            );


            return text.substring(start, end);
        }
    }


    // If nothing is found

    return "No relevant information found in the datasheet.";
}
