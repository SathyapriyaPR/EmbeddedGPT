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

function findRelevantText(text, question) {
// ==========================================
// SMART TECHNICAL SEARCH
// ==========================================

function findRelevantText(text, question) {

    const lowerText = text.toLowerCase();

    const lowerQuestion = question.toLowerCase();


    // ==========================================
    // Technical keyword mapping
    // ==========================================

    const keywordGroups = {

        voltage: [
            "voltage",
            "operating voltage",
            "supply voltage",
            "power supply",
            "vdd",
            "vdd33"
        ],

        current: [
            "current",
            "operating current",
            "supply current",
            "consumption"
        ],

        frequency: [
            "frequency",
            "clock frequency",
            "clock"
        ],

        temperature: [
            "temperature",
            "operating temperature",
            "ambient temperature"
        ],

        gpio: [
            "gpio",
            "input",
            "output",
            "pin"
        ],

        power: [
            "power",
            "power consumption",
            "power dissipation"
        ]
    };


    // ==========================================
    // Find which technical topic was asked
    // ==========================================

    let detectedTopic = null;


    for (const topic in keywordGroups) {

        for (const keyword of keywordGroups[topic]) {

            if (lowerQuestion.includes(keyword)) {

                detectedTopic = topic;

                break;
            }
        }

        if (detectedTopic !== null) {
            break;
        }
    }


    console.log(
        "Detected topic:",
        detectedTopic
    );


    // ==========================================
    // Special search for voltage questions
    // ==========================================

    if (detectedTopic === "voltage") {

        const searchTerms = [
            "recommended operating conditions",
            "operating voltage",
            "supply voltage",
            "vdd33",
            "3.0 v",
            "3.3 v"
        ];


        for (const term of searchTerms) {

            const position =
                lowerText.indexOf(term);


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
    }


    // ==========================================
    // General technical search
    // ==========================================

    if (detectedTopic !== null) {

        const terms =
            keywordGroups[detectedTopic];


        for (const term of terms) {

            const position =
                lowerText.indexOf(term);


            if (position !== -1) {

                const start =
                    Math.max(
                        0,
                        position - 500
                    );


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
    }


    // ==========================================
    // Normal keyword search
    // ==========================================

    const words =
        lowerQuestion
            .replace(/[?.,!]/g, "")
            .split(/\s+/);


    for (const word of words) {

        if (word.length <= 3) {
            continue;
        }


        const position =
            lowerText.indexOf(word);


        if (position !== -1) {

            const start =
                Math.max(
                    0,
                    position - 500
                );


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


    return (
        "No relevant information was found."
    );
}
